"use client";

import { useState } from "react";
import { HeartHandshake, Loader2, Lock, Users } from "lucide-react";
import { config } from "@/config";
import { submitPrayer, type PrayerData } from "@/lib/submit";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Field } from "./Field";
import { FormSuccess } from "./FormSuccess";

const SUJETS = [
  "Santé & Guérison",
  "Famille & Foyer",
  "Travail, Études & Finances",
  "Délivrance & Combat spirituel",
  "Vie spirituelle & Consécration",
  "Action de grâce & Témoignage",
  "Autre besoin",
];

type Errors = Partial<Record<keyof PrayerData | "form", string>>;

export function PrayerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [anonyme, setAnonyme] = useState(false);
  const [confidentialite, setConfidentialite] = useState<"pasteur" | "intercession">("intercession");
  const [sujet, setSujet] = useState(SUJETS[0]);
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nom = String(fd.get("nom") ?? "").trim();
    const prenom = String(fd.get("prenom") ?? "").trim();
    const telephone = String(fd.get("telephone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const v: Errors = {};
    if (!anonyme && !nom && !prenom) {
      v.nom = "Veuillez indiquer au moins votre nom ou votre prénom (ou cochez l'option anonyme).";
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      v.email = "Veuillez indiquer une adresse email valide.";
    }
    if (telephone && telephone.replace(/\D/g, "").length < 8) {
      v.telephone = "Veuillez indiquer un numéro de téléphone valide (au moins 8 chiffres).";
    }
    if (!message) {
      v.message = "Veuillez décrire votre sujet ou votre intention de prière.";
    }

    setErrors(v);
    if (Object.keys(v).length > 0) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }

    setStatus("sending");
    try {
      await submitPrayer({
        nom,
        prenom,
        telephone,
        email,
        sujet,
        confidentialite,
        message,
        anonyme,
      });
      setStatus("sent");
    } catch (err: unknown) {
      console.error("Erreur formulaire prière :", err);
      const e = err as { text?: string; message?: string };
      const detail = e?.text || e?.message;
      setErrors({
        form: detail
          ? `L'envoi n'a pas pu aboutir : ${detail}. Contactez directement l'église au ${config.contact.telephone}.`
          : `L'envoi n'a pas pu aboutir. Veuillez réessayer ou contacter directement l'église au ${config.contact.telephone}.`,
      });
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <FormSuccess
        title="Votre demande a été confiée"
        action={
          <div className="flex flex-wrap gap-4">
            <Button href="/" variant="contourNuit">
              Retour à l'accueil
            </Button>
            <Button
              type="button"
              variant="nuit"
              onClick={() => {
                setStatus("idle");
                setErrors({});
              }}
            >
              Déposer un autre sujet
            </Button>
          </div>
        }
      >
        <p>
          Soyez rassuré(e) : votre sujet de prière est entre les mains du Seigneur.{" "}
          {confidentialite === "pasteur"
            ? "Il sera transmis directement et confidentiellement au Pasteur Évangéliste Yann Dayere."
            : "Il sera porté avec ferveur par l'équipe d'intercession et lors de nos temps de prière."}
        </p>
        <p className="mt-3 text-meta italic text-or-fonce">
          « Tout ce que vous demanderez avec foi par la prière, vous le recevrez. » — Matthieu 21:22
        </p>
      </FormSuccess>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Option Anonymat */}
      <div className="rounded-xl border border-trait bg-calcaire/50 p-4">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-encre">
          <input
            type="checkbox"
            checked={anonyme}
            onChange={(e) => setAnonyme(e.target.checked)}
            disabled={sending}
            className="mt-1 h-4 w-4 rounded border-trait text-nuit focus:ring-or"
          />
          <div>
            <span className="font-medium">Demande anonyme</span>
            <p className="text-meta text-brume">
              Cochez cette case si vous préférez ne pas transmettre vos coordonnées nominatives.
            </p>
          </div>
        </label>
      </div>

      {/* Coordonnées (masquées si anonyme) */}
      {!anonyme && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Prénom"
            name="prenom"
            autoComplete="given-name"
            placeholder="Ex : Esther"
            disabled={sending}
          />
          <Field
            label="Nom"
            name="nom"
            autoComplete="family-name"
            placeholder="Ex : Yao"
            error={errors.nom}
            disabled={sending}
          />
        </div>
      )}

      {/* Contact optionnel pour suivi */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Téléphone / WhatsApp"
          name="telephone"
          type="tel"
          inputMode="tel"
          optional
          placeholder="+225 07 00 00 00 00"
          hint="Optionnel, si vous souhaitez un appel ou mot d'encouragement"
          error={errors.telephone}
          disabled={sending}
        />
        <Field
          label="Adresse e-mail"
          name="email"
          type="email"
          inputMode="email"
          optional
          placeholder="votre@email.com"
          error={errors.email}
          disabled={sending}
        />
      </div>

      {/* Thème / Sujet de prière */}
      <div>
        <label htmlFor="champ-sujet" className="mb-2 block text-[0.95rem] font-medium text-encre">
          Domaine de prière
        </label>
        <select
          id="champ-sujet"
          name="sujet"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
          disabled={sending}
          className="block h-14 w-full rounded-lg border border-trait bg-white px-4 text-base text-encre outline-none transition-[border-color,box-shadow] duration-300 focus:border-nuit focus:shadow-[0_0_0_3px_rgb(var(--c-or)/0.25)]"
        >
          {SUJETS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Niveau de confidentialité */}
      <div>
        <span className="mb-2 block text-[0.95rem] font-medium text-encre">
          Niveau de confidentialité
        </span>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setConfidentialite("intercession")}
            disabled={sending}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
              confidentialite === "intercession"
                ? "border-nuit bg-calcaire text-encre shadow-sm ring-1 ring-nuit"
                : "border-trait bg-white text-brume hover:border-encre/40 hover:text-encre"
            )}
          >
            <Users size={20} className={cn("mt-0.5 shrink-0", confidentialite === "intercession" ? "text-nuit" : "text-brume")} />
            <div>
              <span className="block font-medium text-[0.95rem] text-encre">
                Équipe d'intercession
              </span>
              <span className="mt-0.5 block text-meta text-brume">
                Porté lors de nos temps de prière et cultes.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setConfidentialite("pasteur")}
            disabled={sending}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
              confidentialite === "pasteur"
                ? "border-nuit bg-calcaire text-encre shadow-sm ring-1 ring-nuit"
                : "border-trait bg-white text-brume hover:border-encre/40 hover:text-encre"
            )}
          >
            <Lock size={20} className={cn("mt-0.5 shrink-0", confidentialite === "pasteur" ? "text-or-fonce" : "text-brume")} />
            <div>
              <span className="block font-medium text-[0.95rem] text-encre">
                Pasteur uniquement
              </span>
              <span className="mt-0.5 block text-meta text-brume">
                Strictement confidentiel avec le Pasteur Yann Dayere.
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Requête de prière détaillée */}
      <Field
        as="textarea"
        label="Votre requête ou sujet d'intercession"
        name="message"
        rows={5}
        placeholder="Décrivez votre situation, vos fardeaux ou votre sujet d'action de grâce. Rien n'est impossible à Dieu..."
        error={errors.message}
        disabled={sending}
        required
      />

      {errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-meta text-red-800">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        variant="nuit"
        className="w-full sm:w-auto"
        disabled={sending}
        icon={
          sending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <HeartHandshake size={18} strokeWidth={1.75} />
          )
        }
      >
        {sending ? "Transmission en cours…" : "Confier ma demande de prière"}
      </Button>
    </form>
  );
}
