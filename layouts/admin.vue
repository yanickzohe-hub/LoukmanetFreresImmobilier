<script setup>
const { admin, logout, getToken } = useAdminAuth()
const router = useRouter()
const route = useRoute()
const sidebarOpen = ref(false)
const avisEnAttente = ref(0)

onMounted(async () => {
  try {
    const data = await $fetch('/api/admin/avis/stats', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    avisEnAttente.value = data.enAttente || 0
  } catch { /* ignore */ }
})

function deconnecter() {
  logout()
  router.push('/admin/login')
}

const navItems = [
  { to: '/admin', label: 'Tableau de bord', icon: 'home' },
  { to: '/admin/terrains/new', label: 'Nouveau terrain', icon: 'building' },
  { to: '/admin/avis', label: 'Avis clients', icon: 'star' },
]

function isActive(path) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen bg-[#f6f8fc] flex">
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" @click="sidebarOpen = false" />

    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-navy to-navy-dark text-white flex flex-col transition-all duration-300 ease-out lg:translate-x-0 shadow-2xl shadow-navy/20"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center gap-3 px-5 h-16 border-b border-white/5 shrink-0">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-heading font-bold text-navy text-sm shadow-lg shadow-gold/20">L</div>
        <div class="leading-tight">
          <p class="font-heading font-semibold text-sm text-white">Loukman & Frères</p>
          <p class="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">Administration</p>
        </div>
      </div>

      <nav class="flex-1 px-2.5 py-5 space-y-0.5 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          :class="isActive(item.to) ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white/80'"
          @click="sidebarOpen = false"
        >
          <div class="w-5 h-5 flex items-center justify-center" :class="isActive(item.to) ? 'text-gold' : ''">
            <Icon :name="item.icon" class="w-4 h-4" />
          </div>
          <span>{{ item.label }}</span>
          <span v-if="item.icon === 'star' && avisEnAttente > 0" class="ml-auto bg-gold text-navy text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight">{{ avisEnAttente }}</span>
        </NuxtLink>
      </nav>

      <div class="border-t border-white/5 px-3 py-4 shrink-0 bg-white/[0.02]">
        <div class="flex items-center gap-3 mb-2.5 px-2">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-gold font-heading font-bold text-sm shrink-0 ring-2 ring-white/5">
            {{ admin?.nom?.charAt(0)?.toUpperCase() || 'A' }}
          </div>
          <div class="leading-tight min-w-0">
            <p class="text-sm font-medium text-white/80 truncate">{{ admin?.nom || 'Admin' }}</p>
            <p class="text-[11px] text-white/40 truncate">{{ admin?.email }}</p>
          </div>
        </div>
        <button @click="deconnecter" class="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-300 hover:bg-white/5 transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col lg:ml-64 min-h-screen">
      <header class="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-gray-200/60">
        <div class="flex items-center justify-between px-5 h-14">
          <div class="flex items-center gap-3">
            <button class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" @click="sidebarOpen = true">
              <Icon name="menu" class="w-5 h-5 text-navy" />
            </button>
            <NuxtLink to="/" target="_blank" class="text-xs text-gray-400 hover:text-navy transition-colors hidden sm:flex items-center gap-1.5 font-medium">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5a2.25 2.25 0 002.25-2.25V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Voir le site
            </NuxtLink>
          </div>
          <div class="flex items-center gap-3">
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
              {{ new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <slot />
      </main>
    </div>
    <ToastContainer />
  </div>
</template>
