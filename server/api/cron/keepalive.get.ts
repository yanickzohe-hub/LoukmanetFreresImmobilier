import prisma from '../../utils/prisma'

const CRON_SECRET = process.env.CRON_SECRET
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

const REST_TABLES = ['Terrain', 'terrain', 'Avis', 'avis']

async function postgrestPing() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { ok: false, detail: 'SUPABASE_URL / SUPABASE_SERVICE_KEY manquants' }
  }
  for (const table of REST_TABLES) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&limit=1`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: 'application/json'
        }
      })
      if (res.ok) return { ok: true, detail: `GET /rest/v1/${table} → ${res.status}` }
      if (res.status !== 404 && res.status !== 406) {
        return { ok: false, detail: `GET /rest/v1/${table} → ${res.status}` }
      }
    } catch (err) {
      return { ok: false, detail: `GET /rest/v1/${table} → ${(err as Error).message}` }
    }
  }
  return { ok: false, detail: `aucune table REST joignable (${REST_TABLES.join(', ')})` }
}

export default defineEventHandler(async (event) => {
  if (!CRON_SECRET) {
    throw createError({ statusCode: 500, statusMessage: 'CRON_SECRET manquant sur le serveur' })
  }

  const auth = getHeader(event, 'authorization')
  if (auth !== `Bearer ${CRON_SECRET}`) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }

  const started = Date.now()
  let sql = false
  let counts: Record<string, number> = {}
  let sqlError = ''

  try {
    const [terrains, avis] = await Promise.all([
      prisma.terrain.count(),
      prisma.avis.count()
    ])
    counts = { terrains, avis }
    sql = true
  } catch (err) {
    sqlError = (err as Error)?.message?.split('\n')[0] || 'requête SQL en échec'
  }

  const rest = await postgrestPing()
  const ok = sql || rest.ok

  const body = {
    ok,
    sql,
    rest: rest.ok,
    detail: { sql: sql || sqlError, rest: rest.detail },
    counts,
    ms: Date.now() - started,
    at: new Date().toISOString()
  }

  if (!ok) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Keepalive Supabase en échec',
      data: body
    })
  }

  return body
})
