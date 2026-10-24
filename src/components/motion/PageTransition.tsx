"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import markWhite from "@/assets/mark-white.png";

let hasNavigated = false;

/** Rideau bleu qui se lève à chaque changement de page (pas au premier chargement) */
export function PageTransition() {
  const [cover, setCover] = useState(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasNavigated && !reduce) {
      setCover(true);
      const t = setTimeout(() => setCover(false), 60);
      return () => clearTimeout(t);
    }
    hasNavigated = true;
  }, []);

  return (
    <AnimatePresence>
      {cover && (
        <motion.div
          key="rideau"
          aria-hidden
          className="fixed inset-0 z-[90] flex items-center justify-center bg-nuit"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}>
            <Image src={markWhite} alt="" width={64} height={64} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
