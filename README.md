# Église Fontaine de Vie — site web

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # vérification avant mise en ligne
```

## Modifier le contenu

**Tout se trouve dans `src/config.ts`** : horaires, adresse, prédications, événements, réseaux sociaux, valeurs, mouvement.

- Nouvelle prédication → ajouter un bloc en **haut** de `predications` (la première est la plus récente). Sa page `/predications/...` se crée automatiquement.
- Nouvel événement → ajouter un bloc dans `evenements` (le premier est mis en avant).
- Un champ laissé vide (`""`) ne s'affiche pas en ligne. En local, un encadré pointillé le signale.

Couleurs : variables en haut de `src/app/globals.css`.

## Variables d'environnement (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Elles remplacent les anciennes `VITE_SUPABASE_*`. Tables utilisées (inchangées) : `inscriptions` (visite) et `messages` (contact).

### EmailJS (formulaires de visite et de contact)

Les formulaires envoient les demandes avec EmailJS. Les identifiants du service, du modèle et la clé publique sont dans `emailjsConfig` (`src/config.ts`). Dans le tableau de bord EmailJS, vérifiez que le service est actif, que le modèle utilise les variables transmises par le site (`nom`, `prenom`, `email`, `telephone`, `objet`, `message`) et que son champ **To email** contient l'adresse de réception souhaitée. Une clé publique seule ne détermine pas le destinataire.

Après un test du formulaire de visite, vérifiez également l'historique EmailJS et le dossier spam de l'adresse destinataire. Si Supabase est configuré et qu'EmailJS échoue, la demande est conservée dans `inscriptions` et le formulaire affiche un avertissement au lieu de masquer l'échec d'envoi.

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil |
| `/a-propos` | Histoire, valeurs, pasteur, mouvement |
| `/predications` + `/predications/[slug]` | Bibliothèque (recherche, filtres) et page par prédication |
| `/evenements` | Événement principal, autres événements, rendez-vous réguliers |
| `/mouvement` | Honored For Christ |
| `/contact` | Coordonnées, formulaire, carte |
| `/planifier-une-visite` | Formulaire de visite (`/inscription` et `/visit-planner` y redirigent) |

## Structure

```
src/
  app/            pages, layout, SEO (sitemap, robots, icônes)
  components/
    layout/       Header, MobileMenu, Footer, Logo
    home/         Hero, Intro, AboutPreview, SermonSection, EventsSection, MinistrySection, CTASection
    sermons/      SermonCard, SermonLibrary
    events/       FeaturedEvent, EventCard, RecurringList
    forms/        Field, VisitForm, ContactForm, FormSuccess
    pages/        PageHero, ValuesList, PresenceList, ContactDetails
    ui/           Button, TextLink, SectionHeading, AnimatedSection, YouTubePlayer, Placeholder, Icons
  lib/            content (données dérivées), submit (Supabase + EmailJS), utils
  config.ts       TOUT LE CONTENU
  assets/         photos réelles + logo détouré
  fonts/          Newsreader + Hanken Grotesk (auto-hébergées)
```
