<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import gsap from 'gsap'

const { data: avisData } = await useFetch('/api/avis')
const avis = computed(() => avisData.value || [])
const totalCards = computed(() => avis.value.length)

const containerRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
const hasEntered = ref(false)
const direction = ref<'left' | 'right' | null>(null)
const prevVisible = ref<Set<number>>(new Set())
const hoveredIndex = ref<number | null>(null)

const MAX_VISIBLE = 5
const HALF = 2

function getSlotConfig(slot: number) {
  const count = Math.min(totalCards.value, MAX_VISIBLE)
  const center = count >> 1
  const distance = count > 1 ? (slot - center) / center : 0
  const abs = Math.abs(distance)
  return {
    rot: distance * 15,
    scale: 1 - 0.15 * abs,
    x: distance * 22,
    zIndex: count - Math.abs(slot - center),
  }
}

const centerIndex = ref(totalCards.value > MAX_VISIBLE ? HALF : (totalCards.value >> 1))
const needsPagination = computed(() => totalCards.value > MAX_VISIBLE)

function getVisibleMap(center: number) {
  const map = new Map<number, number>()
  if (!needsPagination.value) {
    avis.value.forEach((_, i) => map.set(i, i))
    return map
  }
  for (let slot = 0; slot < MAX_VISIBLE; slot++) {
    map.set(((center + slot - HALF) % totalCards.value + totalCards.value) % totalCards.value, slot)
  }
  return map
}

function cycle(dir: 'left' | 'right') {
  if (isAnimating.value || !needsPagination.value || !totalCards.value) return
  isAnimating.value = true
  direction.value = dir
  centerIndex.value = dir === 'right'
    ? (centerIndex.value + 1) % totalCards.value
    : (centerIndex.value - 1 + totalCards.value) % totalCards.value
}

function goToIndex(idx: number) {
  if (isAnimating.value || !needsPagination.value || !totalCards.value) return
  const visibleMap = getVisibleMap(centerIndex.value)
  const currentSlot = visibleMap.get(idx)
  if (currentSlot === undefined || currentSlot === HALF) return
  isAnimating.value = true
  direction.value = currentSlot < HALF ? 'right' : 'left'
  centerIndex.value = idx
}

function renderFan() {
  const container = containerRef.value
  if (!container || !totalCards.value) return

  const cardElements = Array.from(container.querySelectorAll<HTMLElement>('.fan-card'))
  if (!cardElements.length) return

  const visibleMap = getVisibleMap(centerIndex.value)
  const previouslyVisible = prevVisible.value
  const dir = direction.value
  const firstMount = !hasEntered.value

  if (firstMount) isAnimating.value = true

  let completedCount = 0
  const visibleCount = visibleMap.size
  const onDone = () => {
    completedCount++
    if (completedCount >= visibleCount) {
      isAnimating.value = false
      if (firstMount) hasEntered.value = true
    }
  }

  cardElements.forEach((card, cardIndex) => {
    const slot = visibleMap.get(cardIndex)
    const wasVisible = previouslyVisible.has(cardIndex)
    const config = slot !== undefined ? getSlotConfig(slot) : { rot: 0, scale: 0, x: 0, zIndex: 0 }

    if (slot !== undefined) {
      const target = {
        x: `${config.x}rem`,
        y: 0,
        rotation: config.rot,
        scale: config.scale,
        opacity: 1,
        zIndex: config.zIndex,
      }

      if (firstMount) {
        gsap.set(card, { x: 0, y: '8rem', rotation: 0, scale: 0.4, opacity: 0 })
        gsap.to(card, { ...target, duration: 1, ease: 'elastic.out(1,0.78)', delay: 0.15 + slot * 0.05, onComplete: onDone })
      } else if (!wasVisible) {
        const enterX = dir === 'right' ? 30 : -30
        gsap.set(card, { x: `${enterX}rem`, y: 0, rotation: dir === 'right' ? 20 : -20, scale: 0.4, opacity: 0 })
        gsap.to(card, { ...target, duration: 0.5, ease: 'power2.out', onComplete: onDone })
      } else if (cardIndex === hoveredIndex.value && slot === HALF) {
        gsap.to(card, { ...target, duration: 0.4, ease: 'power2.out', onComplete: onDone })
      } else {
        gsap.to(card, { ...target, duration: 0.4, ease: 'power2.out', onComplete: onDone })
      }
    } else if (wasVisible) {
      const exitX = dir === 'right' ? -30 : 30
      gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.4, rotation: dir === 'right' ? -20 : 20, duration: 0.35, ease: 'power2.in', zIndex: 0 })
    } else if (firstMount) {
      gsap.set(card, { opacity: 0, scale: 0.4, x: 0, y: 0, zIndex: 0 })
    }
  })

  prevVisible.value = new Set(visibleMap.keys())
}

let autoTimer: ReturnType<typeof setInterval> | null = null

function startAutoSlide() {
  stopAutoSlide()
  if (needsPagination.value && totalCards.value > 1) {
    autoTimer = setInterval(() => cycle('right'), 4000)
  }
}

function stopAutoSlide() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null }
}

let resizeTimer: ReturnType<typeof setTimeout> | null = null

function onResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => { if (!isAnimating.value) renderFan() }, 200)
}

function onMouseEnter() { stopAutoSlide() }
function onMouseLeave() { startAutoSlide() }

onMounted(() => {
  nextTick(() => {
    renderFan()
    startAutoSlide()
  })
  window.addEventListener('resize', onResize)
  if (containerRef.value) {
    containerRef.value.addEventListener('mouseenter', onMouseEnter)
    containerRef.value.addEventListener('mouseleave', onMouseLeave)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  stopAutoSlide()
  if (containerRef.value) {
    containerRef.value.removeEventListener('mouseenter', onMouseEnter)
    containerRef.value.removeEventListener('mouseleave', onMouseLeave)
  }
  if (resizeTimer) clearTimeout(resizeTimer)
})

watch(() => avis.value, () => {
  hasEntered.value = false
  prevVisible.value = new Set()
  if (totalCards.value <= MAX_VISIBLE) centerIndex.value = totalCards.value >> 1
  nextTick(() => {
    renderFan()
    startAutoSlide()
  })
}, { deep: true })

watch(centerIndex, () => { renderFan() })
</script>

<template>
  <div v-if="avis.length" class="flex flex-col items-center w-full relative z-20 select-none">
    <div class="flex items-center justify-center w-full max-w-3xl lg:max-w-4xl px-2">
      <div
        ref="containerRef"
        class="relative flex items-center justify-center w-full"
        style="min-height: 18rem;"
      >
        <div
          v-for="(a, i) in avis"
          :key="a.id"
          class="fan-card absolute"
          :class="{ 'cursor-pointer': needsPagination }"
          :style="{ width: 'clamp(14rem, 40vw, 20rem)' }"
          @click="goToIndex(i)"
        >
          <div class="bg-white rounded-2xl shadow-card border border-line/60 p-4 md:p-5 w-full">
            <div class="flex items-center gap-0.5 mb-2">
              <svg v-for="n in a.etoiles" :key="n" class="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg v-for="n in (5 - a.etoiles)" :key="'e'+n" class="w-3.5 h-3.5 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed italic mb-3 line-clamp-3">"{{ a.message }}"</p>
            <div class="flex items-center justify-between pt-2.5 border-t border-gray-100">
              <p class="text-xs sm:text-sm font-semibold text-navy truncate">{{ a.nom }}</p>
              <p v-if="a.contact" class="text-[10px] sm:text-xs text-gray-400 truncate ml-2 max-w-[40%]">{{ a.contact }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center gap-3 mt-6">
      <button
        class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm text-black/40 shrink-0 shadow-md hover:border-black/25 hover:text-black/70 transition-colors duration-300"
        @click="cycle('left')"
        aria-label="Précédent"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div class="flex items-center gap-1.5">
        <button
          v-for="(a, i) in avis"
          :key="'dot'+i"
          class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300"
          :class="i === centerIndex % avis.length ? 'bg-navy scale-[1.4]' : 'bg-gray-300 hover:bg-gray-400'"
          @click="goToIndex(i)"
        />
      </div>
      <button
        class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm text-black/40 shrink-0 shadow-md hover:border-black/25 hover:text-black/70 transition-colors duration-300"
        @click="cycle('right')"
        aria-label="Suivant"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  </div>
  <div v-else class="text-center py-10 text-gray-400 text-sm">
    Aucun avis pour le moment. Soyez le premier à donner votre avis !
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
