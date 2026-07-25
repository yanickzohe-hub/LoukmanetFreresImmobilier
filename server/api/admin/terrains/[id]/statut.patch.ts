import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)
  const body = await readBody(event)

  if (!body.statut) {
    throw createError({ statusCode: 400, statusMessage: 'Champ statut requis' })
  }

  const existing = await prisma.terrain.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Terrain non trouvé' })
  }

  return prisma.terrain.update({
    where: { id },
    data: { statut: body.statut }
  })
})
