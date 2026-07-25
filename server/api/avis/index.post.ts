import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.nom || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Nom et message sont requis' })
  }

  const etoiles = Math.min(5, Math.max(1, parseInt(body.etoiles, 10) || 5))

  return prisma.avis.create({
    data: {
      nom: body.nom,
      message: body.message,
      etoiles,
      contact: body.contact || null,
      statut: 'en_attente',
    }
  })
})
