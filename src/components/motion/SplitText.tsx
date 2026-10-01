"use client";

import { motion, type Variants } from "framer-motion";

type Props = { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; id?: string; delay?: number };

const parent: Variants = { hidden: {}, show: (delay: number) => ({ transition: { staggerChildren: 0.055, delayChildren: delay } }) };
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
};

/** Titre révélé mot par mot quand il entre à l'écran */
export function SplitText({ text, as = "h2", className, id, delay = 0 }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag id={id} className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }} variants={parent} custom={delay}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="-mb-[0.12em] -mt-[0.2em] inline-block overflow-hidden pb-[0.12em] pt-[0.2em] align-top">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
