<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const { $api } = useNuxtApp()
const { show } = useToast()

interface AvisItem { id: number; nom: string; message: string; etoiles: number; contact: string | null; statut: string; createdAt: string }

const avis = ref<AvisItem[]>([])
const loading = ref(true)
const editingId = ref<number | null>(null)
const editForm = ref({ nom: '', message: '', etoiles: 5, contact: '', statut: 'en_attente' })

const stats = computed(() => ({
  total: avis.value.length,
  publies: avis.value.filter(a => a.statut === 'publie').length,
  enAttente: avis.value.filter(a => a.statut === 'en_attente').length,
  rejetes: avis.value.filter(a => a.statut === 'rejete').length,
}))

onMounted(async () => {
  try {
    avis.value = await $api('/api/admin/avis')
  } catch {
    avis.value = []
  } finally {
    loading.value = false
  }
})

async function updateStatut(id: number, statut: string) {
  try {
    await $api(`/api/admin/avis/${id}`, { method: 'PUT', body: { statut } })
    const a = avis.value.find(a => a.id === id)
    if (a) a.statut = statut
    show(`Avis ${statut === 'publie' ? 'publié' : statut === 'rejete' ? 'rejeté' : 'mis en attente'} avec succès`)
  } catch {
    show('Erreur lors de la mise à jour', 'error')
  }
}

async function supprimer(id: number) {
  if (!confirm('Supprimer cet avis définitivement ?')) return
  try {
    await $api(`/api/admin/avis/${id}`, { method: 'DELETE' })
    avis.value = avis.value.filter(a => a.id !== id)
    show('Avis supprimé avec succès')
  } catch {
    show('Erreur lors de la suppression', 'error')
  }
}

function startEdit(a: AvisItem) {
  editingId.value = a.id
  editForm.value = { nom: a.nom, message: a.message, etoiles: a.etoiles, contact: a.contact || '', statut: a.statut }
}

function cancelEdit() {
  editingId.value = null
}

async function saveEdit() {
  if (!editingId.value) return
  try {
    const updated = await $api(`/api/admin/avis/${editingId.value}`, {
      method: 'PUT',
      body: editForm.value
    })
    const idx = avis.value.findIndex(a => a.id === editingId.value)
    if (idx !== -1) avis.value[idx] = updated
    editingId.value = null
    show('Avis modifié avec succès')
  } catch {
    show('Erreur lors de la modification', 'error')
  }
}

const statutBadge = (s: string) => {
  if (s === 'publie') return 'bg-green-50 text-green-700'
  if (s === 'rejete') return 'bg-red-50 text-red-700'
  return 'bg-gold/10 text-navy'
}
</script>

<template>
  <div class="px-5 md:px-8 py-6 max-w-7xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-heading font-bold text-navy">Avis clients</h1>
      <p class="text-sm text-gray-500 mt-0.5">Gérez les avis laissés par vos clients</p>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div v-for="n in 4" :key="n" class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div class="h-3 w-16 bg-gray-100 rounded-full animate-pulse mb-3"></div>
        <div class="h-8 w-10 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Total</p>
        <p class="text-3xl font-bold text-navy font-heading">{{ stats.total }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Publiés</p>
        <p class="text-3xl font-bold text-green-600 font-heading">{{ stats.publies }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-gold/20 p-5 shadow-sm">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">En attente</p>
        <p class="text-3xl font-bold text-navy font-heading">{{ stats.enAttente }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Rejetés</p>
        <p class="text-3xl font-bold text-red-400 font-heading">{{ stats.rejetes }}</p>
      </div>
    </div>

    <div v-if="loading" class="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div class="space-y-4">
        <div v-for="n in 4" :key="n"><div class="h-12 w-full bg-gray-100 rounded-xl animate-pulse"></div></div>
      </div>
    </div>

    <div v-else-if="avis.length === 0" class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
      <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-5">
        <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-navy mb-1">Aucun avis</h3>
      <p class="text-sm text-gray-400">Les avis des clients apparaîtront ici.</p>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold text-navy">Tous les avis</h2>
          <span class="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-0.5 font-medium">{{ avis.length }}</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Avis</th>
              <th class="px-5 py-3.5 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Note</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Contact</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="a in avis" :key="a.id" class="hover:bg-gray-50/50 transition-colors">
              <td v-if="editingId === a.id" colspan="6" class="px-5 py-4">
                <div class="space-y-3">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Nom</label>
                      <input v-model="editForm.nom" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Contact</label>
                      <input v-model="editForm.contact" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Message</label>
                    <textarea v-model="editForm.message" rows="2" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none resize-none"></textarea>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Note (1-5)</label>
                      <input v-model.number="editForm.etoiles" type="number" min="1" max="5" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-500 mb-1">Statut</label>
                      <select v-model="editForm.statut" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none bg-white">
                        <option value="en_attente">En attente</option>
                        <option value="publie">Publié</option>
                        <option value="rejete">Rejeté</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 pt-1">
                    <button @click="saveEdit" class="px-4 py-1.5 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-navy-light transition-colors">Enregistrer</button>
                    <button @click="cancelEdit" class="px-4 py-1.5 border border-gray-200 text-gray-500 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">Annuler</button>
                  </div>
                </div>
              </td>
              <td v-if="editingId !== a.id" class="px-5 py-4">
                <p class="font-medium text-navy">{{ a.nom }}</p>
                <p class="text-xs text-gray-400">{{ new Date(a.createdAt).toLocaleDateString('fr-FR') }}</p>
              </td>
              <td v-if="editingId !== a.id" class="px-5 py-4 hidden sm:table-cell">
                <p class="text-gray-600 text-xs line-clamp-2 max-w-xs">{{ a.message }}</p>
              </td>
              <td v-if="editingId !== a.id" class="px-5 py-4 text-center">
                <div class="flex items-center justify-center gap-0.5">
                  <svg v-for="n in a.etoiles" :key="n" class="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </td>
              <td v-if="editingId !== a.id" class="px-5 py-4 hidden md:table-cell text-gray-500 text-xs">
                {{ a.contact || '—' }}
              </td>
              <td v-if="editingId !== a.id" class="px-5 py-4">
                <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" :class="statutBadge(a.statut)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="a.statut === 'publie' ? 'bg-green-500' : a.statut === 'rejete' ? 'bg-red-500' : 'bg-gold'"></span>
                  {{ a.statut === 'publie' ? 'Publié' : a.statut === 'rejete' ? 'Rejeté' : 'En attente' }}
                </span>
              </td>
              <td v-if="editingId !== a.id" class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button v-if="a.statut !== 'publie'" @click="updateStatut(a.id, 'publie')" class="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all" title="Publier">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </button>
                  <button v-if="a.statut !== 'rejete'" @click="updateStatut(a.id, 'rejete')" class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Rejeter">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </button>
                  <button @click="startEdit(a)" class="p-2 rounded-lg text-gray-400 hover:text-navy hover:bg-navy/5 transition-all" title="Modifier">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>
                  </button>
                  <button @click="supprimer(a.id)" class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Supprimer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-5 py-3.5 border-t border-gray-50 text-center text-xs text-gray-300">
        {{ avis.length }} avis{{ avis.length > 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
