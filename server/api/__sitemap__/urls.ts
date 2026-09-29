import prisma from '../../utils/prisma'
import { useBlogPosts } from '../../../composables/useBlogPosts'

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
      { loc: '/faq', changefreq: 'monthly', priority: '0.7' },
      { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
      ...useBlogPosts().map(p => ({
        loc: `/blog/${p.slug}`,
        lastmod: p.date,
        changefreq: 'monthly',
        priority: '0.7',
      })),
      ...terrains.map(t => ({
        loc: `/terrains/${t.id}`,
        lastmod: t.updatedAt?.toISOString(),
        changefreq: 'weekly',
        priority: '0.8',
      })),
    ]
  } catch (err) {
    console.error('Sitemap error:', err) // eslint-disable-line no-console
    return [
      { loc: '/', changefreq: 'daily', priority: '1.0' },
      { loc: '/terrains', changefreq: 'daily', priority: '0.9' },
    ]
  }
})
