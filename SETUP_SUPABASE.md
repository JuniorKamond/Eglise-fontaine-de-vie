# Instructions pour configurer Supabase

## Étape 1: Créer la table `visit_requests`

1. Va sur: https://app.supabase.com
2. Sélectionne ton projet: **muakqdjdcmxcvswuyjkf**
3. Va à **SQL Editor** (côté gauche)
4. Clique **"New Query"**
5. Copie-colle ce code:

```sql
-- Créer la table visit_requests
CREATE TABLE public.visit_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  objet TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE public.visit_requests ENABLE ROW LEVEL SECURITY;

-- Créer une policy pour permettre les insertions publiques
CREATE POLICY "Allow public insert" ON public.visit_requests
  FOR INSERT 
  WITH CHECK (true);

-- Créer une policy pour permettre les lectures (optionnel)
CREATE POLICY "Allow public read" ON public.visit_requests
  FOR SELECT 
  USING (true);
```

6. Clique **"Run"** ou **"Exécuter"**
7. ✅ La table est créée!

## Étape 2: Installer les dépendances

Dans le terminal (à la racine du projet):

```bash
npm install express cors resend
npm install --save-dev @types/express @types/cors
```

## Étape 3: Mettre à jour package.json

Ouvre `package.json` et modifie le script `"dev"`:

**Avant:**
```json
"dev": "vite"
```

**Après:**
```json
"dev": "concurrently \"vite\" \"tsx server.ts\""
```

Puis installe concurrently:
```bash
npm install --save-dev concurrently tsx
```

## Étape 4: Tester

Relance le projet:
```bash
npm run dev
```

Tu devrais voir:
- ✅ Vite sur http://localhost:5173
- ✅ API sur http://localhost:3001

## Étape 5: Tester le formulaire

1. Accède au site sur http://localhost:5173
2. Clique "Planifier votre visite"
3. Remplis le formulaire
4. Clique "Envoyer"
5. ✅ L'email devrait arriver à fdv0501@gmail.com
6. ✅ La demande est sauvegardée dans Supabase
