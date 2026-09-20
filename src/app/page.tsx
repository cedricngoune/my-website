import { Effects } from "@/src/components/effects";
import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { Rail } from "@/src/components/rail";
import { About } from "@/src/components/sections/about";
import { Contact } from "@/src/components/sections/contact";
import { Hero } from "@/src/components/sections/hero";
import { Projects } from "@/src/components/sections/projects";
import { Skills } from "@/src/components/sections/skills";

export default function Home() {
  return (
    <>
      <Effects />

      <span className="cadre left-4 hidden sm:block" aria-hidden="true" />
      <span className="cadre right-4 hidden sm:block" aria-hidden="true" />

      <a
        href="#profil"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:border focus:border-accent focus:bg-fond focus:px-4 focus:py-3"
      >
        Aller au contenu
      </a>

      <Header />
      <Rail />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
