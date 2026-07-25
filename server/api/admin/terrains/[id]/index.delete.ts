import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const existing = await prisma.terrain.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Terrain non trouvé' })
  }

  await prisma.terrain.delete({ where: { id } })

  return { success: true }
})
