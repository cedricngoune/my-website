import { Effects } from "@/src/components/animations/effects";
import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { Rail } from "@/src/components/rail";
import { Rope } from "@/src/components/rope";
import { About } from "@/src/components/sections/about";
import { Contact } from "@/src/components/sections/contact";
import { Hero } from "@/src/components/sections/hero";
import { Projects } from "@/src/components/sections/projects";
import { Skills } from "@/src/components/sections/skills";

export default function Home() {
  return (
    <>
      <Effects />

      <Rope />

      <span className="page-frame left-4 hidden sm:block" aria-hidden="true" />
      <span className="page-frame right-4 hidden sm:block" aria-hidden="true" />

      <a
        href="#profil"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-3"
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
