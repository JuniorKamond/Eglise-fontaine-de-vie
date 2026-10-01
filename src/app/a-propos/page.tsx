import type { Metadata } from "next";
import Image from "next/image";
import aboutImage from "@/assets/about-pastor.jpg";
import heroImage from "@/assets/hero-assembly.jpg";
import { config } from "@/config";
import { PageHero } from "@/components/pages/PageHero";
import { ValuesList } from "@/components/pages/ValuesList";
import { PresenceList } from "@/components/pages/PresenceList";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Placeholder } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/TextLink";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "À propos",
  description: `${config.eglise.histoire} Dirigée par le ${config.pasteur.nom}.`,
  alternates: { canonical: "/a-propos" },
};

const reperes = [
  { valeur: String(config.eglise.annee_fondation), label: "Fondation de l'église à Abidjan" },
  { valeur: "Dimanche", label: `Culte, ${config.horaires.culte_court}` },
  { valeur: String(config.mouvement.annee_creation), label: `Naissance du mouvement ${config.mouvement.nom}` },
  { valeur: "3 continents", label: "Présence du mouvement" },
];

export default function AboutPage() {
  const { vision, mission } = config.eglise;
  return (
    <>
      <PageHero title={config.eglise.accroche_apropos} image={heroImage} imageAlt="" />

      {/* Histoire */}
      <section aria-labelledby="histoire" className="bg-white py-section">
        <div className="conteneur grid gap-10 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-3">
            <h2 id="histoire" className="font-serif text-[1.35rem] text-encre">Notre histoire</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-8 lg:col-start-5">
            <p className="font-serif text-editorial text-encre">{config.eglise.histoire}</p>
          </AnimatedSection>
        </div>

        <div className="conteneur mt-20 lg:mt-28">
          <AnimatedSection>
            <dl className="grid grid-cols-2 gap-x-8 lg:grid-cols-4">
              {reperes.map((r) => (
                <div key={r.label} className="flex flex-col border-t border-trait py-6">
                  <dt className="order-2 mt-2 text-meta text-brume">{r.label}</dt>
                  <dd className="order-1 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none text-encre">{r.valeur}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </section>

      {/* Verset */}
      <section aria-label="Verset de l'église" className="bg-nuit py-section text-white">
        <AnimatedSection className="conteneur">
          <blockquote className="mx-auto max-w-4xl">
            <p className="font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] italic leading-[1.3] text-white/90">{config.eglise.verset}</p>
            <footer className="mt-8 flex items-center gap-4 text-meta text-or">
              <span className="h-px w-10 bg-or/60" aria-hidden />
              {config.eglise.reference_verset}
            </footer>
          </blockquote>
        </AnimatedSection>
      </section>

      {/* Vision & mission (à compléter) + valeurs */}
      <section aria-labelledby="valeurs" className="bg-calcaire py-section">
        <div className="conteneur grid gap-12 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-4">
            <h2 id="valeurs" className="text-h2 text-encre">Ce qui nous anime</h2>
            {vision ? (
              <div className="mt-10"><h3 className="text-meta text-brume">Vision</h3><p className="mt-2 font-serif text-[1.3rem] leading-snug text-encre">{vision}</p></div>
            ) : <Placeholder label="vision de l'église (eglise.vision)" className="mt-10" />}
            {mission ? (
              <div className="mt-8"><h3 className="text-meta text-brume">Mission</h3><p className="mt-2 font-serif text-[1.3rem] leading-snug text-encre">{mission}</p></div>
            ) : <Placeholder label="mission de l'église (eglise.mission)" className="mt-4" />}
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <ValuesList large />
          </AnimatedSection>
        </div>
      </section>

      {/* Pasteur */}
      <section aria-labelledby="pasteur" className="overflow-hidden bg-white py-section">
        <div className="conteneur grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-5 lg:col-start-1">
            <h2 id="pasteur" className="text-h2 text-encre">{config.pasteur.nom}</h2>
            <p className="mt-6 max-w-texte text-lead text-brume">
              Notre église est dirigée par le {config.pasteur.nom}, {config.pasteur.presentation}
            </p>
            <div className="mt-10 border-t border-trait pt-6">
              <h3 className="text-meta text-brume">Jours de réception</h3>
              <p className="mt-1 font-serif text-[1.3rem] text-encre">{config.horaires.reception}</p>
              <TextLink href="/contact" className="mt-6 text-encre">Prendre rendez-vous</TextLink>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:col-span-7 lg:-mr-[max(3rem,calc((100vw-82rem)/2+3rem))]">
            <figure className="relative aspect-[4/3] overflow-hidden lg:rounded-l-[3px]">
              <Image src={aboutImage} alt={`${config.pasteur.nom} en prédication`} fill placeholder="blur" sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </figure>
          </AnimatedSection>
        </div>
      </section>

      {/* Mouvement */}
      <section aria-labelledby="mvt" className="bg-nuit-profond py-section text-white">
        <div className="conteneur">
          <AnimatedSection className="grid gap-8 lg:grid-cols-12">
            <h2 id="mvt" className="text-h2 lg:col-span-6">{config.mouvement.nom}</h2>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lead text-white/75">Fondé en {config.mouvement.annee_creation}. {config.mouvement.description}</p>
              <TextLink href="/mouvement" className="mt-8 text-white">Découvrir le mouvement</TextLink>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-16"><PresenceList /></AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
