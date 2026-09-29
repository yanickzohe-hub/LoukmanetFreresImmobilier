<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukmanimmobilier.com'
const route = useRoute()

const post = useBlogPost(String(route.params.slug))

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable', fatal: true })
}

const others = useBlogPosts().filter(p => p.slug !== post.slug).slice(0, 3)

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

useHead({
  title: post.title,
  meta: [
    { name: 'description', content: post.description },
    { name: 'keywords', content: post.keywords },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:image', content: siteUrl + '/og-image.png' },
    { property: 'og:url', content: siteUrl + '/blog/' + post.slug },
    { property: 'og:type', content: 'article' },
    { property: 'og:locale', content: 'fr_CI' },
    { property: 'article:published_time', content: post.date },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.png' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/blog/' + post.slug },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'fr',
        image: siteUrl + '/og-image.png',
        mainEntityOfPage: siteUrl + '/blog/' + post.slug,
        author: {
          '@type': 'Organization',
          name: 'Loukman & Frères Immobilier',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Loukman & Frères Immobilier',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: siteUrl + '/logo1.png',
          },
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl + '/' },
          { '@type': 'ListItem', position: 2, name: 'Conseils immobiliers', item: siteUrl + '/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: siteUrl + '/blog/' + post.slug },
        ],
      }),
    },
  ],
})

useAnimateOnScroll()
</script>

<template>
  <div>
    <section class="pt-28 md:pt-36 pb-10 md:pb-14 px-5 md:px-8 lg:px-12 bg-navy">
      <div class="max-w-3xl mx-auto animate-on-scroll">
        <nav class="text-white/50 text-xs md:text-sm mb-4 flex flex-wrap items-center gap-2" aria-label="Fil d'ariane">
          <NuxtLink to="/" class="hover:text-white transition-colors">Accueil</NuxtLink>
          <span aria-hidden="true">›</span>
          <NuxtLink to="/blog" class="hover:text-white transition-colors">Conseils immobiliers</NuxtLink>
          <span aria-hidden="true">›</span>
          <span class="text-white/70">{{ post.title }}</span>
        </nav>
        <h1 class="text-white text-2xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 leading-snug">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-2 text-white/60 text-xs md:text-sm">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span class="w-1 h-1 rounded-full bg-gold/60"></span>
          <span>{{ post.readMinutes }} min de lecture</span>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <article class="max-w-3xl mx-auto">
          <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8 font-medium">
            {{ post.excerpt }}
          </p>

          <div
            v-for="(section, i) in post.sections"
            :key="i"
            class="mb-8 md:mb-10 animate-on-scroll"
          >
            <h2 class="text-lg md:text-xl font-heading font-semibold text-navy mb-3">
              {{ section.h2 }}
            </h2>
            <div class="space-y-4">
              <p
                v-for="(paragraph, j) in section.paragraphs"
                :key="j"
                class="text-gray-500 text-sm md:text-base leading-relaxed"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div class="bg-sand/50 rounded-xl border border-gray-100 p-5 md:p-7 animate-on-scroll">
            <h2 class="text-base md:text-lg font-heading font-semibold text-navy mb-3">
              Besoin d'un conseil personnalisé ?
            </h2>
            <p class="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
              Nos conseillers vérifient les documents avec vous, organisent la visite du
              terrain et accompagnent le transfert chez le notaire. Retrouvez aussi les
              réponses aux questions les plus fréquentes avant un achat.
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/terrains" class="btn-cta">Voir les terrains à vendre</NuxtLink>
              <NuxtLink to="/faq" class="btn-outline">Questions fréquentes</NuxtLink>
            </div>
          </div>
        </article>

        <div class="max-w-3xl mx-auto mt-10 md:mt-12">
          <h2 class="text-lg md:text-xl font-heading font-semibold text-navy mb-4">Sur le même sujet</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NuxtLink
              v-for="other in others"
              :key="other.slug"
              :to="`/blog/${other.slug}`"
              class="block bg-white rounded-xl border border-gray-100 shadow-soft p-4 hover:shadow-card group animate-on-scroll"
            >
              <h3 class="text-sm font-heading font-semibold text-navy mb-1 group-hover:text-gold transition-colors">
                {{ other.title }}
              </h3>
              <span class="text-gray-400 text-xs">{{ other.readMinutes }} min de lecture</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <LazyCtaSection />
  </div>
</template>
