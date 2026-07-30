import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const terrains = await prisma.terrain.findMany({ include: { images: true } })
  console.log('Nombre de terrains:', terrains.length)
  for (const t of terrains) {
    console.log('---')
    console.log('ID:', t.id, '| Lieu:', t.lieu, '| Quartier:', t.quartier, '| Statut:', t.statut)
    console.log('Images:', t.images.length)
    for (const img of t.images) {
      console.log('  - url:', img.url, '| type:', img.type)
    }
  }
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
