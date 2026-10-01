import type { Metadata } from "next";
import Image from "next/image";
import heroImage from "@/assets/hero-assembly.jpg";
import { config } from "@/config";
import { mapsLink } from "@/lib/content";
import { VisitForm } from "@/components/forms/VisitForm";

export const metadata: Metadata = {
  title: "Planifier votre visite",
  description: config.textes.visite,
  alternates: { canonical: "/planifier-une-visite" },
};

export default function VisitPage() {
  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      {/* Panneau visuel rassurant : photo + infos pratiques */}
      <aside className="relative isolate flex flex-col justify-end overflow-hidden bg-nuit-profond px-[clamp(1.25rem,5vw,3rem)] pb-12 pt-32 text-white lg:sticky lg:top-0 lg:h-[100svh] lg:pb-16">
        <Image src={heroImage} alt="" fill priority placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover object-[50%_30%] opacity-55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-nuit-profond via-nuit-profond/70 to-nuit-profond/30" />
        <p className="text-meta text-or">Planifier votre visite</p>
        <h1 className="mt-4 text-h1">Rejoignez-nous !</h1>
        <p className="mt-6 max-w-md text-lead text-white/75">{config.textes.visite}</p>
        <dl className="mt-12 grid max-w-lg gap-6 border-t border-white/15 pt-8 text-meta sm:grid-cols-2">
          <div><dt className="text-white/55">Culte</dt><dd className="mt-1 text-white">{config.horaires.culte}</dd></div>
          <div>
            <dt className="text-white/55">Adresse</dt>
            <dd className="mt-1 text-white">{config.contact.adresse_courte}</dd>
            <dd className="mt-1"><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="lien text-white">Voir l'itinéraire</a></dd>
          </div>
        </dl>
      </aside>

      <section aria-label="Formulaire de visite" className="flex items-center bg-white px-[clamp(1.25rem,5vw,3rem)] py-16 lg:py-32">
        <div className="mx-auto w-full max-w-lg">
          <VisitForm />
          <p className="mt-10 text-meta text-brume">
            Une question avant de venir ? Appelez le <a href={`tel:${config.contact.telephone_lien}`} className="text-encre underline underline-offset-4">{config.contact.telephone}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
