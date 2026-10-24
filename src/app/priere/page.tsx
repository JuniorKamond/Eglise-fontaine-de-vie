import type { Metadata } from "next";
import { ShieldCheck, HeartHandshake, PhoneCall, Calendar } from "lucide-react";
import { config } from "@/config";
import { PageHero } from "@/components/pages/PageHero";
import { PrayerForm } from "@/components/forms/PrayerForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Demande de prière",
  description: `Confiez votre sujet d'intercession. Le ${config.pasteur.nom} et l'équipe d'intercession de l'${config.eglise.nom} portent vos prières.`,
  alternates: { canonical: "/priere" },
};

export default function PrayerPage() {
  return (
    <>
      <PageHero
        title="Déposez votre fardeau. Nous prions pour vous."
        intro="« Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. » — Philippiens 4:6"
      />

      <section className="bg-white py-section">
        <div className="conteneur grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Colonne d'accompagnement spirituel */}
          <AnimatedSection className="lg:col-span-5">
            <span className="text-meta font-medium uppercase tracking-wider text-or-fonce">
              Accompagnement spirituel
            </span>
            <h2 className="mt-3 text-h2 text-encre">
              Vous n'êtes pas seul(e) dans cette épreuve.
            </h2>
            <p className="mt-6 text-body text-brume leading-relaxed">
              Quel que soit le défi auquel vous faites face — maladie, détresse spirituelle, combat familial ou besoin d'orientation —, la prière fervente du juste a une grande efficacité.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 rounded-xl border border-trait/80 bg-calcaire/30 p-5">
                <ShieldCheck size={24} className="shrink-0 text-or-fonce" />
                <div>
                  <h3 className="font-serif text-[1.15rem] font-medium text-encre">
                    Confidentialité respectée
                  </h3>
                  <p className="mt-1 text-meta text-brume">
                    Vous avez le choix de transmettre votre intention uniquement au {config.pasteur.nom} ou à l'équipe d'intercesseurs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-trait/80 bg-calcaire/30 p-5">
                <HeartHandshake size={24} className="shrink-0 text-nuit" />
                <div>
                  <h3 className="font-serif text-[1.15rem] font-medium text-encre">
                    Intercession continue
                  </h3>
                  <p className="mt-1 text-meta text-brume">
                    Chaque sujet est porté lors de nos cultes du dimanche, nos rendez-vous du jeudi soir et nos temps de jeûne.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-trait/80 bg-calcaire/30 p-5">
                <Calendar size={24} className="shrink-0 text-or-fonce" />
                <div>
                  <h3 className="font-serif text-[1.15rem] font-medium text-encre">
                    Entretien pastoral
                  </h3>
                  <p className="mt-1 text-meta text-brume">
                    Pour un besoin d'écoute en tête-à-tête, le Pasteur reçoit chaque mardi et mercredi sur rendez-vous au {config.contact.telephone}.
                  </p>
                </div>
              </div>
            </div>

            <blockquote className="mt-10 border-l-2 border-or/60 pl-5 italic text-[1.05rem] text-encre/80 font-serif">
              « Confessez donc vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficacité. »
              <footer className="mt-2 text-meta not-italic text-or-fonce">Jacques 5:16</footer>
            </blockquote>
          </AnimatedSection>

          {/* Formulaire */}
          <AnimatedSection delay={0.1} className="lg:col-span-7">
            <div className="rounded-2xl border border-trait bg-white p-6 sm:p-10 shadow-sm">
              <h2 className="text-h3 text-encre">Déposer votre requête de prière</h2>
              <p className="mt-2 text-meta text-brume">
                Remplissez les informations ci-dessous. Les champs marqués d'une étoile ou requis sont indispensables pour traiter au mieux votre demande.
              </p>
              <div className="mt-8">
                <PrayerForm />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
