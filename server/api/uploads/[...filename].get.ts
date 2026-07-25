import { supabase, STORAGE_BUCKET } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const raw = event.context.params?.filename
  const filename = Array.isArray(raw) ? raw.join('/') : raw

  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: 'Nom de fichier manquant' })
  }

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(filename)

  if (error || !data) {
    throw createError({ statusCode: 404, statusMessage: 'Fichier non trouvé' })
  }

  const arrayBuffer = await data.arrayBuffer()

  setHeader(event, 'Content-Type', data.type || 'application/octet-stream')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  setHeader(event, 'Content-Length', arrayBuffer.byteLength.toString())

  return Buffer.from(arrayBuffer)
})
