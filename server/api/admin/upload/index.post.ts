import { extname } from 'node:path'
import { supabase, STORAGE_BUCKET } from '../../../utils/supabase'

const ALLOWED_IMAGES = ['.jpg', '.jpeg', '.png', '.webp', '.svg']
const ALLOWED_VIDEOS = ['.mp4', '.webm', '.mov']
const ALLOWED_DOCS = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event)

    if (!files || files.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' })
    }

    const uploaded = []

    for (const file of files) {
      const ext = extname(file.filename || '').toLowerCase()

      let mediaType = 'image'
      let allowed = ALLOWED_IMAGES

      if (file.name === 'document') {
        allowed = ALLOWED_DOCS
        mediaType = 'document'
      } else if (file.name === 'video') {
        allowed = ALLOWED_VIDEOS
        mediaType = 'video'
      } else if (file.name === 'image') {
        allowed = ALLOWED_IMAGES
        mediaType = 'image'
      }

      if (!allowed.includes(ext)) {
        throw createError({ statusCode: 400, statusMessage: `Type de fichier non autorisé : ${ext}` })
      }

      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filename, file.data, {
          contentType: file.type || 'application/octet-stream',
          upsert: false
        })

      if (error) {
        throw createError({ statusCode: 500, statusMessage: `Erreur upload Supabase: ${error.message}` })
      }

      uploaded.push({
        url: `/api/uploads/${filename}`,
        type: mediaType,
        filename: file.filename
      })
    }

    return uploaded
  } catch (err) {
    console.error('Upload error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Erreur lors du téléchargement du fichier'
    })
  }
})
