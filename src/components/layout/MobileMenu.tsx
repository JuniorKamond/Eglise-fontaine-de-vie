"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { config, navigation } from "@/config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void; isActive: (href: string) => boolean };

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({ open, onClose, isActive }: Props) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLink.current?.focus(), 250);
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-nuit-profond text-white lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease }}
        >
          <nav aria-label="Navigation mobile" className="conteneur flex flex-1 flex-col pt-28">
            <ul className="space-y-1">
              {[{ label: "Accueil", href: "/" }, ...navigation].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease }}
                >
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive(item.href) && item.href !== "/" ? "page" : undefined}
                    className={cn(
                      "flex items-baseline justify-between border-b border-white/10 py-4 font-serif text-[2.1rem] leading-none transition-colors",
                      "aria-[current=page]:text-or",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-auto space-y-6 pb-10 pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button href="/planifier-une-visite" onClick={onClose} className="w-full">
                Planifier votre visite
              </Button>
              <dl className="grid grid-cols-2 gap-6 text-meta text-white/65">
                <div>
                  <dt className="text-white">Culte</dt>
                  <dd className="mt-1">Dimanche, {config.horaires.culte_court}</dd>
                </div>
                <div>
                  <dt className="text-white">Téléphone</dt>
                  <dd className="mt-1"><a href={`tel:${config.contact.telephone_lien}`} className="underline-offset-4 hover:underline">{config.contact.telephone}</a></dd>
                </div>
              </dl>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
