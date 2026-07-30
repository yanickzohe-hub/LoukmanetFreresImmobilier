<script setup>
useHead({
  title: 'Nos Services | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Vente de terrains, lotissement, aménagement, construction et gestion immobilière dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Découvrez tous nos services.' },
    { name: 'keywords', content: 'service immobilier bonoua, vente terrain, lotissement, construction villa, aménagement terrain, gestion immobilière, accompagnement projet' },
  ]
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
