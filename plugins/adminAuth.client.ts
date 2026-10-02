export default defineNuxtPlugin(() => {
  const { init } = useAdminAuth()
  init()

  const router = useRouter()

  const api = $fetch.create({
    onRequest({ options }) {
      const { getToken } = useAdminAuth()
      const legacy = getToken()
      if (legacy) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${legacy}`
        }
      }
    },
    onResponseError({ response }) {
      if (response.status !== 401) return
      const { logout: doLogout } = useAdminAuth()
      doLogout()
      const path = router.currentRoute.value.path
      if (path.startsWith('/admin') && path !== '/admin/login') {
        router.push('/admin/login')
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
