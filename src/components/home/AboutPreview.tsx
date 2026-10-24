import aboutImage from "@/assets/about-pastor.jpg";
import { config } from "@/config";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TextLink } from "@/components/ui/TextLink";
import { ValuesList } from "@/components/pages/ValuesList";
import { RippleImage } from "@/components/motion/RippleImage";
import { SplitText } from "@/components/motion/SplitText";

export function AboutPreview() {
  return (
    <section aria-labelledby="apropos-titre" className="overflow-hidden bg-calcaire py-section">
      <div className="conteneur grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Image qui déborde vers le bord gauche sur grand écran */}
        <AnimatedSection className="relative lg:col-span-7 lg:-ml-[max(3rem,calc((100vw-82rem)/2+3rem))]">
          <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4] lg:rounded-r-[3px]">
            <RippleImage
              src={aboutImage}
              alt={`${config.pasteur.nom} en prédication devant l'assemblée`}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit-profond/85 via-nuit-profond/40 to-transparent p-6 pt-20 text-white sm:p-8 sm:pt-24">
              <span className="block text-meta text-or-pale">Horaires du culte</span>
              <span className="mt-1 block font-serif text-[1.4rem]">{config.horaires.culte}</span>
              <span className="mt-1 block text-meta text-white/70">{config.contact.adresse}</span>
            </figcaption>
          </figure>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-5 lg:pl-8">
          <SplitText id="apropos-titre" text={config.eglise.accroche_apropos} className="text-h2 text-encre" />
          <p className="mt-6 max-w-texte text-body text-brume">
            Notre église est dirigée par le <span className="text-encre">{config.pasteur.nom}</span>, {config.pasteur.presentation}
          </p>
          <ValuesList className="mt-10" />
          <TextLink href="/a-propos" className="mt-10 text-encre">Notre histoire</TextLink>
        </AnimatedSection>
      </div>
    </section>
  );
}
