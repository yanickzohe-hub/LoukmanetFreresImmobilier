import nodemailer from 'nodemailer'

function escapeHtml(text) {
  if (!text) return ''
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nom, telephone, projet, message } = body

  if (!nom || !telephone || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Nom, téléphone et message sont requis' })
  }

  const config = useRuntimeConfig()

  if (!config.emailHost || !config.emailUser || !config.emailPass || !config.emailTo) {
    return { success: true }
  }

  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: Number(config.emailPort) || 587,
    secure: false,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  })

  await transporter.sendMail({
    from: `"Formulaire Contact" <${config.emailUser}>`,
    to: config.emailTo,
    subject: `Nouveau message de ${escapeHtml(nom)} - Loukman Immobilier`,
    html: `
      <h2>Nouveau message depuis le site</h2>
      <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(telephone)}</p>
      <p><strong>Projet :</strong> ${escapeHtml(projet) || 'Non précisé'}</p>
      <p><strong>Message :</strong><br/>${escapeHtml(message)}</p>
    `,
  })

  return { success: true }
})
