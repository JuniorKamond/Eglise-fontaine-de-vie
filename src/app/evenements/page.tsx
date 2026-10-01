import type { Metadata } from "next";
import { config } from "@/config";
import { events, recurring } from "@/lib/content";
import { PageHero } from "@/components/pages/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { EventCard, FeaturedEvent, RecurringList } from "@/components/events/EventCard";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Événements",
  description: config.textes.evenements,
  alternates: { canonical: "/evenements" },
};

export default function EventsPage() {
  const [featured, ...others] = events;
  return (
    <>
      <PageHero title="Ce qui se passe." intro={config.textes.evenements} />

      <section aria-labelledby="a-venir" className="bg-white py-section">
        <div className="conteneur">
          <h2 id="a-venir" className="sr-only">Événements</h2>
          {featured ? (
            <AnimatedSection className="lg:max-w-4xl">
              <FeaturedEvent event={featured} />
            </AnimatedSection>
          ) : (
            <p className="font-serif text-h3 text-encre">Les prochains événements seront annoncés ici.</p>
          )}

          {others.length > 0 && (
            <ul className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
              {others.map((e, i) => (
                <AnimatedSection as="li" key={e.titre} delay={i * 0.06}><EventCard event={e} /></AnimatedSection>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-labelledby="chaque-semaine" className="bg-nuit py-section text-white">
        <div className="conteneur grid gap-10 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-5">
            <h2 id="chaque-semaine" className="text-h2">Chaque semaine</h2>
            <p className="mt-5 text-body text-white/70">{config.contact.adresse}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <RecurringList items={recurring} tone="sombre" />
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
