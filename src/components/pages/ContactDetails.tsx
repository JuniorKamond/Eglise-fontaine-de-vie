import { Clock, Mail, MapPin, Phone, CalendarDays } from "lucide-react";
import { config } from "@/config";
import { mapsLink } from "@/lib/content";

/** Coordonnées pratiques — liens directs (appel, email, itinéraire) */
export function ContactDetails() {
  const items = [
    { icon: Phone, label: "Téléphone", value: config.contact.telephone, href: `tel:${config.contact.telephone_lien}` },
    { icon: Mail, label: "Email", value: config.contact.email, href: `mailto:${config.contact.email}` },
    { icon: MapPin, label: "Adresse", value: config.contact.adresse, href: mapsLink, external: true },
    { icon: Clock, label: "Culte", value: config.horaires.culte },
    { icon: CalendarDays, label: "Réception", value: config.horaires.reception },
  ];
  return (
    <ul className="divide-y divide-trait border-y border-trait">
      {items.map(({ icon: Icon, label, value, href, external }) => {
        const content = (
          <>
            <Icon size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-or-fonce" aria-hidden />
            <span>
              <span className="block text-meta text-brume">{label}</span>
              <span className="mt-0.5 block break-words text-[1.05rem] text-encre">{value}</span>
            </span>
          </>
        );
        return (
          <li key={label}>
            {href ? (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex gap-4 py-5 transition-colors hover:bg-calcaire/60">
                {content}
              </a>
            ) : (
              <div className="flex gap-4 py-5">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
