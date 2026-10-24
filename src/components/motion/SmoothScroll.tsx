"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { canUseRichMotion } from "@/lib/motion";

declare global {
  interface Window { __lenis?: Lenis }
}

/** Défilement fluide (ordinateur uniquement — le mobile garde son défilement natif) */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!canUseRichMotion()) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
