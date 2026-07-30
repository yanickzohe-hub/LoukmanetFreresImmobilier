<script setup>
useHead({
  title: 'Contact | Loukman & Frères Immobilier',
  meta: [
    { name: 'description', content: 'Contactez Loukman & Frères Immobilier — intervention dans tout le Sud-Comoé, à Yamoussoukro et partout en Côte d\'Ivoire. Téléphone, email ou formulaire en ligne.' },
    { name: 'keywords', content: 'contact immobilier bonoua, téléphone agence immobilière, 0708342144, bonoua immobilier, contact loukman frères' },
  ]
})

useAnimateOnScroll()

const form = ref({ nom: '', telephone: '', projet: '', message: '' })
const sent = ref(false)
const loading = ref(false)
const error = ref('')

async function submitForm() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    sent.value = true
    setTimeout(() => {
      form.value = { nom: '', telephone: '', projet: '', message: '' }
      sent.value = false
    }, 4000)
  } catch {
    error.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <section class="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-8 lg:px-12 bg-navy text-center">
      <div class="max-w-3xl mx-auto animate-on-scroll">
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Contact</h1>
        <div class="w-12 h-0.5 bg-gold/60 rounded-full mx-auto mb-4"></div>
        <p class="text-white/70 text-base md:text-lg">
          Une question, un projet ? N'hésitez pas à nous contacter.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="section-container">
        <div class="grid md:grid-cols-5 gap-8 md:gap-10 animate-on-scroll">
          <div class="md:col-span-3">
            <div class="card">
              <h2 class="text-lg font-semibold mb-6">Envoyez-nous un message</h2>

              <form @submit.prevent="submitForm" class="space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div class="floating-group">
                    <input v-model="form.nom" type="text" id="contact-nom" required placeholder=" " :disabled="sent" />
                    <label for="contact-nom">Nom complet *</label>
                  </div>
                  <div class="floating-group">
                    <input v-model="form.telephone" type="tel" id="contact-tel" required placeholder=" " :disabled="sent" />
                    <label for="contact-tel">Téléphone *</label>
                  </div>
                </div>
                <div class="floating-group">
                  <input v-model="form.projet" type="text" id="contact-projet" placeholder=" " :disabled="sent" />
                  <label for="contact-projet">Type de projet</label>
                </div>
                <div class="floating-group">
                  <textarea v-model="form.message" id="contact-msg" rows="4" required placeholder=" " :disabled="sent"></textarea>
                  <label for="contact-msg">Votre message *</label>
                </div>
                <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
                <button
                  type="submit"
                  :disabled="loading || sent"
                  class="w-full min-h-[44px] rounded-xl font-heading font-semibold text-sm md:text-base transition-all duration-300 inline-flex items-center justify-center gap-2"
                  :class="sent ? 'bg-green-600 text-white cursor-default' : 'bg-gold hover:bg-gold-light text-navy active:scale-[0.98]'"
                >
                  <svg v-if="loading && !sent" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <svg v-else-if="sent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <template v-if="loading && !sent">Envoi...</template>
                  <template v-else-if="sent">Message envoyé</template>
                  <template v-else>Envoyer</template>
                </button>
              </form>
            </div>
          </div>

          <div class="md:col-span-2 space-y-4">
            <div class="card">
              <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Coordonnées</h2>
              <div class="space-y-3">
                <a href="tel:0708342144" class="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors">
                  <Icon name="phone" class="w-4 h-4 text-gold" />
                  07 08 34 21 44
                </a>
                <a href="mailto:contact@loukmanfrere.ci" class="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors">
                  <Icon name="mail" class="w-4 h-4 text-gold" />
                  <span class="truncate">contact@loukmanfrere.ci</span>
                </a>
                <p class="flex items-center gap-3 text-sm text-gray-600">
                  <Icon name="map-pin" class="w-4 h-4 text-gold" />
                  Bonoua, Yaou Nouveau Quartier
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=5.2818,-3.4123&travelmode=driving"
              target="_blank"
              rel="noopener"
              class="card overflow-hidden h-56 md:h-64 p-0 block relative group cursor-pointer"
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-3.4223%2C5.2718%2C-3.4023%2C5.2918&layer=mapnik&marker=5.2818%2C-3.4123"
                width="100%"
                height="100%"
                style="border:0;"
                loading="lazy"
                title="Localisation - Loukman & Frères Immobilier à Bonoua"
              ></iframe>
              <div
                class="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors flex items-center justify-center"
              >
                <span
                  class="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  Obtenir l'itinéraire
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
