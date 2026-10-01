"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { canUseRichMotion } from "@/lib/motion";

/** Curseur personnalisé : point doré + anneau qui grandit sur les liens, avec un libellé sur les vidéos */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ hover: boolean; label: string | null; down: boolean }>({ hover: false, label: null, down: false });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!canUseRichMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("curseur-perso");

    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role=button], label, select");
      setState((s) => ({ ...s, hover: !!interactive || !!labelled, label: labelled?.dataset.cursor ?? null }));
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    const leave = () => { x.set(-100); y.set(-100); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("curseur-perso");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = state.label ? 88 : state.hover ? 52 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-or/70 text-[0.8rem] font-medium text-nuit-profond"
          animate={{
            width: size, height: size,
            backgroundColor: state.label ? "rgb(var(--c-or))" : state.hover ? "rgb(var(--c-or) / 0.15)" : "rgb(var(--c-or) / 0)",
            scale: state.down ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {state.label}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-or transition-opacity duration-200 ${state.label ? "opacity-0" : "opacity-100"}`} />
      </motion.div>
    </div>
  );
}
