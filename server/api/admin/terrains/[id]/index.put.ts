import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)
  const body = await readBody(event)

  const existing = await prisma.terrain.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Terrain non trouvé' })
  }

  return prisma.terrain.update({
    where: { id },
    data: {
      lieu: body.lieu ?? existing.lieu,
      quartier: body.quartier ?? existing.quartier,
      zone: body.zone !== undefined ? body.zone : existing.zone,
      superficie: body.superficie ?? existing.superficie,
      prix: body.prix ?? existing.prix,
      statut: body.statut ?? existing.statut,
      description: body.description !== undefined ? body.description : existing.description,
    },
    include: { images: true, documents: true }
  })
})
