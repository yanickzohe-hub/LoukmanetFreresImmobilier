import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.lieu || !body.quartier || !body.superficie || !body.prix) {
    throw createError({ statusCode: 400, statusMessage: 'Champs requis : lieu, quartier, superficie, prix' })
  }

  return prisma.terrain.create({
    data: {
      lieu: body.lieu,
      quartier: body.quartier,
      zone: body.zone || null,
      superficie: body.superficie,
      prix: body.prix,
      statut: body.statut || 'Disponible',
      description: body.description || null,
    },
    include: { images: true, documents: true }
  })
})
