import prisma from '../../../../utils/prisma'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const doc = await prisma.document.findUnique({ where: { id } })
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Document non trouvé' })
  }

  try {
    const filepath = join(process.cwd(), 'public', doc.url)
    await unlink(filepath)
  } catch {
    // file may not exist on disk
  }

  await prisma.document.delete({ where: { id } })

  return { success: true }
})
