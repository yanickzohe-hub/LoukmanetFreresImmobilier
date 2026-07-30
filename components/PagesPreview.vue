<script setup>
useAnimateOnScroll()

const sections = [
  {
    id: 'services',
    title: 'Nos Services',
    tag: '01',
    desc: "De l'acquisition à la construction, nous maîtrisons toute la chaîne immobilière.",
    features: [
      'Vente de terrains', 'Lotissement',
      'Aménagement / Voirie', 'Pose de poteaux',
      'Construction', 'Gestion immobilière',
    ],
    link: '/services',
    label: 'Tous nos services',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=700&h=500&fit=crop&q=80',
  },
  {
    id: 'terrains',
    title: 'Terrains Disponibles',
    tag: '02',
    desc: 'Terrains viabilisés et sécurisés dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire.',
    features: [
      'Bonoua — Yaou Nouveau Quartier',
      'Bonoua — Extension',
      'Yaou — Centre',
      'Superficies de 400 à 800 m²',
      'Prix à partir de 2 500 000 FCFA',
      'Titres fonciers sécurisés',
    ],
    link: '/terrains',
    label: 'Voir les terrains',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=500&fit=crop&q=80',
  },
  {
    id: 'apropos',
    title: 'À Propos',
    tag: '03',
    desc: 'Expertise locale depuis 2012. Une équipe dédiée à votre service.',
    features: [
      "Plus de 12 ans d'expertise locale",
      'Plus de 340 projets réalisés',
      '98% de clients satisfaits',
      'Capital de 1 000 000 FCFA',
      'Dirigé par M. Atchunin Y. Antoine',
      'Service transparent et de proximité',
    ],
    link: '/a-propos',
    label: 'Notre histoire',
    image: 'https://placehold.co/700x500/0B1B3D/F5A623?text=Loukman+%26+Fr%C3%A8res',
  },
  {
    id: 'contact',
    title: 'Contact',
    tag: '04',
    desc: 'Une question, un projet ? Nous sommes à votre écoute.',
    contacts: [
      { icon: 'phone', value: '07 08 34 21 44', href: 'tel:0708342144' },
      { icon: 'mail', value: 'loukmanfreresimmobilier@gmail.com', href: 'mailto:loukmanfreresimmobilier@gmail.com' },
      { icon: 'map-pin', value: 'Bonoua, Yaou Nouveau Quartier' },
    ],
    link: '/contact',
    label: 'Nous contacter',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=700&h=500&fit=crop&q=80',
  },
]
</script>

<template>
  <div>
    <section
      v-for="(section, i) in sections"
      :key="section.id"
      class="section-padding"
      :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'"
    >
      <div class="section-container">
        <div
          class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          <div
            class="animate-on-scroll"
            :class="i % 2 === 0 ? 'md:order-1' : 'md:order-2'"
          >
            <span class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-gold uppercase mb-3">
              <span class="w-6 h-px bg-gold/60"></span>
              {{ section.tag }}
            </span>
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-navy mb-3">
              {{ section.title }}
            </h2>
            <p class="text-gray-500 text-sm md:text-base mb-6 leading-relaxed max-w-md">
              {{ section.desc }}
            </p>

            <ul v-if="section.features" class="space-y-2 mb-6 md:mb-8">
              <li
                v-for="feature in section.features"
                :key="feature"
                class="flex items-center gap-3 text-sm text-gray-600"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                {{ feature }}
              </li>
            </ul>

            <ul v-else-if="section.contacts" class="space-y-3 mb-6 md:mb-8">
              <li v-for="contact in section.contacts" :key="contact.value">
                <a
                  v-if="contact.href"
                  :href="contact.href"
                  class="inline-flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors"
                >
                  <Icon :name="contact.icon" class="w-4 h-4 text-gold" />
                  {{ contact.value }}
                </a>
                <span v-else class="inline-flex items-center gap-3 text-sm text-gray-600">
                  <Icon :name="contact.icon" class="w-4 h-4 text-gold" />
                  {{ contact.value }}
                </span>
              </li>
            </ul>

            <NuxtLink
              :to="section.link"
              class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold transition-all duration-300 hover:bg-gold hover:text-navy active:scale-[0.98]"
            >
              <span>{{ section.label }}</span>
              <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>

          <div
            class="animate-on-scroll"
            :class="i % 2 === 0 ? 'md:order-2' : 'md:order-1'"
            :style="{ animationDelay: '0.15s' }"
          >
            <div class="relative rounded-2xl overflow-hidden shadow-card group">
              <div class="aspect-[7/5] overflow-hidden">
                <img
                  :src="section.image"
                  :alt="section.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
