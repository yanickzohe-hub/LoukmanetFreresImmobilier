import prisma from '../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.avis.findMany({
    where: { statut: 'publie' },
    orderBy: { createdAt: 'desc' }
  })
})
