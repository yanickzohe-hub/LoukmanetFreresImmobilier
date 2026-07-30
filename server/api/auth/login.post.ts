import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../utils/prisma'
import { checkRateLimit } from '../../utils/ratelimit'

const JWT_SECRET = process.env.JWT_SECRET

export default defineEventHandler(async (event) => {
  const ip = getHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress || 'unknown'
  checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)

  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email et mot de passe requis' })
  }

  const admin = await prisma.admin.findUnique({ where: { email } })

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants incorrects' })
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '24h', algorithm: 'HS256' })

  return { token, admin: { id: admin.id, email: admin.email, nom: admin.nom } }
})
