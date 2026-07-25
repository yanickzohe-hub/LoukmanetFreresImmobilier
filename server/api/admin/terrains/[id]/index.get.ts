import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const terrain = await prisma.terrain.findUnique({
    where: { id },
    include: { images: { orderBy: { ordre: 'asc' } }, documents: true }
  })

  if (!terrain) {
    throw createError({ statusCode: 404, statusMessage: 'Terrain non trouvé' })
  }

  return terrain
})
