import { clearAdminCookie } from '../../utils/adminAuth'

export default defineEventHandler((event) => {
  clearAdminCookie(event)
  return { message: 'Déconnecté' }
})
