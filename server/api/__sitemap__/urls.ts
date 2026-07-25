import prisma from '../../utils/prisma'

export default defineEventHandler(async () => {
  try {
    const terrains = await prisma.terrain.findMany({
      select: { id: true, updatedAt: true },
      where: { statut: 'Disponible' }
    })

    return [
      { loc: '/', changefreq: 'daily', priority: '1.0' },
      { loc: '/terrains', changefreq: 'daily', priority: '0.9' },
      { loc: '/services', changefreq: 'weekly', priority: '0.8' },
      { loc: '/a-propos', changefreq: 'monthly', priority: '0.7' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
      ...terrains.map(t => ({
        loc: `/terrains/${t.id}`,
        lastmod: t.updatedAt?.toISOString(),
        changefreq: 'weekly',
        priority: '0.8',
      })),
    ]
  } catch (err) {
    console.error('Sitemap error:', err)
    return [
      { loc: '/', changefreq: 'daily', priority: '1.0' },
      { loc: '/terrains', changefreq: 'daily', priority: '0.9' },
    ]
  }
})
