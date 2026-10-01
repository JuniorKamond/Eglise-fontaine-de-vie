import Link from "next/link";
import Image from "next/image";
import logoWhite from "@/assets/logo-white.png";
import { config, navigation } from "@/config";
import { mapsLink, socialLinks } from "@/lib/content";
import { socialIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-nuit-profond text-white/70">
      <div className="conteneur grid gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <Image src={logoWhite} alt={config.eglise.nom} width={104} height={104} className="h-[104px] w-[104px]" />
          <blockquote className="mt-8 max-w-sm font-serif text-[1.05rem] italic leading-relaxed text-white/75">
            {config.eglise.verset}
            <footer className="mt-3 font-sans text-meta not-italic text-or">{config.eglise.reference_verset}</footer>
          </blockquote>
        </div>

        <nav aria-label="Pied de page" className="lg:col-span-2 lg:col-start-6">
          <h2 className="font-sans text-meta font-medium text-white">Le site</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {[{ label: "Accueil", href: "/" }, ...navigation, { label: "Planifier votre visite", href: "/planifier-une-visite" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-meta font-medium text-white">Nous trouver</h2>
          <address className="mt-5 space-y-4 text-[0.95rem] not-italic leading-relaxed">
            <p>{config.contact.adresse}</p>
            <p><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-or">Voir l'itinéraire</a></p>
          </address>
          <dl className="mt-8 space-y-4 text-[0.95rem]">
            <div><dt className="text-white">Culte</dt><dd className="mt-1">{config.horaires.culte}</dd></div>
            <div><dt className="text-white">Réception</dt><dd className="mt-1">{config.horaires.reception}</dd></div>
          </dl>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-meta font-medium text-white">Contact</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li><a href={`tel:${config.contact.telephone_lien}`} className="transition-colors hover:text-white">{config.contact.telephone}</a></li>
            <li><a href={`mailto:${config.contact.email}`} className="break-all transition-colors hover:text-white">{config.contact.email}</a></li>
          </ul>
          {socialLinks.length > 0 ? (
            <ul className="mt-8 flex gap-4">
              {socialLinks.map(({ label, href }) => {
                const Icon = socialIcon[label];
                return (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white hover:text-encre">
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Placeholder label="liens des réseaux sociaux" className="mt-8" />
          )}
        </div>
      </div>

      <div className="conteneur flex flex-col gap-2 border-t border-white/10 py-7 text-meta text-white/45 sm:flex-row sm:justify-between">
        <p>© {year} {config.eglise.nom}. Tous droits réservés.</p>
        <p>{config.pasteur.nom}</p>
      </div>
    </footer>
  );
}
