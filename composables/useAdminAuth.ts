const token = ref<string | null>(null)
const admin = ref<{ id: number; email: string; nom: string } | null>(null)

export function useAdminAuth() {
  function init() {
    const saved = localStorage.getItem('admin_token')
    const savedAdmin = localStorage.getItem('admin_user')
    if (saved && savedAdmin) {
      token.value = saved
      admin.value = JSON.parse(savedAdmin)
    }
  }

  async function login(email: string, password: string) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    token.value = data.token
    admin.value = data.admin
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_user', JSON.stringify(data.admin))
    return data
  }

  function logout() {
    token.value = null
    admin.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  function isAuthenticated() {
    return !!token.value
  }

  function getToken() {
    return token.value
  }

  return { token, admin, init, login, logout, isAuthenticated, getToken }
}
