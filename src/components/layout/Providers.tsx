"use client";

import { MotionConfig } from "framer-motion";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";

/** reducedMotion="user" : respecte le réglage « réduire les animations » du système */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Cursor />
      {children}
    </MotionConfig>
  );
}
