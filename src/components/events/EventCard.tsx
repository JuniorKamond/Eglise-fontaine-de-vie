import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { ChurchEvent } from "@/config";
import { eventAction } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const mois = (m: string) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();

function Meta({ event, className }: { event: ChurchEvent; className?: string }) {
  return (
    <dl className={cn("flex flex-wrap gap-x-6 gap-y-2 text-meta text-brume", className)}>
      <div className="flex items-center gap-2"><dt className="sr-only">Heure</dt><Clock size={15} strokeWidth={1.75} aria-hidden /><dd>{event.heure}</dd></div>
      <div className="flex items-center gap-2"><dt className="sr-only">Lieu</dt><MapPin size={15} strokeWidth={1.75} aria-hidden /><dd>{event.lieu}</dd></div>
    </dl>
  );
}

/** Événement principal : grande date typographique */
export function FeaturedEvent({ event, headingLevel: H = "h3" }: { event: ChurchEvent; headingLevel?: "h2" | "h3" }) {
  const action = eventAction(event);
  return (
    <article className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
      <p className="flex items-baseline gap-3 font-serif text-encre sm:flex-col sm:gap-0" aria-label={`${event.jour} ${event.mois} ${event.annee ?? ""}`}>
        <span className="text-[clamp(5rem,12vw,8.5rem)] leading-[0.85] tracking-[-0.04em]">{event.jour}</span>
        <span className="text-[1.6rem] italic text-or-fonce sm:mt-3">{mois(event.mois)}{event.annee && ` ${event.annee}`}</span>
      </p>
      <div className="sm:border-l sm:border-trait sm:pl-10">
        <p className="text-meta text-or-fonce">{event.categorie}</p>
        <H className="mt-2 text-h3 text-encre">{event.titre}</H>
        <p className="mt-4 max-w-texte text-body text-brume">{event.description}</p>
        <Meta event={event} className="mt-5" />
        <Button href={action.href} variant="nuit" size="md" className="mt-8" icon={<ArrowRight size={16} strokeWidth={1.75} />}>
          {action.label}
        </Button>
      </div>
    </article>
  );
}

/** Événement secondaire (grille) */
export function EventCard({ event }: { event: ChurchEvent }) {
  const action = eventAction(event);
  return (
    <article className="group relative flex h-full flex-col border-t border-nuit/80 pt-6">
      <p className="font-serif text-encre">
        <span className="text-[2.75rem] leading-none">{event.jour}</span>{" "}
        <span className="text-[1.15rem] italic text-or-fonce">{mois(event.mois)}{event.annee && ` ${event.annee}`}</span>
      </p>
      <p className="mt-5 text-meta text-or-fonce">{event.categorie}</p>
      <h3 className="mt-1 font-serif text-[1.4rem] leading-snug text-encre">{event.titre}</h3>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-brume">{event.description}</p>
      <Meta event={event} className="mt-4" />
      <a href={action.href} className="lien mt-auto self-start pt-6 text-encre">{action.label}</a>
    </article>
  );
}

/** Rendez-vous réguliers (culte, réception) */
export function RecurringList({ items, tone = "clair" }: { items: { titre: string; detail: string }[]; tone?: "clair" | "sombre" }) {
  return (
    <ul className={cn("divide-y border-y", tone === "sombre" ? "divide-white/15 border-white/15" : "divide-trait border-trait")}>
      {items.map((it) => (
        <li key={it.titre} className="py-5">
          <h3 className={cn("font-serif text-[1.3rem]", tone === "sombre" ? "text-white" : "text-encre")}>{it.titre}</h3>
          <p className={cn("mt-1 text-[0.98rem]", tone === "sombre" ? "text-white/70" : "text-brume")}>{it.detail}</p>
        </li>
      ))}
    </ul>
  );
}
