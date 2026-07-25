<script setup>
import { Vue3Lottie } from 'vue3-lottie'

const props = defineProps({
  animationData: { type: Object, required: true },
  loop: { type: Boolean, default: true },
  autoPlay: { type: Boolean, default: true },
  speed: { type: Number, default: 1 },
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' },
})
</script>

<template>
  <ClientOnly>
    <Vue3Lottie
      :animationData="animationData"
      :loop="loop"
      :autoPlay="autoPlay"
      :speed="speed"
      :style="{ width, height }"
    />
    <template #fallback>
      <div class="bg-gray-100 rounded" :style="{ width, height }"></div>
    </template>
  </ClientOnly>
</template>
