import prisma from '../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.terrain.findMany({
    where: { statut: 'Disponible' },
    include: { images: { orderBy: { ordre: 'asc' } }, documents: true },
    orderBy: { createdAt: 'desc' }
  })
})
