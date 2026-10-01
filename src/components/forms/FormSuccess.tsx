"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

/** Confirmation après envoi : le focus est déplacé sur le message (lecteurs d'écran) */
export function FormSuccess({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="py-6"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-nuit text-or"
        aria-hidden
      >
        <Check size={24} strokeWidth={2} />
      </motion.span>
      <h2 ref={ref} tabIndex={-1} className="mt-8 text-h3 text-encre outline-none">{title}</h2>
      <div className="mt-4 max-w-texte text-body text-brume">{children}</div>
      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  );
}
