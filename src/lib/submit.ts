"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { emailjsConfig } from "@/config";

// Les bibliothèques ne sont chargées qu'au moment de l'envoi (pages plus légères)
let client: SupabaseClient | null = null;
const supabase = async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) client = (await import("@supabase/supabase-js")).createClient(url, key);
  return client;
};

const sendEmail = async (params: Record<string, string>) => {
  const emailjs = (await import("@emailjs/browser")).default;
  return emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, params, emailjsConfig.publicKey);
};

export type VisitData = { nom: string; prenom: string; email: string; telephone: string; objet: string };
export type ContactData = { nom: string; email: string; objet: string; message: string };
export type PrayerData = {
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  sujet: string;
  confidentialite: "pasteur" | "intercession";
  message: string;
  anonyme?: boolean;
};

/** Planifier une visite — même fonctionnement que l'ancien formulaire /inscription */
export async function submitVisit(data: VisitData) {
  let dbSuccess = false;
  let emailSuccess = false;
  let lastError: unknown = null;

  // 1. Sauvegarde en base de données Supabase
  try {
    const db = await supabase();
    if (db) {
      const { error } = await db.from("inscriptions").insert([data]);
      if (error) {
        console.warn("Supabase (inscriptions) :", error.message || error);
      } else {
        dbSuccess = true;
      }
    }
  } catch (err) {
    console.warn("Erreur Supabase visite :", err);
  }

  // 2. Envoi de l'e-mail avec EmailJS
  try {
    await sendEmail({
      ...data,
      message: data.objet || "Demande de visite planifiée",
      to_email: "fdv0501@gmail.com",
    });
    emailSuccess = true;
  } catch (e) {
    console.error("Erreur EmailJS visite :", e);
    lastError = e;
  }

  // Si au moins l'un des deux a réussi, on considère la visite prise en compte
  if (emailSuccess || dbSuccess) {
    return { emailSent: emailSuccess };
  }

  // Si les deux ont échoué, on remonte l'erreur
  throw lastError || new Error("Échec de l'enregistrement et de l'envoi");
}

/** Formulaire de contact — même fonctionnement que l'ancien site */
export async function submitContact(data: ContactData) {
  let dbSuccess = false;
  let emailSuccess = false;
  let lastError: unknown = null;

  try {
    const db = await supabase();
    if (db) {
      const { error } = await db.from("messages").insert([data]);
      if (error) console.warn("Supabase (messages) :", error.message || error);
      else dbSuccess = true;
    }
  } catch (err) {
    console.warn("Erreur Supabase contact :", err);
  }

  try {
    await sendEmail({
      ...data,
      to_email: "fdv0501@gmail.com",
    });
    emailSuccess = true;
  } catch (e) {
    console.error("Erreur EmailJS contact :", e);
    lastError = e;
  }

  if (!emailSuccess && !dbSuccess) {
    throw lastError || new Error("Échec de l'envoi du message");
  }
}

/** Demande de prière — transmis au pasteur et à l'intercession */
export async function submitPrayer(data: PrayerData) {
  const db = await supabase();
  const demandeur = data.anonyme
    ? "Anonyme"
    : [data.prenom, data.nom].filter(Boolean).join(" ") || "Anonyme";

  if (db) {
    try {
      const { error } = await db.from("prieres").insert([
        {
          nom: demandeur,
          telephone: data.telephone || null,
          email: data.email || null,
          sujet: data.sujet,
          confidentialite: data.confidentialite,
          message: data.message,
        },
      ]);
      if (error) {
        await db.from("messages").insert([
          {
            nom: demandeur,
            email: data.email || "Non renseigne",
            objet: `[Prière - ${data.confidentialite === "pasteur" ? "Pasteur" : "Intercession"}] ${data.sujet}`,
            message: `Confidentialité : ${data.confidentialite === "pasteur" ? "Strictement confidentiel Pasteur" : "Équipe d'intercession"}\nTéléphone : ${data.telephone || "Non renseigné"}\n\n${data.message}`,
          },
        ]);
      }
    } catch (err) {
      console.warn("Supabase prière:", err);
    }
  }

  try {
    await sendEmail({
      nom: demandeur,
      prenom: "",
      email: data.email || "fdv0501@gmail.com",
      telephone: data.telephone || "Non renseigné",
      objet: `[Demande de prière] ${data.sujet} (${data.confidentialite === "pasteur" ? "Confidentiel Pasteur" : "Intercession"})`,
      message: `Demandeur : ${demandeur}\nTéléphone : ${data.telephone || "Non renseigné"}\nNiveau de confidentialité : ${data.confidentialite === "pasteur" ? "🔒 Confidentiel Pasteur Yann Dayere uniquement" : "👥 Partageable avec l'équipe d'intercession"}\nThème : ${data.sujet}\n\nRequête :\n${data.message}`,
    });
    return { emailSent: true };
  } catch (e) {
    console.error("EmailJS prière:", e);
    if (!db) throw e;
    return { emailSent: false };
  }
}
