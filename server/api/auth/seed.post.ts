import bcrypt from 'bcryptjs'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.secret !== (process.env.ADMIN_SEED_SECRET || 'change-me-in-production')) {
    throw createError({ statusCode: 403, statusMessage: 'Secret invalide' })
  }

  const existing = await prisma.admin.findUnique({ where: { email: body.email || 'admin@loukman-immobilier.ci' } })

  if (existing) {
    return { message: 'L\'admin existe déjà', id: existing.id }
  }

  const admin = await prisma.admin.create({
    data: {
      email: body.email || 'admin@loukman-immobilier.ci',
      password: bcrypt.hashSync(body.password || 'admin123', 10),
      nom: body.nom || 'Administrateur',
    }
  })

  return { message: 'Admin créé avec succès', id: admin.id }
})
