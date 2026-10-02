const rateLimit = new Map<string, { count: number; resetAt: number }>()

const MAX_KEYS = 10_000

export function clientIp(event: Parameters<typeof getHeader>[0]): string {
  const forwarded = getHeader(event, 'x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0].trim()
    if (first) return first
  }
  const realIp = getHeader(event, 'x-real-ip')
  if (realIp) return realIp.trim()
  return event.node.req.socket.remoteAddress || 'unknown'
}

function purge(now: number) {
  if (rateLimit.size <= MAX_KEYS) return
  for (const [key, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(key)
  }
}

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  purge(now)
  const entry = rateLimit.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs })
    return
  }

  entry.count++
  if (entry.count > maxAttempts) {
    throw createError({ statusCode: 429, statusMessage: 'Trop de tentatives. Réessayez plus tard.' })
  }
}
