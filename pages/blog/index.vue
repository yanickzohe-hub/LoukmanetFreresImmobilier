<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukmanimmobilier.com'

const posts = [...useBlogPosts()].sort((a, b) => new Date(b.date) - new Date(a.date))

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

useHead({
  title: 'Conseils immobiliers et guides d\'achat | Loukman',
  meta: [
    { name: 'description', content: 'Guides pratiques : acheter un terrain en Côte d\'Ivoire, vérifier un titre foncier, prix d\'un terrain à Bonoua, construire une maison dans le Sud-Comoé.' },
    { name: 'keywords', content: 'conseil immobilier, guide achat terrain, titre foncier, prix terrain bonoua, construire maison bonoua, immobilier côte d\'ivoire' },
    { property: 'og:title', content: 'Conseils immobiliers et guides d\'achat | Loukman' },
    { property: 'og:description', content: 'Guides pratiques pour acheter, vérifier et construire en Côte d\'Ivoire.' },
    { property: 'og:image', content: siteUrl + '/og-image.png' },
    { property: 'og:url', content: siteUrl + '/blog' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.png' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/blog' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Conseils immobiliers | Loukman & Frères Immobilier',
        description: 'Guides pratiques pour acheter un terrain, vérifier un titre foncier et construire en Côte d\'Ivoire.',
        url: siteUrl + '/blog',
        numberOfItems: posts.length,
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: siteUrl + '/blog/' + p.slug,
          name: p.title,
        })),
      }),
    },
  ],
})

useAnimateOnScroll()
</script>

<template>
  <div>
    <section class="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-8 lg:px-12 bg-navy text-center">
      <div class="max-w-3xl mx-auto animate-on-scroll">
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Conseils immobiliers</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
        <p class="text-white/70 text-base md:text-lg">
          Nos guides pour acheter un terrain, vérifier les documents et construire
          votre maison en Côte d'Ivoire.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          <NuxtLink
            v-for="post in posts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="block bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-card group animate-on-scroll"
          >
            <div class="p-5 md:p-6">
              <div class="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wider mb-3">
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{{ post.readMinutes }} min de lecture</span>
              </div>
              <h2 class="text-base md:text-lg font-heading font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ post.excerpt }}</p>
              <span class="inline-flex items-center gap-2 text-navy text-sm font-semibold group-hover:text-gold transition-colors">
                Lire l'article
                <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-10 md:mt-12 animate-on-scroll">
          <p class="text-gray-500 text-sm mb-4">Une question sur un terrain ou un projet de construction ?</p>
          <NuxtLink to="/contact" class="btn-cta">Contactez-nous</NuxtLink>
        </div>
      </div>
    </section>

    <LazyCtaSection />
  </div>
</template>
