<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukman-immobilier.com'

const { data: terrains, status, error } = useFetch('/api/terrains', { key: 'catalog-terrains' })

const itemListJsonLd = computed(() => {
  if (!terrains.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Terrains Disponibles | Loukman & Frères Immobilier',
    description: 'Consultez nos terrains disponibles dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire.',
    url: siteUrl + '/terrains',
    numberOfItems: terrains.value.length,
    itemListElement: terrains.value.slice(0, 9).map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: siteUrl + '/terrains/' + t.id,
      name: `Terrain à ${t.lieu}`,
    })),
  }
})

useHead({
  title: 'Terrains Disponibles | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Consultez nos terrains disponibles dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Terrains viabilisés et sécurisés pour votre projet immobilier.' },
    { name: 'keywords', content: 'terrain bonoua, achat terrain, vente terrain côte d\'ivoire, terrains disponibles, lotissement yaou, terrain viabilisé, investissement terrain, prix terrain bonoua' },
    { property: 'og:title', content: 'Terrains Disponibles | Loukman & Frères Immobilier' },
    { property: 'og:description', content: 'Consultez nos terrains disponibles dans le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire.' },
    { property: 'og:image', content: siteUrl + '/og-image.svg' },
    { property: 'og:url', content: siteUrl + '/terrains' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_CI' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl + '/og-image.svg' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/terrains' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => itemListJsonLd.value ? JSON.stringify(itemListJsonLd.value) : ''),
    },
  ],
})

useAnimateOnScroll()

const loading = computed(() => status.value === 'pending')
const showFloatingSearch = ref(false)

function isNew(t: { createdAt?: string }) {
  if (!t.createdAt) return false
  const diff = Date.now() - new Date(t.createdAt).getTime()
  return diff < 7 * 24 * 60 * 60 * 1000
}

const recherche = ref('')
const lieuFiltre = ref('all')

const lieuxRecents = computed(() => {
  if (!terrains.value) return []
  const seen = new Set()
  const sorted = [...terrains.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return sorted.filter(t => {
    if (!t.lieu || seen.has(t.lieu)) return false
    seen.add(t.lieu)
    return true
  }).slice(0, 7).map(t => t.lieu)
})

const items = computed(() => {
  if (error.value || !terrains.value) return []
  const q = recherche.value.toLowerCase().trim()
  let result = [...terrains.value]
  if (q) {
    result = result.filter(t =>
      (t.lieu || '').toLowerCase().includes(q) ||
      (t.quartier || '').toLowerCase().includes(q) ||
      (t.zone || '').toLowerCase().includes(q) ||
      (t.superficie || '').toLowerCase().includes(q) ||
      (t.prix || '').toLowerCase().includes(q)
    )
  }
  if (lieuFiltre.value !== 'all') {
    result = result.filter(t => t.lieu === lieuFiltre.value)
  }
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return result
})

const totalCatPages = computed(() => Math.max(1, Math.ceil(items.value.length / perPage)))

const catItems = computed(() => {
  const start = (catPage.value - 1) * perPage
  return items.value.slice(start, start + perPage)
})

const inView = reactive(new Set())
let observer = null
const currentIndex = ref({})
const timers = ref({})
const catPage = ref(1)
const perPage = 9

const cardImages = computed(() => {
  return (t) => (t.images || []).filter(img => img.type !== 'video')
})

function getCurrentIndex(t) {
  return currentIndex.value[t.id] ?? 0
}

function startCarousel(t) {
  const imgs = cardImages.value(t)
  if (imgs.length <= 1) return
  stopCarousel(t.id)
  timers.value[t.id] = setInterval(() => {
    currentIndex.value[t.id] = ((currentIndex.value[t.id] ?? 0) + 1) % imgs.length
  }, 3500)
}

function stopCarousel(id) {
  if (timers.value[id]) {
    clearInterval(timers.value[id])
    delete timers.value[id]
  }
}

watch([recherche, lieuFiltre], () => { catPage.value = 1 })

onMounted(() => {
  const onScroll = () => {
    const hero = document.querySelector('[data-hero-section]')
    if (hero) {
      const heroBottom = hero.getBoundingClientRect().bottom
      showFloatingSearch.value = heroBottom < 0
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})

onUnmounted(() => {
  Object.values(timers.value).forEach(clearInterval)
})

function prevImage(t, e) {
  e.preventDefault()
  e.stopPropagation()
  const imgs = cardImages.value(t)
  if (!imgs.length) return
  currentIndex.value[t.id] = ((currentIndex.value[t.id] ?? 0) - 1 + imgs.length) % imgs.length
  stopCarousel(t.id)
}

function nextImage(t, e) {
  e.preventDefault()
  e.stopPropagation()
  const imgs = cardImages.value(t)
  if (!imgs.length) return
  currentIndex.value[t.id] = ((currentIndex.value[t.id] ?? 0) + 1) % imgs.length
  stopCarousel(t.id)
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
    <section data-hero-section class="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-8 lg:px-12 bg-navy text-center">
      <div class="max-w-3xl mx-auto animate-on-scroll">
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Terrains Disponibles</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
        <p class="text-white/70 text-base md:text-lg">
          Découvrez notre sélection de terrains dans le Sud-Comoé, à Yamoussoukro et partout en Côte d'Ivoire.
        </p>
      </div>
    </section>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="showFloatingSearch"
        class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100 px-4 md:px-8 py-3"
      >
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="relative w-full sm:max-w-md">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            <input
              v-model="recherche"
              placeholder="Rechercher..."
              class="w-full pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-xl focus:border-navy focus-visible:outline-none outline-none transition-all text-sm"
            />
            <button v-if="recherche" @click="recherche = ''" class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
              <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
            <button
              @click="lieuFiltre = 'all'"
              class="whitespace-nowrap px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
              :class="lieuFiltre === 'all' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >Tous</button>
            <button
              v-for="l in lieuxRecents"
              :key="l"
              @click="lieuFiltre = l"
              class="whitespace-nowrap px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
              :class="lieuFiltre === l ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >{{ l }}</button>
          </div>
        </div>
      </div>
    </transition>

    <section class="section-padding">
      <div class="section-container">
        <div class="flex flex-col gap-3 mb-8 max-w-5xl mx-auto w-full">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="relative w-full sm:max-w-md">
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
              <input
                v-model="recherche"
                placeholder="Rechercher..."
                class="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-navy focus-visible:outline-none outline-none transition-all text-sm"
              />
              <button v-if="recherche" @click="recherche = ''" class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
              <button
                @click="lieuFiltre = 'all'"
                class="whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                :class="lieuFiltre === 'all' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              >Tous</button>
              <button
                v-for="l in lieuxRecents"
                :key="l"
                @click="lieuFiltre = l"
                class="whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                :class="lieuFiltre === l ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              >{{ l }}</button>
            </div>
          </div>
        </div>

        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div v-for="n in 9" :key="n" class="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
            <div class="skeleton h-44 md:h-48 rounded-none"></div>
            <div class="p-5 space-y-3">
              <div class="skeleton h-5 w-2/3"></div>
              <div class="skeleton h-4 w-1/2"></div>
              <div class="skeleton h-4 w-1/3"></div>
              <div class="skeleton h-5 w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="items.length === 0 && !recherche && !loading" class="text-center py-16 animate-on-scroll">
          <p class="text-gray-500 text-lg mb-3">Aucun terrain disponible pour le moment</p>
          <p class="text-gray-500 text-sm mb-6">Revenez bientôt ou contactez-nous pour plus d'informations.</p>
          <NuxtLink to="/contact" class="btn-cta">Nous contacter</NuxtLink>
        </div>

        <div v-else-if="items.length === 0 && recherche && !loading" class="text-center py-16 animate-on-scroll">
          <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          </div>
          <p class="text-gray-500 text-lg mb-2">Aucun résultat pour "{{ recherche }}"</p>
          <p class="text-gray-400 text-sm mb-6">Essayez un autre mot-clé (lieu, zone, superficie, prix)</p>
          <button @click="recherche = ''" class="btn-outline">Effacer la recherche</button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          <div
            v-for="(t, i) in catItems"
            :key="t.id"
            :ref="el => { if (el) observeCard(el, i) }"
            class="card-3d-grid"
            :class="{ 'in-view': inView.has(i) }"
            :style="{ '--i': i }"
          >
            <NuxtLink
              :to="`/terrains/${t.id}`"
              @mouseenter="startCarousel(t)"
              @mouseleave="stopCarousel(t.id)"
              class="block bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-card group cursor-pointer"
            >
              <div class="relative overflow-hidden h-36 md:h-48 bg-gray-100">
                <img
                  :src="cardImages(t)[getCurrentIndex(t)]?.url || `https://placehold.co/600x400/0B1B3D/F5A623?text=Terrain+${encodeURIComponent(t.lieu)}`"
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

                <span
                  v-if="isNew(t)"
                  class="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gold/50 text-gold bg-white/80 backdrop-blur-sm shadow-xs flex items-center gap-1.5"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulseSoft shrink-0"></span>
                  Nouveau
                </span>

                <button
                  v-if="cardImages(t).length > 1"
                  @click="prevImage(t, $event)"
                  aria-label="Image précédente"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  v-if="cardImages(t).length > 1"
                  @click="nextImage(t, $event)"
                  aria-label="Image suivante"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>

                <div
                  v-if="cardImages(t).length > 1"
                  class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
                >
                  <button
                    v-for="(_, di) in cardImages(t)"
                    :key="di"
                    @click="goToImage(t, di, $event)"
                    :aria-label="`Aller à l'image ${di + 1}`"
                    class="w-1.5 h-1.5 rounded-full transition-all"
                    :class="di === getCurrentIndex(t) ? 'bg-white' : 'bg-white/40'"
                  ></button>
                </div>
              </div>

              <div class="p-3 md:p-5">
                <h3 class="text-sm md:text-lg font-heading font-semibold text-navy mb-0.5 md:mb-1 group-hover:text-gold transition-colors">{{ t.lieu }}</h3>
                <p class="text-[11px] md:text-sm text-gray-500 mb-0.5 md:mb-2">{{ t.quartier }}</p>
                <p class="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-1 md:mb-3">{{ t.superficie }}</p>
                <p v-if="t.zone" class="text-[11px] md:text-xs text-gray-400 mb-0.5 md:mb-1">Zone : {{ t.zone }}</p>
                <p class="text-gold font-heading font-semibold text-xs md:text-base mb-2 md:mb-4">{{ t.prix }}</p>
                <span class="btn-detail inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-navy text-white text-[11px] md:text-sm font-semibold transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
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

        <div v-if="totalCatPages > 1" class="flex items-center justify-center gap-3 mt-10 md:mt-12 animate-on-scroll">
          <button
            :disabled="catPage <= 1"
            @click="catPage = Math.max(1, catPage - 1)"
            aria-label="Page précédente"
            class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:border-navy hover:text-navy transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <button
            v-for="p in totalCatPages"
            :key="p"
            @click="catPage = p"
            :aria-label="`Aller à la page ${p}`"
            class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            :class="p === catPage ? 'bg-navy text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'"
          >
            {{ p }}
          </button>

          <button
            :disabled="catPage >= totalCatPages"
            @click="catPage = Math.min(totalCatPages, catPage + 1)"
            aria-label="Page suivante"
            class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:border-navy hover:text-navy transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div class="text-center mt-8 md:mt-10 animate-on-scroll">
          <p class="text-gray-500 text-sm mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <NuxtLink to="/contact" class="btn-cta">
            Contactez-nous
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>