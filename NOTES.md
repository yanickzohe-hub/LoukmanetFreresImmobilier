# Loukman & Frères Immobilier — Notes de suivi

## Stack
- Nuxt 3.21.8, TailwindCSS, @nuxt/image, @nuxtjs/sitemap
- Prisma + SQLite (dev), déploiement Vercel
- Domaine : loukman-immobilier.ci

## SEO (100/100 ✓)
- robots.txt : domaine loukman-immobilier.ci, disallow /admin/
- Meta : og:image 1200×630, twitter:card, canonical, favicon SVG
- Sitemap dynamique via `/api/__sitemap__/urls`
- JSON-LD : RealEstateAgent (accueil), Product (chaque terrain)
- Titres/meta description SEO par page

## Accessibilité (93/100 ✓)
- For/id sur tous les champs du formulaire de contact
- Ordre des headings corrigé (h1 > h2, pas de saut)
- Contraste : text-gray-400 → gray-500 partout

## Fonts self-hostées
- @fontsource/montserrat (400,500,600,700) — subset latin uniquement
- @fontsource/inter (300,400,500,600) — subset latin uniquement
- Imports dans assets/css/main.css avant @tailwind
- font-display: swap (déjà dans les fichiers @fontsource)

## Images (optimisées)
- @nuxt/image configuré : domains [images.unsplash.com, placehold.co], format WebP
- Toutes les balises <img> → <NuxtImg> avec width/height
- Composants lourds en Lazy : ServicesGrid, StatsSection, CtaSection

## Performances (reste à améliorer)
- Dev : score 59 (normal, pas de compression ni CDN)
- Production Vercel attendu : ~70-80 grâce à Brotli + CDN + IPX

## À faire plus tard
- Remplacer og-image.svg par un PNG/JPG 1200×630
- Remplacer les images Unsplash/placehold par des images locales dans /assets/
- Ajouter favicon.ico legacy
- Déployer sur Vercel pour confirmer le score réel
