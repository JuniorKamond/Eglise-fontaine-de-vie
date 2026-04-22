import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { config } from "@/config";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const MinistriesSection = () => (
  <section id="ministries" className="py-24 px-6 gradient-section">
    <div className="mx-auto max-w-7xl">

      <motion.div {...fadeIn} className="text-center mb-16">
        <p className="text-caps text-accent mb-4">Mouvement</p>
        <h2 className="text-display text-foreground mb-4">{config.mouvement.nom}</h2>
        <p className="text-subhead text-muted-foreground max-w-2xl mx-auto">
          Fondé en {config.mouvement.annee_creation}, le Mouvement <strong>{config.mouvement.nom}</strong> est {config.mouvement.description}
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3">
        {config.mouvement.annexes.map(({ drapeau, pays, description }, i) => (
          <motion.div
            key={pays}
            {...fadeIn}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-card p-6 shadow-soft hover:shadow-elevated transition-all text-center"
          >
            <div className="text-5xl mb-4">{drapeau}</div>
            <h3 className="font-semibold text-foreground text-lg mb-2">{pays}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.35 }} className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 bg-accent/10 rounded-2xl px-6 py-4">
          <Globe size={20} className="text-accent" />
          <p className="text-sm text-foreground font-medium">
            Siège principal : Abidjan, Côte d'Ivoire 🇨🇮
          </p>
        </div>
      </motion.div>

      <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.45 }} className="mt-8 text-center">
        <p className="text-sm italic text-muted-foreground max-w-xl mx-auto">
          {config.mouvement.verset}
        </p>
        <p className="text-xs text-accent mt-2">{config.mouvement.reference_verset}</p>
      </motion.div>

    </div>
  </section>
);