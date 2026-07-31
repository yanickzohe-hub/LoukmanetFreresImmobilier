<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukman-immobilier.com'

useHead({
  title: 'À Propos | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Découvrez Loukman & Frères Immobilier — expertise locale depuis 2012 dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Vente de terrains, lotissement, construction et gestion immobilière.' },
    { name: 'keywords', content: 'loukman immobilier, agence immobilière bonoua, qui sommes-nous, expertise immobilière, atchunin antoine, immobilier côte d\'ivoire' },
    { property: 'og:title', content: 'À Propos | Loukman & Frères Immobilier' },
    { property: 'og:description', content: 'Découvrez Loukman & Frères Immobilier — expertise locale depuis 2012 dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire.' },
    { property: 'og:image', content: siteUrl + '/og-image.svg' },
    { property: 'og:url', content: siteUrl + '/a-propos' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.svg' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/a-propos' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Loukman & Frères Immobilier',
        url: siteUrl,
        logo: siteUrl + '/logo1.png',
        description: 'Agence immobilière basée à Bonoua — vente de terrains, lotissement, construction et gestion immobilière.',
        foundingDate: '2012',
        founder: { '@type': 'Person', name: 'Atchunin Y. Antoine' },
        address: { '@type': 'PostalAddress', addressLocality: 'Bonoua', addressCountry: 'CI' },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+2250708342144',
          email: 'loukmanfreresimmobilier@gmail.com',
          contactType: 'customer service',
        },
      }),
    },
  ],
})

useAnimateOnScroll()

const pdgImage = '/pdg.png'

const blocs = [
  { icon: 'target', title: 'Notre Mission', desc: "Offrir à chaque client un accompagnement personnalisé pour trouver le terrain idéal et réaliser son projet immobilier en toute sérénité." },
  { icon: 'eye', title: 'Notre Vision', desc: "Devenir la référence immobilière du Sud-Comoé, de Yamoussoukro et de toute la Côte d'Ivoire, reconnue pour notre sérieux et notre transparence." },
  { icon: 'handshake', title: 'Nos Valeurs', desc: "Proximité, confiance, transparence et professionnalisme — des valeurs qui guident chacune de nos actions." },
]
</script>

<template>
  <div>
    <section class="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-8 lg:px-12 bg-navy text-center">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">À Propos</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
            <p class="text-white/70 text-base md:text-lg">
              
          Qui sommes-nous et pourquoi nous faire confiance.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center animate-on-scroll">
          <div>
            <NuxtImg :src="pdgImage" alt="PDG Atchunin Y. Antoine - Loukman & Frères Immobilier" loading="lazy" class="rounded-xl shadow-soft w-full h-auto" width="600" />
          </div>
          <div>
            <h2 class="text-fluid-title mb-3">Une équipe dédiée</h2>
            <div class="w-12 h-0.5 bg-gold rounded-full mb-5"></div>
            <div class="space-y-4 text-base leading-relaxed text-gray-600">
              <p>
                <strong class="text-navy">LOUKMAN & FRÈRES IMMOBILIER</strong> est une entreprise basée à Bonoua,
                spécialisée dans la vente de terrains, le lotissement, l'aménagement, la construction
                et la gestion immobilière dans tout le Sud-Comoé, à Yamoussoukro et partout en Côte d'Ivoire.
              </p>
              <p>
                Sous la direction de <strong class="text-navy">M. Atchunin Y. Antoine</strong>, notre entreprise s'engage
                à offrir un service sérieux, transparent et de proximité.
              </p>
              <p class="text-[0.6rem] md:text-[0.7rem] text-gray-500 pt-4 border-t border-gray-100">
                Capital de 1 000 000 FCFA — RC-CI-GRDBSM-2023-B-3965 - SIS 15 BP 35 ABIDJAN 15
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-gray-50/50">
      <div class="section-container">
          <div class="text-center mb-12 animate-on-scroll">
            <h2 class="text-fluid-title mb-3">Mission, Vision & Valeurs</h2>
            <div class="w-12 h-0.5 bg-gold rounded-full mx-auto"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          <div
            v-for="(bloc, i) in blocs"
            :key="bloc.title"
            class="card-hover text-center animate-on-scroll"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center mx-auto mb-4">
              <Icon :name="bloc.icon" class="w-5 h-5 text-navy" />
            </div>
            <h3 class="text-base md:text-lg font-semibold mb-2">{{ bloc.title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed">{{ bloc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <div class="bg-navy rounded-2xl p-8 md:p-12 text-center animate-on-scroll">
          <h2 class="text-white text-2xl md:text-3xl font-bold mb-3">Prêt à commencer ?</h2>
          <p class="text-white/70 text-sm md:text-base mb-6 max-w-md mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <a href="tel:0708342144" class="btn-cta">
              <Icon name="phone" class="w-4 h-4" />
              Appeler
            </a>
            <NuxtLink to="/contact" class="btn-outline-white">
              <Icon name="mail" class="w-4 h-4" />
              Message
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
