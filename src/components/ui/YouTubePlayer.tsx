"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { youtubeId: string; title: string; thumbnail: string; priority?: boolean; className?: string; sizes?: string };

/** Lecteur léger : la vignette s'affiche, l'iframe YouTube ne se charge qu'au clic (meilleures performances). */
export function YouTubePlayer({ youtubeId, title, thumbnail, priority, className, sizes = "(min-width: 1024px) 60vw, 100vw" }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-[3px] bg-nuit-profond", className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          data-cursor="Lire"
          className="group absolute inset-0 h-full w-full text-left"
          aria-label={`Regarder la prédication : ${title}`}
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-douce group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-nuit-profond/70 via-nuit-profond/10 to-transparent" />
          <span className="absolute bottom-5 left-5 flex items-center gap-3 text-white sm:bottom-7 sm:left-7">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-encre transition-transform duration-500 ease-douce group-hover:scale-110 sm:h-16 sm:w-16">
              <Play size={20} fill="currentColor" className="translate-x-[1px]" aria-hidden />
            </span>
            <span className="text-[0.95rem] font-medium">Regarder la prédication</span>
          </span>
        </button>
      )}
    </div>
  );
}
