<template>
  <div>
    <div id="accueil"><HeroSection /></div>
    <LazyStatsSection />
    <LazyFeaturesSection />
    <LazyAboutPreview />
    <LazyTerrainsGallery />
    <section class="section-padding bg-sand/50">
      <div class="section-container">
        <div class="text-center max-w-2xl mx-auto mb-8 md:mb-10 animate-on-scroll">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Avis</span>
          <h2 class="text-fluid-title mb-2">Ce que nos clients disent</h2>
          <p class="text-gray-500 text-sm">Des retours authentiques de nos clients sur leur expérience.</p>
        </div>
        <ClientOnly>
          <LazyAvisFanCards />
        </ClientOnly>
        <div class="mt-8 md:mt-10 animate-on-scroll">
          <ClientOnly>
            <LazyAvisForm />
          </ClientOnly>
        </div>
      </div>
    </section>

    <div id="contact"><LazyCtaSection /></div>
    <WhatsAppButton />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukman-immobilier.com'

useHead({
  title: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua',
  meta: [
    { name: 'description', content: 'Vente de terrains, lotissement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Depuis 2012, votre partenaire de confiance.' },
    { name: 'keywords', content: 'vente terrain bonoua, achat terrain grand-bassam, immobilier côte d\'ivoire, lotissement yaou, terrain viabilisé, construction villa bonoua, agence immobilière, terrains disponibles, investissement immobilier, loukman immobilier' },
    { property: 'og:title', content: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua' },
    { property: 'og:description', content: 'Vente de terrains, lotissement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Depuis 2012, votre partenaire de confiance.' },
    { property: 'og:image', content: siteUrl + '/og-image.svg' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.svg' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Loukman & Frères Immobilier',
        image: siteUrl + '/og-image.svg',
        url: siteUrl,
        telephone: '+2250708342144',
        email: 'loukmanfreresimmobilier@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Yaou Nouveau Quartier',
          addressLocality: 'Bonoua',
          addressCountry: 'CI'
        },
        openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-13:00',
        priceRange: '$$',
        description: 'Vente de terrains, lotissement, aménagement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Depuis 2012.',
        areaServed: ['Sud-Comoé', 'Yamoussoukro', 'Bonoua', 'Grand-Bassam', 'Côte d\'Ivoire'],
        sameAs: [
          `https://wa.me/2250708342144`,
        ]
      })
    }
  ]
})
</script>
