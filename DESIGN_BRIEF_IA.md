# 🎨 Brief de refonte UI/UX — Loukman & Frère Immobilier

> **Destinataire : IA exécutante (DeepSeek V4 Flash)**
> Ce document est un cahier des charges de design à appliquer sur le projet Nuxt 3 existant (`loukman-immobilier/`). Suis-le fichier par fichier, dans l'ordre. Ne casse aucune fonctionnalité existante (liens, formulaire, WhatsApp, SEO meta). Chaque section donne : le problème actuel, la direction à prendre, et le code/les classes à écrire.

---

## 0. Contexte du projet (pour situer les décisions)

Agence immobilière basée à **Bonoua, Côte d'Ivoire**. Activité : vente de terrains, lotissement, aménagement/voirie, pose de poteaux électriques, construction, gestion locative. Client cible : particuliers ivoiriens qui achètent un terrain pour construire — décision sérieuse, ancrée dans le concret (parcelle, bornage, superficie en m², situation géographique). Le site doit inspirer **confiance et sérieux**, pas "start-up tech". La terre, le cadastre, le plan de lotissement sont la matière première visuelle du projet : c'est de là que doit venir la personnalité du design, pas d'un template générique "corporate bleu marine + doré" qu'on retrouve sur n'importe quel site d'agence.

---

## 1. Diagnostic du design actuel

- Palette navy/gold correcte mais **trop générique** ("agence premium" par défaut, aucune identité propre).
- Aucune animation : pas de scroll reveal, pas de hover subtil, pas de transition de page → l'expérience est **statique et abrupte**, chaque page "saute" instantanément (`<NuxtPage />` sans transition).
- Composants `card`, `btn-cta`, `btn-outline` = classes Tailwind neutres, zéro signature visuelle.
- Emojis utilisés comme icônes (🏞️ 🗺️ 🚧) → lisible mais pas "designer", à remplacer par de vraies icônes SVG cohérentes en trait.
- Hero correct dans le principe (image plein écran + overlay) mais sans profondeur ni mouvement.
- Espacements homogènes partout (`section-padding` unique) → rythme visuel plat, pas de respiration variable entre sections.
- Footer et header solides structurellement mais visuellement plats (pas de texture, pas de séparation subtile).

---

## 2. Direction artistique retenue : **"Plan cadastral"**

Le concept : habiller le site avec le vocabulaire visuel du **bornage et du plan de terrain** — lignes fines, coins de repère (comme les 4 coins d'une parcelle bornée), coordonnées GPS en label, numérotation de lot. C'est un parti pris qui colle exactement au métier (vente de terrains), pas un habillage "agence immo" interchangeable.

**Élément signature** : des **coins de bornage** (petits chevrons en L, style plan topographique) qui apparaissent aux angles des cartes, images et sections clés — rappel discret et récurrent du terrain borné. À utiliser avec parcimonie (2-3 endroits clés : Hero, cartes de terrains, séparateurs de section), jamais partout.

### Palette (garder la confiance du navy, enrichir avec la terre)

```
--color-navy:        #0B1B3D   /* existant, gardé — sérieux, confiance */
--color-navy-light:  #16295C
--color-clay:         #B5502E   /* NOUVEAU — remplace le gold en accent principal, terre latérite ivoirienne */
--color-clay-light:   #CC6A45
--color-gold:         #C9A24B   /* gold assagi, utilisé en détail seulement (pas en boutons pleins) */
--color-sand:          #F7F2EA  /* fond chaud, remplace le blanc pur */
--color-ink:            #1E2430  /* texte principal, plus doux qu'un noir pur */
--color-line:            #D8CFC0  /* lignes/bordures fines, ton sable foncé */
```

Le **clay** (terre cuite/latérite) devient la couleur d'action principale (CTA), le **gold** passe en accent discret (petits traits, chiffres, coordonnées). Le fond passe du blanc pur à un sable chaud `#F7F2EA` : plus habité, moins "template SaaS".

### Typographie

- **Titres** : remplacer Montserrat (trop générique/corporate) par **Fraunces** (serif contemporain, chaleureux, présent sans être criard — convient à l'immobilier premium tout en gardant du caractère).
- **Texte courant** : garder **Inter**, elle fonctionne bien.
- **Données/labels** (superficie, coordonnées, statut, numéro de lot) : ajouter **IBM Plex Mono**, utilisée uniquement pour les petites étiquettes techniques (ex. `N 05°16' / W 03°36'`, `LOT-014`, `600 m²`). C'est ce détail qui crée la signature "plan cadastral".

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
```

---

## 3. `tailwind.config.js` — à remplacer entièrement

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1B3D', light: '#16295C' },
        clay: { DEFAULT: '#B5502E', light: '#CC6A45', dark: '#8F3E22' },
        gold: { DEFAULT: '#C9A24B', light: '#DDBE73' },
        sand: { DEFAULT: '#F7F2EA', dark: '#EFE7D8' },
        ink:  { DEFAULT: '#1E2430' },
        line: { DEFAULT: '#D8CFC0' }
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(11,27,61,0.12)',
        card: '0 8px 30px -10px rgba(11,27,61,0.18)'
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.06)' }
        }
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
```

---

## 4. `assets/css/main.css` — à remplacer entièrement

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

html { scroll-behavior: smooth; }

body {
  @apply font-body text-ink bg-sand;
}

h1, h2, h3, h4 {
  @apply font-heading text-navy;
}

/* Label "coordonnées" — signature du site, à utiliser au-dessus des titres de section */
.eyebrow {
  @apply font-mono text-xs tracking-widest uppercase text-clay mb-3 inline-block;
}

.btn-cta {
  @apply inline-block bg-clay hover:bg-clay-dark text-white font-heading font-semibold
         px-6 py-3 rounded-xl2 transition-all duration-300 shadow-soft hover:shadow-card
         hover:-translate-y-0.5;
}

.btn-outline {
  @apply inline-block border border-navy/30 text-navy font-heading font-medium
         px-6 py-3 rounded-xl2 transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white;
}

.section-padding {
  @apply py-20 md:py-28 px-6 md:px-12;
}

.card {
  @apply relative bg-white rounded-2xl shadow-soft hover:shadow-card transition-all duration-500
         hover:-translate-y-1 p-6 border border-line/60;
}

/* Coins de bornage — élément signature, à ajouter en overlay sur .card et sur le Hero */
.survey-corners::before,
.survey-corners::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: currentColor;
  opacity: 0.5;
}
.survey-corners::before {
  top: 10px; left: 10px;
  border-top: 2px solid; border-left: 2px solid;
}
.survey-corners::after {
  bottom: 10px; right: 10px;
  border-bottom: 2px solid; border-right: 2px solid;
}

/* Reveal au scroll — piloté par le composable useScrollReveal (voir §6) */
.reveal {
  opacity: 0;
}
.reveal.is-visible {
  animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; animation: none !important; }
  * { scroll-behavior: auto !important; }
}
```

---

## 5. Transitions de page (le "saut brutal" à corriger)

### 5.1 Installer

```bash
npm install @vueuse/motion
```

### 5.2 `nuxt.config.ts` — ajouter la transition de page

```ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/motion/nuxt'
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Loukman & Frère Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Loukman & Frère Immobilier - Vente de terrains, lotissement, aménagement, construction et gestion immobilière à Bonoua, Yaou Nouveau Quartier, Côte d\'Ivoire.'
        }
      ],
      htmlAttrs: { lang: 'fr' }
    }
  },

  css: ['~/assets/css/main.css'],

  nitro: { preset: 'vercel' },

  compatibilityDate: '2026-01-01'
})
```

### 5.3 `app.vue` — définir l'animation CSS de la transition

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
```

Résultat : chaque changement de page fait un léger fondu + glissement au lieu d'un "cut" brutal. 350ms, pas plus long — au-delà ça ralentit l'usage.

---

## 6. Composable de scroll-reveal (réutilisable partout)

Créer `composables/useScrollReveal.ts` :

```ts
export function useScrollReveal() {
  onMounted(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
  })
}
```

Dans chaque composant/page qui contient des éléments `.reveal`, appeler `useScrollReveal()` dans le `<script setup>`. Pour un effet en cascade (cartes qui apparaissent l'une après l'autre), ajouter un délai inline :

```html
<div class="card reveal" style="animation-delay: 0.1s">...</div>
<div class="card reveal" style="animation-delay: 0.2s">...</div>
<div class="card reveal" style="animation-delay: 0.3s">...</div>
```

---

## 7. Refonte composant par composant

### `components/SiteHeader.vue`
- Garder la logique existante (scroll state, menu mobile).
- Header transparent → au scroll, passer de `bg-transparent` à `bg-navy/95 backdrop-blur-sm` (pas un `bg-navy` plat, la transparence légère donne de la profondeur).
- Les liens de nav : ajouter un soulignement animé au hover (`after:` avec `scale-x-0` → `scale-x-100` transition), pas juste un changement de couleur.
- Bouton téléphone : passer de `btn-cta` (couleur clay) — garder, mais ajouter `animate-pulseSoft` très lent uniquement au repos (pas en hover, pour ne pas surcharger).

### `components/HeroSection.vue`
- Ajouter `survey-corners` en overlay sur le cadre visible du hero (coins de bornage en blanc/or, `text-gold`).
- Ajouter un `eyebrow` au-dessus du H1, ex. `<span class="eyebrow text-gold">Bonoua · Côte d'Ivoire</span>` — première apparition du vocabulaire "coordonnées".
- Titre et CTA doivent apparaître avec un léger `fadeUp` décalé au chargement (pas au scroll puisqu'ils sont visibles immédiatement) : utiliser `v-motion` de `@vueuse/motion` :

```vue
<h1 v-motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }">
  ...
</h1>
<NuxtLink v-motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }" to="/terrains" class="btn-cta">
  Découvrir nos terrains
</NuxtLink>
```
- Ajouter un léger zoom lent sur l'image de fond (`animate-[kenburns_18s_ease-in-out_infinite_alternate]` avec un keyframe `scale(1)→scale(1.08)`) pour casser la fixité de l'image.

### `components/ServicesGrid.vue`
- Remplacer les emojis par des icônes SVG en trait (stroke, cohérentes en épaisseur), couleur `text-clay`, dans un cercle `bg-clay/10`.
- Ajouter `reveal` + délai en cascade sur chaque carte (voir §6).
- Ajouter `eyebrow` avant le H2 : `<span class="eyebrow">Ce que nous faisons</span>`.
- Sur `.card`, ajouter `survey-corners` en `text-clay/40` — discret, seulement visible au hover (`opacity-0 group-hover:opacity-100`).

### `components/CtaSection.vue`
- Remplacer le fond `bg-gold` plat par un fond `bg-navy` avec un motif de fines lignes de grille en SVG en superposition à faible opacité (rappel plan cadastral) — un `<svg>` de fond en `opacity-10` avec un pattern de grille 40x40.
- Texte en blanc, boutons `btn-cta` (clay) + un second bouton `border border-white/40 text-white`.
- Ajouter `reveal` sur le bloc.

### `components/SiteFooter.vue`
- Ajouter une ligne fine `border-t border-white/10` déjà présente — renforcer avec un léger dégradé `bg-gradient-to-b from-navy to-navy-light`.
- Liens : soulignement animé au hover (même traitement que le header, cohérence).
- Ajouter les coordonnées GPS de Bonoua en `font-mono text-xs text-gold/70` à côté de l'adresse — clin d'œil signature en bas de page : `05°16'N 3°36'W`.

### `components/WhatsAppButton.vue`
- Garder la position et la fonction. Remplacer l'emoji 💬 par une icône SVG WhatsApp propre.
- Ajouter `animate-pulseSoft` en permanence (léger, pas agressif) pour signaler l'interactivité sans être criard.
- Ajouter une apparition différée au chargement : `v-motion :initial="{ opacity:0, scale:0.5 }" :enter="{ opacity:1, scale:1, transition:{ delay:1000, duration:400 } }"`.

---

## 8. Refonte par page

### `pages/index.vue`
Rien à changer structurellement, les composants portent déjà le nouveau design une fois retravaillés au §7.

### `pages/services.vue` et `pages/a-propos.vue`
- Ajouter `eyebrow` avant chaque H1.
- `a-propos.vue` : ajouter `reveal` sur l'image et sur le texte, avec des délais différents (image d'abord, texte 150ms après) pour un effet d'entrée orchestré plutôt que simultané.

### `pages/terrains.vue`
- Chaque carte de terrain reçoit `survey-corners` + `reveal` en cascade.
- Le badge `statut` (Disponible/Vendu) : ajouter `font-mono text-xs` pour coller au vocabulaire "étiquette technique" du site.
- Ajouter la superficie en `font-mono` (ex. `600 m²`) pour renforcer la cohérence "données de terrain".
- Numéroter chaque lot visuellement : `LOT-0{{ t.id }}` en `eyebrow` au-dessus du lieu — renforce le concept cadastral et aide à la lecture (référence rapide en cas d'appel téléphonique).

### `pages/contact.vue`
- Champs de formulaire : remplacer les bordures neutres par `border-line focus:border-clay focus:ring-2 focus:ring-clay/20` — état de focus visible et cohérent avec la palette (accessibilité clavier).
- Message de succès : garder le fond vert (universellement compris comme succès), mais harmoniser le radius avec le reste (`rounded-xl2`).
- Ajouter `reveal` sur le formulaire.

---

## 9. Checklist qualité avant de livrer

- [ ] Les transitions de page fonctionnent dans les deux sens (avant/arrière navigateur inclus).
- [ ] `prefers-reduced-motion` respecté (voir règle CSS §4) — aucune animation ne doit gêner un utilisateur qui la désactive.
- [ ] Contraste texte/fond conforme AA sur le nouveau fond `sand` et sur `clay` (vérifier notamment les boutons).
- [ ] Aucune classe Tailwind orpheline (`bg-gold` utilisé nulle part ailleurs que prévu).
- [ ] Le site reste lisible et fonctionnel si les polices Google Fonts ne chargent pas (fallback `serif`/`sans-serif`/`monospace` déjà en place dans `tailwind.config.js`).
- [ ] Menu mobile, WhatsApp button et formulaire de contact restent 100% fonctionnels après les changements.
- [ ] Testé sur mobile (375px) : le motif de grille du CTA et les coins de bornage ne cassent pas la lisibilité sur petit écran.
- [ ] Pas plus de 2-3 animations visibles simultanément à l'écran à un instant donné — la règle est la retenue, pas l'accumulation d'effets.
