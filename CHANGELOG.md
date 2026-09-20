# Passage au style de la maquette

## Fichiers modifiés

| Fichier | Ce qui change |
| --- | --- |
| `src/app/globals.css` | Réécrit : palette sombre + teal, classes `.cadre`, `.tiret`, `.chevron`, `.trame`, `.halo-accent` |
| `src/app/layout.tsx` | Ajout de Roboto Mono (`--font-mono`) ; le sombre devient le thème par défaut |
| `src/app/page.tsx` | Nouvel ordre de sections, ajout du rail et des filets verticaux |
| `src/components/Header.tsx` → `header.tsx` | **Renommé en minuscule** (cause de l'échec Vercel) ; devient la barre CV + thème |
| `src/components/rail.tsx` | **Nouveau** : navigation verticale numérotée à gauche |
| `src/components/sections/skills.tsx` | **Nouveau** : 02. Compétences (boîte à outils + softskills) |
| `src/components/sections/services.tsx` | **Supprimé** : section retirée du site (les données restent dans `site.ts`) |
| `src/components/sections/stack.tsx` | **Supprimé** : fusionné dans `skills.tsx` |
| `src/components/sections/*.tsx` | Restylés : numérotation `01.`, listes à chevrons, bordures fines |
| `src/components/footer.tsx` | Réduit à une ligne, comme la maquette |
| `src/content/site.ts` | Ajout de `cv` et `softskills`, sections renumérotées, deux coquilles corrigées |

## Ce qu'il reste à faire

1. **Déposer votre CV** dans `public/cv.pdf`. Sans ce fichier, le bouton CV en haut à droite
   mène à une page 404. Pour le masquer : `cv: ""` dans `src/content/site.ts`.
2. **Renseigner `liens.github` et `liens.linkedin`** — toujours des placeholders.
3. **Pousser le renommage du header** avec la manœuvre en deux temps, sinon macOS ne verra
   aucun changement :

```bash
git mv src/components/Header.tsx src/components/header-tmp.tsx
git mv src/components/header-tmp.tsx src/components/header.tsx
git commit -m "Corrige la casse du fichier header"
```

## Le style, en résumé

- **Fond violet foncé** `#0E0A1F`, surfaces à peine plus claires, **accent** `#AD90F1`.
- **Trois polices** : Montserrat pour les gros titres, Roboto pour le texte courant,
  Roboto Mono pour les libellés, les numéros et les listes à chevrons.
- **Angles droits partout** : pas de coins arrondis sauf le portrait, bordures d'un pixel.
- **Quatre sections** numérotées : 01 À propos, 02 Compétences, 03 Réalisations, 04 Contact.
- **Rail numéroté** fixe à gauche au-delà de 1280 px, avec un tiret qui s'allonge et passe
  au teal sur la section en cours de lecture.
- **Deux filets verticaux** encadrent la page à partir de 640 px.
- Le thème clair reste disponible via le bouton ☀️ / 🌙, mais le sombre est le défaut.
  Pour supprimer la bascule : retirer `<ThemeToggle />` de `header.tsx`.
