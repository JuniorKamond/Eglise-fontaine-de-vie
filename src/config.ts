// ============================================================
//   FICHIER DE CONFIGURATION — ÉGLISE FONTAINE DE VIE
//   Tout le contenu du site se modifie ici.
//   Pas besoin de toucher aux composants.
//
//   Les champs laissés vides ("") ne s'affichent pas sur le site.
//   En local (npm run dev), un encadré pointillé signale les
//   informations encore à compléter.
// ============================================================

export type Sermon = {
  youtubeId: string;
  titre: string;
  predicateur: string;
  /** Format AAAA-MM-JJ — facultatif */
  date?: string;
  /** Thème / série — facultatif. Les filtres apparaissent dès qu'il y a 2 catégories. */
  categorie?: string;
  /** Résumé affiché sur la page de la prédication — facultatif */
  description?: string;
};

export type ChurchEvent = {
  jour: string;
  mois: string;
  /** Facultatif */
  annee?: string;
  titre: string;
  categorie: string;
  description: string;
  heure: string;
  lieu: string;
  /** Lien du bouton — par défaut : formulaire de contact pré-rempli */
  lien?: { label: string; href: string };
};

export const config = {
  site: {
    url: "https://eglise-fontaine-de-vie.vercel.app",
  },

  // ----------------------------------------------------------
  //  INFOS GÉNÉRALES DE L'ÉGLISE
  // ----------------------------------------------------------
  eglise: {
    nom: "Église Fontaine de Vie",
    nom_court: "Fontaine de Vie",
    slogan: "Un lieu pour vous",
    annee_fondation: 2025,
    verset:
      "« Mais celui qui boira de l'eau que je lui donnerai n'aura jamais soif, et l'eau que je lui donnerai deviendra en lui une source d'eau qui jaillira jusque dans la vie éternelle. »",
    reference_verset: "Jean 4:14",
    histoire:
      "L'Église Fontaine de Vie a été fondée en 2025 à Abidjan, Côte d'Ivoire. En un peu plus d'un an, Dieu a déjà fait de grandes choses au sein de cette communauté naissante et pleine de vie.",
    accroche_apropos: "Enracinés dans la foi, grandissons ensemble.",
    // À compléter : laissés vides, ils ne s'affichent pas en ligne
    vision: "",
    mission: "",
  },

  valeurs: [
    { titre: "L'amour d'abord", description: "Nous guidons avec compassion et accueillons chacun à bras ouverts." },
    { titre: "Communauté", description: "Nous croyons en la force des relations authentiques et du sentiment d'appartenance." },
    { titre: "Croissance", description: "Nous recherchons la profondeur spirituelle à travers l'enseignement, le culte et le service." },
  ],

  // ----------------------------------------------------------
  //  PASTEUR
  // ----------------------------------------------------------
  pasteur: {
    nom: "Pasteur Évangéliste Yann Dayere",
    titre: "Pasteur Évangéliste",
    presentation: "un homme de foi passionné par l'évangile et la nouvelle génération.",
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
    adresse: "Angré les Oscars, Rue L90, Abidjan, Côte d'Ivoire",
    adresse_courte: "Angré les Oscars, Rue L90",
    telephone: "07 97 98 64 08",
    telephone_lien: "+2250797986408",
    email: "fdv0501@gmail.com",
    // Coordonnées reprises de l'ancienne carte du site
    gps: { lat: 5.394457, lng: -3.995896 },
  },

  // ----------------------------------------------------------
  //  RÉSEAUX SOCIAUX — colle l'adresse complète, laisse "" si absent
  // ----------------------------------------------------------
  reseaux: {
    youtube: "",
    facebook: "",
    instagram: "",
  },

  // ----------------------------------------------------------
  //  MOUVEMENT HONORED FOR CHRIST
  // ----------------------------------------------------------
  mouvement: {
    nom: "Honored For Christ",
    annee_creation: 2021,
    description:
      "Un mouvement international né de la vision du Pasteur Évangéliste Yann Dayere, présent sur trois continents.",
    siege: "Abidjan, Côte d'Ivoire",
    verset:
      "« Que personne ne méprise ta jeunesse, mais sois un modèle pour les fidèles en foi, en conduite, en parole, en pureté. »",
    reference_verset: "1 Timothée 4:12",
    annexes: [
      { pays: "France", description: "Annexe du mouvement en France, portant le message de l'Évangile au cœur de l'Europe." },
      { pays: "Canada", description: "Une présence active au Canada pour rejoindre la diaspora africaine et au-delà." },
      { pays: "Guinée", description: "Enracinés en Guinée, servant fidèlement les communautés locales." },
    ],
  },

  // ----------------------------------------------------------
  //  PRÉDICATIONS YOUTUBE
  //  → Pour ajouter une vidéo : copie un bloc { youtubeId, titre, predicateur }
  //  → L'ID YouTube se trouve dans le lien : youtube.com/watch?v=XXXXXXX  ← c'est le XXXXXXX
  //  → La PREMIÈRE vidéo de la liste est la plus récente (mise en avant)
  //  → date, categorie et description sont facultatifs
  // ----------------------------------------------------------
  predications: [
    { youtubeId: "CjJ2yHbojhM", titre: "L'Esprit de Prière", predicateur: "Évangéliste Yann Dayere" },
    { youtubeId: "kn6xSaBYtRw", titre: "Les Fondements de la Sanctification et du Combat Spirituel", predicateur: "Évangéliste Yann Dayere" },
    { youtubeId: "fDQLy9BWzIM", titre: "Je me suis réservé une génération de prophètes", predicateur: "Évangéliste Yann Dayere" },
  ] as Sermon[],

  // ----------------------------------------------------------
  //  ÉVÉNEMENTS
  //  → Le PREMIER événement est mis en avant
  //  → Pour ajouter un événement : copie un bloc complet
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
  ] as ChurchEvent[],

  // ----------------------------------------------------------
  //  TEXTES DES SECTIONS
  // ----------------------------------------------------------
  textes: {
    predications: "Retrouvez les enseignements de l'Évangéliste Yann Dayere et laissez la Parole transformer votre vie.",
    evenements: "Restez informés des événements et rendez-vous de l'Église Fontaine de Vie et du Mouvement Honored For Christ.",
    visite: "Remplissez ce formulaire et nous vous accueillerons chaque dimanche de 14h00 – 17h00.",
  },
};

export const navigation = [
  { label: "À propos", href: "/a-propos" },
  { label: "Prédications", href: "/predications" },
  { label: "Événements", href: "/evenements" },
  { label: "Mouvement", href: "/mouvement" },
  { label: "Contact", href: "/contact" },
];

// ----------------------------------------------------------
//  ENVOI DES FORMULAIRES (EmailJS — clés publiques reprises de l'ancien site)
// ----------------------------------------------------------
export const emailjsConfig = {
  serviceId: "service_3n2ie3a",
  templateId: "template_5ulwhp4",
  publicKey: "Lc10mJpV9NRuvgPwq",
};
