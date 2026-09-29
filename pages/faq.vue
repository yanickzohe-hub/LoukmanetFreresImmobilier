<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukmanimmobilier.com'

const faq = [
  {
    q: 'Quels documents vérifier avant d\'acheter un terrain en Côte d\'Ivoire ?',
    a: 'Vérifiez le titre foncier individuel ou l\'attestation de propriété, le plan de bornage certifié, l\'extrait de plan cadastral et l\'attestation de non-litige. Nos équipes contrôlent chaque document avec vous avant la signature, puis le transfert s\'effectue devant notaire.',
  },
  {
    q: 'Combien coûte un terrain à Bonoua ?',
    a: 'Le prix dépend du quartier, de la superficie et de l\'état de viabilisation : le Yaou Nouveau Quartier, Grand-Bassam et les lotissements aménagés n\'ont pas les mêmes tarifs. Les prix réels sont affichés sur chaque fiche, et un paiement échelonné est prévu selon les terrains.',
  },
  {
    q: 'Proposez-vous des terrains viabilisés avec titre foncier ?',
    a: 'Oui. La plupart de nos parcelles sont déjà viabilisées (accès, eau, électricité) et vendues avec titre foncier ou attestation de propriété. Les documents sont présentés avant la visite.',
  },
  {
    q: 'Proposez-vous un paiement échelonné ?',
    a: 'Oui, selon les terrains : un acompte est versé à la signature, puis des échéances convenues de gré à gré sont formalisées par écrit avant tout paiement.',
  },
  {
    q: 'Qui paie le notaire et les frais de transfert ?',
    a: 'Les frais de transfert (notaire, enregistrement) sont partagés selon l\'usage local : nous vous remettons un devis détaillé avant l\'acte, sans surprise à la signature.',
  },
  {
    q: 'Construisez-vous aussi des maisons ?',
    a: 'Oui : étude de faisabilité, plans, gros œuvre et finition. Vous recevez un devis détaillé à partir de vos plans ou de nos propositions de villa.',
  },
  {
    q: 'Intervenez-vous en dehors de Bonoua ?',
    a: 'Oui : Sud-Comoé (Bonoua, Grand-Bassam, Dabou), Yamoussoukro et partout en Côte d\'Ivoire pour la vente de terrains, la construction et la gestion immobilière.',
  },
  {
    q: 'Comment organiser une visite de terrain ?',
    a: 'Un appel ou un message WhatsApp au +225 07 08 34 21 44, ou le formulaire de contact : la visite est gratuite et généralement organisée sous 48 heures.',
  },
]

useHead({
  title: 'Questions fréquentes sur l\'achat de terrain | Loukman',
  meta: [
    { name: 'description', content: 'Documents à vérifier, prix d\'un terrain à Bonoua, titre foncier, paiement échelonné, frais de notaire et visite : toutes les réponses sur l\'achat d\'un terrain en Côte d\'Ivoire.' },
    { name: 'keywords', content: 'questions fréquentes, acheter terrain côte d\'ivoire, prix terrain bonoua, titre foncier, documents terrain, frais notaire, paiement échelonné terrain, visite terrain' },
    { property: 'og:title', content: 'Questions fréquentes sur l\'achat de terrain | Loukman' },
    { property: 'og:description', content: 'Documents, prix, titre foncier, paiement échelonné et frais de notaire : toutes les réponses avant d\'acheter un terrain en Côte d\'Ivoire.' },
    { property: 'og:image', content: siteUrl + '/og-image.png' },
    { property: 'og:url', content: siteUrl + '/faq' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.png' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/faq' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl + '/' },
          { '@type': 'ListItem', position: 2, name: 'Questions fréquentes', item: siteUrl + '/faq' },
        ],
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
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Questions fréquentes</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
        <p class="text-white/70 text-base md:text-lg">
          Tout savoir avant d'acheter un terrain : documents, prix, titre foncier,
          paiement et visite.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <div class="max-w-4xl mx-auto space-y-5 md:space-y-6">
          <div
            v-for="(item, i) in faq"
            :key="i"
            class="bg-white rounded-xl border border-gray-100 shadow-soft p-5 md:p-7 animate-on-scroll"
          >
            <h2 class="text-base md:text-lg font-heading font-semibold text-navy mb-2 md:mb-3">
              {{ item.q }}
            </h2>
            <p class="text-gray-500 text-sm md:text-base leading-relaxed">
              {{ item.a }}
            </p>
          </div>
        </div>

        <div class="max-w-4xl mx-auto mt-8 md:mt-10 text-center animate-on-scroll">
          <p class="text-gray-500 text-sm mb-4">Vous n'avez pas trouvé votre réponse ?</p>
          <NuxtLink to="/contact" class="btn-cta">Contactez-nous</NuxtLink>
        </div>
      </div>
    </section>

    <LazyCtaSection />
  </div>
</template>
