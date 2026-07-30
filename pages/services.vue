<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukman-immobilier.com'

useHead({
  title: 'Nos Services | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Vente de terrains, lotissement, aménagement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Découvrez tous nos services.' },
    { name: 'keywords', content: 'service immobilier bonoua, vente terrain, lotissement, construction villa, aménagement terrain, gestion immobilière, accompagnement projet' },
    { property: 'og:title', content: 'Nos Services | Loukman & Frères Immobilier' },
    { property: 'og:description', content: 'Vente de terrains, lotissement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire.' },
    { property: 'og:image', content: siteUrl + '/og-image.svg' },
    { property: 'og:url', content: siteUrl + '/services' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.svg' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/services' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Loukman & Frères Immobilier',
        description: 'Vente de terrains, lotissement, aménagement, construction et gestion immobilière.',
        url: siteUrl + '/services',
        telephone: '+2250708342144',
        email: 'loukmanfreresimmobilier@gmail.com',
        areaServed: ['Sud-Comoé', 'Yamoussoukro', 'Bonoua', 'Grand-Bassam', 'Côte d\'Ivoire'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services immobiliers',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vente de terrains' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lotissement' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aménagement' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestion immobilière' } },
          ],
        },
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
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Nos Services</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
        <p class="text-white/70 text-base md:text-lg">
          De l'acquisition du terrain à la construction, nous vous accompagnons
          à chaque étape de votre projet immobilier.
        </p>
      </div>
    </section>
    <LazyServicesGrid />
    <LazyCtaSection />
  </div>
</template>
