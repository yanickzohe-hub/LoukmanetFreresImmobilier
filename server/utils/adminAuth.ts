import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET

export const ADMIN_COOKIE = 'admin_token'

export function signAdminToken(admin: { id: number, email: string }): string {
  if (!JWT_SECRET) {
    throw createError({ statusCode: 500, statusMessage: 'JWT_SECRET manquant sur le serveur' })
  }
  return jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '24h', algorithm: 'HS256' })
}

function candidates(event: H3Event): string[] {
  const list: string[] = []
  const cookie = getCookie(event, ADMIN_COOKIE)
  if (cookie) list.push(cookie)
  const authHeader = getHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) list.push(authHeader.slice(7))
  return list
}

export function hasAdminToken(event: H3Event): boolean {
  return candidates(event).length > 0
}

export function getAdminId(event: H3Event): number | null {
  if (!JWT_SECRET) return null
  for (const token of candidates(event)) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as { id: number, email: string }
      event.context.adminId = decoded.id
      event.context.adminEmail = decoded.email
      return decoded.id
    } catch {
      continue
    }
  }
  return null
}

export function setAdminCookie(event: H3Event, token: string) {
  setCookie(event, ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24
  })
}

export function clearAdminCookie(event: H3Event) {
  setCookie(event, ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })
}
