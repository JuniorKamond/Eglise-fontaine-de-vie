import { motion } from "framer-motion";
import { User } from "lucide-react";
import { config } from "@/config";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const SermonsSection = () => (
  <section id="sermons" className="py-24 px-6 gradient-section">
    <div className="mx-auto max-w-7xl">
      <motion.div {...fadeIn} className="text-center mb-16">
        <p className="text-caps text-accent mb-4">Prédications</p>
        <h2 className="text-display text-foreground mb-4">Nourrissez votre esprit.</h2>
        <p className="text-subhead text-muted-foreground max-w-2xl mx-auto">
          Retrouvez les enseignements de l'Évangéliste Yann Dayere et laissez la Parole transformer votre vie.
        </p>
      </motion.div>

      {/* Vidéo mise en avant */}
      <motion.div {...fadeIn} className="mb-12 max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-elevated">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${config.predications[0].youtubeId}`}
              title={config.predications[0].titre}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
          </div>
          <div className="bg-card px-5 py-4">
            <p className="text-caps text-accent mb-1">Dernière prédication</p>
            <h3 className="font-bold text-foreground text-lg">{config.predications[0].titre}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <User size={13} /> {config.predications[0].predicateur}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grille des autres vidéos */}
      <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
        {config.predications.slice(1).map((sermon, i) => (
          <motion.div
            key={sermon.youtubeId}
            {...fadeIn}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden shadow-soft bg-card"
          >
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                title={sermon.titre}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 0 }}
              />
            </div>
            <div className="px-4 py-3">
              <h3 className="font-semibold text-foreground text-sm leading-snug">{sermon.titre}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <User size={11} /> {sermon.predicateur}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
