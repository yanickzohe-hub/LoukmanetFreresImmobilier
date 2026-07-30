import { onMounted, onUnmounted, nextTick } from 'vue'

export function useAnimateOnScroll() {
  if (import.meta.server) return

  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    nextTick(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el)
      })
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
