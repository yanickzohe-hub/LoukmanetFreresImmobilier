<script setup>
const route = useRoute()

const links = [
  { path: '/', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/services', label: 'Services', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { path: '/terrains', label: 'Terrains', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { path: '/a-propos', label: 'À propos', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { path: '/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { path: 'tel:0708342144', label: 'Appeler', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
]

function isActive(p) {
  if (p === '/') return route.path === '/' && !route.hash
  return route.path.startsWith(p)
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-3 md:pb-5 pointer-events-none md:hidden">
    <nav class="pointer-events-auto flex items-center gap-1 md:gap-1.5 px-3 md:px-5 py-2 md:py-3 rounded-2xl md:rounded-3xl bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl shadow-navy/10">
      <template v-for="link in links" :key="link.path">
        <a
          v-if="link.path.startsWith('tel:')"
          :href="link.path"
          class="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-300 cursor-pointer shrink-0 text-gray-400 hover:text-navy hover:bg-navy/5"
        >
          <svg
            class="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:scale-110"
            fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path :d="link.icon"/>
          </svg>

          <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 text-xs font-medium whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 bg-navy text-white border border-white/10 shadow-lg pointer-events-none w-max max-w-[140px] overflow-hidden text-ellipsis">
            {{ link.label }}
          </span>
        </a>

        <NuxtLink
          v-else
          :to="link.path"
          class="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-300 cursor-pointer shrink-0"
          :class="isActive(link.path) ? 'text-navy bg-navy/10 scale-110' : 'text-gray-400 hover:text-navy hover:bg-navy/5'"
        >
          <svg
            class="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:scale-110"
            fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path :d="link.icon"/>
          </svg>

          <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 text-xs font-medium whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 bg-navy text-white border border-white/10 shadow-lg pointer-events-none w-max max-w-[140px] overflow-hidden text-ellipsis">
            {{ link.label }}
          </span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>
