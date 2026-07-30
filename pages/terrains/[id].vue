<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://loukman-immobilier.com'
const id = Number(route.params.id)

const { data: terrain } = await useFetch(`/api/terrains/${id}`)

const currentImage = ref(0)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const images = computed(() => {
  return terrain.value?.images?.length ? terrain.value.images : []
})

function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true }
function closeLightbox() { lightboxOpen.value = false }
function prevLightbox() { lightboxIndex.value = (lightboxIndex.value - 1 + images.value.length) % images.value.length }
function nextLightbox() { lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length }
function onLightboxKeydown(e) {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevLightbox()
  if (e.key === 'ArrowRight') nextLightbox()
}

onMounted(() => {
  watch(lightboxOpen, (v) => {
    if (v) {
      nextTick(() => document.addEventListener('keydown', onLightboxKeydown))
    } else {
      document.removeEventListener('keydown', onLightboxKeydown)
    }
  })
})

const { data: similaires } = await useFetch(`/api/terrains/${id}/similaires`)

const statusClass = computed(() => {
  if (terrain.value?.statut === 'Disponible') return 'bg-green-600 text-white'
  if (terrain.value?.statut === 'Réservé') return 'bg-gold text-navy'
  return 'bg-gray-500 text-white'
})

const acheterUrl = computed(() => {
  if (!terrain.value) return 'https://wa.me/2250708342144'
  const msg = `Je veux acheter ce terrain : ${terrain.value.lieu} (${terrain.value.quartier}) - ${terrain.value.superficie} - ${terrain.value.prix}`
  return `https://wa.me/2250708342144?text=${encodeURIComponent(msg)}`
})

const whatsappUrl = computed(() => {
  if (!terrain.value) return 'https://wa.me/2250708342144'
  const message = `Bonjour, je suis intéressé par le terrain à ${terrain.value.lieu} (${terrain.value.quartier}) - ${terrain.value.superficie}.`
  return `https://wa.me/2250708342144?text=${encodeURIComponent(message)}`
})

useHead(() => {
  const item = terrain.value

  if (!item) {
    return {
      title: 'Terrain introuvable | Loukman & Frères Immobilier',
    }
  }

  const title = `Terrain à ${item.lieu} - ${item.quartier} (${item.superficie}) | Loukman & Frères Immobilier`
  const description = `${item.description?.substring(0, 150) || 'Découvrez ce terrain disponible chez Loukman & Frères Immobilier.'} ${item.prix}.`
  const keywords = `terrain ${item.lieu}, ${item.quartier}, ${item.superficie}, ${item.prix}, vente terrain Bonoua, achat terrain Côte d'Ivoire, immobilier Bonoua`

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: item.images?.[0]?.url || `${siteUrl}/og-image.svg` },
      { property: 'og:url', content: `${siteUrl}/terrains/${id}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'fr_CI' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: item.images?.[0]?.url || `${siteUrl}/og-image.svg` },
    ],
    link: [{ rel: 'canonical', href: `${siteUrl}/terrains/${id}` }],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `Terrain à ${item.lieu} - ${item.quartier}`,
          description: item.description || `Terrain de ${item.superficie} à ${item.lieu}.`,
          image: item.images?.[0]?.url || `${siteUrl}/og-image.svg`,
          url: `${siteUrl}/terrains/${id}`,
          offers: {
            '@type': 'Offer',
            price: item.prix ? String(item.prix).replace(/[^0-9]/g, '') : undefined,
            priceCurrency: 'XOF',
            availability: item.statut === 'Disponible' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          },
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Terrains', item: `${siteUrl}/terrains` },
            { '@type': 'ListItem', position: 3, name: `Terrain ${item.lieu} ${item.quartier}` },
          ],
        }),
      },
    ],
  }
})
</script>

<template>
  <div>
    <section v-if="pending && !terrain" class="pt-32 pb-20 px-5">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div class="skeleton h-[360px] rounded-xl"></div>
        <div class="space-y-4">
          <div class="skeleton h-8 w-2/3"></div>
          <div class="skeleton h-5 w-1/2"></div>
          <div class="skeleton h-20 w-full"></div>
          <div class="skeleton h-12 w-1/2"></div>
        </div>
      </div>
    </section>

    <section v-else-if="!terrain" class="pt-32 pb-20 px-5 text-center">
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold text-navy mb-3">Terrain introuvable</h1>
        <p class="text-gray-500 mb-6">
          Ce terrain n’existe pas ou n’est plus disponible dans le catalogue.
        </p>
        <NuxtLink to="/terrains" class="btn-cta">Retour aux terrains</NuxtLink>
      </div>
    </section>

    <template v-else>
      <section class="pt-28 md:pt-36 pb-10 px-4 md:px-6 bg-gray-50">
        <div class="max-w-6xl mx-auto">
          <NuxtLink to="/terrains" class="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors mb-5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m0 0l7-7m-7 7l7 7" />
            </svg>
            Retour aux terrains
          </NuxtLink>

          <div class="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
            <div class="space-y-3">
              <div class="relative overflow-hidden rounded-xl bg-gray-100 shadow-soft aspect-[4/3]">
                <video
                  v-if="images[currentImage]?.type === 'video'"
                  :src="images[currentImage]?.url"
                  class="w-full h-full object-contain bg-black"
                  controls
                  playsinline
                  preload="metadata"
                ></video>
                <img
                  v-else
                  :src="images[currentImage]?.url || `https://placehold.co/800x500/0B1B3D/F5A623?text=Terrain+${encodeURIComponent(terrain.lieu)}`"
                  :alt="`Terrain à ${terrain.lieu} - ${terrain.quartier}`"
                  class="w-full h-full object-cover cursor-pointer"
                  width="800" height="500"
                  @click="openLightbox(currentImage)"
                />
                <span class="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-md" :class="statusClass">
                  {{ terrain.statut }}
                </span>
              </div>

              <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto no-scrollbar">
                <button
                  v-for="(media, i) in images"
                  :key="i"
                  type="button"
                  @click="currentImage = i"
                  :aria-label="`Voir la photo ${i + 1}`"
                  class="w-20 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all relative"
                  :class="currentImage === i ? 'border-gold ring-2 ring-gold/30' : 'border-transparent opacity-60 hover:opacity-100'"
                >
                  <img v-if="media.type !== 'video'" :src="media.url" :alt="`Photo ${i + 1}`" class="w-full h-full object-cover" width="80" height="64" />
                  <template v-else>
                    <div class="w-full h-full bg-gray-800 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </template>
                </button>
              </div>
            </div>

            <aside class="bg-white rounded-xl border border-gray-100 shadow-soft p-4 md:p-7 lg:sticky lg:top-28">
              <p class="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-gold mb-1 md:mb-2">Fiche terrain</p>
              <h1 class="text-xl md:text-4xl font-bold text-navy mb-1 md:mb-2">Terrain à {{ terrain.lieu }}</h1>
              <p class="text-gray-500 text-sm md:text-base mb-4 md:mb-5">{{ terrain.quartier }}</p>

              <p class="text-gold font-heading font-bold text-xl md:text-3xl mb-4 md:mb-5">{{ terrain.prix }}</p>

              <div class="grid grid-cols-2 gap-2 md:gap-3 mb-5 md:mb-6">
                <div class="rounded-lg bg-gray-50 p-3 md:p-4">
                  <p class="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Superficie</p>
                  <p class="font-semibold text-navy text-xs md:text-base">{{ terrain.superficie }}</p>
                </div>
                <div class="rounded-lg bg-gray-50 p-3 md:p-4">
                  <p class="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Statut</p>
                  <p class="font-semibold text-xs md:text-base" :class="terrain.statut === 'Disponible' ? 'text-green-600' : 'text-gray-600'">
                    {{ terrain.statut }}
                  </p>
                </div>
                <div class="rounded-lg bg-gray-50 p-3 md:p-4">
                  <p class="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Lieu</p>
                  <p class="font-semibold text-navy text-xs md:text-base">{{ terrain.lieu }}</p>
                </div>
                <div class="rounded-lg bg-gray-50 p-3 md:p-4">
                  <p class="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Quartier</p>
                  <p class="font-semibold text-navy text-xs md:text-base">{{ terrain.quartier }}</p>
                </div>
                <div v-if="terrain.zone" class="rounded-lg bg-gray-50 p-3 md:p-4">
                  <p class="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Zone</p>
                  <p class="font-semibold text-navy text-xs md:text-base">{{ terrain.zone }}</p>
                </div>
              </div>

              <div class="space-y-2 md:space-y-3">
                <a
                  :href="acheterUrl"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center justify-center gap-2 w-full px-4 md:px-6 py-3 md:py-3.5 rounded-xl text-xs md:text-sm font-bold text-white transition-all duration-300 active:scale-[0.98]"
                  :class="terrain.statut === 'Disponible' ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25' : 'bg-gray-400 pointer-events-none'"
                >
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m0 0v-1.5c0-.621-.504-1.125-1.125-1.125H12m6.75 5.25l.75 1.5M7.5 15l1.5-3m3 3l1.5-1.5M10.5 12l1.5 1.5" />
                  </svg>
                  Acheter ce terrain
                </a>
                <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-cta w-full justify-center">
                  Demander ce terrain sur WhatsApp
                </a>
                <a href="tel:0708342144" class="btn-outline w-full justify-center">
                  Appeler le 07 08 34 21 44
                </a>
                <NuxtLink to="/contact" class="btn-outline w-full justify-center">
                  Envoyer un message
                </NuxtLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="section-padding">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 md:gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="card">
              <h2 class="text-base md:text-xl font-semibold text-navy mb-2 md:mb-3">Détails du terrain</h2>
              <p class="text-gray-600 text-xs md:text-base leading-relaxed whitespace-pre-line">
                {{ terrain.description || 'Contactez-nous pour recevoir les informations complètes sur ce terrain.' }}
              </p>
            </div>


          </div>

          <div class="card h-fit">
            <h2 class="text-base md:text-xl font-semibold text-navy mb-3 md:mb-4">Résumé</h2>
            <div class="space-y-2 md:space-y-3 text-xs md:text-sm">
              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Localisation</span>
                <span class="font-semibold text-navy text-right">{{ terrain.lieu }}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Quartier</span>
                <span class="font-semibold text-navy text-right">{{ terrain.quartier }}</span>
              </div>
              <div v-if="terrain.zone" class="flex justify-between gap-4">
                <span class="text-gray-500">Zone</span>
                <span class="font-semibold text-navy text-right">{{ terrain.zone }}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Surface</span>
                <span class="font-semibold text-navy text-right">{{ terrain.superficie }}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span class="text-gray-500">Prix</span>
                <span class="font-semibold text-gold text-right">{{ terrain.prix }}</span>
              </div>
            </div>

            <div v-if="terrain.documents?.length" class="mt-5">
              <h3 class="text-sm font-semibold text-navy mb-3">Documents associés</h3>
              <div class="space-y-2">
                <a
                  v-for="doc in terrain.documents"
                  :key="doc.id"
                  :href="doc.url"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-3 text-sm bg-gray-50 rounded-lg p-3 hover:bg-gold/5 transition-colors group"
                >
                  <span class="text-base">📄</span>
                  <span class="font-medium text-navy group-hover:text-gold transition-colors truncate">
                    {{ doc.label || doc.url.split('/').pop() }}
                  </span>
                  <span class="text-xs text-gray-400 shrink-0 ml-auto">
                    {{ doc.type === 'attestation_villageoise' ? 'Attestation villageoise' : doc.type === 'acd' ? 'ACD' : 'Document' }}
                  </span>
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>

      <section v-if="similaires?.length" class="border-t border-gray-100 bg-white">
        <div class="max-w-6xl mx-auto section-padding">
          <div class="flex items-end justify-between gap-4 mb-8">
            <div>
              <span class="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-2">Offres similaires</span>
              <h2 class="text-lg md:text-3xl font-bold text-navy">Terrains similaires</h2>
            </div>
            <NuxtLink to="/terrains" class="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors shrink-0">
              Voir tous les terrains
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <NuxtLink
              v-for="s in similaires"
              :key="s.id"
              :to="`/terrains/${s.id}`"
              class="group block bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
            >
              <div class="relative h-36 md:h-44 overflow-hidden bg-gray-100">
                <img
                  :src="(s.images?.filter(img => img.type !== 'video')?.[0]?.url) || `https://placehold.co/600x400/0B1B3D/F5A623?text=Terrain+${encodeURIComponent(s.lieu)}`"
                  :alt="`Terrain à ${s.lieu}`"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="600" height="352"
                />
                <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-green-600 text-white">
                  {{ s.statut }}
                </span>
              </div>
              <div class="p-3 md:p-5">
                <div class="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-gold font-mono font-semibold mb-0.5 md:mb-1">
                  <span>LOT-{{ String(s.id).padStart(3, '0') }}</span>
                </div>
                <h3 class="text-sm md:text-base font-heading font-semibold text-navy mb-0.5 md:mb-1">{{ s.lieu }}</h3>
                <p class="text-[11px] md:text-xs text-gray-500 mb-0.5 md:mb-1">{{ s.quartier }}</p>
                <p class="text-[11px] md:text-xs text-gray-400 uppercase tracking-wider mb-1 md:mb-2">{{ s.superficie }}</p>
                <p class="text-gold font-heading font-semibold text-xs md:text-sm mb-2 md:mb-3">{{ s.prix }}</p>
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                  Voir le détail
                  <svg class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>

    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        @click="closeLightbox"
        @keydown="onLightboxKeydown"
        tabindex="0"
        ref="lightboxRef"
      >
        <button @click.stop="closeLightbox" aria-label="Fermer la galerie" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <button v-if="images.length > 1" @click.stop="prevLightbox" aria-label="Photo précédente" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <div @click.stop class="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          <video
            v-if="images[lightboxIndex]?.type === 'video'"
            :src="images[lightboxIndex]?.url"
            class="max-w-full max-h-[90vh] rounded-lg"
            controls
            playsinline
            autoplay
          ></video>
          <img
            v-else
            :src="images[lightboxIndex]?.url"
            :alt="`Photo ${lightboxIndex + 1}`"
            class="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>

        <button v-if="images.length > 1" @click.stop="nextLightbox" aria-label="Photo suivante" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full">
          {{ lightboxIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </Teleport>
  </div>
</template>
