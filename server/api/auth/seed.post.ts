import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import prisma from '../../utils/prisma'
import { checkRateLimit, clientIp } from '../../utils/ratelimit'

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

export default defineEventHandler(async (event) => {
  checkRateLimit(`seed:${clientIp(event)}`, 5, 15 * 60 * 1000)

  const secret = process.env.ADMIN_SEED_SECRET
  if (!secret) {
    throw createError({ statusCode: 500, statusMessage: 'ADMIN_SEED_SECRET manquant sur le serveur' })
  }

  const body = await readBody(event)
  if (!body?.secret || typeof body.secret !== 'string' || !safeEqual(body.secret, secret)) {
    throw createError({ statusCode: 403, statusMessage: 'Secret invalide' })
  }

  const { email, password, nom } = body || {}

  if (!email || !password || !nom) {
    throw createError({ statusCode: 400, statusMessage: 'email, password et nom requis' })
  }
  if (typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Email invalide' })
  }
  if (typeof password !== 'string' || password.length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Mot de passe trop court (10 caractères minimum)' })
  }

  const existing = await prisma.admin.findUnique({ where: { email } })

  if (existing) {
    return { message: 'L\'admin existe déjà', id: existing.id }
  }

  const admin = await prisma.admin.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 12),
      nom
    }
  })

  return { message: 'Admin créé avec succès', id: admin.id }
})
