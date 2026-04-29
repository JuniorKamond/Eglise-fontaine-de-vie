import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { config } from "@/config";
import { User, Mail, Phone, CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const Inscription = () => {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", telephone: "", objet: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.nom || !form.prenom || !form.email || !form.telephone) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    const { error: supabaseError } = await supabase
      .from("inscriptions")
      .insert([{ nom: form.nom, prenom: form.prenom, email: form.email, telephone: form.telephone, objet: form.objet }]);

    if (supabaseError) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } else {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "fdv0501@gmail.com",
            subject: "Nouvelle inscription — Église Fontaine de Vie",
            html: `
              <h2>Nouvelle demande de visite</h2>
              <p><strong>Nom :</strong> ${form.nom}</p>
              <p><strong>Prénom :</strong> ${form.prenom}</p>
              <p><strong>Email :</strong> ${form.email}</p>
              <p><strong>Téléphone :</strong> ${form.telephone}</p>
              <p><strong>Objet :</strong> ${form.objet || "Non renseigné"}</p>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Erreur email:", emailError);
      }
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
      <motion.div {...fadeIn} className="w-full max-w-md">
        {success ? (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle size={40} className="text-accent" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Inscription confirmée !</h2>
            <p className="text-muted-foreground mb-8">
              Bienvenue ! Nous avons bien reçu votre demande de visite.
              L'équipe de l'Église Fontaine de Vie vous contactera bientôt.
            </p>
            <Button variant="hero" onClick={() => window.location.href = "/"}>
              Retour au site
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <p className="text-caps text-accent mb-3">Planifier votre visite</p>
              <h1 className="text-3xl font-bold text-foreground mb-3">Rejoignez-nous !</h1>
              <p className="text-muted-foreground">
                Remplissez ce formulaire et nous vous accueillerons chaque dimanche de {config.horaires.culte_court}.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-elevated space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nom</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Dupont"
                      className="w-full rounded-xl bg-muted pl-9 pr-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Prénom</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Jean"
                      className="w-full rounded-xl bg-muted pl-9 pr-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jean@exemple.com"
                    className="w-full rounded-xl bg-muted pl-9 pr-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Téléphone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+225 07 00 00 00 00"
                    className="w-full rounded-xl bg-muted pl-9 pr-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Objet de la visite</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <textarea name="objet" value={form.objet} onChange={handleChange}
                    placeholder="Ex: Je souhaite en savoir plus sur l'église..." rows={3}
                    className="w-full rounded-xl bg-muted pl-9 pr-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50 resize-none" />
                </div>
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button variant="gold" size="xl" className="w-full" onClick={handleSubmit} disabled={loading}>
                {loading ? "Envoi en cours..." : "Confirmer ma visite"}
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Inscription;