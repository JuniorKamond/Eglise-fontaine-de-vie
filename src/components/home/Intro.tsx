import { config } from "@/config";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TextLink } from "@/components/ui/TextLink";

export function Intro() {
  return (
    <section aria-labelledby="intro-titre" className="bg-white py-section">
      <div className="conteneur grid gap-10 lg:grid-cols-12 lg:gap-8">
        <AnimatedSection className="lg:col-span-3">
          <h2 id="intro-titre" className="font-serif text-[1.35rem] leading-snug text-encre">
            Fondée en {config.eglise.annee_fondation}
            <span className="block text-brume">Abidjan, Côte d'Ivoire</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-8 lg:col-start-5">
          <p className="font-serif text-editorial text-encre">{config.eglise.histoire}</p>
          <TextLink href="/a-propos" className="mt-10 text-encre">Découvrir l'église</TextLink>
        </AnimatedSection>

        {/* Le verset apparaît dans le hero sur grand écran ; ici sur mobile et tablette */}
        <AnimatedSection className="border-l border-or/60 pl-6 lg:hidden">
          <blockquote>
            <p className="font-serif text-[1.15rem] italic leading-relaxed text-encre/85">{config.eglise.verset}</p>
            <footer className="mt-3 text-meta text-or-fonce">{config.eglise.reference_verset}</footer>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
