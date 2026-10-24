"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { SermonWithSlug } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SermonCard } from "./SermonCard";

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Bibliothèque : recherche + filtres (prédicateur, catégorie) */
export function SermonLibrary({ sermons }: { sermons: SermonWithSlug[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  // Les filtres n'apparaissent que s'il y a au moins 2 valeurs différentes
  const filters = useMemo(() => {
    const cats = [...new Set(sermons.map((s) => s.categorie).filter(Boolean))] as string[];
    const preachers = [...new Set(sermons.map((s) => s.predicateur))];
    return [...(cats.length > 1 ? cats : []), ...(preachers.length > 1 ? preachers : [])];
  }, [sermons]);

  const results = sermons.filter((s) => {
    const q = normalize(query.trim());
    const matchQ = !q || normalize(`${s.titre} ${s.predicateur} ${s.categorie ?? ""} ${s.description ?? ""}`).includes(q);
    const matchF = !filter || s.categorie === filter || s.predicateur === filter;
    return matchQ && matchF;
  });

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-trait pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label htmlFor="recherche" className="sr-only">Rechercher une prédication</label>
          <Search size={18} strokeWidth={1.75} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brume" aria-hidden />
          <input
            id="recherche"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un titre, un thème…"
            className="h-14 w-full rounded-full border border-trait bg-white pl-12 pr-12 text-base text-encre outline-none transition-colors placeholder:text-brume/80 focus:border-nuit"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Effacer la recherche" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-brume hover:bg-calcaire hover:text-encre">
              <X size={16} />
            </button>
          )}
        </div>

        {filters.length > 0 && (
          <div role="group" aria-label="Filtrer" className="flex flex-wrap gap-2">
            {[null, ...filters].map((f) => (
              <button
                key={f ?? "tout"}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "h-10 rounded-full px-4 text-meta transition-colors",
                  filter === f ? "bg-nuit text-white" : "bg-calcaire text-encre hover:bg-trait",
                )}
              >
                {f ?? "Tout"}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-meta text-brume" aria-live="polite">
        {results.length} prédication{results.length > 1 ? "s" : ""}
      </p>

      {results.length > 0 ? (
        <ul className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <li key={s.slug}><SermonCard sermon={s} headingLevel="h3" /></li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border-t border-trait pt-10">
          <p className="font-serif text-h3 text-encre">Aucune prédication ne correspond à « {query} ».</p>
          <button type="button" onClick={() => { setQuery(""); setFilter(null); }} className="lien mt-6 text-encre">
            Voir toutes les prédications
          </button>
        </div>
      )}
    </div>
  );
}
