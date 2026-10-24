"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-assembly.jpg";
import { config } from "@/config";
import { mapsLink, sermons } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RippleImage } from "@/components/motion/RippleImage";
import { Magnetic } from "@/components/motion/Magnetic";

const HERO_POSITION: [number, number] = [0.5, 0.3];

const ease = [0.22, 1, 0.36, 1] as const;

/** Ligne de titre révélée par le bas (masque) */
function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`-mt-[0.2em] block overflow-hidden pb-[0.08em] pt-[0.2em] ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Défilement : l'image descend plus lentement que la page, le texte s'efface
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  // Souris : très léger déplacement de l'image et de la lumière (desktop uniquement)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20 });
  const sy = useSpring(py, { stiffness: 40, damping: 20 });
  const lightX = useTransform(sx, (v) => v * -2.2);
  const lightY = useTransform(sy, (v) => v * -2.2);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 14);
      py.set((e.clientY / window.innerHeight - 0.5) * 10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const latest = sermons[0];

  return (
    <section ref={ref} className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-nuit-profond text-white h-[100svh] lg:min-h-[720px]">
      {/* Image : réglage initial lent, puis respiration très légère */}
      <motion.div className="absolute inset-[-3%] -z-20" style={{ y: imageY }}>
       <motion.div className="h-full w-full" style={{ x: sx, y: sy }}>
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ scale: { duration: 3.2, ease }, opacity: { duration: 1.4 } }}
        >
          <div className="relative h-full w-full animate-respire">
            <RippleImage
              src={heroImage}
              alt="Assemblée de l'Église Fontaine de Vie, mains levées pendant la louange"
              priority
              position={HERO_POSITION}
              className="object-cover"
            />
          </div>
        </motion.div>
       </motion.div>
      </motion.div>

      {/* Teinte bleu nuit + lumière chaude */}
      <div className="absolute inset-0 -z-10 bg-nuit mix-blend-multiply opacity-30" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-nuit-profond via-nuit-profond/55 to-nuit-profond/10" aria-hidden />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-nuit-profond/75 via-nuit-profond/20 to-transparent md:block" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute -right-[20%] -top-[30%] -z-10 h-[90vh] w-[90vh] rounded-full opacity-60 mix-blend-screen"
        style={{ x: lightX, y: lightY, background: "radial-gradient(closest-side, rgba(232,206,150,0.35), rgba(232,206,150,0) 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2.4, delay: 0.6 }}
      />

      {/* Contenu */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="conteneur relative flex flex-1 flex-col justify-end pb-10 pt-28 sm:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p {...fade(0.2)} className="mb-6 text-[0.95rem] text-white/75 sm:mb-8">
              Rejoignez-nous chaque dimanche, {config.horaires.culte_court}
            </motion.p>
            <h1 className="font-serif">
              <Line delay={0.3} className="text-[clamp(1.5rem,3vw,2.25rem)] italic leading-none text-or-pale/90">Église</Line>
              <Line delay={0.42} className="text-display">Fontaine</Line>
              <Line delay={0.54} className="text-display">de Vie</Line>
            </h1>
            <motion.p {...fade(0.9)} className="mt-6 text-lead text-white/80">
              {config.eglise.slogan}.
            </motion.p>
            <motion.div {...fade(1.05)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="flex sm:inline-flex">
                <Button href="/planifier-une-visite" icon={<ArrowRight size={18} strokeWidth={1.75} />} className="w-full sm:w-auto">
                  Planifier votre visite
                </Button>
              </Magnetic>
              {latest && (
                <Magnetic className="flex sm:inline-flex">
                  <Button href={`/predications/${latest.slug}`} variant="contour" iconStart={<Play size={15} fill="currentColor" />} className="w-full sm:w-auto">
                    Dernière prédication
                  </Button>
                </Magnetic>
              )}
            </motion.div>
          </div>

          <motion.blockquote {...fade(1.3)} className="hidden max-w-sm justify-self-end lg:col-span-4 lg:block">
            <p className="font-serif text-[1.15rem] italic leading-[1.55] text-white/80">{config.eglise.verset}</p>
            <footer className="mt-4 flex items-center gap-3 text-meta text-or">
              <span className="h-px w-8 bg-or/60" aria-hidden />
              {config.eglise.reference_verset}
            </footer>
          </motion.blockquote>
        </div>

        {/* Infos pratiques */}
        <motion.dl {...fade(1.45)} className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-6 text-meta sm:mt-16 sm:grid-cols-3">
          <div>
            <dt className="text-white/55">Culte</dt>
            <dd className="mt-1 text-white">Dimanche, {config.horaires.culte_court}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="text-white/55">Adresse</dt>
            <dd className="mt-1 text-white">{config.contact.adresse_courte}</dd>
          </div>
          <div className="justify-self-end text-right">
            <dt className="text-white/55">Abidjan</dt>
            <dd className="mt-1">
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="lien text-white">
                Voir l'itinéraire
              </a>
            </dd>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  );
}
