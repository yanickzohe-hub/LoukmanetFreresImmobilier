import { supabase, STORAGE_BUCKET } from '../../utils/supabase'
import prisma from '../../utils/prisma'
import { getAdminId } from '../../utils/adminAuth'

const SAFE_FILENAME = /^[\w][\w.-]*$/

export default defineEventHandler(async (event) => {
  const raw = event.context.params?.filename
  const filename = Array.isArray(raw) ? raw.join('/') : raw

  if (!filename || !SAFE_FILENAME.test(filename)) {
    throw createError({ statusCode: 400, statusMessage: 'Nom de fichier invalide' })
  }

  const url = `/api/uploads/${filename}`
  const document = await prisma.document.findFirst({ where: { url }, select: { id: true } })

  if (document && !getAdminId(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Authentification requise pour ce document' })
  }

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(filename)

  if (error || !data) {
    throw createError({ statusCode: 404, statusMessage: 'Fichier non trouvé' })
  }

  const arrayBuffer = await data.arrayBuffer()

  setHeader(event, 'Content-Type', data.type || 'application/octet-stream')
  setHeader(event, 'Cache-Control', document
    ? 'private, max-age=0, must-revalidate'
    : 'public, max-age=31536000, immutable')
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  if (filename.toLowerCase().endsWith('.svg')) {
    setHeader(event, 'Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; sandbox")
  }
  setHeader(event, 'Content-Length', arrayBuffer.byteLength.toString())

  return Buffer.from(arrayBuffer)
})
