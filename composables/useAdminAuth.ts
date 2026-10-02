const admin = ref<{ id: number, email: string, nom: string } | null>(null)

export function useAdminAuth() {
  function init() {
    const savedAdmin = localStorage.getItem('admin_user')
    if (!savedAdmin) return
    try {
      admin.value = JSON.parse(savedAdmin)
    } catch {
      localStorage.removeItem('admin_user')
    }
  }

  async function login(email: string, password: string) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    admin.value = data.admin
    localStorage.setItem('admin_user', JSON.stringify(data.admin))
    localStorage.removeItem('admin_token')
    return data
  }

  async function logout() {
    admin.value = null
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_token')
    await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
  }

  function isAuthenticated() {
    return !!admin.value
  }

  function getToken() {
    return localStorage.getItem('admin_token')
  }

  return { admin, init, login, logout, isAuthenticated, getToken }
}
