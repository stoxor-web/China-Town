# China'Town

Plateforme QC affiliate finder : articles, conversion CNY/EUR/USD, estimation livraison au kg, pop-up de choix d'agent affilié, tracking des clics et base admin.

## Stack

- Next.js
- Tailwind CSS
- Supabase
- Vercel recommandé pour l'hébergement
- GitHub pour le code

## Installation locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvre ensuite :

```txt
http://localhost:3000
```

## Configuration Supabase

1. Crée un projet Supabase.
2. Va dans SQL Editor.
3. Colle le contenu du fichier :

```txt
sql/schema.sql
```

4. Renseigne `.env.local` :

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
IP_HASH_SECRET=
CRON_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Fonctionnement affilié

Dans `affiliate_sites`, chaque site possède :

```txt
name
slug
domain
affiliate_id
link_template
logo_url
active
sort_order
```

Le produit garde seulement :

```txt
supplier_url
```

Quand l'utilisateur clique sur `Acheter`, une pop-up affiche tous les sites actifs. Chaque lien est généré avec :

```txt
{PRODUCT_URL}
{AFFILIATE_ID}
```

Exemple :

```txt
https://cnfans.com/product?url={PRODUCT_URL}&ref={AFFILIATE_ID}
```

## Tracking des clics

Route :

```txt
POST /api/affiliate-click
```

Elle enregistre dans `affiliate_clicks` :

```txt
product_id
affiliate_site_id
country
device
browser
referrer
landing_page
ip_hash
user_agent
```

L'IP brute n'est pas stockée, seulement un hash.

## Conversion devise

La conversion utilise une structure prête à brancher sur Supabase. Une route de mise à jour existe :

```txt
GET /api/update-rates?secret=TON_CRON_SECRET
```

Elle récupère les taux CNY vers EUR/USD et met à jour `exchange_rates`.

## Livraison

La table `shipping_rates` stocke le prix moyen au kg par site affilié :

```txt
affiliate_site_id
price_per_kg_eur
price_per_kg_usd
```

Calcul :

```txt
livraison estimée = poids article x prix moyen au kg
```

## Pages incluses

```txt
/
/product/[slug]
/category/[slug]
/admin
/admin/products
/admin/affiliate-sites
/admin/analytics
/admin/settings
/api/affiliate-click
/api/update-rates
```

## Déploiement GitHub + Vercel

1. Crée un repo GitHub.
2. Dépose tous les fichiers du ZIP dedans.
3. Pousse sur `main`.
4. Connecte le repo à Vercel.
5. Ajoute les variables d'environnement dans Vercel.
6. Déploie.

## À faire pour passer en production

- Ajouter Supabase Auth pour protéger `/admin`.
- Créer les vrais formulaires CRUD articles.
- Ajouter l'upload d'images Supabase Storage.
- Remplacer les IDs affiliés de démo.
- Ajuster les templates de liens selon chaque agent.
- Ajouter les vraies pages SEO catégories.
- Brancher les statistiques admin sur `affiliate_clicks`.
