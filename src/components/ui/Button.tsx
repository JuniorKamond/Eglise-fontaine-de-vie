import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "or" | "clair" | "contour" | "nuit" | "contourNuit";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  or: "bg-or text-nuit-profond hover:bg-or-pale",
  clair: "bg-white text-encre hover:bg-calcaire",
  contour: "text-white ring-1 ring-inset ring-white/35 hover:bg-white/10 hover:ring-white/60",
  nuit: "bg-nuit text-white hover:bg-nuit-clair",
  contourNuit: "text-encre ring-1 ring-inset ring-nuit/25 hover:ring-nuit/60 hover:bg-nuit/[0.03]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; icon?: ReactNode; iconStart?: ReactNode; className?: string; children: ReactNode };
type AsLink = Common & { href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "or", size = "lg", icon, iconStart, className, children } = props;
  const classes = cn(
    "group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.005em]",
    "transition-[background-color,box-shadow,color,transform] duration-300 ease-douce active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {iconStart && <span className="transition-transform duration-300 ease-douce group-hover:scale-110" aria-hidden>{iconStart}</span>}
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 ease-douce group-hover:translate-x-1" aria-hidden>{icon}</span>}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, icon: _i, iconStart: _is, className: _c, children: _ch, ...rest } = props;
    if (external)
      return <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>{content}</a>;
    return <Link href={href} className={classes} {...rest}>{content}</Link>;
  }
  const { variant: _v, size: _s, icon: _i, iconStart: _is, className: _c, children: _ch, ...rest } = props as AsButton;
  return <button className={classes} {...rest}>{content}</button>;
}
