import { config, type ChurchEvent, type Sermon } from "@/config";
import { slugify } from "./utils";

export type SermonWithSlug = Sermon & { slug: string; thumbnail: string };

export const sermons: SermonWithSlug[] = config.predications.map((s) => ({
  ...s,
  slug: slugify(s.titre),
  thumbnail: `https://i.ytimg.com/vi/${s.youtubeId}/hqdefault.jpg`,
}));

export const getSermon = (slug: string) => sermons.find((s) => s.slug === slug);

export const events: ChurchEvent[] = config.evenements;

export const eventAction = (e: ChurchEvent) =>
  e.lien ?? { label: "Me renseigner", href: `/contact?objet=${encodeURIComponent(e.titre)}` };

const { lat, lng } = config.contact.gps;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const mapsEmbed = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

export const socialLinks = (
  [
    { label: "YouTube", href: config.reseaux.youtube },
    { label: "Facebook", href: config.reseaux.facebook },
    { label: "Instagram", href: config.reseaux.instagram },
    { label: "TikTok", href: config.reseaux.tiktok },
  ] as const
).filter((l) => Boolean(l.href)) as { label: "YouTube" | "Facebook" | "Instagram" | "TikTok"; href: string }[];

export const recurring = [
  { titre: "Culte dominical", detail: config.horaires.culte },
  { titre: "Culte en semaine", detail: config.horaires.semaine },
  { titre: "Jours de réception", detail: config.horaires.reception },
];
