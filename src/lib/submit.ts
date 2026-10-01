"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { emailjsConfig } from "@/config";

// Les bibliothèques ne sont chargées qu'au moment de l'envoi (pages plus légères)
let client: SupabaseClient | null = null;
const supabase = async () => {
    const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
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

/** Planifier une visite — même fonctionnement que l'ancien formulaire /inscription */
export async function submitVisit(data: VisitData) {
  const db = await supabase();
  if (db) {
    const { error } = await db.from("inscriptions").insert([data]);
    if (error) throw error;
  }
  try {
    await sendEmail({ ...data, message: data.objet || "Non renseigné" });
  } catch (e) {
    // L'inscription est enregistrée même si l'email échoue
    if (!db) throw e;
    console.error("EmailJS :", e);
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
