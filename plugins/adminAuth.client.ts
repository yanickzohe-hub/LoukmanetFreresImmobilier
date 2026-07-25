export default defineNuxtPlugin(() => {
  const { init } = useAdminAuth()
  init()

  const api = $fetch.create({
    onRequest({ options }) {
      const { getToken } = useAdminAuth()
      const t = getToken()
      if (t) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${t}`
        }
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
