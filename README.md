# 🏠 Loukman & Frère Immobilier — Site Web Vitrine

Site web vitrine officiel de l'entreprise **LOUKMAN & FRÈRE IMMOBILIER** (Bonoua, Yaou Nouveau Quartier, Côte d'Ivoire), dirigée par **M. Atchunin Y. Antoine**.

Développé par **Zohé Taï Yanick**, dans le cadre du cahier des charges validé entre le développeur et le client.

Stack technique : **Nuxt.js 3 (Vue.js) + Tailwind CSS**, hébergé sur **Vercel**, DNS géré par **Cloudflare**.

---

## 📁 Structure du projet

```
loukman-immobilier/
├── assets/
│   ├── css/
│   │   └── main.css          # Styles globaux + variables de la charte graphique
│   └── images/                # Images sources (non optimisées)
├── components/
│   ├── SiteHeader.vue          # En-tête / navigation
│   ├── SiteFooter.vue          # Pied de page
│   ├── HeroSection.vue         # Section d'accroche (page d'accueil)
│   ├── ServicesGrid.vue        # Grille des services
│   ├── CtaSection.vue          # Section "appel à l'action"
│   └── WhatsAppButton.vue      # Bouton flottant WhatsApp
├── composables/                # Fonctions réutilisables (ex: useContactForm)
├── layouts/
│   └── default.vue             # Mise en page générale (header + footer)
├── pages/
│   ├── index.vue                # Page d'accueil
│   ├── services.vue             # Page Services
│   ├── terrains.vue             # Catalogue des terrains disponibles
│   ├── a-propos.vue             # À propos / mot du PDG
│   └── contact.vue              # Formulaire de contact
├── public/
│   └── images/                  # Images statiques servies directement (logo, photos terrains...)
├── server/
│   └── api/                     # Routes API internes (ex: traitement du formulaire de contact)
├── app.vue                       # Point d'entrée de l'application
├── nuxt.config.ts                # Configuration Nuxt (SEO, modules, preset Vercel)
├── tailwind.config.js            # Charte graphique (couleurs, polices, arrondis)
├── vercel.json                   # Configuration de déploiement Vercel
├── .env.example                  # Exemple de variables d'environnement
└── package.json
```

---

## ✅ Liste des tâches à accomplir (du développement à la mise en ligne)

### Phase 1 — Préparation
- [ ] Récupérer le logo en haute résolution (format `.png` ou `.svg`, fond transparent).
- [ ] Récupérer des photos haute définition : terrains aménagés, constructions, photo du PDG.
- [ ] Lister précisément tous les terrains disponibles (lieu, superficie, prix, statut, photos).
- [ ] Valider les textes définitifs (accroche, description des services, mot du PDG).

### Phase 2 — Installation et développement local
- [ ] Installer [Node.js](https://nodejs.org) (version 18 ou plus récente).
- [ ] Cloner ou ouvrir le projet, puis installer les dépendances :
  ```bash
  npm install
  ```
- [ ] Lancer le serveur de développement :
  ```bash
  npm run dev
  ```
  Le site est alors accessible sur `http://localhost:3000`.
- [ ] Remplacer les images placeholders dans `public/images/` par les vraies photos.
- [ ] Mettre à jour le catalogue de terrains dans `pages/terrains.vue` (ou migrer vers un fichier JSON / une API selon le volume).
- [ ] Adapter les textes dans chaque page (`pages/*.vue`) avec le contenu validé.
- [ ] Vérifier l'affichage sur mobile, tablette et desktop (responsive).

### Phase 3 — Fonctionnalités
- [ ] Connecter le formulaire de contact (`pages/contact.vue`) à un service d'envoi d'e-mail :
  - Option simple : [Formspree](https://formspree.io) ou [EmailJS](https://www.emailjs.com) (gratuits).
  - Option avancée : route API interne dans `server/api/contact.post.ts`.
- [ ] Vérifier le bon fonctionnement du bouton WhatsApp flottant (`components/WhatsAppButton.vue`) avec le bon numéro.
- [ ] Intégrer la carte de localisation (Google Maps ou OpenStreetMap) sur la page Contact.
- [ ] Vérifier le clic direct vers l'application téléphone sur mobile (`tel:`).

### Phase 4 — Référencement (SEO)
- [ ] Vérifier les balises `title` et `description` dans `nuxt.config.ts`.
- [ ] Ajouter un fichier `sitemap.xml` (module `@nuxtjs/sitemap` recommandé).
- [ ] Ajouter un fichier `robots.txt` dans `public/`.
- [ ] Optimiser le nom et le poids de chaque image (format `.webp` recommandé).
- [ ] Créer une fiche **Google My Business** pour l'entreprise (gratuit, indispensable pour le référencement local "terrain à vendre Bonoua").

### Phase 5 — Mise en ligne (hébergement, domaine, DNS)
- [ ] Achat du nom de domaine (`.com`) — voir section *Hébergement* ci-dessous.
- [ ] Création des comptes **GitHub**, **Vercel** et **Cloudflare**.
- [ ] Déploiement du projet sur Vercel.
- [ ] Connexion du nom de domaine au projet Vercel via Cloudflare.
- [ ] Vérification du certificat HTTPS (automatique).
- [ ] Test final sur plusieurs navigateurs et appareils.

### Phase 6 — Après mise en ligne
- [ ] Former le client (M. Atchunin Y. Antoine ou un collaborateur) à la mise à jour simple du contenu (textes, photos, terrains).
- [ ] Mettre en place un suivi (Google Analytics ou Vercel Analytics) pour observer les visites.
- [ ] Planifier le renouvellement annuel du nom de domaine (rappel à prévoir).

---

## 🎨 Charte graphique (rappel)

| Élément | Valeur |
|---|---|
| Couleur principale | Bleu marine `#0B1B3D` |
| Couleur d'accent | Jaune doré `#F5A623` |
| Police des titres | Montserrat (gras) |
| Police du texte | Inter |
| Style | Coins arrondis, beaucoup d'espace blanc, transitions douces au survol |

Ces valeurs sont déjà configurées dans `tailwind.config.js` et `assets/css/main.css` — il suffit d'utiliser les classes `bg-navy`, `text-gold`, `font-heading`, `btn-cta`, `btn-outline`, `card`, etc.

---

## ☁️ Hébergement, nom de domaine et déploiement

Le projet étant construit en **Nuxt.js + Tailwind CSS**, la solution d'hébergement recommandée est la suivante :

| Brique | Solution | Coût |
|---|---|---|
| Hébergement | **Vercel** | Gratuit |
| Nom de domaine | **.com** (registraire au choix) | ~payant, annuel |
| DNS, sécurité, accélération | **Cloudflare** | Gratuit |

### Pourquoi cette combinaison ?

- ✅ **Hébergement ultra-rapide**, optimisé spécifiquement pour Nuxt.js / Vue.js.
- ✅ **HTTPS gratuit et automatique** (certificat SSL géré tout seul).
- ✅ **Déploiement automatique depuis GitHub** : chaque mise à jour poussée sur GitHub est mise en ligne automatiquement, sans aucune manipulation technique.
- ✅ **CDN mondial** : le site se charge rapidement, peu importe d'où l'internaute se connecte.
- ✅ **Excellentes performances SEO**, donc une meilleure visibilité sur Google.
- ✅ **Coût annuel très faible**, largement inférieur à un hébergement classique.

### 💰 Coût annuel estimé

| Élément | Coût annuel |
|---|---|
| Hébergement (Vercel) | 0 FCFA (gratuit) |
| DNS / sécurité (Cloudflare) | 0 FCFA (gratuit) |
| Nom de domaine (.com) | ≈ 8 000 à 12 000 FCFA / an |
| **Total** | **≈ 8 000 à 12 000 FCFA par an** |

> Ce montant correspond uniquement au renouvellement annuel du nom de domaine. L'hébergement et la sécurisation du site restent gratuits grâce à Vercel et Cloudflare. Le développement du site lui-même a été offert par le développeur, Zohé Taï Yanick — seul ce coût de domaine reste à la charge de l'entreprise pour que le site reste accessible en ligne.

### Étapes de déploiement (résumé)

1. **Créer un dépôt GitHub** et y pousser le code du projet.
2. **Créer un compte Vercel** ([vercel.com](https://vercel.com)) et connecter le dépôt GitHub.
3. Vercel détecte automatiquement Nuxt.js et déploie le site (URL temporaire fournie immédiatement, ex : `loukman-immobilier.vercel.app`).
4. **Acheter le nom de domaine** `.com` souhaité (ex : chez Cloudflare Registrar, Namecheap, ou un registraire local).
5. **Ajouter le domaine sur Cloudflare** et configurer les enregistrements DNS pointant vers Vercel.
6. **Lier le domaine personnalisé dans le tableau de bord Vercel** (Project Settings → Domains).
7. Le HTTPS est activé automatiquement — le site est alors disponible à l'adresse définitive (ex : `www.loukmanfrereimmobilier.com`).
8. À chaque future modification du contenu, il suffit de mettre à jour le code sur GitHub : le site se met à jour automatiquement, sans aucune intervention manuelle sur un serveur.

---

## 📞 Contact

- **Entreprise :** Loukman & Frère Immobilier
- **PDG :** M. Atchunin Y. Antoine
- **Téléphone :** 07 08 34 21 44
- **Email :** loukmanfreresimmobilier@gmail.com
- **Adresse :** Bonoua, Yaou Nouveau Quartier, Côte d'Ivoire
- **Développeur :** Zohé Taï Yanick
