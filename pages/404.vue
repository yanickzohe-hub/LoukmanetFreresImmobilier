<script setup>
useHead({
  title: 'Page non trouvée | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'La page que vous cherchez n\'existe pas ou a été déplacée. Retournez à l\'accueil ou contactez-nous au 07 08 34 21 44.' }
  ]
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <p class="text-7xl md:text-8xl font-heading font-bold text-navy/10 mb-4">404</p>
      <h1 class="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">Page non trouvée</h1>
      <p class="text-gray-500 text-sm md:text-base mb-8">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <NuxtLink to="/" class="btn-cta">
        Retour à l'accueil
      </NuxtLink>
    </div>
  </div>ok
</template>
