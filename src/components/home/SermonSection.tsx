"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { config } from "@/config";
import { sermons } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/TextLink";
import { SplitText } from "@/components/motion/SplitText";

/**
 * Prédications — sur ordinateur, la section se fige et les vidéos défilent horizontalement
 * pendant le scroll. Sur mobile : glissement horizontal natif (swipe).
 */
export function SermonSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      if (!track.current || !desktop.matches || reduce.matches) return setDistance(0);
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pinned = distance > 0;

  if (!sermons.length) return null;

  return (
    <section aria-labelledby="predications-titre" className="bg-nuit text-white">
      <div ref={wrap} className="relative" style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
        <div className={cn("overflow-hidden", pinned ? "sticky top-0 flex h-screen flex-col justify-center" : "py-section")}>
          <motion.div
            ref={track}
            style={pinned ? { x } : undefined}
            className="flex flex-col gap-12 lg:w-max lg:flex-row lg:items-center lg:gap-[4vw] lg:pl-[max(3rem,calc((100vw-82rem)/2+3rem))] lg:pr-[8vw]"
          >
            <div className="conteneur lg:m-0 lg:w-[30vw] lg:max-w-md lg:shrink-0 lg:p-0">
              <SplitText id="predications-titre" text="Nourrissez votre esprit." className="text-h2" />
              <p className="mt-6 text-body text-white/70">{config.textes.predications}</p>
              <TextLink href="/predications" className="mt-8 text-white">Toutes les prédications</TextLink>
            </div>

            <ul className="flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,5vw,3rem)] gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,3rem)] pb-2 [scrollbar-width:none] lg:gap-[3vw] lg:overflow-visible lg:p-0">
              {sermons.map((s, i) => (
                <li key={s.slug} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[44vw] lg:max-w-[720px]">
                  <Link href={`/predications/${s.slug}`} data-cursor="Regarder" className="group block">
                    <div className="relative aspect-video overflow-hidden rounded-[3px] bg-nuit-profond">
                      <Image src={s.thumbnail} alt="" fill sizes="(min-width: 1024px) 44vw, 82vw"
                        className="object-cover transition-transform duration-[1.4s] ease-douce group-hover:scale-[1.05]" />
                      <span className="absolute inset-0 bg-gradient-to-t from-nuit-profond/70 via-transparent to-transparent" />
                      <span className="absolute bottom-5 left-5 flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-nuit transition-transform duration-500 ease-douce group-hover:scale-110">
                          <Play size={17} fill="currentColor" className="translate-x-[1px]" aria-hidden />
                        </span>
                        <span className="text-[0.95rem] font-medium">Regarder la prédication</span>
                      </span>
                    </div>
                    <p className="mt-5 text-meta text-or">{i === 0 ? "Dernière prédication" : s.predicateur}</p>
                    <h3 className="mt-1 font-serif text-h3 leading-snug">
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-douce group-hover:bg-[length:100%_1px]">
                        {s.titre}
                      </span>
                    </h3>
                    {i === 0 && <p className="mt-1 text-meta text-white/60">{s.predicateur}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {pinned && (
            <div className="conteneur mt-14" aria-hidden>
              <div className="h-px w-full bg-white/15">
                <motion.div className="h-px bg-or" style={{ width: progress }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
