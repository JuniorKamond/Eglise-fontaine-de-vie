import { ArrowRight } from "lucide-react";
import { config } from "@/config";
import { mapsLink } from "@/lib/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/motion/SplitText";
import { Magnetic } from "@/components/motion/Magnetic";

/** Appel à l'action final — réutilisé en bas des pages */
export function CTASection() {
  return (
    <section aria-labelledby="cta-titre" className="bg-calcaire py-section">
      <div className="conteneur">
        <AnimatedSection className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SplitText id="cta-titre" text="Planifier votre visite" className="font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.02em] text-encre" />
            <p className="mt-6 max-w-texte text-lead text-brume">{config.textes.visite}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="flex sm:inline-flex">
                <Button href="/planifier-une-visite" variant="nuit" icon={<ArrowRight size={18} strokeWidth={1.75} />} className="w-full sm:w-auto">
                  Planifier votre visite
                </Button>
              </Magnetic>
              <Magnetic className="flex sm:inline-flex">
                <Button href="/contact" variant="contourNuit" className="w-full sm:w-auto">Nous contacter</Button>
              </Magnetic>
            </div>
          </div>

          <dl className="grid content-end gap-6 border-t border-nuit/15 pt-8 text-[0.98rem] sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <dt className="text-meta text-brume">Culte</dt>
              <dd className="mt-1 font-serif text-[1.3rem] text-encre">{config.horaires.culte}</dd>
            </div>
            <div>
              <dt className="text-meta text-brume">Adresse</dt>
              <dd className="mt-1 text-encre">
                {config.contact.adresse}
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="lien mt-2 flex w-fit text-encre">Voir l'itinéraire</a>
              </dd>
            </div>
            <div>
              <dt className="text-meta text-brume">Téléphone</dt>
              <dd className="mt-1"><a href={`tel:${config.contact.telephone_lien}`} className="text-encre hover:text-encre">{config.contact.telephone}</a></dd>
            </div>
          </dl>
        </AnimatedSection>
      </div>
    </section>
  );
}
