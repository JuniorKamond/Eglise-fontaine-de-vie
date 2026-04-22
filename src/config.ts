// ============================================================
//   FICHIER DE CONFIGURATION — ÉGLISE FONTAINE DE VIE
//   Modifie ce fichier pour mettre à jour le site facilement.
//   Pas besoin de toucher à autre chose !
// ============================================================

export const config = {

  // ----------------------------------------------------------
  //  INFOS GÉNÉRALES DE L'ÉGLISE
  // ----------------------------------------------------------
  eglise: {
    nom: "Église Fontaine de Vie",
    slogan: "Un lieu pour vous",
    annee_fondation: 2025,
    verset: "« Mais celui qui boira de l'eau que je lui donnerai n'aura jamais soif, et l'eau que je lui donnerai deviendra en lui une source d'eau qui jaillira jusque dans la vie éternelle. »",
    reference_verset: "Jean 4:14",
  },

  // ----------------------------------------------------------
  //  PASTEUR
  // ----------------------------------------------------------
  pasteur: {
    nom: "Pasteur Évangéliste Yann Dayere",
    titre: "Pasteur Évangéliste",
  },

  // ----------------------------------------------------------
  //  HORAIRES
  // ----------------------------------------------------------
  horaires: {
    culte: "Dimanches de 14h00 à 17h00",
    culte_court: "14h00 – 17h00",
    reception: "Mardis et mercredis — sur rendez-vous avec le Pasteur",
  },

  // ----------------------------------------------------------
  //  ADRESSE & CONTACT
  // ----------------------------------------------------------
  contact: {
    adresse: "Angré les Oscars, Rule L90, Abidjan, Côte d'Ivoire",
    telephone: "01 23 45 67 89", // ← Mets ton vrai numéro ici
    email: "fdv0501@gmail.com", // ← Mets ton vrai email ici
  },

  // ----------------------------------------------------------
  //  MOUVEMENT HONORED FOR CHRIST
  // ----------------------------------------------------------
  mouvement: {
    nom: "Honored For Christ",
    annee_creation: 2021,
    description: "Un mouvement international né de la vision du Pasteur Évangéliste Yann Dayere, présent sur trois continents.",
    verset: "« Que personne ne méprise ta jeunesse, mais sois un modèle pour les fidèles en foi, en conduite, en parole, en pureté. »",
    reference_verset: "1 Timothée 4:12",
    annexes: [
      {
        drapeau: "🇫🇷",
        pays: "France",
        description: "Annexe du mouvement en France, portant le message de l'Évangile au cœur de l'Europe.",
      },
      {
        drapeau: "🇨🇦",
        pays: "Canada",
        description: "Une présence active au Canada pour rejoindre la diaspora africaine et au-delà.",
      },
      {
        drapeau: "🇬🇳",
        pays: "Guinée",
        description: "Enracinés en Guinée, servant fidèlement les communautés locales.",
      },
    ],
  },

  // ----------------------------------------------------------
  //  PRÉDICATIONS YOUTUBE
  //  → Pour ajouter une vidéo : copie un bloc { youtubeId, titre, predicateur }
  //  → L'ID YouTube se trouve dans le lien : youtube.com/watch?v=XXXXXXX  ← c'est le XXXXXXX
  //  → La PREMIÈRE vidéo de la liste sera affichée en grand
  // ----------------------------------------------------------
  predications: [
    {
      youtubeId: "CjJ2yHbojhM",
      titre: "L'Esprit de Prière",
      predicateur: "Évangéliste Yann Dayere",
    },
    {
      youtubeId: "kn6xSaBYtRw",
      titre: "Les Fondements de la Sanctification et du Combat Spirituel",
      predicateur: "Évangéliste Yann Dayere",
    },
    {
      youtubeId: "fDQLy9BWzIM",
      titre: "Je me suis réservé une génération de prophètes",
      predicateur: "Évangéliste Yann Dayere",
    },
  ],

  // ----------------------------------------------------------
  //  ÉVÉNEMENTS
  //  → Pour ajouter un événement : copie un bloc complet
  //  → Pour supprimer : efface le bloc entier
  // ----------------------------------------------------------
  evenements: [
    {
      jour: "30",
      mois: "MAI",
      titre: "Esprit de Prière — Acte 2",
      categorie: "Honored For Christ",
      description: "3ème programme de l'année du Mouvement Honored For Christ.",
      heure: "À confirmer",
      lieu: "Abidjan, Côte d'Ivoire",
    },
    // Exemple pour ajouter un autre événement :
    // {
    //   jour: "15",
    //   mois: "JUIN",
    //   titre: "Nom de l'événement",
    //   categorie: "Culte / Jeunesse / Évangélisation...",
    //   description: "Description courte de l'événement.",
    //   heure: "14h00",
    //   lieu: "Angré les Oscars, Abidjan",
    // },
  ],

};
