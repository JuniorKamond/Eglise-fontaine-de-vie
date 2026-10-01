"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { config } from "@/config";
import { submitVisit, type VisitData } from "@/lib/submit";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { FormSuccess } from "./FormSuccess";

type Errors = Partial<Record<keyof VisitData | "form", string>>;

const validate = (d: VisitData): Errors => {
  const e: Errors = {};
  if (!d.prenom.trim()) e.prenom = "Indiquez votre prénom.";
  if (!d.nom.trim()) e.nom = "Indiquez votre nom.";
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Indiquez une adresse email valide, par exemple jean@exemple.com.";
  if (d.telephone.replace(/\D/g, "").length < 8) e.telephone = "Indiquez un numéro de téléphone (8 chiffres minimum).";
  return e;
};

/** Planifier une visite — mêmes champs que l'ancien formulaire (nom, prénom, email, téléphone, objet) */
export function VisitForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(["nom", "prenom", "email", "telephone", "objet"].map((k) => [k, String(fd.get(k) ?? "").trim()])) as VisitData;
    const v = validate(data);
    setErrors(v);
    if (Object.keys(v).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitVisit(data);
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setErrors({ form: `L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez, ou appelez-nous au ${config.contact.telephone}.` });
      setStatus("idle");
    }
  }

  if (status === "sent")
    return (
      <FormSuccess title="Inscription confirmée !" action={<Button href="/" variant="contourNuit">Retour au site</Button>}>
        <p>Bienvenue ! Nous avons bien reçu votre demande de visite. L'équipe de l'Église Fontaine de Vie vous contactera bientôt.</p>
      </FormSuccess>
    );

  const sending = status === "sending";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Prénom" name="prenom" autoComplete="given-name" placeholder="Jean" error={errors.prenom} disabled={sending} required />
        <Field label="Nom" name="nom" autoComplete="family-name" placeholder="Kouassi" error={errors.nom} disabled={sending} required />
      </div>
      <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="jean@exemple.com" error={errors.email} disabled={sending} required />
      <Field label="Téléphone" name="telephone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+225 07 00 00 00 00" error={errors.telephone} disabled={sending} required />
      <Field as="textarea" label="Objet de la visite" name="objet" optional placeholder="Ex : Je souhaite en savoir plus sur l'église…" rows={3} disabled={sending} />

      {errors.form && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-meta text-red-800">{errors.form}</p>}

      <Button type="submit" variant="nuit" className="w-full sm:w-auto" disabled={sending}
        icon={sending ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} strokeWidth={1.75} />}>
        {sending ? "Envoi en cours…" : "Confirmer ma visite"}
      </Button>
    </form>
  );
}
