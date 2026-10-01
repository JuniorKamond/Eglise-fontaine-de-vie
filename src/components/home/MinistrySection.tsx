import Image from "next/image";
import photo from "@/assets/photo-fdv.jpg";
import { config } from "@/config";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TextLink } from "@/components/ui/TextLink";
import { PresenceList } from "@/components/pages/PresenceList";
import { SplitText } from "@/components/motion/SplitText";

/** Communauté / mouvement Honored For Christ */
export function MinistrySection() {
  const m = config.mouvement;
  return (
    <section aria-labelledby="mouvement-titre" className="relative isolate overflow-hidden bg-nuit-profond py-section text-white">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image src={photo} alt="" fill placeholder="blur" sizes="100vw" className="object-cover object-center opacity-70 grayscale" />
        <div className="absolute inset-0 bg-nuit opacity-70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-nuit-profond/85 via-nuit-profond/25 to-nuit-profond/95" />
      </div>

      <div className="conteneur">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-6">
            <p className="text-meta text-or">Mouvement fondé en {m.annee_creation}</p>
            <SplitText id="mouvement-titre" text={m.nom} className="mt-4 text-h2" />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-lead text-white/80">{m.description}</p>
            <TextLink href="/mouvement" className="mt-8 text-white">Découvrir le mouvement</TextLink>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.15} className="mt-16 lg:mt-24">
          <PresenceList />
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-20 max-w-2xl text-center lg:mt-28">
          <blockquote>
            <p className="font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] italic leading-relaxed text-white/85">{m.verset}</p>
            <footer className="mt-4 text-meta text-or">{m.reference_verset}</footer>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
