import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { config } from "@/config";
import heroImage from "@/assets/hero-assembly.jpg";

export const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-caps text-accent mb-6"
        >
          {`Rejoignez-nous chaque dimanche ${config.horaires.culte_court}`}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display text-primary-foreground mb-6"
        >
          Église Fontaine de Vie
        </motion.h1>

        <motion.blockquote
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-subhead text-primary-foreground/80 mb-2 max-w-2xl mx-auto italic"
        >
          {config.eglise.verset}
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm text-accent mb-10"
        >
          — {config.eglise.reference_verset}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="gold" size="xl" onClick={() => navigate("/visit-planner")}>
            Planifier votre visite <ArrowRight size={18} />
          </Button>
          <Button variant="heroOutline" size="xl" onClick={() => scrollTo("sermons")}>
            <Play size={18} /> Dernière prédication
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
