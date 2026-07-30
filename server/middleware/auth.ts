import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environnement manquant')
}

export default defineEventHandler((event) => {
  const path = event.path

  if (!path.startsWith('/api/admin')) {
    return
  }

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  const token = authHeader.slice(7)

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as { id: number; email: string }
    event.context.adminId = decoded.id
    event.context.adminEmail = decoded.email
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Token invalide ou expiré' })
  }
})
