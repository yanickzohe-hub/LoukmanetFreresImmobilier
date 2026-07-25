import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const existing = await prisma.avis.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Avis non trouvé' })
  }

  await prisma.avis.delete({ where: { id } })

  return { success: true }
})
