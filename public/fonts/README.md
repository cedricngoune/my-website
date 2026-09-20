# Polices

Le projet utilise **Montserrat** (variable `--font-avenir`) et **Roboto**
(variable `--font-roboto`), toutes deux chargées depuis Google Fonts par
`next/font/google` dans `app/layout.tsx`.

## Revenir à Avenir Next

Avenir Next est une police commerciale ; macOS l’inclut, sinon elle s’achète sur
fonts.com ou myfonts.com. Pour l’utiliser :

1. Déposez dans ce dossier :
   - `AvenirNext-Regular.woff2`
   - `AvenirNext-Medium.woff2`
   - `AvenirNext-DemiBold.woff2`
   - `AvenirNext-Bold.woff2`
2. Dans `app/layout.tsx`, remplacez l’import de Montserrat par :

```ts
import localFont from "next/font/local";

const avenir = localFont({
  src: [
    { path: "../public/fonts/AvenirNext-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/AvenirNext-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/AvenirNext-DemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/AvenirNext-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
```

Attention : `next/font/local` fait échouer la compilation si un fichier est absent.
C’est ce qui bloquait le build de la version initiale.
