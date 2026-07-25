<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'

interface Marker {
  id: string
  location: [number, number]
  label: string
}

interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
}

const props = withDefaults(defineProps<{
  markers?: Marker[]
  arcs?: Arc[]
  speed?: number
}>(), {
  markers: () => [
    { id: 'abj', location: [5.36, -4.03], label: 'Abidjan' },
    { id: 'bon', location: [5.27, -3.59], label: 'Bonoua' },
    { id: 'gba', location: [5.20, -3.74], label: 'Grand-Bassam' },
    { id: 'par', location: [48.86, 2.35], label: 'Paris' },
    { id: 'dub', location: [25.20, 55.27], label: 'Dubai' },
    { id: 'nyc', location: [40.71, -74.01], label: 'New York' },
  ],
  arcs: () => [
    { id: 'arc-1', from: [5.36, -4.03], to: [48.86, 2.35] },
    { id: 'arc-2', from: [5.36, -4.03], to: [25.20, 55.27] },
    { id: 'arc-3', from: [5.36, -4.03], to: [40.71, -74.01] },
    { id: 'arc-4', from: [5.27, -3.59], to: [48.86, 2.35] },
    { id: 'arc-5', from: [5.20, -3.74], to: [5.36, -4.03] },
  ],
  speed: 0.002,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const pointerInteracting = ref<{ x: number; y: number } | null>(null)
const dragOffset = reactive({ phi: 0, theta: 0 })
let phiOffset = 0
let thetaOffset = 0
let isPaused = false
let globe: any = null
let animationId: number | null = null
let phi = 0

function handlePointerDown(e: PointerEvent) {
  pointerInteracting.value = { x: e.clientX, y: e.clientY }
  if (canvasRef.value) canvasRef.value.style.cursor = 'grabbing'
  isPaused = true
}

function handlePointerUp() {
  if (pointerInteracting.value !== null) {
    phiOffset += dragOffset.phi
    thetaOffset += dragOffset.theta
    dragOffset.phi = 0
    dragOffset.theta = 0
  }
  pointerInteracting.value = null
  if (canvasRef.value) canvasRef.value.style.cursor = 'grab'
  isPaused = false
}

function handlePointerMove(e: PointerEvent) {
  if (pointerInteracting.value !== null) {
    dragOffset.phi = (e.clientX - pointerInteracting.value.x) / 300
    dragOffset.theta = (e.clientY - pointerInteracting.value.y) / 1000
  }
}

onMounted(async () => {
  const createGlobe = (await import('cobe')).default
  const canvas = canvasRef.value
  if (!canvas) return

  const width = canvas.offsetWidth
  if (!width) return

  globe = createGlobe(canvas, {
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    width,
    height: width,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 8,
    baseColor: [0.15, 0.2, 0.4],
    markerColor: [0.96, 0.65, 0.14],
    glowColor: [0.04, 0.07, 0.16],
    markers: props.markers.map((m) => ({
      location: m.location,
      size: 0.035,
    })),
  })

  function animate() {
    if (!isPaused) phi += props.speed
    globe.update({
      phi: phi + phiOffset + dragOffset.phi,
      theta: 0.3 + thetaOffset + dragOffset.theta,
    })
    animationId = requestAnimationFrame(animate)
  }

  animate()
  setTimeout(() => { if (canvas) canvas.style.opacity = '1' }, 100)
})

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId)
  if (globe) globe.destroy()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointerleave="handlePointerUp"
    class="w-full h-full cursor-grab rounded-full"
    :style="{ opacity: 0, transition: 'opacity 1.2s ease', touchAction: 'none' }"
  />
</template>
