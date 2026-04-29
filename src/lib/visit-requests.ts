import { supabase } from './supabase';

export interface VisitRequest {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  objet: string;
  created_at?: string;
  status?: string;
}

/**
 * Sauvegarde une demande de visite dans Supabase
 * et envoie un email au pasteur
 */
export async function submitVisitRequest(data: VisitRequest) {
  try {
    // 1. Sauvegarder dans Supabase
    const { data: savedRequest, error: dbError } = await supabase
      .from('visit_requests')
      .insert([
        {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          objet: data.objet,
          status: 'new',
        },
      ])
      .select();

    if (dbError) {
      console.error('Erreur Supabase:', dbError);
      throw new Error('Erreur lors de la sauvegarde de la demande');
    }

    // 2. Envoyer l'email via Resend (appel à notre API)
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'fdv0501@gmail.com',
        from_name: `${data.prenom} ${data.nom}`,
        from_email: data.email,
        message: data.objet,
      }),
    });

    if (!response.ok) {
      console.error('Erreur envoi email:', response.statusText);
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }

    return {
      success: true,
      data: savedRequest,
      message: 'Demande envoyée avec succès!',
    };
  } catch (error: any) {
    console.error('Erreur:', error);
    return {
      success: false,
      error: error.message || 'Une erreur est survenue',
    };
  }
}

/**
 * Récupère toutes les demandes de visite (pour le pasteur)
 */
export async function getVisitRequests() {
  try {
    const { data, error } = await supabase
      .from('visit_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}
