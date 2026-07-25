<template>
  <section class="bg-navy section-padding">
    <div class="section-container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div v-for="(stat, i) in stats" :key="stat.label" class="text-center animate-on-scroll" :style="{ animationDelay: `${i * 0.1}s` }">
          <div class="text-2xl md:text-4xl font-heading font-bold text-gold mb-1">{{ stat.value }}</div>
          <div class="text-white/70 text-xs md:text-sm">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '120+', label: 'Terrains disponibles' },
  { value: '12', label: "Années d'expérience" },
  { value: '340+', label: 'Projets réalisés' },
  { value: '98%', label: 'Clients satisfaits' },
]
</script>
