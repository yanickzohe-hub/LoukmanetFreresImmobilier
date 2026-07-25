import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.url || !body.terrainId) {
    throw createError({ statusCode: 400, statusMessage: 'URL et terrainId requis' })
  }

  return prisma.document.create({
    data: {
      url: body.url,
      type: body.type || 'attestation_villageoise',
      label: body.label || null,
      terrainId: parseInt(body.terrainId, 10),
    }
  })
})
