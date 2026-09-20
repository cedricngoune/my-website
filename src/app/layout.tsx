import type { Metadata } from "next";
import { Montserrat, Roboto, Roboto_Mono } from "next/font/google";
import { site } from "@/src/content/site";
import "./globals.css";

/**
 * Avenir Next est une police commerciale : tant que les fichiers .woff2 ne sont pas
 * déposés dans /public/fonts, on utilise Montserrat, qui en est très proche.
 * Pour revenir à Avenir Next, voir /public/fonts/README.md.
 */
const avenir = Montserrat({
  subsets: ["latin"],
  variable: "--font-avenir",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

/** Pour les libellés, les numéros de section et les listes à chevrons. */
const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Développeur full-stack en Île-de-France : conception d’API, interfaces React et correction d’anomalies en production.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.c-ngoune.com"),
  title: `${site.fullname} — ${site.job}`,
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.c-ngoune.com",
    siteName: site.fullname,
    title: `${site.fullname} — ${site.job}`,
    description,
  },
  alternates: { canonical: "/" },
};

/**
 * Posé avant le premier rendu : pas de clignotement au chargement.
 * Le sombre est le défaut ; le clair n'apparaît que si le visiteur l'a choisi.
 */
const amorce = `
(function () {
  document.documentElement.classList.add("js");
  try {
    document.documentElement.dataset.theme = localStorage.getItem("theme") || "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${avenir.variable} ${roboto.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: amorce }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
