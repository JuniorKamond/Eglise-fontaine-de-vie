/** Signale une information manquante — visible uniquement en local (npm run dev), jamais en ligne. */
export function Placeholder({ label, className }: { label: string; className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className={`rounded-md border border-dashed border-or-fonce/60 bg-or-pale/30 px-4 py-3 text-meta text-or-fonce ${className ?? ""}`}>
      À compléter dans src/config.ts — {label}
    </div>
  );
}
