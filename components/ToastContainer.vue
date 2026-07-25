<script setup>
const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto bg-white rounded-2xl border shadow-xl shadow-gray-200/50 px-4 py-3.5 flex items-start gap-3 animate-in slide-in-from-right-2 duration-300"
        :class="toast.type === 'success' ? 'border-green-100' : 'border-red-100'"
        role="alert"
      >
        <div
          class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          :class="toast.type === 'success' ? 'bg-green-50' : 'bg-red-50'"
        >
          <svg v-if="toast.type === 'success'" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          <svg v-else class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium" :class="toast.type === 'success' ? 'text-green-800' : 'text-red-800'">
            {{ toast.message }}
          </p>
        </div>
        <button @click="dismiss(toast.id)" class="p-1 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all shrink-0 mt-0.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(1rem); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-in {
  animation: slideInRight 0.25s ease-out;
}
</style>
