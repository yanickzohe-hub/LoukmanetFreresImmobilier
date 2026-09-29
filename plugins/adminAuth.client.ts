export default defineNuxtPlugin(() => {
  const { init, logout, isTokenExpired } = useAdminAuth()
  init()

  const router = useRouter()

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

  if (isTokenExpired()) {
    logout()
  }

  return {
    provide: {
      api
    }
  }
})
