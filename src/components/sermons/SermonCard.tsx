import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { SermonWithSlug } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

type Props = { sermon: SermonWithSlug; variant?: "grille" | "ligne"; tone?: "clair" | "sombre"; headingLevel?: "h2" | "h3" };

/** Carte de prédication générée à partir des données de src/config.ts */
export function SermonCard({ sermon, variant = "grille", tone = "clair", headingLevel: H = "h3" }: Props) {
  const date = formatDate(sermon.date);
  const dark = tone === "sombre";

  return (
    <article className={cn("group relative", variant === "ligne" ? "grid grid-cols-[42%_1fr] items-start gap-5" : "flex flex-col")}>
      <div className="relative aspect-video overflow-hidden rounded-[3px] bg-nuit-profond">
        <Image
          src={sermon.thumbnail}
          alt=""
          fill
          sizes={variant === "ligne" ? "(min-width: 1024px) 14vw, 40vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-douce group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-nuit-profond/15 transition-colors duration-500 group-hover:bg-nuit-profond/0" />
        <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-encre transition-transform duration-500 ease-douce group-hover:scale-110" aria-hidden>
          <Play size={13} fill="currentColor" className="translate-x-[1px]" />
        </span>
      </div>

      <div className={variant === "grille" ? "mt-5" : ""}>
        {sermon.categorie && <p className={cn("mb-2 text-meta", dark ? "text-or" : "text-or-fonce")}>{sermon.categorie}</p>}
        <H className={cn("font-serif leading-snug", variant === "ligne" ? "text-[1.15rem]" : "text-[1.4rem]", dark ? "text-white" : "text-encre")}>
          <Link href={`/predications/${sermon.slug}`} className="after:absolute after:inset-0 after:content-['']">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-douce group-hover:bg-[length:100%_1px]">
              {sermon.titre}
            </span>
          </Link>
        </H>
        <p className={cn("mt-2 text-meta", dark ? "text-white/60" : "text-brume")}>
          {sermon.predicateur}
          {date && <><span className="sr-only">, </span><time dateTime={sermon.date} className="block">{date}</time></>}
        </p>
      </div>
    </article>
  );
}
