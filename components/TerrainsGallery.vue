<script setup>
useAnimateOnScroll()

const { data: terrains, error } = await useFetch('/api/terrains')

const page = ref(1)
const perPage = 3
const currentIndex = ref({})

const allItems = computed(() => {
  if (error.value || !terrains.value || terrains.value.length === 0) {
    return [
      { id: 1, lieu: 'Bonoua', quartier: 'Yaou Nouveau Quartier', superficie: '600 m\u00b2', prix: '\u00c0 partir de 3 500 000 FCFA', statut: 'Disponible', images: [{ url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop&q=80' }] },
      { id: 2, lieu: 'Yaou', quartier: 'Centre', superficie: '400 m\u00b2', prix: '\u00c0 partir de 2 500 000 FCFA', statut: 'Disponible', images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80' }] },
      { id: 4, lieu: 'Bonoua', quartier: 'Yaou Nouveau Quartier', superficie: '500 m\u00b2', prix: '\u00c0 partir de 3 000 000 FCFA', statut: 'Disponible', images: [{ url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop&q=80' }] },
    ]
  }
  return terrains.value || []
})

const totalPages = computed(() => Math.max(1, Math.ceil(allItems.value.length / perPage)))

const items = computed(() => {
  const start = (page.value - 1) * perPage
  return allItems.value.slice(start, start + perPage)
})

const cardImages = computed(() => {
  return (t) => (t.images || []).filter(img => img.type !== 'video')
})

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

function getCurrentIndex(t) {
  return currentIndex.value[t.id] ?? 0
}
</script>

<template>
  <section class="section-padding">
    <div class="section-container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10 animate-on-scroll">
        <div class="max-w-lg">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Terrains</span>
          <h2 class="text-fluid-title mb-2">Nos terrains disponibles</h2>
          <p class="text-gray-500 text-sm">Des parcelles viabilisées dans les meilleurs quartiers de Bonoua.</p>
        </div>
        <NuxtLink
          to="/terrains"
          class="group inline-flex items-center gap-2 text-sm font-semibold text-navy shrink-0"
        >
          Voir tout
          <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <NuxtLink
          v-for="(t, i) in items"
          :key="t.id"
          to="/terrains"
          class="group block bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-card transition-all duration-300 animate-on-scroll cursor-pointer"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="relative overflow-hidden h-44 bg-gray-100">
            <NuxtImg
              :src="cardImages(t)[getCurrentIndex(t)]?.url || `https://placehold.co/600x400/0B1B3D/F5A623?text=Terrain+${t.lieu}`"
              :alt="`Terrain à ${t.lieu}`"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width="600" height="400"
            />
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

          <div class="p-4 md:p-5">
            <h3 class="text-base font-heading font-semibold text-navy mb-1">{{ t.lieu }}</h3>
            <p class="text-xs text-gray-500 mb-1">{{ t.quartier }}</p>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">{{ t.superficie }}</p>
            <p class="text-gold font-heading font-semibold text-sm mb-3">{{ t.prix }}</p>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-gold transition-colors">
              Voir les détails
              <svg class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-3 mt-8 md:mt-10 animate-on-scroll">
        <button
          :disabled="page <= 1"
          @click="page = Math.max(1, page - 1)"
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:border-navy hover:text-navy transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <span
          v-for="p in totalPages"
          :key="p"
          @click="page = p"
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold cursor-pointer transition-all"
          :class="p === page ? 'bg-navy text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'"
        >
          {{ p }}
        </span>

        <button
          :disabled="page >= totalPages"
          @click="page = Math.min(totalPages, page + 1)"
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:border-navy hover:text-navy transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
