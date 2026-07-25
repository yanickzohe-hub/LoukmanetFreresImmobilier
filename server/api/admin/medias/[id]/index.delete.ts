import prisma from '../../../../utils/prisma'
import { supabase, STORAGE_BUCKET } from '../../../../utils/supabase'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const media = await prisma.media.findUnique({ where: { id } })
  if (!media) {
    throw createError({ statusCode: 404, statusMessage: 'Média non trouvé' })
  }

  if (media.url.startsWith('/api/uploads/')) {
    const filename = media.url.replace('/api/uploads/', '')
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filename])
    if (error) {
      console.error('Supabase delete error:', error.message)
    }
  }

  await prisma.media.delete({ where: { id } })

  return { success: true }
})
