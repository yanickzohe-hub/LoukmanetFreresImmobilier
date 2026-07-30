const rateLimit = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
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
