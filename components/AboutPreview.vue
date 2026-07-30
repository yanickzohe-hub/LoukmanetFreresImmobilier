<script setup>
useAnimateOnScroll()

const avantages = [
  "Plus de 12 ans d'expertise dans le Sud-Comoé, à Yamoussoukro et partout en Côte d'Ivoire",
  'Plus de 340 projets réalisés avec succès',
  '98% de clients satisfaits',
  'Titres fonciers sécurisés et transparents',
  'Accompagnement personnalisé de A à Z',
]
</script>

<template>
  <section class="section-padding bg-gray-50/70">
    <div class="section-container">
      <div class="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div class="animate-on-scroll">
          <div class="relative">
            <div class="rounded-2xl overflow-hidden shadow-card">
              <img
                src="/pdg.png"
                alt="M. Atchunin Y. Antoine - PDG Loukman & Frères Immobilier"
                class="w-full h-auto"
              />
            </div>
            <div class="absolute -bottom-3 -right-3 w-28 h-28 rounded-2xl bg-navy flex items-center justify-center shadow-lg">
              <div class="text-center">
                <p class="text-gold font-heading font-bold text-lg">2012</p>
                <p class="text-white/60 text-[10px] uppercase tracking-wider">Depuis</p>
              </div>
            </div>
          </div>
        </div>

        <div class="animate-on-scroll" style="animation-delay: 0.15s">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">À Propos</span>
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-navy mb-3">
            Une expertise locale<br/>au service de votre projet
          </h2>
          <div class="w-10 h-0.5 bg-gold rounded-full mb-4"></div>
          <p class="text-gray-500 text-sm md:text-base leading-relaxed mb-5">
            Sous la direction de <strong class="text-navy">M. Atchunin Y. Antoine</strong>,
            Loukman & Frères Immobilier s'engage à offrir un service sérieux,
            transparent et de proximité depuis plus d'une décennie.
          </p>

          <ul class="space-y-2.5 mb-6">
            <li
              v-for="avantage in avantages"
              :key="avantage"
              class="flex items-start gap-3 text-sm text-gray-600"
            >
              <span class="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </span>
              {{ avantage }}
            </li>
          </ul>

          <NuxtLink
            to="/a-propos"
            class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold transition-all duration-300 hover:bg-gold hover:text-navy active:scale-[0.98]"
          >
            En savoir plus
            <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
