import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const TestimonialsSection = () => (
  <section className="py-16 px-6 gradient-section">
    <div className="mx-auto max-w-7xl">
      <motion.div {...fadeIn} className="text-center">
        <p className="text-caps text-accent mb-4">Témoignages</p>
        <h2 className="text-display text-foreground mb-4">Histoires de grâce.</h2>
        <p className="text-muted-foreground text-sm mt-2">Les témoignages arrivent bientôt. 🙏</p>
      </motion.div>
    </div>
  </section>
);
