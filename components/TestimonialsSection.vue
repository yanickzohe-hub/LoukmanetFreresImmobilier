<script setup>
useAnimateOnScroll()

const testimonials = [
  {
    name: 'Kouamé A.',
    role: 'Propriétaire à Bonoua',
    text: 'Un accompagnement exceptionnel du début à la fin. J\'ai trouvé le terrain idéal pour construire ma maison. Je recommande vivement !',
    rating: 5,
  },
  {
    name: 'Mariam D.',
    role: 'Investisseur',
    text: 'Professionnalisme et transparence. Les titres fonciers sont clairs et l\'équipe est réactive. Un partenaire de confiance.',
    rating: 5,
  },
  {
    name: 'Jean-Baptiste K.',
    role: 'Promoteur immobilier',
    text: 'Nous travaillons avec Loukman & Frères depuis 3 ans. Toujours au rendez-vous, des terrains de qualité et un service sérieux.',
    rating: 5,
  },
]
</script>

<template>
  <section class="section-padding bg-gray-50/70">
    <div class="section-container">
      <div class="text-center max-w-2xl mx-auto mb-10 md:mb-14 animate-on-scroll">
        <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Témoignages</span>
        <h2 class="text-fluid-title mb-3">Ce que disent nos clients</h2>
        <div class="w-12 h-0.5 bg-gold rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500 text-sm md:text-base">
          La satisfaction de nos clients est notre plus belle récompense.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="bg-white rounded-xl border border-gray-100 shadow-soft p-6 md:p-7 animate-on-scroll"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="flex items-center gap-1 mb-4">
            <svg v-for="n in t.rating" :key="n" class="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed mb-5 italic">"{{ t.text }}"</p>
          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div class="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center">
              <span class="text-xs font-bold text-navy">{{ t.name.charAt(0) }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-navy">{{ t.name }}</p>
              <p class="text-xs text-gray-500">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
