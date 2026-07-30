# Roadmap — Loukman & Frères Immobilier

## Fait

### Footer
- `justify-between` pour étaler les colonnes (liens/horaires moins serrés, bordure droite atteinte)
- Retour à la taille du commit (annulation resize)

### Layout
- `pb-24` → `pb-36 md:pb-44` pour repousser le footer plus bas dans le scroll

### Page Terrains
- Barre de recherche avec filtres de zone ("Tous" + zones dynamiques)
- Barre flottante fixed au scroll vers le bas (avec transition)
- Tri supprimé, code nettoyé (`extractPrix`, `extractSuperficie`, `tri`)
- Grille responsive : 1 col mobile → 2 md → 3 lg

### Home Gallery
- Carrousel style Alpine.js (flèches toujours visibles, dots cliquables, plus d'auto‑play)

### Images uploadées
- Ajout de `unoptimized` sur les `NuxtImg` de la home gallery et de la page terrains

## Reste à faire

- [ ] Page détail terrain (`pages/terrains/[id].vue`) — vérifier si les `NuxtImg` ont besoin de `unoptimized`
- [ ] Si le problème d'affichage persiste après `unoptimized`, vérifier la connexion Supabase (bucket `loukman-uploads`, clé API)