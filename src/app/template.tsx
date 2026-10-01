import { PageTransition } from "@/components/motion/PageTransition";

/** Transition entre les pages : rideau bleu + fondu */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition />
      <div className="animate-page-in">{children}</div>
    </>
  );
}
