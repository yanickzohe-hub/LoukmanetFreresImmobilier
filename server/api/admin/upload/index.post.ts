import { extname } from 'node:path'
import { supabase, STORAGE_BUCKET } from '../../../utils/supabase'

const ALLOWED_IMAGES = ['.jpg', '.jpeg', '.png', '.webp', '.svg']
const ALLOWED_VIDEOS = ['.mp4', '.webm', '.mov']
const ALLOWED_DOCS = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']

const ALLOWED_MIME_IMAGES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
const ALLOWED_MIME_VIDEOS = ['video/mp4', 'video/webm', 'video/quicktime']
const ALLOWED_MIME_DOCS = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg']

const MAX_FILE_SIZE = 10 * 1024 * 1024

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event)

    if (!files || files.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' })
    }

    const uploaded = []

    for (const file of files) {
      if (file.data.length > MAX_FILE_SIZE) {
        throw createError({ statusCode: 400, statusMessage: 'Fichier trop volumineux (max 10 Mo)' })
      }

      const ext = extname(file.filename || '').toLowerCase()

      let mediaType = 'image'
      let allowed = ALLOWED_IMAGES
      let allowedMime = ALLOWED_MIME_IMAGES

      if (file.name === 'document') {
        allowed = ALLOWED_DOCS
        allowedMime = ALLOWED_MIME_DOCS
        mediaType = 'document'
      } else if (file.name === 'video') {
        allowed = ALLOWED_VIDEOS
        allowedMime = ALLOWED_MIME_VIDEOS
        mediaType = 'video'
      } else if (file.name === 'image') {
        allowed = ALLOWED_IMAGES
        allowedMime = ALLOWED_MIME_IMAGES
        mediaType = 'image'
      }

      if (!allowed.includes(ext)) {
        throw createError({ statusCode: 400, statusMessage: `Extension non autorisée : ${ext}` })
      }

      if (!file.type || !allowedMime.includes(file.type)) {
        throw createError({ statusCode: 400, statusMessage: `Type MIME non autorisé : ${file.type || 'inconnu'}` })
      }

      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filename, file.data, {
          contentType: file.type,
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
    console.error('Upload error:', err) // eslint-disable-line no-console
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Erreur lors du téléchargement du fichier'
    })
  }
})
