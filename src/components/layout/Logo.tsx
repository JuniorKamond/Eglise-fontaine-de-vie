import Image from "next/image";
import Link from "next/link";
import markWhite from "@/assets/mark-white.png";
import markBlue from "@/assets/mark-blue.png";
import { cn } from "@/lib/utils";

export function Logo({ tone = "clair", className, onClick }: { tone?: "clair" | "sombre"; className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={cn("group flex items-center gap-3", className)} aria-label="Fontaine de Vie — accueil">
      <span className="relative h-9 w-9 shrink-0">
        <Image src={markWhite} alt="" fill sizes="36px" className={cn("object-contain transition-opacity duration-500", tone === "clair" ? "opacity-100" : "opacity-0")} />
        <Image src={markBlue} alt="" fill sizes="36px" className={cn("object-contain transition-opacity duration-500", tone === "sombre" ? "opacity-100" : "opacity-0")} />
      </span>
      <span className={cn("font-serif text-[1.3rem] leading-none tracking-[-0.01em] transition-colors duration-500", tone === "clair" ? "text-white" : "text-encre")}>
        Fontaine de Vie
      </span>
    </Link>
  );
}
