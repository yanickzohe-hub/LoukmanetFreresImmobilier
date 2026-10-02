import { getAdminId, hasAdminToken } from '../utils/adminAuth'

export default defineEventHandler((event) => {
  const path = event.path

  const needsAuth = path.startsWith('/api/admin') || path.startsWith('/api/auth/me')
  if (!needsAuth) {
    return
  }

  if (!hasAdminToken(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  if (!getAdminId(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Token invalide ou expiré' })
  }
})
