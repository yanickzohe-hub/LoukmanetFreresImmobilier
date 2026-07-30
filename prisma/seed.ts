import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@loukman-immobilier.ci'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const nom = process.env.ADMIN_NOM || 'Administrateur'

  const existing = await prisma.admin.findUnique({ where: { email } })

  if (existing) {
    console.log(`Admin déjà existant : ${email}`)
  } else {
    await prisma.admin.create({
      data: { email, password: bcrypt.hashSync(password, 10), nom }
    })
    console.log(`Admin créé : ${email} / ${password}`)
  }

  const avisCount = await prisma.avis.count()
  if (avisCount === 0) {
    await prisma.avis.createMany({
      data: [
        { nom: 'Kouamé A.', message: 'Un accompagnement exceptionnel du début à la fin. J\'ai trouvé le terrain idéal pour construire ma maison.', etoiles: 5, contact: 'kouame@email.com', statut: 'publie' },
        { nom: 'Mariam D.', message: 'Professionnalisme et transparence. Les titres fonciers sont clairs et l\'équipe est réactive.', etoiles: 5, contact: '+225 01 02 03 04', statut: 'publie' },
        { nom: 'Jean-Baptiste K.', message: 'Nous travaillons avec Loukman & Frères depuis 3 ans. Toujours au rendez-vous, des terrains de qualité.', etoiles: 5, contact: 'jb@example.com', statut: 'publie' },
        { nom: 'Fatou S.', message: 'Très satisfaite de mon achat. Le processus était clair et bien accompagné. Je recommande.', etoiles: 4, contact: '+225 05 06 07 08', statut: 'publie' },
        { nom: 'David T.', message: 'Bonne expérience globale. Quelques retards sur les documents mais l\'équipe a été réactive pour les résoudre.', etoiles: 4, contact: 'david.t@email.com', statut: 'publie' },
        { nom: 'Amenan K.', message: 'Service sérieux et professionnel. Le terrain correspond exactement à ce qui était promis.', etoiles: 5, statut: 'publie' },
        { nom: 'Yao C.', message: 'J\'ai acheté un terrain pour investir. Très bon rapport qualité-prix dans la région de Bonoua.', etoiles: 5, contact: 'yao@example.com', statut: 'publie' },
        { nom: 'Sidibé M.', message: 'En attente de mon titre foncier, mais l\'équipe m\'a bien guidé dans toutes les démarches administratives.', etoiles: 4, statut: 'en_attente' },
      ]
    })
    console.log('Avis de démonstration créés')
  }

  }

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())