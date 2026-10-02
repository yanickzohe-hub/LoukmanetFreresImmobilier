export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    if (!localStorage.getItem('admin_user')) {
      return navigateTo('/admin/login')
    }
  }
})
