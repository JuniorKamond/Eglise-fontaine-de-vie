import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { config } from "@/config";
import { getSermon, sermons } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { YouTubePlayer } from "@/components/ui/YouTubePlayer";
import { Placeholder } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/TextLink";
import { SermonCard } from "@/components/sermons/SermonCard";
import { CTASection } from "@/components/home/CTASection";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => sermons.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const sermon = getSermon((await params).slug);
  if (!sermon) return {};
  const description = sermon.description ?? `${sermon.titre} — prédication de ${sermon.predicateur}, ${config.eglise.nom}.`;
  return {
    title: sermon.titre,
    description,
    alternates: { canonical: `/predications/${sermon.slug}` },
    openGraph: { type: "video.other", title: sermon.titre, description, images: [{ url: sermon.thumbnail, width: 480, height: 360 }] },
  };
}

export default async function SermonPage({ params }: Params) {
  const sermon = getSermon((await params).slug);
  if (!sermon) notFound();
  const date = formatDate(sermon.date);
  const related = sermons.filter((s) => s.slug !== sermon.slug).slice(0, 3);

  const jsonLd = sermon.date && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: sermon.titre,
    description: sermon.description ?? sermon.titre,
    thumbnailUrl: sermon.thumbnail,
    uploadDate: sermon.date,
    embedUrl: `https://www.youtube.com/embed/${sermon.youtubeId}`,
  };

  return (
    <>
      <article>
        <header className="bg-nuit-profond pb-section pt-32 text-white sm:pt-40">
          <div className="conteneur">
            <Link href="/predications" className="inline-flex items-center gap-2 text-meta text-white/65 transition-colors hover:text-white">
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden /> Toutes les prédications
            </Link>
            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
              <h1 className="text-h1 lg:col-span-8">{sermon.titre}</h1>
              <dl className="space-y-3 text-meta lg:col-span-3 lg:col-start-10">
                <div><dt className="text-white/50">Prédicateur</dt><dd className="text-white">{sermon.predicateur}</dd></div>
                {date && <div><dt className="text-white/50">Date</dt><dd className="text-white"><time dateTime={sermon.date}>{date}</time></dd></div>}
                {sermon.categorie && <div><dt className="text-white/50">Thème</dt><dd className="text-white">{sermon.categorie}</dd></div>}
              </dl>
            </div>
            <div className="mt-12 lg:mt-16">
              <YouTubePlayer youtubeId={sermon.youtubeId} title={sermon.titre} thumbnail={sermon.thumbnail} priority sizes="(min-width: 1312px) 1216px, 100vw" />
            </div>
          </div>
        </header>

        <section aria-label="Description" className={sermon.description ? "bg-white py-section" : "bg-white py-14"}>
          <div className="conteneur grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-3">
              {sermon.description ? (
                <p className="font-serif text-editorial text-encre">{sermon.description}</p>
              ) : (
                <Placeholder label={`description de « ${sermon.titre} » (champ description)`} />
              )}
              <TextLink href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} external className={sermon.description ? "mt-10 text-encre" : "mt-4 text-encre"}>
                Voir sur YouTube
              </TextLink>
            </div>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="autres" className="border-t border-trait bg-white pb-section pt-16">
          <div className="conteneur">
            <h2 id="autres" className="text-h2 text-encre">Autres prédications</h2>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => <li key={s.slug}><SermonCard sermon={s} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <CTASection />
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}
