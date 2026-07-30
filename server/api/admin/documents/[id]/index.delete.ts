import prisma from '../../../../utils/prisma'
import { supabase, STORAGE_BUCKET } from '../../../../utils/supabase'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const doc = await prisma.document.findUnique({ where: { id } })
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Document non trouvé' })
  }

  if (doc.url.startsWith('/api/uploads/')) {
    const filename = doc.url.replace('/api/uploads/', '')
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filename])
    if (error) {
      console.error('Supabase delete error:', error.message) // eslint-disable-line no-console
    }
  }

  await prisma.document.delete({ where: { id } })

  return { success: true }
})
