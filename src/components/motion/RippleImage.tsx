"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { canUseRichMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Position de recadrage, comme object-position (0 à 1) */
  position?: [number, number];
  className?: string;
};

// Effet « eau » en WebGL pur (sans bibliothèque) : l'image ondule autour de la souris.
const VERT = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;
uniform sampler2D t;uniform vec2 res;uniform vec2 img;uniform vec2 pos;uniform vec2 m;uniform float time;uniform float s;
varying vec2 v;
void main(){
  vec2 uv=vec2(v.x,1.-v.y);
  vec2 asp=vec2(res.x/res.y,1.);
  vec2 d=(uv-m)*asp;
  float dist=length(d);
  float wave=sin(dist*34.-time*3.6)*exp(-dist*4.2)*s;
  vec2 dir=dist>0.0001?d/dist:vec2(0.);
  uv+=dir*wave*.026/asp;
  float rs=res.x/res.y,ri=img.x/img.y;
  vec2 sc=rs>ri?vec2(1.,ri/rs):vec2(rs/ri,1.);
  vec2 tuv=uv*sc+(1.-sc)*pos;
  vec4 c=texture2D(t,clamp(tuv,0.,1.));
  c.rgb+=wave*.10;
  gl_FragColor=c;
}`;

export function RippleImage({ src, alt, priority, sizes = "100vw", position = [0.5, 0.5], className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (canUseRichMotion()) setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const box = wrap.current!;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const compile = (type: number, code: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, code);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("res"), uImg = u("img"), uPos = u("pos"), uM = u("m"), uTime = u("time"), uS = u("s");
    gl.uniform2f(uImg, src.width, src.height);
    gl.uniform2f(uPos, position[0], position[1]);

    const resize = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    // État de l'animation — la boucle s'arrête dès que l'eau est calme (aucun calcul inutile)
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, strength = 0, target = 0, time = 0;
    let raf = 0, running = false, visible = true, lastMove = 0, loaded = false;

    const draw = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      if (performance.now() - lastMove > 400) target = 0;
      strength += (target - strength) * 0.05;
      time += 0.016;
      gl.uniform2f(uM, mx, my);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uS, strength);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (strength < 0.002 && target === 0) { running = false; return; }
      raf = requestAnimationFrame(draw);
    };
    const start = () => {
      if (!running && visible && loaded) { running = true; raf = requestAnimationFrame(draw); }
    };

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) return;
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      target = 1;
      lastMove = performance.now();
      start();
    };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); });
    io.observe(box);
    const ro = new ResizeObserver(() => { resize(); if (loaded) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); });
    ro.observe(box);

    // Texture : l'image d'origine (même domaine)
    const im = new window.Image();
    im.decoding = "async";
    im.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      loaded = true;
      gl.uniform1f(uS, 0);
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      setReady(true);
    };
    // Chargée après l'affichage de la page pour ne pas retarder le premier rendu
    const idle = window.setTimeout(() => { im.src = src.src; }, 1200);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      clearTimeout(idle);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, src, position[0], position[1]]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        placeholder="blur"
        sizes={sizes}
        quality={80}
        className={className}
        style={{ objectPosition: `${position[0] * 100}% ${position[1] * 100}%` }}
      />
      {active && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
        />
      )}
    </div>
  );
}
