import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const terrain = await prisma.terrain.findUnique({
    where: { id },
    include: { images: { orderBy: { ordre: 'asc' } } }
  })

  if (!terrain) {
    throw createError({ statusCode: 404, statusMessage: 'Terrain non trouvé' })
  }

  const similaires = await prisma.terrain.findMany({
    where: {
      id: { not: id },
      statut: 'Disponible',
      OR: [
        { lieu: terrain.lieu },
        { quartier: terrain.quartier },
        { zone: terrain.zone || undefined },
      ].filter(Boolean),
    },
    include: { images: { orderBy: { ordre: 'asc' } } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  if (similaires.length >= 3) return similaires

  const alreadyIds = [id, ...similaires.map(s => s.id)]

  const extra = await prisma.terrain.findMany({
    where: {
      id: { notIn: alreadyIds },
      statut: 'Disponible',
    },
    include: { images: { orderBy: { ordre: 'asc' } } },
    take: 3 - similaires.length,
    orderBy: { createdAt: 'desc' },
  })

  return [...similaires, ...extra]
})
