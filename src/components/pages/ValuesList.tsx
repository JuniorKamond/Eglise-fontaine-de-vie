import { config } from "@/config";
import { cn } from "@/lib/utils";

/** Valeurs de l'église — liste éditoriale séparée par des filets */
export function ValuesList({ className, large }: { className?: string; large?: boolean }) {
  return (
    <ul className={cn("divide-y divide-trait border-y border-trait", className)}>
      {config.valeurs.map((v) => (
        <li key={v.titre} className={cn("grid gap-1 py-5", large && "sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 sm:py-7")}>
          <h3 className={cn("font-serif text-encre", large ? "text-h3" : "text-[1.3rem]")}>{v.titre}</h3>
          <p className="text-[0.98rem] leading-relaxed text-brume">{v.description}</p>
        </li>
      ))}
    </ul>
  );
}
