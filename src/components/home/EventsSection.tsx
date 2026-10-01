import { config } from "@/config";
import { events, recurring } from "@/lib/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { FeaturedEvent, RecurringList } from "@/components/events/EventCard";

export function EventsSection() {
  const [featured] = events;
  return (
    <section aria-labelledby="evenements-titre" className="bg-white py-section">
      <div className="conteneur">
        <AnimatedSection>
          <SectionHeading id="evenements-titre" title="Ce qui se passe." intro={config.textes.evenements} />
        </AnimatedSection>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-7">
            {featured ? <FeaturedEvent event={featured} /> : <p className="text-brume">Les prochains événements seront annoncés ici.</p>}
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <h3 className="mb-2 text-meta text-brume">Chaque semaine</h3>
            <RecurringList items={recurring} />
            <TextLink href="/evenements" className="mt-8 text-encre">Tous les événements</TextLink>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
