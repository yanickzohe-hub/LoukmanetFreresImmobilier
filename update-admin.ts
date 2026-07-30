import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const hash = await bcrypt.hash('yao.2008@', 10)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@loukman-immobilier.ci' },
    update: { email: 'loukmanfreresimmobilier@gmail.com', password: hash },
    create: { email: 'loukmanfreresimmobilier@gmail.com', password: hash, nom: 'Administrateur' }
  })
  console.log('OK:', admin.email)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
