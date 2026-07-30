export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://loukman-immobilier.com',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://loukman-immobilier.com',
    autoI18n: false,
    exclude: ['/admin/**'],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Loukman & Frères Immobilier - Vente de terrains, lotissement, aménagement, construction et gestion immobilière à Bonoua, Yaou Nouveau Quartier, Côte d\'Ivoire.'
        },
        { property: 'og:title', content: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua' },
        { property: 'og:description', content: 'Vente de terrains, lotissement, construction et gestion immobilière à Bonoua, Côte d\'Ivoire.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL || 'https://loukman-immobilier.com' },
        { property: 'og:locale', content: 'fr_CI' },
        { property: 'og:image', content: (process.env.NUXT_PUBLIC_SITE_URL || 'https://loukman-immobilier.com') + '/og-image.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua' },
        { name: 'twitter:description', content: 'Vente de terrains, lotissement, construction et gestion immobilière à Bonoua, Côte d\'Ivoire.' },
        { name: 'twitter:image', content: (process.env.NUXT_PUBLIC_SITE_URL || 'https://loukman-immobilier.com') + '/og-image.svg' },
        { name: 'keywords', content: 'terrain bonoua, immobilier côte d\'ivoire, vente terrain bonoua, lotissement, construction bonoua, yaou nouveau quartier' }
      ],
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  image: {
    domains: ['images.unsplash.com', 'placehold.co'],
    format: ['webp'],
    screens: {
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'vercel',
    experimental: {
      bodySizeLimit: 50 * 1024 * 1024
    }
  },

  runtimeConfig: {
    emailHost: '',
    emailPort: '',
    emailUser: '',
    emailPass: '',
    emailTo: 'loukmanfreresimmobilier@gmail.com',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://loukman-immobilier.com',
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/terrains': { swr: 3600 },
    '/services': { prerender: true },
    '/a-propos': { prerender: true },
    '/contact': { prerender: true },
  },

  compatibilityDate: '2026-01-01'
})
