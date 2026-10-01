import type { MetadataRoute } from "next";
import { config } from "@/config";
import { sermons } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.site.url;
  const pages = ["", "/a-propos", "/predications", "/evenements", "/mouvement", "/contact", "/planifier-une-visite"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...sermons.map((s) => ({ url: `${base}/predications/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
