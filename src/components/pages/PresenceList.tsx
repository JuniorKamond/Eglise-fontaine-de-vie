import { config } from "@/config";

/** Siège + annexes du mouvement, en colonnes séparées par des filets */
export function PresenceList() {
  const m = config.mouvement;
  const items = [
    { pays: m.siege.split(",")[0], role: "Siège principal", description: m.siege.split(",").slice(1).join(",").trim() },
    ...m.annexes.map((a) => ({ pays: a.pays, role: "Annexe", description: a.description })),
  ];
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <li key={it.pays} className="border-t border-white/20 py-6">
          <p className="text-meta text-or-pale/80">{it.role}</p>
          <h3 className="mt-2 font-serif text-[1.9rem] leading-tight text-white">{it.pays}</h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-white/65">{it.description}</p>
        </li>
      ))}
    </ul>
  );
}
