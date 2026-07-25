import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const adminId = event.context.adminId
  if (!adminId) {
    throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })
  }

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, nom: true }
  })

  if (!admin) {
    throw createError({ statusCode: 404, statusMessage: 'Admin non trouvé' })
  }

  return admin
})
