import bcrypt from 'bcryptjs'
import prisma from '../../utils/prisma'
import { checkRateLimit, clientIp } from '../../utils/ratelimit'
import { signAdminToken, setAdminCookie } from '../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  checkRateLimit(`login:${clientIp(event)}`, 5, 15 * 60 * 1000)

  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email et mot de passe requis' })
  }

  const admin = await prisma.admin.findUnique({ where: { email } })

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants incorrects' })
  }

  const token = signAdminToken({ id: admin.id, email: admin.email })
  setAdminCookie(event, token)

  return { admin: { id: admin.id, email: admin.email, nom: admin.nom } }
})
