import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { config } from "@/config";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const contactInfo = [
  { icon: MapPin, label: config.contact.adresse },
  { icon: Phone, label: config.contact.telephone },
  { icon: Mail, label: config.contact.email },
  { icon: Clock, label: config.horaires.culte_court },
];

export const ContactSection = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message envoyé ! Nous vous répondrons bientôt.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeIn} className="text-center mb-16">
          <p className="text-caps text-accent mb-4">Contact</p>
          <h2 className="text-display text-foreground mb-4">Nous serions ravis de vous entendre.</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="space-y-6 mb-8">
              {contactInfo.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <p className="text-foreground text-sm">{label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden shadow-soft h-48">
              <iframe
                title="Localisation de l'Église Fontaine de Vie"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15888.0!2d-3.9833!3d5.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb8b3c18ac53%3A0x3e64f14c3b73eac4!2sAngr%C3%A9%2C%20Abidjan%2C%20C%C3%B4te%20d%27Ivoire!5e0!3m2!1sfr!2sci!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Votre nom"
                  required
                  maxLength={100}
                  className="rounded-xl bg-muted px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50"
                />
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  required
                  maxLength={255}
                  className="rounded-xl bg-muted px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <input
                type="text"
                placeholder="Objet"
                required
                maxLength={200}
                className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50"
              />
              <textarea
                placeholder="Votre message"
                required
                maxLength={2000}
                rows={5}
                className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-accent/50"
              />
              <Button variant="hero" size="lg" type="submit" disabled={sending} className="w-full">
                <Send size={16} /> {sending ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
