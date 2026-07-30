import prisma from '../../../utils/prisma'

function extractNumber(str: string): number | null {
  if (!str) return null
  const cleaned = str.replace(/[^\d]/g, '')
  const num = parseInt(cleaned, 10)
  return isNaN(num) ? null : num
}

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id, 10)

  const terrain = await prisma.terrain.findUnique({
    where: { id },
    include: { images: { orderBy: { ordre: 'asc' } } }
  })

  if (!terrain) {
    throw createError({ statusCode: 404, statusMessage: 'Terrain non trouvé' })
  }

  const prixNum = extractNumber(terrain.prix)
  const supNum = extractNumber(terrain.superficie)

  const similaires = await prisma.terrain.findMany({
    where: {
      id: { not: id },
      statut: 'Disponible',
      OR: [
        { lieu: terrain.lieu },
        { quartier: terrain.quartier },
        { zone: terrain.zone || undefined },
      ].filter(Boolean),
    },
    include: { images: { orderBy: { ordre: 'asc' } } },
    take: 6,
    orderBy: { createdAt: 'desc' },
  })

  if (similaires.length >= 3) return similaires.slice(0, 3)

  const alreadyIds = [id, ...similaires.map(s => s.id)]

  const allOthers = await prisma.terrain.findMany({
    where: {
      id: { notIn: alreadyIds },
      statut: 'Disponible',
    },
    include: { images: { orderBy: { ordre: 'asc' } } },
    take: 20,
    orderBy: { createdAt: 'desc' },
  })

  const scored = allOthers.map(t => {
    let score = 0
    const tPrix = extractNumber(t.prix)
    const tSup = extractNumber(t.superficie)

    if (prixNum && tPrix) {
      const ratio = Math.abs(tPrix - prixNum) / prixNum
      if (ratio < 0.3) score += 3 - (ratio / 0.3) * 3
    }

    if (supNum && tSup) {
      const ratio = Math.abs(tSup - supNum) / supNum
      if (ratio < 0.5) score += 2 - (ratio / 0.5) * 2
    }

    if (t.lieu === terrain.lieu) score += 4
    if (t.quartier === terrain.quartier) score += 3
    if (t.zone && t.zone === terrain.zone) score += 2

    return { ...t, _score: score }
  })

  scored.sort((a, b) => b._score - a._score)

  const extra = scored.slice(0, 3 - similaires.length)

  return [...similaires, ...extra]
})
