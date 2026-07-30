import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!Array.isArray(body.ordre)) {
    throw createError({ statusCode: 400, statusMessage: 'Liste ordre requise' })
  }

  await prisma.$transaction(
    body.ordre.map((mediaId, index) =>
      prisma.media.update({
        where: { id: mediaId },
        data: { ordre: index }
      })
    )
  )

  return { success: true }
})
