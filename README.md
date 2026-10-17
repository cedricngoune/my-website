# Cédric Ngouné — portfolio

Site personnel : projets, compétences et entreprises pour lesquelles j'ai travaillé.

Le dépôt est un **monorepo Yarn** qui contient les deux versions du site :

```
apps/
  v1/            Site actuel (déployé), Next.js 16 + Tailwind 4
  v2/            Nouvelle version (style « Lucas »), Next.js 16 + Tailwind 4
packages/
  content/       Contenu partagé : textes, missions, stacks (site.ts)
                 et adresses des deux versions (versions.ts)
```

Le contenu (missions, coordonnées, stacks…) ne se modifie qu'à un seul endroit :
`packages/content/src/site.ts`. Les deux versions le lisent.

## Développement

```bash
yarn install          # à la racine, une seule fois pour tout le monorepo

yarn dev:v1           # http://localhost:3000
yarn dev:v2           # http://localhost:3001

yarn typecheck        # vérifie les types de tous les paquets
yarn build:v1         # build de production d'une version
yarn build:v2
```

Pour que le switch de version fonctionne en local, copier `.env.example` en
`.env.local` dans `apps/v1` et `apps/v2` (il pointe déjà vers les ports 3000 et 3001).

## Switch entre les versions

En bas de chaque site, un switch « v1 / v2 » mène vers l'autre version.
Les adresses viennent de deux variables d'environnement :

| Variable             | Valeur par défaut              |
| -------------------- | ------------------------------ |
| `NEXT_PUBLIC_V1_URL` | `https://www.cedricngoune.com` |
| `NEXT_PUBLIC_V2_URL` | `https://v2.cedricngoune.com`  |

Les valeurs par défaut sont dans `packages/content/src/versions.ts`.

## Déploiement sur Vercel

Chaque version est un **projet Vercel séparé**, branché sur le même dépôt GitHub.

1. **Projet existant (v1)** : dans _Settings → Build and Deployment_, régler
   **Root Directory** sur `apps/v1`. Vercel détecte Next.js et installe les
   dépendances du monorepo depuis la racine.
2. **Nouveau projet (v2)** : _Add New → Project_, choisir le même dépôt,
   **Root Directory** = `apps/v2`.
3. **Domaine de la v2** : ajouter `v2.cedricngoune.com` au projet v2
   (_Settings → Domains_). Le domaine étant géré par Vercel, l'enregistrement DNS est créé tout seul.
4. **Variables** : dans les deux projets, définir `NEXT_PUBLIC_V1_URL` et
   `NEXT_PUBLIC_V2_URL` si les adresses diffèrent des valeurs par défaut.
5. **Option** : dans _Settings → Git → Ignored Build Step_, la commande
   `git diff --quiet HEAD^ HEAD -- . ../../packages` évite de redéployer une
   version quand seuls les fichiers de l'autre ont changé.

Le jour où la v2 remplace la v1, il suffit d'échanger les domaines entre les deux projets.
