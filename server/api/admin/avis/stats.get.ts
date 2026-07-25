import prisma from '../../../utils/prisma'

export default defineEventHandler(async () => {
  const total = await prisma.avis.count()
  const enAttente = await prisma.avis.count({ where: { statut: 'en_attente' } })

  return { total, enAttente }
})
