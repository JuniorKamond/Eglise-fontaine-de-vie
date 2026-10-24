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
  const db = await supabase();
  if (db) {
    const { error } = await db.from("inscriptions").insert([data]);
    if (error) throw error;
  }
  try {
    await sendEmail({ ...data, message: data.objet || "Non renseigné" });
    return { emailSent: true };
  } catch (e) {
    if (!db) throw e;
    console.error("EmailJS :", e);
    return { emailSent: false };
  }
}

/** Formulaire de contact — même fonctionnement que l'ancien site */
export async function submitContact(data: ContactData) {
  const db = await supabase();
  if (db) {
    const { error } = await db.from("messages").insert([data]);
    if (error) throw error;
  }
  await sendEmail(data);
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
