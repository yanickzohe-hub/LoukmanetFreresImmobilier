import prisma from '../../utils/prisma'

const GITHUB_RUNS_URL = 'https://api.github.com/repos/yanickzohe-hub/LoukmanetFreresImmobilier/actions/runs?per_page=6'

interface GithubRun {
  createdAt: string
  event: string
  status: string
  conclusion: string | null
}

let githubCache: { at: number, runs: GithubRun[], error: string | null } | null = null

async function fetchGithubRuns(): Promise<{ at: number, runs: GithubRun[], error: string | null }> {
  if (githubCache && Date.now() - githubCache.at < 60_000) return githubCache
  try {
    const res = await fetch(GITHUB_RUNS_URL, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'loukman-status' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const runs: GithubRun[] = (json.workflow_runs || []).map((r: Record<string, unknown>) => ({
      createdAt: String(r.created_at),
      event: String(r.event),
      status: String(r.status),
      conclusion: (r.conclusion as string) || null,
    }))
    githubCache = { at: Date.now(), runs, error: null }
  } catch (err) {
    githubCache = { at: Date.now(), runs: [], error: (err as Error).message }
  }
  return githubCache
}

function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function sourceLabel(source: string): string {
  const labels: Record<string, string> = {
    vercel: 'Vercel cron',
    github: 'GitHub Actions',
    manual: 'Manuel',
  }
  return labels[source] || source
}

export default defineEventHandler(async (event) => {
  const CRON_SECRET = process.env.CRON_SECRET
  const auth = getHeader(event, 'authorization')
  const isCron = !!CRON_SECRET && auth === `Bearer ${CRON_SECRET}`
  if (!isCron && !getAdminId(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Non autorisé' })
  }

  const rows = await prisma.pingLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  const total = await prisma.pingLog.count()
  const grouped = await prisma.pingLog.groupBy({
    by: ['source'],
    _count: { _all: true },
  })
  const failures = await prisma.pingLog.count({ where: { ok: false } })
  const last = rows[0]
  const github = await fetchGithubRuns()

  const accept = getHeader(event, 'accept') || ''
  if (!accept.includes('text/html')) {
    return { total, failures, last: last || null, bySource: grouped, pings: rows, github }
  }

  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  setHeader(event, 'x-robots-tag', 'noindex')

  const now = Date.now()
  const since = last ? Math.round((now - new Date(last.createdAt).getTime()) / 60000) : null

  const stats = grouped
    .map(g => `${esc(sourceLabel(g.source))} : ${g._count._all}`)
    .join(' · ')

  const tableRows = rows.map(r => {
    const age = Math.round((now - new Date(r.createdAt).getTime()) / 60000)
    const when = new Date(r.createdAt).toISOString().replace('T', ' ').slice(0, 19)
    return `<tr class="${r.ok ? 'ok' : 'ko'}">
      <td>${when} UTC</td>
      <td>${age} min</td>
      <td>${esc(sourceLabel(r.source))}</td>
      <td>${r.ok ? '✅' : '❌'}</td>
      <td>${r.sql ? '✅' : '❌'}</td>
      <td>${r.rest ? '✅' : '❌'}</td>
      <td class="num">${r.ms} ms</td>
      <td class="detail">${esc(r.detail)}</td>
    </tr>`
  }).join('')

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="30">
<title>État des pings — Loukman &amp; Frères</title>
<style>
  body { font-family: ui-sans-serif, system-ui, sans-serif; background:#0B1B3D; color:#E8ECF4; margin:0; padding:24px; }
  h1 { font-size:20px; margin:0 0 4px; }
  .sub { color:#93A0B8; font-size:13px; margin-bottom:18px; }
  .cards { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:18px; }
  .card { background:#12234B; border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:12px 16px; min-width:150px; }
  .card b { display:block; font-size:22px; }
  .card span { color:#93A0B8; font-size:11px; text-transform:uppercase; letter-spacing:.06em; }
  table { width:100%; border-collapse:collapse; font-size:13px; background:#12234B; border-radius:12px; overflow:hidden; }
  th, td { padding:8px 10px; text-align:left; border-bottom:1px solid rgba(255,255,255,.06); }
  th { background:#16295A; color:#9FB0D0; font-size:11px; text-transform:uppercase; letter-spacing:.05em; }
  tr.ok td:nth-child(4) { color:#39D98A; }
  tr.ko { background:rgba(255,80,80,.08); }
  td.num { text-align:right; font-variant-numeric:tabular-nums; }
  td.detail { color:#93A0B8; font-size:12px; }
  .legend { color:#93A0B8; font-size:12px; margin-top:14px; }
  code { background:#16295A; padding:1px 6px; border-radius:6px; }
</style>
</head>
<body>
  <h1>État des pings (keepalive Supabase)</h1>
  <div class="sub">Auto-refresh 30 s · ${esc(stats)} · total ${total} pings · ${failures} échec(s)</div>
  <div class="cards">
    <div class="card"><span>Dernier ping</span><b>${since === null ? '—' : since + ' min'}</b></div>
    <div class="card"><span>Résultat</span><b>${last ? (last.ok ? 'OK' : 'ÉCHEC') : '—'}</b></div>
    <div class="card"><span>Source</span><b style="font-size:15px">${last ? esc(sourceLabel(last.source)) : '—'}</b></div>
    <div class="card"><span>SQL / REST</span><b>${last ? (last.sql ? '✅' : '❌') + ' / ' + (last.rest ? '✅' : '❌') : '—'}</b></div>
  </div>
  <table>
    <thead><tr><th>Heure</th><th>Âge</th><th>Source</th><th>OK</th><th>SQL</th><th>REST</th><th>Durée</th><th>Détail</th></tr></thead>
    <tbody>${tableRows || '<tr><td colspan="8">Aucun ping enregistré pour le moment.</td></tr>'}</tbody>
  </table>
  <h2 style="font-size:15px;margin:22px 0 8px;">Runs GitHub Actions — filet n°2</h2>
  <table>
    <thead><tr><th>Heure</th><th>Type</th><th>Statut</th><th>Résultat</th></tr></thead>
    <tbody>${
      github.error
        ? `<tr class="ko"><td colspan="4">API GitHub injoignable : ${esc(github.error)}</td></tr>`
        : (github.runs.length
            ? github.runs.map(r => `<tr class="${r.conclusion === 'failure' ? 'ko' : 'ok'}">
                <td>${r.createdAt.replace('T', ' ').slice(0, 19)} UTC</td>
                <td>${esc(r.event === 'schedule' ? 'schedule (cron)' : r.event)}</td>
                <td>${esc(r.status)}</td>
                <td>${esc(r.conclusion || '—')}</td>
              </tr>`).join('')
            : '<tr><td colspan="4">Aucun run.</td></tr>')
    }</tbody>
  </table>
  <div class="legend">
    Attendus : <code>Vercel cron</code> 03:00 UTC (table ci-dessus) · <code>GitHub schedule</code> 13:43 UTC (table Actions).
    JSON sur <code>Accept: application/json</code>. Aucune donnée sensible affichée.
  </div>
</body>
</html>`
})
