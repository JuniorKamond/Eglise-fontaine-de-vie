import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { config } from "@/config";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const EventsSection = () => (
  <section id="events" className="py-24 px-6">
    <div className="mx-auto max-w-7xl">
      <motion.div {...fadeIn} className="text-center mb-16">
        <p className="text-caps text-accent mb-4">Événements</p>
        <h2 className="text-display text-foreground mb-4">Ce qui se passe.</h2>
        <p className="text-subhead text-muted-foreground max-w-2xl mx-auto">
          Restez informés des événements et rendez-vous de l'Église Fontaine de Vie et du Mouvement Honored For Christ.
        </p>
      </motion.div>

      {/* Événements */}
      <div className="max-w-3xl mx-auto mb-12 space-y-4">
        {config.evenements.map((event, i) => (
          <motion.div
            key={event.titre}
            {...fadeIn}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-2xl bg-card p-6 shadow-elevated border border-accent/20"
          >
            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center justify-center shrink-0 w-20 h-20 rounded-xl bg-primary">
                <span className="text-3xl font-bold text-primary-foreground leading-none">{event.jour}</span>
                <span className="text-[11px] font-bold tracking-widest text-accent mt-1">{event.mois}</span>
              </div>
              <div className="flex-1">
                <span className="text-caps text-accent">{event.categorie}</span>
                <h3 className="font-bold text-foreground text-xl mt-1">{event.titre}</h3>
                <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {event.heure}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {event.lieu}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infos récurrentes */}
      <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
            <Calendar size={18} className="text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Culte dominical</p>
            <p className="text-sm text-muted-foreground mt-1">{config.horaires.culte}</p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
            <Clock size={18} className="text-accent" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Jours de réception</p>
            <p className="text-sm text-muted-foreground mt-1">{config.horaires.reception}</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
