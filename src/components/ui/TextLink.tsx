import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TextLink({ href, children, className, external }: { href: string; children: React.ReactNode; className?: string; external?: boolean }) {
  const inner = (<>{children}<ArrowRight size={16} strokeWidth={1.75} aria-hidden /></>);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("lien", className)}>{inner}</a>
  ) : (
    <Link href={href} className={cn("lien", className)}>{inner}</Link>
  );
}
