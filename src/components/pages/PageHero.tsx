import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion/SplitText";

type Props = {
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: StaticImageData;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
};

/** En-tête des pages intérieures : fond bleu nuit, avec ou sans photo */
export function PageHero({ title, intro, image, imageAlt = "", children, className }: Props) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-nuit-profond text-white", image ? "pb-16 pt-44 sm:pb-24 sm:pt-56 lg:pt-72" : "pb-14 pt-36 sm:pb-20 sm:pt-44", className)}>
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt={imageAlt} fill priority placeholder="blur" sizes="100vw" className="object-cover object-[50%_35%] opacity-60 grayscale" />
          <div className="absolute inset-0 bg-nuit mix-blend-multiply opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-nuit-profond via-nuit-profond/50 to-nuit-profond/30" />
        </div>
      )}
      <div className="conteneur">
        {typeof title === "string" ? (
          <SplitText as="h1" text={title} className="max-w-4xl text-h1" delay={0.1} />
        ) : (
          <h1 className="max-w-4xl text-h1">{title}</h1>
        )}
        {intro && <p className="mt-6 max-w-texte text-lead text-white/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
