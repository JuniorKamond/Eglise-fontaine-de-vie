import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Base = { label: string; name: string; error?: string; optional?: boolean; hint?: string; className?: string };
type InputProps = Base & { as?: "input" } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "className">;
type AreaProps = Base & { as: "textarea" } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">;

const control =
  "block w-full rounded-lg border bg-white px-4 text-base text-encre outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-brume/70 focus:border-nuit focus:shadow-[0_0_0_3px_rgb(var(--c-or)/0.25)]";

/** Champ de formulaire accessible : libellé visible, erreur reliée, hauteur confortable sur mobile */
export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps | AreaProps>(function Field(props, ref) {
  const { label, name, error, optional, hint, className, as = "input", ...rest } = props;
  const id = `champ-${name}`;
  const describedBy = [error && `${id}-erreur`, hint && `${id}-aide`].filter(Boolean).join(" ") || undefined;
  const common = {
    id, name, "aria-invalid": !!error, "aria-describedby": describedBy,
    className: cn(control, error ? "border-red-700" : "border-trait"),
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.95rem] font-medium text-encre">
        {label}
        {optional && <span className="text-meta font-normal text-brume">Facultatif</span>}
      </label>
      {as === "textarea" ? (
        <textarea ref={ref as React.Ref<HTMLTextAreaElement>} rows={4} {...common} className={cn(common.className, "resize-y py-3.5")} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input ref={ref as React.Ref<HTMLInputElement>} {...common} className={cn(common.className, "h-14")} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {hint && !error && <p id={`${id}-aide`} className="mt-2 text-meta text-brume">{hint}</p>}
      {error && <p id={`${id}-erreur`} className="mt-2 text-meta text-red-700">{error}</p>}
    </div>
  );
});
