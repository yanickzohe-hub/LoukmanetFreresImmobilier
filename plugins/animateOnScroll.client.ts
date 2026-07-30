/**
 * Plugin Nuxt : animation au scroll
 * 
 * Observe les éléments avec la classe .animate-on-scroll
 * et déclenche l'animation fade-in-up lorsqu'ils entrent dans le viewport.
 */

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const observer = new IntersectionObserver(
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

  function observeElements() {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    observeElements()

    const pageObserver = new MutationObserver(() => {
      observeElements()
    })

    pageObserver.observe(document.body, { childList: true, subtree: true })

    onUnmounted(() => {
      observer.disconnect()
      pageObserver.disconnect()
    })
  })
})
