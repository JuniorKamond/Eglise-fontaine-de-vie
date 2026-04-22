import { motion } from "framer-motion";
import { Heart, Users, BookOpen } from "lucide-react";
import aboutImage from "@/assets/about-pastor.jpg";
import { config } from "@/config";

const values = [
  { icon: Heart, title: "L'amour d'abord", description: "Nous guidons avec compassion et accueillons chacun à bras ouverts." },
  { icon: Users, title: "Communauté", description: "Nous croyons en la force des relations authentiques et du sentiment d'appartenance." },
  { icon: BookOpen, title: "Croissance", description: "Nous recherchons la profondeur spirituelle à travers l'enseignement, le culte et le service." },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const AboutSection = () => (
  <section id="about" className="py-24 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <motion.div {...fadeIn}>
          <p className="text-caps text-accent mb-4">À propos</p>
          <h2 className="text-display text-foreground mb-6">
            Enracinés dans la foi,
            <br />grandissons ensemble.
          </h2>
          <p className="text-body text-muted-foreground mb-4 max-w-lg">
            L'Église Fontaine de Vie a été fondée en {config.eglise.annee_fondation} à Abidjan, Côte d'Ivoire.
            En un peu plus d'un an, Dieu a déjà fait de grandes choses au sein de cette communauté naissante et pleine de vie.
          </p>
          <p className="text-body text-muted-foreground mb-8 max-w-lg">
            Notre église est dirigée par le <strong>{config.pasteur.nom}</strong>,
            un homme de foi passionné par l'évangile et la nouvelle génération.
          </p>

          <div className="space-y-6">
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} {...fadeIn} className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="relative overflow-hidden rounded-2xl shadow-elevated">
            <img
              src={aboutImage}
              alt={`${config.pasteur.nom} en prédication`}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/80 to-transparent">
              <p className="text-caps text-accent">Horaires du culte</p>
              <p className="text-primary-foreground font-semibold text-lg mt-1">
                {config.horaires.culte}
              </p>
              <p className="text-primary-foreground/70 text-sm">
                {config.contact.adresse}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
