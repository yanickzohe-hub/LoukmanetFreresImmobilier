<script setup>
useAnimateOnScroll()

const features = [
  {
    title: 'Vente de terrains',
    desc: 'Terrains sécurisés dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire avec titres fonciers clairs.',
    icon: 'home',
  },
  {
    title: 'Lotissement',
    desc: 'Découpage et viabilisation complète : voiries, eau, électricité.',
    icon: 'map',
  },
  {
    title: 'Aménagement',
    desc: 'Transformation de vos terrains en espaces prêts à bâtir.',
    icon: 'road',
  },
  {
    title: 'Construction',
    desc: 'Accompagnement de la fondation à la toiture.',
    icon: 'building',
  },
  {
    title: 'Gestion immobilière',
    desc: 'Location, baux et suivi administratif en toute sérénité.',
    icon: 'key',
  },
  {
    title: 'Accompagnement',
    desc: 'Conseil personnalisé à chaque étape de votre projet.',
    icon: 'handshake',
  },
]
</script>

<template>
  <section class="section-padding">
    <div class="section-container">
      <div class="text-center max-w-2xl mx-auto mb-10 md:mb-14 animate-on-scroll">
        <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Nos Services</span>
        <h2 class="text-fluid-title mb-3">Tout l'immobilier en un lieu</h2>
        <div class="w-12 h-0.5 bg-gold rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500 text-sm md:text-base">
          De l'acquisition du terrain à la construction, nous vous accompagnons à chaque étape.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="group bg-white rounded-xl border border-gray-100 shadow-soft p-5 md:p-6 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 animate-on-scroll"
          :style="{ animationDelay: `${i * 0.06}s` }"
        >
          <div class="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center mb-3 group-hover:bg-navy/10 transition-colors">
            <Icon :name="f.icon" class="w-5 h-5 text-navy" />
          </div>
          <h3 class="text-sm md:text-base font-heading font-semibold text-navy mb-1.5">{{ f.title }}</h3>
          <p class="text-xs md:text-sm text-gray-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
