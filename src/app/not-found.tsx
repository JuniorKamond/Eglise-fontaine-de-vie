import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end bg-nuit-profond pb-20 pt-40 text-white">
      <div className="conteneur">
        <p className="text-meta text-or">Erreur 404</p>
        <h1 className="mt-4 max-w-3xl text-h1">Cette page n'existe pas ou a été déplacée.</h1>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Retour à l'accueil</Button>
          <Button href="/predications" variant="contour">Voir les prédications</Button>
        </div>
      </div>
    </section>
  );
}
