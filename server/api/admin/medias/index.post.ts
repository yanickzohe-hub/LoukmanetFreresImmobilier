import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.url) {
    throw createError({ statusCode: 400, statusMessage: 'URL du média requis' })
  }

  const terrainId = body.terrainId ? Number(body.terrainId) : null

  const max = terrainId ? await prisma.media.aggregate({
    where: { terrainId },
    _max: { ordre: true }
  }) : null

  return prisma.media.create({
    data: {
      url: body.url,
      type: body.type || 'image',
      ordre: body.ordre ?? (max?._max.ordre ?? -1) + 1,
      terrainId,
    }
  })
})
