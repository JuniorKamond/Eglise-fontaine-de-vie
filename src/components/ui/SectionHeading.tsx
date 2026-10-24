import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion/SplitText";

type Props = {
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
  tone?: "clair" | "sombre";
  className?: string;
  id?: string;
};

/** Titre de section : grand titre serif + texte d'introduction optionnel, aligné à gauche */
export function SectionHeading({ title, intro, as: Tag = "h2", tone = "clair", className, id }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {typeof title === "string" ? (
        <SplitText as={Tag} id={id} text={title} className={cn(Tag === "h1" ? "text-h1" : "text-h2", tone === "sombre" ? "text-white" : "text-encre")} />
      ) : (
        <Tag id={id} className={cn(Tag === "h1" ? "text-h1" : "text-h2", tone === "sombre" ? "text-white" : "text-encre")}>
          {title}
        </Tag>
      )}
      {intro && (
        <p className={cn("mt-5 max-w-texte text-lead", tone === "sombre" ? "text-white/70" : "text-brume")}>{intro}</p>
      )}
    </div>
  );
}
