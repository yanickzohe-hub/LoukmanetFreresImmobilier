<script setup lang="ts">
const { show } = useToast()

const form = ref({ nom: '', message: '', etoiles: 5, contact: '' })
const sent = ref(false)
const loading = ref(false)
const error = ref('')

const stars = [1, 2, 3, 4, 5]

async function submitForm() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/avis', {
      method: 'POST',
      body: form.value
    })
    sent.value = true
    show('Votre avis a été soumis et sera publié après modération.')
    form.value = { nom: '', message: '', etoiles: 5, contact: '' }
    setTimeout(() => { sent.value = false }, 5000)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}

function setStars(n: number) {
  if (!sent.value) form.value.etoiles = n
}
</script>

<template>
  <div class="card max-w-lg mx-auto">
    <h3 class="text-lg font-heading font-semibold text-navy mb-1">Donnez votre avis</h3>
    <p class="text-sm text-gray-500 mb-5">Votre opinion compte pour nous aider à nous améliorer.</p>

    <form @submit.prevent="submitForm" class="space-y-4">
      <input
        v-model="form.nom"
        type="text"
        required
        :disabled="sent"
        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400"
        placeholder="Nom complet *"
      />

      <input
        v-model="form.contact"
        type="text"
        :disabled="sent"
        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400"
        placeholder="Téléphone ou email (optionnel)"
      />

      <div class="flex items-center gap-1 px-1">
        <span class="text-sm text-gray-400 mr-2">Note *</span>
        <button
          v-for="n in stars"
          :key="n"
          type="button"
          :disabled="sent"
          class="p-1 transition-all duration-150"
          :class="sent ? 'cursor-default' : 'cursor-pointer hover:scale-110'"
          @click="setStars(n)"
        >
          <svg
            class="w-6 h-6 transition-colors duration-150"
            :class="n <= form.etoiles ? 'text-gold' : 'text-gray-200'"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      </div>

      <textarea
        v-model="form.message"
        rows="3"
        required
        :disabled="sent"
        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400 resize-none"
        placeholder="Votre message *"
      />

      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading || sent"
        class="w-full min-h-[44px] rounded-xl font-heading font-semibold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
        :class="sent ? 'bg-green-600 text-white cursor-default' : 'bg-gold hover:bg-gold-light text-navy active:scale-[0.98]'"
      >
        <svg v-if="loading && !sent" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <template v-if="loading && !sent">Envoi...</template>
        <template v-else-if="sent">Avis envoyé</template>
        <template v-else>Envoyer mon avis</template>
      </button>
    </form>
  </div>
</template>
