<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const { show } = useToast()

const superficieValeur = ref('')
const superficieUnite = ref('m²')

const form = ref({
  lieu: '',
  quartier: '',
  zone: '',
  superficie: '',
  prix: '',
  statut: 'Disponible',
  description: ''
})
const existingImages = ref([])
const existingDocuments = ref([])
const newImages = ref([])
const newDocuments = ref([])
const loading = ref(true)
const saving = ref(false)
const uploading = ref(false)
const error = ref('')
const dragImage = ref(false)
const dragDoc = ref(false)
const dragIndex = ref(-1)

function onDragStart(i, e) {
  dragIndex.value = i
  e.dataTransfer.effectAllowed = 'move'
}
function onDragOver(i, e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}
function onDrop(i, target) {
  if (dragIndex.value < 0 || dragIndex.value === i) { dragIndex.value = -1; return }
  const arr = target === 'existing' ? existingImages.value : newImages.value
  const img = arr.splice(dragIndex.value, 1)[0]
  arr.splice(i, 0, img)
  dragIndex.value = -1
}

const docTypeLabels = {
  attestation_villageoise: 'Attestation villageoise',
  acd: 'ACD',
  autre: 'Autre'
}

onMounted(async () => {
  try {
    const data = await $api(`/api/admin/terrains/${route.params.id}`)
    const parts = (data.superficie || '').split(' ')
    superficieValeur.value = parts[0] || ''
    superficieUnite.value = parts[1] || 'm²'
    form.value = {
      lieu: data.lieu,
      quartier: data.quartier,
      zone: data.zone || '',
      superficie: data.superficie,
      prix: data.prix,
      statut: data.statut,
      description: data.description || ''
    }
    existingImages.value = data.images || []
    existingDocuments.value = (data.documents || []).map(d => ({
      ...d,
      typeLabel: docTypeLabels[d.type] || d.type
    }))
  } catch {
    error.value = 'Impossible de charger ce terrain'
  } finally {
    loading.value = false
  }
})

async function uploadFiles(files, target = 'image') {
  uploading.value = true
  try {
    const formData = new FormData()
    for (const file of files) {
      formData.append(target, file)
    }
    const result = await $api('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    newImages.value.push(...result)
  } catch (err) {
    const msg = err?.data?.statusMessage || err?.message || 'Erreur lors du téléchargement'
    show(msg, 'error')
    console.error('Upload error:', err)
  } finally {
    uploading.value = false
  }
}

function onMediaSelect(e) {
  const files = Array.from(e.target.files || [])
  const images = files.filter(f => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f.name))
  const videos = files.filter(f => /\.(mp4|webm|mov)$/i.test(f.name))
  if (images.length) uploadFiles(images, 'image')
  if (videos.length) uploadFiles(videos, 'video')
  e.target.value = ''
}

function onImageSelect(e) {
  const files = Array.from(e.target.files || [])
  if (files.length) uploadFiles(files, 'image')
  e.target.value = ''
}

function onVideoSelect(e) {
  const files = Array.from(e.target.files || [])
  if (files.length) uploadFiles(files, 'video')
  e.target.value = ''
}

function onDocumentSelect(e) {
  const files = Array.from(e.target.files || [])
  if (files.length) {
    for (const file of files) {
      newDocuments.value.push({
        file,
        type: 'attestation_villageoise',
        label: file.name,
        _temp: true
      })
    }
  }
  e.target.value = ''
}

function handleMediaDrop(e) {
  dragImage.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  const images = files.filter(f => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f.name))
  const videos = files.filter(f => /\.(mp4|webm|mov)$/i.test(f.name))
  const docs = files.filter(f => /\.(pdf|doc|docx)$/i.test(f.name))
  if (images.length) uploadFiles(images, 'image')
  if (videos.length) uploadFiles(videos, 'video')
  if (docs.length) {
    for (const file of docs) {
      newDocuments.value.push({ file, type: 'attestation_villageoise', label: file.name, _temp: true })
    }
  }
}

function handleDocDrop(e) {
  dragDoc.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  if (files.length) {
    for (const file of files) {
      newDocuments.value.push({
        file,
        type: 'attestation_villageoise',
        label: file.name,
        _temp: true
      })
    }
  }
}

async function removeExistingImage(id, index) {
  try {
    await $api(`/api/admin/medias/${id}`, { method: 'DELETE' })
    existingImages.value.splice(index, 1)
    show('Image supprimée')
  } catch {
    show('Erreur lors de la suppression', 'error')
  }
}

async function removeExistingDocument(id, index) {
  try {
    await $api(`/api/admin/documents/${id}`, { method: 'DELETE' })
    existingDocuments.value.splice(index, 1)
    show('Document supprimé')
  } catch {
    show('Erreur lors de la suppression', 'error')
  }
}

function removeNewImage(index) {
  newImages.value.splice(index, 1)
}

function removeNewDocument(index) {
  newDocuments.value.splice(index, 1)
}

function formatSize(bytes) {
  if (!bytes) return ''
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

async function handleSubmit() {
  error.value = ''
  saving.value = true
  try {
    await $api(`/api/admin/terrains/${route.params.id}`, {
      method: 'PUT',
      body: {
        ...form.value,
        superficie: superficieValeur.value
          ? `${superficieValeur.value} ${superficieUnite.value}`
          : form.value.superficie
      }
    })

    if (existingImages.value.length) {
      await $api(`/api/admin/terrains/${route.params.id}/medias-reorder`, {
        method: 'PATCH',
        body: { ordre: existingImages.value.map(m => m.id) }
      })
    }

    for (const img of newImages.value) {
      await $api('/api/admin/medias', {
        method: 'POST',
        body: { url: img.url, type: img.type, terrainId: parseInt(route.params.id) }
      })
    }

    if (newDocuments.value.length) {
      const formData = new FormData()
      for (const doc of newDocuments.value) {
        formData.append('document', doc.file)
      }
      const uploaded = await $api('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      for (let i = 0; i < uploaded.length; i++) {
        await $api('/api/admin/documents', {
          method: 'POST',
          body: {
            url: uploaded[i].url,
            type: newDocuments.value[i].type,
            label: newDocuments.value[i].label || null,
            terrainId: parseInt(route.params.id)
          }
        })
      }
    }

    show('Terrain modifié avec succès')
    router.push('/admin')
  } catch (err) {
    show('Erreur lors de la modification', 'error')
    error.value = err?.data?.statusMessage || 'Erreur lors de la modification'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-5 md:px-8 py-6">
    <div class="flex items-center justify-between mb-7">
      <div>
        <h1 class="text-2xl font-heading font-bold text-navy">Modifier le terrain</h1>
        <p class="text-sm text-gray-500 mt-0.5">Modifiez les informations du terrain</p>
      </div>
      <NuxtLink to="/admin" class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-navy transition-colors font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Retour
      </NuxtLink>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-24">
      <svg class="w-6 h-6 text-navy animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
    </div>

    <div v-else-if="error && !form.lieu" class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <NuxtLink to="/admin" class="bg-navy text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy-light transition-all">Retour au dashboard</NuxtLink>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div class="bg-white rounded-2xl border border-gray-100 p-6 md:p-7 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center">
            <svg class="w-4.5 h-4.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></svg>
          </div>
          <h2 class="text-lg font-semibold text-navy">Informations générales</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">Lieu <span class="text-red-400">*</span></label>
            <input v-model="form.lieu" required class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">Quartier <span class="text-red-400">*</span></label>
            <input v-model="form.quartier" required class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">Zone</label>
            <input v-model="form.zone" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400" placeholder="Zone A, Lot 5..." />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">Superficie <span class="text-red-400">*</span></label>
            <div class="flex gap-2">
              <input v-model="superficieValeur" type="number" step="any" min="0" required class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm" placeholder="600" />
              <select v-model="superficieUnite" class="w-24 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm">
                <option value="m²">m²</option>
                <option value="ha">ha</option>
                <option value="a">a</option>
                <option value="ca">ca</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">Prix <span class="text-red-400">*</span></label>
            <input v-model="form.prix" required class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">Statut</label>
            <select v-model="form.statut" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm">
              <option value="Disponible">Disponible</option>
              <option value="Vendu">Vendu</option>
              <option value="Réservé">Réservé</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1.5">Description</label>
          <textarea v-model="form.description" rows="4" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400 resize-none"></textarea>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 md:p-7 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center">
            <svg class="w-4.5 h-4.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
          </div>
          <h2 class="text-lg font-semibold text-navy">Images &amp; Vidéos</h2>
        </div>

        <div v-if="existingImages.length" class="mb-5">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Médias actuels</p>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            <div
              v-for="(img, i) in existingImages"
              :key="img.id"
              draggable="true"
              @dragstart="onDragStart(i, $event)"
              @dragover="onDragOver(i, $event)"
              @drop="onDrop(i, 'existing')"
              class="relative group rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gray-50 shadow-sm cursor-grab active:cursor-grabbing"
              :class="{ 'opacity-50 ring-2 ring-navy': dragIndex === i }"
            >
              <template v-if="img.type === 'video'">
                <video :src="img.url" class="w-full h-full object-cover" muted preload="metadata"></video>
                <div class="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"><svg class="w-4 h-4 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                </div>
              </template>
              <img v-else :src="img.url" :alt="'Image ' + (i + 1)" class="w-full h-full object-cover" />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                <div class="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"><svg class="w-3 h-3 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"/></svg></div>
              </div>
              <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <button type="button" @click="removeExistingImage(img.id, i)" class="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 text-red-500 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white shadow-sm z-10">&times;</button>
            </div>
          </div>
        </div>

        <div v-if="newImages.length" class="mb-5">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Nouveaux médias</p>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            <div
              v-for="(img, i) in newImages"
              :key="'new-' + i"
              draggable="true"
              @dragstart="onDragStart(i, $event)"
              @dragover="onDragOver(i, $event)"
              @drop="onDrop(i, 'new')"
              class="relative group rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gray-50 shadow-sm cursor-grab active:cursor-grabbing"
              :class="{ 'opacity-50 ring-2 ring-navy': dragIndex === i }"
            >
              <template v-if="img.type === 'video'">
                <video :src="img.url" class="w-full h-full object-cover" muted preload="metadata"></video>
                <div class="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"><svg class="w-4 h-4 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                </div>
              </template>
              <img v-else :src="img.url" :alt="'Nouveau média ' + (i + 1)" class="w-full h-full object-cover" />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                <div class="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"><svg class="w-3 h-3 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"/></svg></div>
              </div>
              <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <button type="button" @click="removeNewImage(i)" class="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 text-red-500 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white shadow-sm z-10">&times;</button>
            </div>
          </div>
        </div>

        <div
          class="relative flex flex-col items-center justify-center w-full h-44 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer"
          :class="dragImage ? 'border-navy bg-navy/5' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300'"
          @click="document.getElementById('media-input-edit')?.click()"
          @dragenter.prevent="dragImage = true"
          @dragleave.prevent="dragImage = false"
          @dragover.prevent="dragImage = true"
          @drop.prevent="handleMediaDrop"
        >
          <div class="flex flex-col items-center pointer-events-none">
            <svg class="w-10 h-10 mb-3" :class="dragImage ? 'text-navy' : 'text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
            <p class="text-sm text-gray-600 font-medium">Déposez vos fichiers ici ou <span class="text-navy hover:text-navy-light">parcourez</span></p>
            <p class="text-xs text-gray-400 mt-1">Images, vidéos &amp; documents — jusqu'à 10 MB</p>
          </div>
          <input id="media-input-edit" type="file" accept="image/*,video/mp4,video/webm,video/quicktime" multiple class="hidden" @change="onMediaSelect" :disabled="uploading" />
        </div>

        <div class="flex items-center gap-3 mt-3 flex-wrap">
          <label class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
            Ajouter une image
            <input type="file" accept="image/*" class="hidden" @change="onImageSelect" :disabled="uploading" />
          </label>
          <label class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9.75a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/></svg>
            Ajouter une vidéo
            <input type="file" accept="video/mp4,video/webm,video/quicktime" class="hidden" @change="onVideoSelect" :disabled="uploading" />
          </label>
          <span v-if="uploading" class="text-xs text-navy font-medium ml-auto">Téléchargement...</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 md:p-7 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center">
            <svg class="w-4.5 h-4.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
          </div>
          <h2 class="text-lg font-semibold text-navy">Documents</h2>
        </div>

        <div v-if="existingDocuments.length" class="mb-5">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Documents actuels</p>
          <div class="space-y-2">
            <div v-for="(doc, i) in existingDocuments" :key="doc.id" class="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 group hover:border-gray-200 transition-all">
              <div class="p-2 bg-white rounded-lg shadow-sm border border-gray-50 text-navy shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <a :href="doc.url" target="_blank" class="text-sm font-medium text-navy hover:text-gold transition-colors truncate block">{{ doc.label || doc.url.split('/').pop() }}</a>
              </div>
              <span class="text-xs bg-navy/10 text-navy px-2.5 py-1 rounded-full font-medium shrink-0">{{ doc.typeLabel }}</span>
              <button type="button" @click="removeExistingDocument(doc.id, i)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="newDocuments.length" class="mb-5">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Nouveaux documents</p>
          <div class="space-y-2">
            <div v-for="(doc, i) in newDocuments" :key="'new-doc-' + i" class="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 group hover:border-gray-200 transition-all">
              <div class="p-2 bg-white rounded-lg shadow-sm border border-gray-50 text-navy shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">{{ doc.file.name }}</p>
                <p class="text-xs text-gray-400">{{ formatSize(doc.file.size) }}</p>
              </div>
              <select v-model="doc.type" class="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-navy/10 focus:border-navy">
                <option value="attestation_villageoise">Attestation villageoise</option>
                <option value="acd">ACD</option>
                <option value="autre">Autre</option>
              </select>
              <button type="button" @click="removeNewDocument(i)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div
          class="relative flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer"
          :class="dragDoc ? 'border-navy bg-navy/5' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300'"
          @click="document.getElementById('doc-input-edit')?.click()"
          @dragenter.prevent="dragDoc = true"
          @dragleave.prevent="dragDoc = false"
          @dragover.prevent="dragDoc = true"
          @drop.prevent="handleDocDrop"
        >
          <div class="flex flex-col items-center pointer-events-none">
            <svg class="w-9 h-9 mb-2" :class="dragDoc ? 'text-navy' : 'text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
            <p class="text-sm text-gray-600 font-medium">Déposez vos documents ici ou <span class="text-navy hover:text-navy-light">parcourez</span></p>
            <p class="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG</p>
          </div>
          <input id="doc-input-edit" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple class="hidden" @change="onDocumentSelect" />
        </div>

        <div class="mt-3">
          <label class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
            Ajouter un document
            <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" class="hidden" @change="onDocumentSelect" />
          </label>
          <span class="text-xs text-gray-400 ml-2">PDF, DOC, JPG, PNG</span>
        </div>
      </div>

      <p v-if="error" class="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-5 py-3.5 flex items-center gap-2">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
        {{ error }}
      </p>

      <div class="flex gap-3 pb-8">
        <button type="submit" :disabled="saving || uploading" class="inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-navy-light transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
          {{ saving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
        </button>
        <NuxtLink to="/admin" class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all">Annuler</NuxtLink>
      </div>
    </form>
  </div>
</template>
