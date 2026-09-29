<template>
  <div>
    <div id="accueil"><HeroSection /></div>
    <LazyStatsSection />
    <LazyFeaturesSection />
    <LazyAboutPreview />
    <LazyTerrainsGallery />
    <section class="section-padding bg-white">
      <div class="section-container">
        <div class="max-w-3xl mx-auto animate-on-scroll">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Acheter un terrain</span>
          <h2 class="text-fluid-title mb-4">Acheter un terrain à Bonoua et en Côte d'Ivoire</h2>
          <div class="w-12 h-0.5 bg-gold/60 rounded-full mb-5"></div>
          <div class="space-y-4 text-gray-500 text-sm md:text-base leading-relaxed">
            <p>
              Loukman & Frères Immobilier est une agence immobilière à Bonoua spécialisée
              dans la vente de terrains au Yaou Nouveau Quartier, à Bonoua, à Grand-Bassam
              et à Yamoussoukro. Chaque parcelle est présentée avec ses documents :
              titre foncier, attestation de propriété, plan de bornage certifié et extrait
              cadastral, vérifiés avec vous avant toute signature. Vous achetez votre terrain
              en Côte d'Ivoire l'esprit tranquille, accompagné jusqu'au transfert devant notaire.
            </p>
            <p>
              Construction de villa, lotissement viabilisé à bâtir, terrain à investir ou
              terrain agricole : notre catalogue est mis à jour chaque semaine. Superficie,
              quartier, accès et prix en francs CFA sont indiqués sur chaque fiche. Visite
              gratuite organisée sur demande, devis de construction sous 24 h. Un conseiller
              vous répond au +225 07 08 34 21 44 ou par WhatsApp.
            </p>
          </div>
          <NuxtLink to="/faq" class="inline-flex items-center gap-2 text-navy font-semibold text-sm mt-6 hover:text-gold transition-colors">
            Voir toutes les questions
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>
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
const siteUrl = config.public.siteUrl || 'https://loukmanimmobilier.com'

useHead({
  title: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua',
  meta: [
    { name: 'description', content: 'Vente de terrains, lotissement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Depuis 2012, votre partenaire de confiance.' },
    { name: 'keywords', content: 'terrain à vendre, vente terrain bonoua, achat terrain côte d\'ivoire, terrain viabilisé titre foncier, lotissement yaou, agence immobilière bonoua, construction villa bonoua, terrains disponibles, investissement immobilier, loukman immobilier' },
    { property: 'og:title', content: 'Loukman & Frères Immobilier | Terrains, Construction et Gestion Immobilière à Bonoua' },
    { property: 'og:description', content: 'Vente de terrains, lotissement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Depuis 2012, votre partenaire de confiance.' },
    { property: 'og:image', content: siteUrl + '/og-image.png' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.png' },
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
        image: siteUrl + '/og-image.png',
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
