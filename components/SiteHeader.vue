<script setup>
const route = useRoute()
const mobileMenuOpen = ref(false)

const tabs = [
  { icon: 'home', label: 'Accueil', to: '/' },
  { icon: 'handshake', label: 'Services', to: '/services' },
  { icon: 'map-pin', label: 'Terrains', to: '/terrains' },
  { icon: 'eye', label: 'À propos', to: '/a-propos' },
  { icon: 'mail', label: 'Contact', to: '/contact' },
]

function isActive(tab) {
  if (tab.to === '/') return route.path === '/'
  return route.path.startsWith(tab.to)
}

const scrolled = ref(false)
const hidden = ref(false)
let lastScroll = 0

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 50
  if (y > 80) {
    hidden.value = y > lastScroll
  } else {
    hidden.value = false
  }
  lastScroll = y
}

onMounted(() => {
  lastScroll = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500 hidden md:block"
    :class="[hidden ? '-translate-y-full' : 'translate-y-0', scrolled ? 'py-1 md:py-2' : 'pt-3 md:pt-6']"
  >
    <div class="max-w-7xl mx-auto px-3 md:px-6">
      <div
        :class="scrolled ? 'bg-white/95 backdrop-blur-lg shadow-nav border border-gray-100/80' : 'bg-transparent'"
        class="rounded-2xl md:rounded-full transition-all duration-500 px-3 md:px-5"
      >
        <div class="flex items-center justify-between h-14 md:h-16">
          <NuxtLink to="/" class="shrink-0">
            <NuxtImg src="/logo1.png" alt="Loukman & Frères Immobilier" class="h-7 md:h-10 w-auto" />
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-0.5">
            <NuxtLink
              v-for="tab in tabs"
              :key="tab.to"
              :to="tab.to"
              class="nav-expand-btn"
              :class="{ active: isActive(tab) }"
            >
              <Icon :name="tab.icon" class="w-5 h-5 shrink-0" />
              <span class="nav-expand-label">{{ tab.label }}</span>
            </NuxtLink>
          </nav>

          <a
            href="tel:0708342144"
            class="hidden md:flex items-center gap-2 text-navy/60 hover:text-navy text-sm font-medium transition-colors shrink-0"
          >
            <Icon name="phone" class="w-4 h-4" />
            <span>07 08 34 21 44</span>
          </a>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-navy/60 hover:text-navy hover:bg-navy/5 transition-colors"
            aria-label="Menu"
          >
            <Icon :name="mobileMenuOpen ? 'close' : 'menu'" class="w-5 h-5" />
          </button>
        </div>

        <transition
          enter-active-class="transition-all duration-300 ease-out overflow-hidden"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-80 opacity-100"
          leave-active-class="transition-all duration-200 ease-in overflow-hidden"
          leave-from-class="max-h-80 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-100 py-3 space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.to"
              @click="navigateTo(tab.to); mobileMenuOpen = false"
              class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              :class="isActive(tab) ? 'bg-navy/10 text-navy' : 'text-gray-500 hover:text-navy hover:bg-navy/5'"
            >
              <Icon :name="tab.icon" class="w-5 h-5" />
              {{ tab.label }}
            </button>
            <a
              href="tel:0708342144"
              class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-navy hover:bg-navy/5 transition-colors"
            >
              <Icon name="phone" class="w-5 h-5" />
              07 08 34 21 44
            </a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-expand-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  user-select: none;
  white-space: nowrap;
}
.nav-expand-btn:hover {
  color: #0B1B3D;
  background: rgba(11, 27, 61, 0.05);
}
.nav-expand-btn.active {
  color: #0B1B3D;
  background: rgba(11, 27, 61, 0.08);
  padding: 0.5rem 1.25rem;
  gap: 0.6rem;
}

.nav-expand-label {
  white-space: nowrap;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-expand-btn.active .nav-expand-label {
  font-weight: 600;
}
</style>
