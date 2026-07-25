/**
 * API de traitement du formulaire de contact
 * 
 * Reçoit les données du formulaire, valide les champs obligatoires,
 * puis envoie un email de notification via SMTP (Nodemailer).
 * 
 * Si les variables d'environnement SMTP ne sont pas configurées,
 * les données sont uniquement loggées dans la console (mode debug).
 */

import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nom, telephone, projet, message } = body

  if (!nom || !telephone || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Nom, téléphone et message sont requis' })
  }

  const config = useRuntimeConfig()

  if (!config.emailHost || !config.emailUser || !config.emailPass || !config.emailTo) {
    console.log('Email non configuré, affichage dans la console :', { nom, telephone, projet, message })
    return { success: true }
  }

  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 587,
    secure: false,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  })

  await transporter.sendMail({
    from: `"Formulaire Contact" <${config.emailUser}>`,
    to: config.emailTo,
    subject: `Nouveau message de ${nom} - Loukman Immobilier`,
    html: `
      <h2>Nouveau message depuis le site</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Téléphone :</strong> ${telephone}</p>
      <p><strong>Projet :</strong> ${projet || 'Non précisé'}</p>
      <p><strong>Message :</strong><br/>${message}</p>
    `,
  })

  return { success: true }
})
