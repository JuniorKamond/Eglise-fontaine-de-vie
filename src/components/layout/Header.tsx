"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Magnetic } from "@/components/motion/Magnetic";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Page visite : le formulaire est sur fond blanc, le header reste opaque
  const solid = (scrolled || pathname === "/planifier-une-visite") && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height,backdrop-filter] duration-500 ease-douce",
          solid ? "h-16 border-b border-trait/70 bg-white/90 backdrop-blur-md" : "h-20 border-b border-transparent bg-transparent",
        )}
      >
        <div className="conteneur flex h-full items-center justify-between gap-6">
          <Logo tone={solid ? "sombre" : "clair"} onClick={() => setOpen(false)} />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.95rem] transition-colors duration-300",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-or after:transition-transform after:duration-500 after:ease-douce hover:after:scale-x-100",
                      "aria-[current=page]:after:scale-x-100",
                      solid ? "text-encre/80 hover:text-encre" : "text-white/80 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {pathname !== "/planifier-une-visite" && (
              <Magnetic className="hidden sm:inline-flex">
                <Button href="/planifier-une-visite" variant={solid ? "nuit" : "or"} size="md">
                  Planifier votre visite
                </Button>
              </Magnetic>
            )}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={cn(
                "relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "text-encre" : "text-white",
              )}
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-douce", open && "translate-y-[6px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ease-douce", open ? "-translate-y-[5px] -rotate-45" : "w-4")} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
    </>
  );
}
