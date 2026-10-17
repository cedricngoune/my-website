import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { site } from "@portfolio/content";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

const description =
  "Développeur full-stack en Île-de-France : API solides, interfaces web modernes et sites pour agences, startups et artisans.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_V2_URL ?? "https://v2.cedricngoune.com"),
  title: `${site.fullname} — ${site.job}`,
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.fullname,
    title: `${site.fullname} — ${site.job}`,
    description,
  },
  alternates: { canonical: "/" },
};

/**
 * Posé avant le premier rendu : pas de clignotement au chargement.
 * Le clair est le défaut de la v2 ; le sombre n'apparaît que si le visiteur l'a choisi.
 */
const bootScript = `
(function () {
  try {
    document.documentElement.dataset.theme = localStorage.getItem("theme") || "light";
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={urbanist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
