<script setup>
definePageMeta({ layout: false })

const { login } = useAdminAuth()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/admin')
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center mx-auto mb-4 shadow-xl shadow-navy/10">
          <span class="text-gold font-heading font-bold text-xl">L</span>
        </div>
        <h1 class="text-2xl font-heading font-bold text-navy">Administration</h1>
        <p class="text-gray-500 text-sm mt-1">Connectez-vous pour gérer votre catalogue</p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-7">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Adresse email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400"
              placeholder="admin@exemple.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-navy text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-navy-light transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>

      <p class="text-center text-xs text-gray-400 mt-6">
        &copy; {{ new Date().getFullYear() }} Loukman &amp; Frères Immobilier
      </p>
    </div>
  </div>
</template>
