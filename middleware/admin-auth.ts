export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const { logout, isTokenExpired } = useAdminAuth()
    const token = localStorage.getItem('admin_token')
    if (!token) {
      return navigateTo('/admin/login')
    }
    if (isTokenExpired(token)) {
      logout()
      return navigateTo('/admin/login')
    }
  }
})
