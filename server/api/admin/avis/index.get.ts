import prisma from '../../../utils/prisma'

export default defineEventHandler(async () => {
  return prisma.avis.findMany({
    orderBy: { createdAt: 'desc' }
  })
})
