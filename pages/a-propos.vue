<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukmanimmobilier.com'

useHead({
  title: 'À Propos | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Découvrez Loukman & Frères Immobilier — l\'immobilier sur mesure depuis 2012 dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Vente de terrains, construction, rénovation, gestion immobilière, conseil et suivi de projets.' },
    { name: 'keywords', content: 'loukman immobilier, agence immobilière bonoua, qui sommes-nous, expertise immobilière, atchunin yao antoine, immobilier côte d\'ivoire, immobilier sur mesure' },
    { property: 'og:title', content: 'À Propos | Loukman & Frères Immobilier' },
    { property: 'og:description', content: 'L\'immobilier sur mesure — vente de terrains, construction, rénovation, gestion immobilière et accompagnement de projet.' },
    { property: 'og:image', content: siteUrl + '/logo1.png' },
    { property: 'og:url', content: siteUrl + '/a-propos' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/logo1.png' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/a-propos' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'À Propos | Loukman & Frères Immobilier',
        description: 'L\'immobilier sur mesure — vente de terrains, construction, rénovation, gestion immobilière et accompagnement de projet.',
        url: siteUrl + '/a-propos',
        mainEntity: {
          '@type': 'Organization',
          name: 'Loukman & Frères Immobilier',
          slogan: 'L\'immobilier sur mesure',
          url: siteUrl,
          logo: siteUrl + '/logo1.png',
          description: 'Agence immobilière basée à Bonoua — vente de terrains, lotissement, construction, rénovation, gestion immobilière, conseil et suivi de projets.',
          foundingDate: '2012',
          founder: { '@type': 'Person', name: 'Atchunin Yao Antoine', jobTitle: 'Directeur général' },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Yaou Nouveau Quartier',
            addressLocality: 'Bonoua',
            addressCountry: 'CI',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+2250708342144',
            email: 'loukmanfreresimmobilier@gmail.com',
            contactType: 'customer service',
            areaServed: ['Sud-Comoé', 'Yamoussoukro', 'Bonoua', 'Grand-Bassam', 'Côte d\'Ivoire'],
          },
          knowsAbout: [
            'Vente de terrains et propriétés',
            'Construction et rénovation',
            'Gestion immobilière',
            'Conseil et accompagnement',
            'Études et suivi de projets',
          ],
        },
      }),
    },
  ],
})

useAnimateOnScroll()

const services = [
  { icon: 'map-pin', label: 'Vente de terrains et propriétés' },
  { icon: 'home', label: 'Construction et rénovation' },
  { icon: 'building', label: 'Gestion immobilière' },
  { icon: 'handshake', label: 'Conseil et accompagnement' },
  { icon: 'clipboard', label: 'Études et suivi de projets' },
]

const blocs = [
  { icon: 'target', title: 'Notre mission', desc: 'Offrir des solutions immobilières fiables, innovantes et adaptées aux besoins de nos clients.' },
  { icon: 'eye', title: 'Notre vision', desc: 'Être la référence de l\'immobilier en Côte d\'Ivoire par notre sérieux, notre expertise et notre engagement.' },
]
</script>

<template>
  <div>
    <section class="bg-navy overflow-hidden">
      <h1 class="sr-only">À Propos — Loukman &amp; Frères Immobilier, l'immobilier sur mesure</h1>
      <div class="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-28 lg:pt-32">
        <div class="grid lg:grid-cols-[0.95fr_0.85fr_1.1fr] items-stretch">

          <!-- Colonne 1 : identité + services -->
          <div class="flex flex-col justify-center py-8 lg:py-14 lg:pr-8 animate-on-scroll">
            <NuxtLink to="/" class="block w-max">
              <span class="block text-white font-heading font-bold text-xl md:text-2xl tracking-tight">LOUKMAN &amp; FRÈRES</span>
              <span class="flex items-center gap-2.5 my-1">
                <span class="h-px w-5 md:w-8 bg-gold/70"></span>
                <span class="text-gold font-heading font-semibold text-sm md:text-base tracking-[0.3em]">IMMOBILIER</span>
                <span class="h-px w-5 md:w-8 bg-gold/70"></span>
              </span>
              <span class="block text-white/50 text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.28em]">L'immobilier sur mesure</span>
            </NuxtLink>

            <h2 class="mt-8 md:mt-10 mb-2.5 text-gold font-heading font-semibold text-xs md:text-sm uppercase tracking-[0.25em]">Nos services</h2>
            <div class="w-16 h-px bg-gold/50 mb-5"></div>

            <ul class="space-y-1.5">
              <li v-for="service in services" :key="service.label">
                <NuxtLink
                  to="/services"
                  class="group flex items-center gap-3 py-1.5 min-h-[44px]"
                >
                  <span class="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border border-gold/40 flex items-center justify-center text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    <Icon :name="service.icon" class="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                  <span class="text-white/85 font-heading font-semibold text-[0.7rem] md:text-sm uppercase tracking-wide leading-tight group-hover:text-gold transition-colors duration-300">
                    {{ service.label }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Colonne 2 : portrait du PDG -->
          <div class="relative h-[400px] sm:h-[480px] lg:h-[660px] overflow-hidden animate-on-scroll" style="animation-delay: 0.15s">
            <NuxtImg
              src="/bureauA.jpeg"
              alt="M. Atchunin Yao Antoine, Directeur général de Loukman & Frères Immobilier"
              class="absolute inset-0 h-full w-full object-cover object-top"
              width="896"
              height="1280"
              loading="eager"
            />
          </div>

          <!-- Colonne 3 : mission & vision -->
          <div class="bg-white px-6 md:px-8 lg:px-10 py-9 lg:py-0 lg:flex lg:flex-col lg:justify-center text-center animate-on-scroll" style="animation-delay: 0.3s">
            <p class="font-serif italic text-xl md:text-2xl text-navy leading-tight">Atchunin Yao Antoine</p>
            <p class="mt-1.5 text-gold text-[0.6rem] md:text-xs uppercase tracking-[0.3em]">Directeur général</p>

            <span class="block w-8 h-px bg-gold/60 mx-auto my-4"></span>
            <p class="text-navy font-heading font-bold text-sm md:text-lg leading-snug max-w-xs mx-auto">
              Construisons aujourd'hui le patrimoine de demain.
            </p>
            <span class="block w-8 h-px bg-gold/60 mx-auto my-4"></span>

            <div class="mt-6 space-y-4 text-left">
              <div
                v-for="bloc in blocs"
                :key="bloc.title"
                class="flex gap-3 border-l-2 border-gold/50 pl-3.5"
              >
                <span class="w-9 h-9 shrink-0 rounded-full bg-navy flex items-center justify-center text-gold">
                  <Icon :name="bloc.icon" class="w-4 h-4" />
                </span>
                <div class="min-w-0">
                  <h3 class="text-gold font-heading font-bold text-[0.7rem] md:text-xs uppercase tracking-[0.2em]">{{ bloc.title }}</h3>
                  <p class="text-gray-600 text-xs md:text-sm leading-relaxed mt-1">{{ bloc.desc }}</p>
                </div>
              </div>
            </div>

            <p class="mt-7 pt-4 border-t border-gray-100 text-[0.6rem] md:text-[0.7rem] text-gray-400 leading-relaxed">
              Capital de 1 000 000 FCFA — RC-CI-GRDBSM-2023-B-3965 — SIS 15 BP 35 ABIDJAN 15
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bandeau contact -->
    <section class="relative bg-navy">
      <svg
        class="absolute top-0 left-0 w-full h-6 md:h-12"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,3 C300,57 900,57 1200,3"
          fill="none"
          stroke="#F5A623"
          stroke-width="5"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <div class="max-w-7xl mx-auto px-5 md:px-6 pt-12 md:pt-16 pb-10 md:pb-12">
        <div class="grid sm:grid-cols-3 gap-8 sm:gap-6 text-center sm:text-left">
          <div class="flex flex-col items-center sm:items-start gap-3 sm:border-r sm:border-white/10 sm:pr-6">
            <span class="w-11 h-11 rounded-xl bg-gold flex items-center justify-center text-navy shrink-0">
              <Icon name="phone" class="w-5 h-5" />
            </span>
            <div>
              <h2 class="text-gold font-heading font-bold text-xs uppercase tracking-[0.2em] mb-1">Contactez-nous</h2>
              <a href="tel:0708342144" class="block text-white font-heading font-semibold text-lg md:text-xl hover:text-gold transition-colors">07 08 34 21 44</a>
              <a href="https://wa.me/2250708342144" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-white/60 text-xs hover:text-gold transition-colors mt-1">
                <Icon name="whatsapp" class="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

          <div class="flex flex-col items-center sm:items-start gap-3 sm:border-r sm:border-white/10 sm:px-6">
            <span class="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Icon name="map-pin" class="w-5 h-5" />
            </span>
            <div>
              <h2 class="text-gold font-heading font-bold text-xs uppercase tracking-[0.2em] mb-1">Bonoua — Côte d'Ivoire</h2>
              <p class="text-white/70 text-xs md:text-sm leading-relaxed max-w-[22rem]">
                Nous sommes à votre écoute pour concrétiser vos projets en toute confiance.
              </p>
            </div>
          </div>

          <div class="flex flex-col items-center sm:items-start gap-3 sm:pl-6">
            <span class="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Icon name="mail" class="w-5 h-5" />
            </span>
            <div class="min-w-0">
              <a href="mailto:loukmanfreresimmobilier@gmail.com" class="flex items-center gap-2 text-white/80 text-xs md:text-sm hover:text-gold transition-colors break-all">
                <Icon name="mail" class="w-4 h-4 text-gold shrink-0" />
                loukmanfreresimmobilier@gmail.com
              </a>
              <span class="flex items-center gap-2 text-white/80 text-xs md:text-sm mt-2">
                <Icon name="globe" class="w-4 h-4 text-gold shrink-0" />
                loukmanimmobilier.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>