import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/config";
import { sermons } from "@/lib/content";
import { PageHero } from "@/components/pages/PageHero";
import { YouTubePlayer } from "@/components/ui/YouTubePlayer";
import { SermonLibrary } from "@/components/sermons/SermonLibrary";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Prédications",
  description: config.textes.predications,
  alternates: { canonical: "/predications" },
};

export default function SermonsPage() {
  const latest = sermons[0];
  return (
    <>
      <PageHero title="Prédications" intro={config.textes.predications}>
        {latest && (
          <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <YouTubePlayer youtubeId={latest.youtubeId} title={latest.titre} thumbnail={latest.thumbnail} priority />
            </div>
            <div className="lg:col-span-4">
              <p className="text-meta text-or">Dernière prédication</p>
              <h2 className="mt-2 text-h3">
                <Link href={`/predications/${latest.slug}`} className="transition-colors hover:text-or-pale">{latest.titre}</Link>
              </h2>
              <p className="mt-2 text-meta text-white/60">{latest.predicateur}</p>
            </div>
          </div>
        )}
      </PageHero>

      <section aria-labelledby="bibliotheque" className="bg-white py-section">
        <div className="conteneur">
          <h2 id="bibliotheque" className="mb-10 text-h2 text-encre">Toutes les prédications</h2>
          <SermonLibrary sermons={sermons} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
