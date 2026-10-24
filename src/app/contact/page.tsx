import type { Metadata } from "next";
import { config } from "@/config";
import { mapsEmbed, socialLinks } from "@/lib/content";
import { PageHero } from "@/components/pages/PageHero";
import { ContactDetails } from "@/components/pages/ContactDetails";
import { ContactForm } from "@/components/forms/ContactForm";
import { socialIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez l'${config.eglise.nom} : ${config.contact.telephone}, ${config.contact.email}. ${config.contact.adresse}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Nous serions ravis de vous entendre." />

      <section className="bg-white py-section">
        <div className="conteneur grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-h3 text-encre">Nous joindre</h2>
            <div className="mt-8"><ContactDetails /></div>
            {socialLinks.length > 0 ? (
              <ul className="mt-8 flex gap-3">
                {socialLinks.map(({ label, href }) => {
                  const Icon = socialIcon[label];
                  return (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-trait transition-colors hover:bg-nuit hover:text-white hover:ring-nuit">
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

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-h3 text-encre">Écrire un message</h2>
            <div className="mt-8"><ContactForm /></div>
          </div>
        </div>
      </section>

      <section aria-label="Carte" className="bg-calcaire">
        <iframe
          title={`Localisation de l'${config.eglise.nom}`}
          src={mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full border-0 grayscale-[0.6] lg:h-[520px]"
        />
      </section>
    </>
  );
}
