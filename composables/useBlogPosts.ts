export interface BlogSection {
  h2: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string
  date: string
  readMinutes: number
  excerpt: string
  sections: BlogSection[]
}

const posts: BlogPost[] = [
  {
    slug: 'acheter-terrain-cote-divoire',
    title: "Acheter un terrain en Côte d'Ivoire : guide en 7 étapes",
    description:
      "Bien acheter un terrain en Côte d'Ivoire : choix de la zone, vérification du titre foncier, négociation, acte chez le notaire et transfert.",
    keywords:
      "acheter terrain côte d'ivoire, achat terrain, démarches achat terrain, titre foncier, notaire, terrain à vendre",
    date: '2026-09-10',
    readMinutes: 6,
    excerpt:
      "Du choix de la zone jusqu'au transfert chez le notaire : les sept étapes pour acheter un terrain en Côte d'Ivoire sans mauvaise surprise.",
    sections: [
      {
        h2: '1. Définissez votre projet et votre budget',
        paragraphs: [
          "Avant toute visite, précisez l'usage du terrain : construction de villa, résidence secondaire, terrain à investir ou activité commerciale. Le projet détermine la zone, la superficie minimale et la présence obligatoire d'un accès voiture.",
          "Fixez ensuite un budget global qui ne se limite pas au prix d'achat : les frais de transfert, l'enregistrement de l'acte et les éventuels travaux d'accès s'ajoutent au montant du terrain. Prévoir cette marge dès le départ évite d'interrompre un projet bien avancé.",
        ],
      },
      {
        h2: '2. Choisissez la zone et le type de terrain',
        paragraphs: [
          "À Bonoua, le Yaou Nouveau Quartier reste recherché pour sa proximité avec les services et les axes routiers. Grand-Bassam et Yamoussoukro intéressent ceux qui cherchent un terrain plus grand ou un lotissement viabilisé déjà aménagé.",
          "Un terrain en lotissement offre des rues ouvertées, l'électricité et l'eau déjà tirées. Un terrain nu coûte généralement moins cher, mais l'acquéreur assume seul les travaux de viabilisation : comparez toujours le prix total, terrain plus aménagement.",
        ],
      },
      {
        h2: '3. Vérifiez les documents avant de payer',
        paragraphs: [
          "Exigez le titre foncier individuel ou l'attestation de propriété, le plan de bornage certifié, l'extrait de plan cadastral et l'attestation de non-litige. Ces documents prouvent que le vendeur est bien propriétaire et que le terrain n'est pas objet de litige.",
          "Vérifiez que le nom du vendeur figure sur le document, que les références du terrain correspondent au bornage sur place et que la superficie annoncée est celle qui est écrite. Un écart entre le papier et le terrain est le signe le plus courant d'une mauvaise affaire.",
        ],
      },
      {
        h2: '4. Visitez le terrain et vérifiez les accès',
        paragraphs: [
          "La visite se fait en journée, avec le propriétaire ou son mandataire. Contrôlez l'accès voiture en saison des pluies, la présence de l'électricité et de l'eau à proximité, ainsi que le voisinage et l'occupation réelle des parcelles environnantes.",
          "Faites confirmer l'emplacement par un géomètre si le terrain est en zone périphérique. Une borne manquante ou mal placée crée des conflits de voisinage plusieurs années après l'achat.",
        ],
      },
      {
        h2: '5. Négociez le prix et fixez les modalités de paiement',
        paragraphs: [
          "Le prix dépend du quartier, de la superficie, de l'état de viabilisation et de la présence d'un titre foncier. Comparez avec les terrains similaires du quartier avant de vous engager, et gardez toujours une marge de négociation.",
          "Si un paiement échelonné est prévu, formalisez par écrit le montant de l'acompte, le nombre d'échéances et les conditions en cas de retard. Un accord écrit protège l'acheteur comme le vendeur et évite les malentendus familiaux, très fréquents sur les ventes de terrain.",
        ],
      },
      {
        h2: '6. Faites établir l\'acte chez le notaire',
        paragraphs: [
          "L'acte authentique est rédigé par le notaire, qui vérifie les documents, fait les publications nécessaires et établit la souche du titre foncier. Les frais de transfert et d'enregistrement sont payés à ce moment-là.",
          "Ne payez jamais la totalité du terrain avant l'acte : l'acompte engage la vente, mais c'est la signature chez le notaire qui transfère réellement la propriété.",
        ],
      },
      {
        h2: '7. Enregistrez le transfert et faites ériger la borne',
        paragraphs: [
          "Après la signature, conservez précieusement l'original de l'acte et l'accusé d'enregistrement. Faites ériger définitivement les bornes par un géomètre agréé si ce n'est pas déjà fait : c'est la seule preuve physique de la limite de votre parcelle.",
          "Votre terrain est alors à vous, prêt pour le permis de construire. Loukman & Frères Immobilier accompagne chacune de ces étapes : sélection des parcelles, vérification des documents, négociation et transfert devant notaire.",
        ],
      },
    ],
  },
  {
    slug: 'verifier-titre-foncier-terrain',
    title: "Titre foncier : vérifier un terrain avant achat",
    description:
      "Comment vérifier un titre foncier avant d'acheter un terrain en Côte d'Ivoire : documents à exiger, contrôle du bornage, litiges et attestations.",
    keywords:
      "titre foncier, vérifier titre foncier, attestation de propriété, plan de bornage, terrain litigieux, achat terrain",
    date: '2026-08-25',
    readMinutes: 5,
    excerpt:
      "Le titre foncier est la preuve de votre propriété. Voici les documents à exiger, les contrôles à mener et les pièges à éviter avant de payer.",
    sections: [
      {
        h2: 'Qu\'est-ce qu\'un titre foncier ?',
        paragraphs: [
          "Le titre foncier est le document officiel qui attribue la propriété d'une parcelle à une personne physique ou morale. Il est individuel, rattaché à une parcelle identifiée par un numéro de lot et un plan de bornage, et il fait foi devant la justice.",
          "Une attestation de propriété ou une attestation de vente peut accompagner un dossier, notamment sur des terrains en cours de régularisation. Elle vaut preuve provisoire : elle doit être complétée par le titre définitif dans les délais prévus.",
        ],
      },
      {
        h2: 'Les documents à exiger du vendeur',
        paragraphs: [
          "Le dossier complet comprend le titre foncier ou l'attestation de propriété, le plan de bornage certifié par un géomètre agréé, l'extrait de plan cadastral, l'attestation de non-litige et la pièce d'identité du vendeur.",
          "Si le terrain vient d'un héritage, demandez l'attestation d'hérédité ou l'acte de partage : un terrain appartenant à plusieurs héritiers se vend difficilement tant que le partage n'est pas acté.",
        ],
      },
      {
        h2: 'Comment vérifier un titre foncier concrètement',
        paragraphs: [
          "Comparez d'abord les références : nom du propriétaire, numéro du lot, superficie et superficie doivent correspondre au terrain présenté. Un titre qui mentionne 600 m² pour un terrain borné à 400 m² est un signal d'alerte.",
          "Contrôlez le terrain sur place avec le plan de bornage : les bornes doivent être visibles et à l'endroit indiqué. Faites si possible la démarche auprès du service foncier compétent ou avec un géomètre avant de signer.",
        ],
      },
      {
        h2: 'Les erreurs les plus fréquentes',
        paragraphs: [
          "Acheter sur photographie ou sur simple attestation manuscrite, payer avant d'avoir vu les documents, ou accepter un titre au nom d'un tiers (un parent, un ami du vendeur) sont les trois causes d'abus les plus courantes.",
          "Un terrain affecté à un projet public, déjà vendu à un autre acquéreur ou contesté par la famille ne se révèle parfois qu'après le paiement. La prudence du début coûte moins cher qu'un procès.",
        ],
      },
      {
        h2: 'Ce que nous vérifions pour vous',
        paragraphs: [
          "Chez Loukman & Frères Immobilier, chaque parcelle proposée à la vente est accompagnée de ses documents, présentés avant la visite. Nous contrôlons les références avec vous, faisons confirmer le bornage et accompagnons le transfert chez le notaire.",
          "Pour voir les terrains disponibles avec titre foncier à Bonoua, Grand-Bassam ou Yamoussoukro, consultez notre catalogue ou contactez un conseiller : la visite est gratuite.",
        ],
      },
    ],
  },
  {
    slug: 'prix-terrain-bonoua',
    title: "Prix d'un terrain à Bonoua : ce qui fait varier le tarif",
    description:
      "Ce qui détermine le prix d'un terrain à Bonoua : quartier, superficie, viabilisation, titre foncier et accès. Comment comparer et budgéter son achat.",
    keywords:
      "prix terrain bonoua, terrain à bonoua, terrain viabilisé, lotissement yaou, budget achat terrain, superficie terrain",
    date: '2026-08-05',
    readMinutes: 5,
    excerpt:
      "Quartier, superficie, viabilisation et documents : les quatre critères qui expliquent les écarts de prix d'un terrain à Bonoua.",
    sections: [
      {
        h2: 'Le quartier, premier facteur de prix',
        paragraphs: [
          "À Bonoua, le prix dépend avant tout de la localisation. Le Yaou Nouveau Quartier, proche des axes et des services, se négocie au-dessus des zones en extension. Un terrain en périphérie ou sans voie ouvertée reste plus accessible, mais demande des investissements complémentaires.",
          "La proximité d'une route goudronnée, d'une école, d'un marché ou d'un point d'eau se lit directement dans le prix au m². C'est souvent ce qui justifie l'écart entre deux parcelles de superficie identique.",
        ],
      },
      {
        h2: 'La superficie et la forme du terrain',
        paragraphs: [
          "Le prix total augmente avec la superficie, mais le prix au m² décroit souvent sur les grandes parcelles : un terrain de 500 m² se vend généralement au m² plus cher qu'un terrain de 1 000 m².",
          "La forme compte aussi : une parcelle régulière, facile à bâtir, avec une façade suffisante sur la voie, se valorise mieux qu'un terrain en L ou très en profondeur, dont une partie reste inconstructible.",
        ],
      },
      {
        h2: 'La viabilisation et l\'accès',
        paragraphs: [
          "Un terrain déjà viabilisé — accès voiture, électricité, eau à proximité — coûte plus cher qu'un terrain nu, mais le budget global est souvent inférieur : les travaux de voirie et de raccordement sont déjà payés.",
          "En saison des pluies, l'accès fait toute la différence. Vérifiez l'état de la voie d'accès et la présence d'un pont ou d'un passage aménagé avant de comparer deux offres.",
        ],
      },
      {
        h2: 'Les documents font varier le prix',
        paragraphs: [
          "Un terrain avec titre foncier individuel et plan de bornage certifié se vend plus cher qu'une parcelle vendue sur simple attestation : l'acquéreur paie la sécurité juridique et gagne du temps sur le permis de construire.",
          "Cette différence est presque toujours justifiée. Le surcoût du titre est bien inférieur au coût d'une régularisation engagée seul, quand elle est possible.",
        ],
      },
      {
        h2: 'Comment comparer deux offres',
        paragraphs: [
          "Renseignez le prix au m², la distance à la route principale, la présence des documents et l'état de la viabilisation : ces quatre informations suffisent pour comparer deux terrains objectivement.",
          "Notre catalogue affiche les prix, les superficies et les quartiers de chaque terrain disponible. Consultez les fiches à jour ou demandez un devis personnalisé pour budgeter votre projet d'achat ou de construction.",
        ],
      },
    ],
  },
  {
    slug: 'construire-maison-bonoua',
    title: 'Construire une maison à Bonoua : étapes et conseils',
    description:
      "Construire une maison ou une villa à Bonoua : choix du terrain, permis de construire, étapes du chantier, matériaux et suivi des travaux.",
    keywords:
      "construire maison bonoua, construction villa, permis de construire, maître d'œuvre, chantier, lotissement",
    date: '2026-07-15',
    readMinutes: 6,
    excerpt:
      "Du terrain au coup de crayon final : les étapes pour construire une maison à Bonoua sans déraper sur le budget ni sur les délais.",
    sections: [
      {
        h2: 'Choisir le terrain avant les plans',
        paragraphs: [
          "Le terrain conditionne le projet : orientation, pente, largeur de façade et profondeur déterminent ce que vous pouvez bâtir. Une parcelle étroite impose une maison en profondeur, une pente demande des fondations renforcées.",
          "Vérifiez avant l'achat que le terrain est constructible, qu'il dispose d'un accès pour les camions de livraison et qu'il est desservi en électricité et en eau. C'est le point le plus souvent négligé par les primo-accédants.",
        ],
      },
      {
        h2: 'Faisabilité et permis de construire',
        paragraphs: [
          "Le projet commence par une étude de faisabilité : surface constructible, retraits réglementaires, hauteur autorisée et emprise au sol. Elle permet de savoir, avant de dessiner, ce que la commune acceptera.",
          "Le permis de construire est déposé auprès de la mairie avec les plans, l'extrait cadastral et les titres fonciers. Anticipez cette démarche dans votre calendrier : elle s'inscrit toujours avant le démarrage du chantier.",
        ],
      },
      {
        h2: 'Les étapes du chantier',
        paragraphs: [
          "Le chantier suit un ordre précis : terrassement et fondations, élévation des murs, couverture, second œuvre (plomberie, électricité, cloisons), puis finitions et extérieurs.",
          "Chaque phase doit être validée avant la suivante. Un contrôle des fondations avant de poursuivre coûte une demi-journée et protège l'intégralité du bâtiment.",
        ],
      },
      {
        h2: 'Maîtriser le budget et les délais',
        paragraphs: [
          "Le budget se décompose en gros œuvre, second œuvre, finitions et aléas. Réservez une marge pour les imprévus : terrain, réseau ou matériaux, aucune construction ne se déroule à la précision du devis initial.",
          "Le paiement doit suivre l'avancement des travaux, jamais l'inverse. Exigez un devis détaillé, un calendrier prévisionnel et un récapitulatif des matériaux avant de vous engager avec une équipe.",
        ],
      },
      {
        h2: 'Construire avec un partenaire local',
        paragraphs: [
          "Un partenaire sur place suit le chantier au quotidien, négocie les matériaux et traite les imprévus avec la mairie. Pour un client qui n'habite pas Bonoua, c'est la différence entre une maison livrée et un chantier abandonné.",
          "Loukman & Frères Immobilier accompagne votre projet de bout en bout : recherche du terrain, faisabilité, travaux de construction et gestion locative après livraison. Demandez un devis à partir de vos plans ou de nos propositions de villa.",
        ],
      },
    ],
  },
]

export function useBlogPosts() {
  return posts
}

export function useBlogPost(slug: string) {
  return posts.find(p => p.slug === slug) || null
}
