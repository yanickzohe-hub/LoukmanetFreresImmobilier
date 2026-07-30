import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)
  const body = await readBody(event)

  const existing = await prisma.avis.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Avis non trouvé' })
  }

  const data: Record<string, unknown> = {}
  if (body.nom !== undefined) data.nom = body.nom
  if (body.message !== undefined) data.message = body.message
  if (body.etoiles !== undefined) data.etoiles = Math.min(5, Math.max(1, parseInt(body.etoiles, 10)))
  if (body.contact !== undefined) data.contact = body.contact
  if (body.statut !== undefined) data.statut = body.statut

  return prisma.avis.update({
    where: { id },
    data,
  })
})
