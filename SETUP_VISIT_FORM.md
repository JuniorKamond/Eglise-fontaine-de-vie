# Configuration du formulaire "Planifier votre Visite"

## Vue d'ensemble
Un nouveau composant `VisitPlannerDialog` a été créé pour permettre aux visiteurs de remplir un formulaire directement depuis la page d'accueil (section Hero). Le formulaire demande :
- Prénom
- Nom
- Adresse email
- Objet de la visite

Les données sont envoyées directement par email à l'adresse de l'église configurée dans `config.ts`.

## Configuration requise

### 1. Configuration EmailJS
Le formulaire utilise EmailJS pour envoyer les emails. Vous devez configurer les éléments suivants :

#### Étapes pour créer un compte EmailJS :
1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit (ou connectez-vous si vous en avez un)
3. Une fois connecté, accédez au tableau de bord

#### Obtenir votre Public Key :
1. Allez dans **Account** > **API Keys**
2. Copiez votre **Public Key**
3. Remplacez `YOUR_PUBLIC_KEY_HERE` dans le fichier `src/components/church/VisitPlannerDialog.tsx` par votre clé

#### Créer un Service (pour accéder à votre email) :
1. Allez dans **Email Services**
2. Cliquez sur **Add Service**
3. Sélectionnez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte email
5. **Service ID** sera généré et s'affichera à la fin (ex: `service_abc123`)
6. Remplacez `YOUR_SERVICE_ID_HERE` dans le fichier

#### Créer un Template d'email :
1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Donnez un nom au template (ex: "Visit Request Form")
4. Configurez le template avec les variables suivantes :

**Template Content Example :**
```
From: {{from_email}}
Visitor Name: {{from_name}}

Subject: {{subject}}

Visit Purpose: {{objet_visite}}

---

Visitor Details:
Name: {{prenom}} {{nom}}
Email: {{visitor_email}}

Message:
{{objet_visite}}
```

5. Copiez le **Template ID** (ex: `template_abc123`)
6. Remplacez `YOUR_TEMPLATE_ID_HERE` dans le fichier

### 2. Configuration du fichier

Ouvrez `src/components/church/VisitPlannerDialog.tsx` et remplacez :
```typescript
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Ligne 74
```
par :
```typescript
emailjs.init("your_actual_public_key");
```

```typescript
await emailjs.send(
  "YOUR_SERVICE_ID_HERE",      // Remplacez ici
  "YOUR_TEMPLATE_ID_HERE",     // Remplacez ici
  templateParams
);
```

### 3. Configuration de l'email de l'église
L'email de destination est configuré dans `src/config.ts` :
```typescript
contact: {
  email: "contact@eglisefontaindevie.ci", // ← Vérifiez que c'est l'email correct
}
```

Assurez-vous que cet email est correct et que le service EmailJS est connecté à ce compte email.

## Utilisation
- Le bouton "Planifier votre visite" dans la section Hero ouvre maintenant un dialog avec le formulaire
- Les utilisateurs remplissent les champs et cliquent sur "Envoyer la demande"
- Un email est envoyé automatiquement à l'adresse de l'église
- Un message de confirmation s'affiche à l'utilisateur

## Variables d'environnement (optionnel)
Pour plus de sécurité, vous pouvez aussi stocker vos clés dans un fichier `.env` :

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez :
```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

3. Puis mettez à jour `VisitPlannerDialog.tsx` pour utiliser :
```typescript
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  templateParams
);
```

## Tests
1. Remplissez le formulaire avec des données de test
2. Vérifiez que vous recevez un email
3. Vérifiez que la notification de succès s'affiche

## Dépannage

- **Email non reçu** : Vérifiez que le Service ID et Template ID sont corrects dans EmailJS
- **Erreur d'authentification** : Assurez-vous que la Public Key est correcte
- **Formulaire non affiché** : Vérifiez la console du navigateur pour les erreurs

---
**Note** : Le formulaire remplace la page "/inscription" précédente. Si vous aviez du contenu important sur cette page, assurez-vous de l'avoir migré ailleurs.
