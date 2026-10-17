import { CustomCursor } from "@/src/components/custom-cursor";
import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { Contact } from "@/src/components/sections/contact";
import { Hero } from "@/src/components/sections/hero";
import { Marquee } from "@/src/components/sections/marquee";
import { Missions } from "@/src/components/sections/missions";
import { Skills } from "@/src/components/sections/skills";
import { Splash } from "@/src/components/splash";

export default function Home() {
  return (
    <>
      <Splash />
      <CustomCursor />

      <a
        href="#competences"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-5 focus:py-3"
      >
        Aller au contenu
      </a>

      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Skills />
        <Missions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
