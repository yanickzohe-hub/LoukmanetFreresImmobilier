<script setup>
const active = ref(0)
const isPaused = ref(false)

let timer, pauseTimer
watch(active, () => pauseForInteract())
onMounted(() => {
  timer = setInterval(() => {
    if (!isPaused.value) {
      active.value = (active.value + 1) % services.length
    }
  }, 4000)
})
onUnmounted(() => {
  clearInterval(timer)
  clearTimeout(pauseTimer)
})

function pauseForInteract() {
  isPaused.value = true
  clearTimeout(pauseTimer)
  pauseTimer = setTimeout(() => { isPaused.value = false }, 10000)
}

const services = [
  { title: 'Vente de terrains', desc: 'Terrains sécurisés et bien situés à Bonoua et environs. Nous vous accompagnons dans le choix du terrain idéal pour votre projet, avec des titres fonciers clairs et une localisation stratégique.', icon: 'home', color: '#0B1B3D', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80' },
  { title: 'Lotissement', desc: 'Découpage et structuration de parcelles pour vos projets. Nous assurons la viabilisation complète : voiries, réseaux d\'eau, électricité et assainissement.', icon: 'map', color: '#1a3a6b', img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&q=80' },
  { title: 'Aménagement / Voirie', desc: 'Ouverture de voie et aménagement de zones constructibles. De la conception à la réalisation, nous transformons vos terrains en espaces prêts à bâtir.', icon: 'road', color: '#2a5a9b', img: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&h=400&fit=crop&q=80' },
  { title: 'Pose de poteaux', desc: "Installation de poteaux pour l'électrification des sites. Nous raccordons vos parcelles au réseau électrique avec des matériaux conformes aux normes.", icon: 'lightning', color: '#3a7acb', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&q=80' },
  { title: 'Construction', desc: 'Accompagnement dans vos projets de construction. De la fondation à la toiture, nous supervisons chaque étape pour garantir qualité et respect des délais.', icon: 'building', color: '#4a9afb', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80' },
  { title: 'Gestion immobilière', desc: 'Location et gestion de biens en toute sérénité. Nous prenons en charge la recherche de locataires, la rédaction des baux et le suivi administratif.', icon: 'key', color: '#5abaff', img: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=400&fit=crop&q=80' },
]

function bringToFront(i) {
  active.value = i
  pauseForInteract()
}

function getCardTransform(i) {
  if (i === active.value) return 'translate3d(0px, 0px, 0px) skew(0deg, 0deg)'
  const dir = i > active.value ? 1 : -1
  const offset = Math.abs(i - active.value)
  const x = dir * offset * 12
  const y = offset * 24
  const z = -offset * 60
  const skew = dir * offset * 2
  return `translate3d(${x}px, ${y}px, ${z}px) skew(0deg, ${skew}deg)`
}

const selectedBrand = ref(null)

const brandCards = [
  { logo: '/logo1.png', name: 'Loukman & Frères', description: "Notre identité principale — un engagement d'excellence dans l'immobilier et l'aménagement depuis des générations." },
  { logo: '/logo2.jpeg', name: 'Logo Secondaire', description: 'Symbole de notre héritage et de notre ancrage local, représentant la confiance et la pérennité.' },
  { logo: '/logo3.jpeg', name: 'Logo Tertiaire', description: 'Une vision moderne de l\'immobilier, alliant tradition et innovation pour des projets d\'avenir.' },
]
</script>

<template>
  <section class="section-padding overflow-hidden">
    <div class="section-container">

      <!-- Mobile: single card carousel -->
      <div class="lg:hidden">
        <Transition name="desc" mode="out-in">
          <div :key="active" class="card rounded-2xl overflow-hidden shadow-card border border-line/60">
            <div class="relative h-48 overflow-hidden">
              <NuxtImg
                :src="services[active].img"
                :alt="services[active].title"
                class="w-full h-full object-cover"
                width="600"
                height="400"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/60 to-transparent h-20"></div>
              <span
                class="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                :style="{ background: services[active].color + '20', color: 'white' }"
              >
                {{ services[active].title }}
              </span>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-3 mb-3">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  :style="{ background: services[active].color }"
                >
                  <Icon :name="services[active].icon" class="w-5 h-5 text-white" />
                </div>
                <h3 class="text-lg font-bold text-navy">{{ services[active].title }}</h3>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed mb-4">
                {{ services[active].desc }}
              </p>
              <NuxtLink
                to="/contact"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-300"
                :style="{ background: services[active].color }"
              >
                Demander ce service
                <span aria-hidden="true" class="text-base leading-none">&rarr;</span>
              </NuxtLink>
            </div>
          </div>
        </Transition>

        <div class="flex items-center justify-center gap-2 mt-4">
          <button
            @click="active = active > 0 ? active - 1 : services.length - 1"
            class="flex items-center justify-center w-8 h-8 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300"
            aria-label="Service précédent"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="flex items-center gap-1.5">
            <button
              v-for="(s, i) in services"
              :key="'dot-'+i"
              @click="active = i"
              class="group relative flex items-center justify-center h-6"
            >
              <span
                class="block rounded-full dot-spring"
                :class="i === active
                  ? 'w-5 h-2 bg-gold shadow-sm shadow-gold/40'
                  : 'w-1.5 h-1.5 bg-navy/20 group-hover:bg-gold/60 group-hover:scale-125'"
              ></span>
            </button>
          </div>
          <button
            @click="active = active < services.length - 1 ? active + 1 : 0"
            class="flex items-center justify-center w-8 h-8 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300"
            aria-label="Service suivant"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Desktop: left description + right 3D stacked cards -->
      <div class="hidden lg:flex flex-row items-stretch gap-24">
        <div class="w-1/2 flex flex-col justify-center">
          <Transition name="desc" mode="out-in">
            <div class="max-w-lg" :key="active">
            <span
              class="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              :style="{ background: services[active].color + '15', color: services[active].color }"
            >
              {{ services[active].title }}
            </span>
            <div class="w-full max-w-sm rounded-xl overflow-hidden mb-6 shadow-lg">
              <NuxtImg
                :src="services[active].img"
                :alt="services[active].title"
                class="w-full h-48 object-cover"
                width="600"
                height="400"
              />
            </div>
            <h2 class="text-3xl lg:text-4xl font-bold text-navy mb-4">
              {{ services[active].title }}
            </h2>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {{ services[active].desc }}
            </p>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              :style="{ background: services[active].color }"
            >
              Demander ce service
              <span aria-hidden="true" class="text-lg leading-none">&rarr;</span>
            </NuxtLink>
          </div>
          </Transition>
        </div>

        <div class="w-1/2 flex flex-col items-center gap-1">
          <div class="relative w-full max-w-[420px] perspective-[900px]" style="min-height: 520px">
            <div
              v-for="(s, i) in services"
              :key="s.title"
              @click="bringToFront(i)"
              class="absolute w-[380px] md:w-[420px] rounded-2xl border cursor-pointer card-spring overflow-hidden"
              :class="i === active ? 'border-gold/60 shadow-xl shadow-gold/10 z-10' : 'border-gray-200 hover:border-gold/30'"
              :style="{
                transform: getCardTransform(i),
                zIndex: i === active ? services.length : services.length - i,
                background: 'white',
              }"
            >
              <div class="h-44 sm:h-52 overflow-hidden">
                <NuxtImg
                  :src="s.img"
                  :alt="s.title"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-500"
                  :class="i === active ? 'scale-100' : 'scale-105'"
                  width="420"
                  height="200"
                />
              </div>
              <div class="flex items-center gap-3 p-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                  :style="{ background: i === active ? s.color : '#f3f4f6' }"
                >
                  <Icon :name="s.icon" class="w-5 h-5" :class="i === active ? 'text-white' : 'text-gray-500'" />
                </div>
                <div class="min-w-0">
                  <h3 class="text-sm font-semibold truncate" :class="i === active ? 'text-navy' : 'text-gray-700'">
                    {{ s.title }}
                  </h3>
                  <p class="text-[11px] text-gray-500 truncate">{{ s.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              @click="active = active > 0 ? active - 1 : services.length - 1"
              class="flex items-center justify-center w-9 h-9 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Service précédent"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="flex items-center gap-1.5">
              <button
                v-for="(s, i) in services"
                :key="'dot-'+i"
                @click="active = i"
                class="group relative flex items-center justify-center h-8"
                :aria-label="'Aller à ' + s.title"
              >
                <span
                  class="block rounded-full dot-spring"
                  :class="i === active
                    ? 'w-7 h-2.5 bg-gold shadow-sm shadow-gold/40'
                    : 'w-2 h-2 bg-navy/20 group-hover:bg-gold/60 group-hover:scale-125'"
                ></span>
              </button>
            </div>
            <button
              @click="active = active < services.length - 1 ? active + 1 : 0"
              class="flex items-center justify-center w-9 h-9 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Service suivant"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logos 3D Cards -->
    <div class="mt-20 md:mt-24">
      <div class="text-center mb-8 md:mb-10">
        <h2 class="text-fluid-title mb-2">Notre Marque</h2>
        <div class="w-12 h-0.5 bg-gold rounded-full mx-auto"></div>
      </div>

      <div class="flex flex-wrap justify-center gap-5 md:gap-8 perspective-[1000px]">
        <div
          v-for="(card, i) in brandCards"
          :key="i"
          @click="selectedBrand = i"
          class="logo-3d w-40 h-40 md:w-52 md:h-52 rounded-2xl bg-white border border-gray-100 shadow-soft flex items-center justify-center p-5 md:p-6 cursor-pointer"
          :style="{ transitionDelay: `${i * 0.1}s` }"
          :class="{ 'ring-2 ring-gold ring-offset-2': selectedBrand === i }"
        >
          <img
            :src="card.logo"
            :alt="card.name"
            class="w-full h-full object-contain"
          />
        </div>
      </div>

      <!-- Modal Détails -->
      <Teleport to="body">
        <Transition name="modal">
          <div
            v-if="selectedBrand !== null"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4"
            @click="selectedBrand = null"
          >
            <div class="absolute inset-0 bg-navy/80 backdrop-blur-md"></div>
            <div
              class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 text-center"
              @click.stop
            >
              <button
                @click="selectedBrand = null"
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div class="w-32 h-32 mx-auto mb-5 rounded-2xl bg-white border border-gray-100 shadow-soft flex items-center justify-center p-4">
                <img :src="brandCards[selectedBrand].logo" :alt="brandCards[selectedBrand].name" class="w-full h-full object-contain" />
              </div>

              <h3 class="text-xl font-heading font-bold text-navy mb-2">{{ brandCards[selectedBrand].name }}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{{ brandCards[selectedBrand].description }}</p>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<style scoped>
.card-spring {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.logo-3d {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.logo-3d:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 24px 48px -12px rgba(11, 27, 61, 0.2);
  border-color: rgba(245, 166, 35, 0.4);
}

.dot-spring {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.desc-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.desc-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.desc-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.desc-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.9);
}
</style>
