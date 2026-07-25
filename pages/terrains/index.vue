<script setup>
useHead({
  title: 'Terrains Disponibles | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Consultez nos terrains disponibles à Bonoua, Yaou et environs. Terrains viabilisés et sécurisés pour votre projet immobilier en Côte d\'Ivoire.' },
    { name: 'keywords', content: 'terrain bonoua, achat terrain, vente terrain côte d\'ivoire, terrains disponibles, lotissement yaou, terrain viabilisé, investissement terrain, prix terrain bonoua' },
  ]
})

useAnimateOnScroll()

const { data: terrains, status, error } = await useFetch('/api/terrains')

const loading = computed(() => status.value === 'pending')

const items = computed(() => {
  if (error.value || !terrains.value) return []
  return terrains.value
})

const inView = reactive(new Set())
let observer = null
const currentIndex = ref({})

const cardImages = computed(() => {
  return (t) => (t.images || []).filter(img => img.type !== 'video')
})

function getCurrentIndex(t) {
  return currentIndex.value[t.id] ?? 0
}

function prevImage(t, e) {
  e.preventDefault()
  e.stopPropagation()
  const imgs = cardImages.value(t)
  if (!imgs.length) return
  currentIndex.value[t.id] = ((currentIndex.value[t.id] ?? 0) - 1 + imgs.length) % imgs.length
}

function nextImage(t, e) {
  e.preventDefault()
  e.stopPropagation()
  const imgs = cardImages.value(t)
  if (!imgs.length) return
  currentIndex.value[t.id] = ((currentIndex.value[t.id] ?? 0) + 1) % imgs.length
}

function observeCard(el, i) {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const idx = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
          inView.add(idx)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
  }
  el.dataset.index = i
  observer.observe(el)
}
</script>

<template>
  <div>
    <section class="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-8 lg:px-12 bg-navy text-center">
      <div class="max-w-3xl mx-auto animate-on-scroll">
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Terrains Disponibles</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
        <p class="text-white/70 text-base md:text-lg">
          Découvrez notre sélection de terrains à Bonoua et environs.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div v-for="n in 6" :key="n" class="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
            <div class="skeleton h-44 md:h-48 rounded-none"></div>
            <div class="p-5 space-y-3">
              <div class="skeleton h-5 w-2/3"></div>
              <div class="skeleton h-4 w-1/2"></div>
              <div class="skeleton h-4 w-1/3"></div>
              <div class="skeleton h-5 w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="items.length === 0" class="text-center py-16 animate-on-scroll">
          <p class="text-gray-500 text-lg mb-3">Aucun terrain disponible pour le moment</p>
          <p class="text-gray-500 text-sm mb-6">Revenez bientôt ou contactez-nous pour plus d'informations.</p>
          <NuxtLink to="/contact" class="btn-cta">Nous contacter</NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          <div
            v-for="(t, i) in items"
            :key="t.id"
            :ref="el => { if (el) observeCard(el, i) }"
            class="card-3d-grid"
            :class="{ 'in-view': inView.has(i) }"
            :style="{ '--i': i }"
          >
            <NuxtLink
              :to="`/terrains/${t.id}`"
              class="block bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-card group cursor-pointer"
            >
              <div class="relative overflow-hidden h-44 md:h-48 bg-gray-100">
                <NuxtImg
                  :src="cardImages(t)[getCurrentIndex(t)]?.url || `https://placehold.co/600x400/0B1B3D/F5A623?text=Terrain+${t.lieu}`"
                  :alt="`Terrain à ${t.lieu}`"
                  loading="lazy"
                  width="600" height="400"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div v-if="t.images?.[0]?.type === 'video'" class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <span
                  class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md"
                  :class="t.statut === 'Disponible' ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'"
                >
                  {{ t.statut }}
                </span>

                <button
                  v-if="cardImages(t).length > 1"
                  @click="prevImage(t, $event)"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  v-if="cardImages(t).length > 1"
                  @click="nextImage(t, $event)"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>

                <div
                  v-if="cardImages(t).length > 1"
                  class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
                >
                  <span
                    v-for="(_, di) in cardImages(t)"
                    :key="di"
                    class="w-1.5 h-1.5 rounded-full transition-all"
                    :class="di === getCurrentIndex(t) ? 'bg-white' : 'bg-white/40'"
                  ></span>
                </div>
              </div>

              <div class="p-5">
                <h3 class="text-lg font-heading font-semibold text-navy mb-1 group-hover:text-gold transition-colors">{{ t.lieu }}</h3>
                <p class="text-sm text-gray-500 mb-2">{{ t.quartier }}</p>
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-3">{{ t.superficie }}</p>
                <p v-if="t.zone" class="text-xs text-gray-400 mb-1">Zone : {{ t.zone }}</p>
                <p class="text-gold font-heading font-semibold text-base mb-4">{{ t.prix }}</p>
                <span class="btn-detail inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                  <span>Détails</span>
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-navy/20 transition-all duration-300">
                    <svg class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </span>
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="text-center mt-12 animate-on-scroll">
          <p class="text-gray-500 text-sm mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <NuxtLink to="/contact" class="btn-cta">
            Contactez-nous
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
