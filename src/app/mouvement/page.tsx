import type { Metadata } from "next";
import photo from "@/assets/photo-fdv.jpg";
import { config } from "@/config";
import { events } from "@/lib/content";
import { PageHero } from "@/components/pages/PageHero";
import { PresenceList } from "@/components/pages/PresenceList";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeaturedEvent } from "@/components/events/EventCard";
import { CTASection } from "@/components/home/CTASection";

const m = config.mouvement;

export const metadata: Metadata = {
  title: m.nom,
  description: `Fondé en ${m.annee_creation}, ${m.nom} est ${m.description.charAt(0).toLowerCase()}${m.description.slice(1)}`,
  alternates: { canonical: "/mouvement" },
};

export default function MovementPage() {
  const hfcEvents = events.filter((e) => e.categorie === m.nom);
  return (
    <>
      <PageHero title={m.nom} intro={`Fondé en ${m.annee_creation}. ${m.description}`} image={photo} imageAlt="" />

      <section aria-labelledby="presence" className="bg-nuit-profond pb-section pt-4 text-white">
        <div className="conteneur">
          <h2 id="presence" className="sr-only">Présence du mouvement</h2>
          <AnimatedSection><PresenceList /></AnimatedSection>
        </div>
      </section>

      <section aria-label="Verset du mouvement" className="bg-calcaire py-section">
        <AnimatedSection className="conteneur">
          <blockquote className="max-w-4xl">
            <p className="font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] italic leading-[1.3] text-encre">{m.verset}</p>
            <footer className="mt-8 flex items-center gap-4 text-meta text-or-fonce">
              <span className="h-px w-10 bg-or-fonce/60" aria-hidden />
              {m.reference_verset}
            </footer>
          </blockquote>
        </AnimatedSection>
      </section>

      {hfcEvents.length > 0 && (
        <section aria-labelledby="programmes" className="bg-white py-section">
          <div className="conteneur">
            <h2 id="programmes" className="text-h2 text-encre">Programmes du mouvement</h2>
            <div className="mt-14 space-y-16 lg:max-w-4xl">
              {hfcEvents.map((e) => <AnimatedSection key={e.titre}><FeaturedEvent event={e} /></AnimatedSection>)}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
