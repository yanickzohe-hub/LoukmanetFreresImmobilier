<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const { $api } = useNuxtApp()
const { show } = useToast()

const terrains = ref([])
const loading = ref(true)
const recherche = ref('')
const filtreStatut = ref('Tous')
const page = ref(1)
const perPage = 20

onMounted(async () => {
  try {
    terrains.value = await $api('/api/admin/terrains')
  } catch {
    terrains.value = []
  } finally {
    loading.value = false
  }
})

const stats = computed(() => ({
  total: terrains.value.length,
  disponibles: terrains.value.filter(t => t.statut === 'Disponible').length,
  vendus: terrains.value.filter(t => t.statut === 'Vendu').length,
  reserves: terrains.value.filter(t => t.statut === 'R\u00e9serv\u00e9').length,
}))

const filtered = computed(() => {
  let result = terrains.value
  if (recherche.value) {
    const q = recherche.value.toLowerCase()
    result = result.filter(t =>
      t.lieu.toLowerCase().includes(q) ||
      t.quartier.toLowerCase().includes(q) ||
      (t.zone || '').toLowerCase().includes(q)
    )
  }
  if (filtreStatut.value !== 'Tous') {
    result = result.filter(t => t.statut === filtreStatut.value)
  }
  return result
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))

const paginated = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

watch([recherche, filtreStatut], () => { page.value = 1 })

async function changerStatut(id, nouveauStatut) {
  try {
    await $api(`/api/admin/terrains/${id}/statut`, {
      method: 'PATCH',
      body: { statut: nouveauStatut }
    })
    const t = terrains.value.find(t => t.id === id)
    if (t) t.statut = nouveauStatut
    show('Statut mis \u00e0 jour')
  } catch {
    show('Erreur lors de la mise \u00e0 jour du statut', 'error')
  }
}

async function supprimer(id) {
  if (!confirm('Supprimer ce terrain ?')) return
  try {
    await $api(`/api/admin/terrains/${id}`, { method: 'DELETE' })
    terrains.value = terrains.value.filter(t => t.id !== id)
    show('Terrain supprim\u00e9 avec succ\u00e8s')
  } catch {
    show('Erreur lors de la suppression', 'error')
  }
}
</script>

<template>
  <div class="px-5 md:px-8 py-6 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-heading font-bold text-navy">Tableau de bord</h1>
        <p class="text-sm text-gray-500 mt-0.5">Aperçu de votre catalogue immobilier</p>
      </div>
      <NuxtLink to="/admin/terrains/new" class="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy-light transition-all duration-200 shadow-sm shadow-navy/10">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Nouveau terrain
      </NuxtLink>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div v-for="n in 4" :key="n" class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div class="h-3 w-16 bg-gray-100 rounded-full animate-pulse mb-3"></div>
        <div class="h-8 w-10 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">Total</p>
          <div class="w-8 h-8 rounded-xl bg-navy/5 flex items-center justify-center">
            <svg class="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-navy font-heading">{{ stats.total }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">Disponibles</p>
          <div class="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-green-600 font-heading">{{ stats.disponibles }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">Réservés</p>
          <div class="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center">
            <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gold font-heading">{{ stats.reserves }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">Vendus</p>
          <div class="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-400 font-heading">{{ stats.vendus }}</p>
      </div>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div class="space-y-4">
        <div v-for="n in 4" :key="n">
          <div class="h-12 w-full bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>

    <div v-else-if="terrains.length === 0" class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
      <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-5">
        <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg>
      </div>
      <h3 class="text-lg font-semibold text-navy mb-1">Aucun terrain</h3>
      <p class="text-sm text-gray-400 mb-6">Commencez par ajouter votre premier terrain</p>
      <NuxtLink to="/admin/terrains/new" class="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy-light transition-all duration-200 shadow-sm">Ajouter un terrain</NuxtLink>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold text-navy">Tous les terrains</h2>
          <span class="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-0.5 font-medium">{{ filtered.length }}</span>
        </div>
        <div class="flex items-center gap-2 sm:ml-auto">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            <input v-model="recherche" placeholder="Rechercher..." class="w-44 lg:w-56 pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all" />
          </div>
          <select v-model="filtreStatut" class="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-navy/10 focus:border-navy">
            <option value="Tous">Tous</option>
            <option value="Disponible">Disponible</option>
            <option value="Réservé">Réservé</option>
            <option value="Vendu">Vendu</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Terrain</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Zone</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Superficie</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Prix</th>
              <th class="px-5 py-3.5 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Docs</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="t in paginated" :key="t.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-5 py-4">
                <p class="font-medium text-navy">{{ t.lieu }}</p>
                <p class="text-xs text-gray-400">{{ t.quartier }}</p>
              </td>
              <td class="px-5 py-4 text-gray-500 hidden sm:table-cell">{{ t.zone || '\u2014' }}</td>
              <td class="px-5 py-4 text-gray-500 hidden md:table-cell">{{ t.superficie }}</td>
              <td class="px-5 py-4 font-medium text-gray-800">{{ t.prix }}</td>
              <td class="px-5 py-4 text-center hidden lg:table-cell">
                <span class="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium" :class="(t.documents?.length || 0) > 0 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                  {{ t.documents?.length || 0 }}
                </span>
              </td>
              <td class="px-5 py-4">
                <select
                  :value="t.statut"
                  @change="changerStatut(t.id, $event.target.value)"
                  class="text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-navy/20 outline-none"
                  :class="t.statut === 'Disponible' ? 'bg-green-50 text-green-700' : t.statut === 'R\u00e9serv\u00e9' ? 'bg-gold/10 text-navy' : 'bg-red-50 text-red-700'"
                >
                  <option value="Disponible" class="bg-white text-gray-700">Disponible</option>
                  <option value="Réservé" class="bg-white text-gray-700">Réservé</option>
                  <option value="Vendu" class="bg-white text-gray-700">Vendu</option>
                </select>
              </td>
              <td class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <NuxtLink :to="`/admin/terrains/${t.id}`" class="p-2 rounded-lg text-gray-400 hover:text-navy hover:bg-navy/5 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>
                  </NuxtLink>
                  <button @click="supprimer(t.id)" class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="totalPages > 1" class="flex items-center justify-between px-5 py-3 border-t border-gray-50">
        <p class="text-xs text-gray-400">{{ filtered.length }} terrain{{ filtered.length > 1 ? 's' : '' }}</p>
        <div class="flex items-center gap-2">
          <button :disabled="page <= 1" @click="page = Math.max(1, page - 1)" class="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-50 transition-all disabled:opacity-30 disabled:pointer-events-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span v-for="p in totalPages" :key="p" @click="page = p" class="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-all" :class="p === page ? 'bg-navy text-white' : 'text-gray-500 hover:bg-gray-50'">{{ p }}</span>
          <button :disabled="page >= totalPages" @click="page = Math.min(totalPages, page + 1)" class="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-50 transition-all disabled:opacity-30 disabled:pointer-events-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div v-else class="px-5 py-3.5 border-t border-gray-50 text-center text-xs text-gray-300">
        {{ filtered.length }} terrain{{ filtered.length > 1 ? 's' : '' }} dans le catalogue
      </div>
    </div>
  </div>
</template>
