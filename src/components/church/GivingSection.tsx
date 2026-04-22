import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const amounts = [25, 50, 100, 250, 500];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const GivingSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [recurring, setRecurring] = useState(false);

  return (
    <section id="give" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div {...fadeIn}>
            <p className="text-caps text-accent mb-4">Donner</p>
            <h2 className="text-display text-foreground mb-6">
              La générosité
              <br />change tout.
            </h2>
            <p className="text-body text-muted-foreground max-w-lg">
              Vos dons fidèles alimentent notre mission de servir la communauté, 
              de soutenir ceux qui en ont besoin et de partager l'espérance avec le monde. Chaque don compte.
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="rounded-2xl bg-card p-8 shadow-elevated max-w-md mx-auto">
              {/* Basculer */}
              <div className="flex rounded-xl bg-muted p-1 mb-6">
                <button
                  onClick={() => setRecurring(false)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                    !recurring ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Ponctuel
                </button>
                <button
                  onClick={() => setRecurring(true)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                    recurring ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Mensuel
                </button>
              </div>

              {/* Montants */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`rounded-xl py-3 text-sm font-semibold transition-all ${
                      selectedAmount === amount
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {amount} €
                  </button>
                ))}
                <button
                  onClick={() => setSelectedAmount(null)}
                  className={`rounded-xl py-3 text-sm font-semibold transition-all ${
                    selectedAmount === null
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Autre
                </button>
              </div>

              {selectedAmount === null && (
                <div className="mb-6">
                  <div className="flex items-center rounded-xl bg-muted px-4 py-3">
                    <input
                      type="number"
                      placeholder="Saisir un montant"
                      className="bg-transparent w-full text-lg font-semibold text-foreground outline-none placeholder:text-muted-foreground"
                      min={1}
                    />
                    <span className="text-muted-foreground text-lg font-semibold ml-1">€</span>
                  </div>
                </div>
              )}

              <Button variant="gold" size="xl" className="w-full">
                <Heart size={18} /> Donner {selectedAmount ? `${selectedAmount} €` : ""} {recurring ? "par mois" : ""}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Paiements sécurisés via Stripe. Reçu fiscal fourni.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
