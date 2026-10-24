"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { config } from "@/config";
import { submitContact, type ContactData } from "@/lib/submit";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { FormSuccess } from "./FormSuccess";

type Errors = Partial<Record<keyof ContactData | "form", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const objetRef = useRef<HTMLInputElement>(null);

  // Objet pré-rempli depuis un événement : /contact?objet=...
  useEffect(() => {
    const objet = new URLSearchParams(window.location.search).get("objet");
    if (objet && objetRef.current) objetRef.current.value = objet;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(["nom", "email", "objet", "message"].map((k) => [k, String(fd.get(k) ?? "").trim()])) as ContactData;
    const v: Errors = {};
    if (!data.nom) v.nom = "Indiquez votre nom.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) v.email = "Indiquez une adresse email valide.";
    if (!data.objet) v.objet = "Indiquez l'objet de votre message.";
    if (!data.message) v.message = "Écrivez votre message.";
    setErrors(v);
    if (Object.keys(v).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitContact(data);
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setErrors({ form: `L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à ${config.contact.email}.` });
      setStatus("idle");
    }
  }

  if (status === "sent")
    return (
      <FormSuccess title="Message envoyé !">
        <p>Nous vous répondrons bientôt.</p>
      </FormSuccess>
    );

  const sending = status === "sending";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Votre nom" name="nom" autoComplete="name" maxLength={100} error={errors.nom} disabled={sending} required />
        <Field label="Adresse e-mail" name="email" type="email" inputMode="email" autoComplete="email" maxLength={255} error={errors.email} disabled={sending} required />
      </div>
      <Field ref={objetRef} label="Objet" name="objet" maxLength={200} error={errors.objet} disabled={sending} required />
      <Field as="textarea" label="Votre message" name="message" rows={5} maxLength={2000} error={errors.message} disabled={sending} required />
      {errors.form && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-meta text-red-800">{errors.form}</p>}
      <Button type="submit" variant="nuit" className="w-full sm:w-auto" disabled={sending}
        icon={sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} strokeWidth={1.75} />}>
        {sending ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
