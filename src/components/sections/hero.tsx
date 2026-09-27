import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Logo } from "@/src/components/logo";
import { Snake } from "@/src/components/snake";
import { site } from "@/src/content/site";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 xl:pl-56"
    >
      <div className="trame absolute inset-0 opacity-70" aria-hidden="true" />
      <Snake className="serpent pointer-events-none absolute inset-0 h-full w-full opacity-40 clair:opacity-30" />

      <div className="relative mx-auto w-full max-w-5xl">
        <p
          className="font-mono text-2xl tracking-widest text-accent"
          data-apparition
        >
          Hey, ici
        </p>

        <h1 className="mt-6">
          <span className="sr-only">{site.fullname}</span>
          <span className="masque">
            <span style={{ ["--delai" as string]: "140ms" }}>
              <Logo className="h-auto w-full max-w-104 text-encre sm:max-w-160 lg:max-w-4xl" />
            </span>
          </span>
        </h1>

        <p
          className="mt-6 font-avenir text-2xl font-thin text-encre-douce sm:text-3xl lg:text-4xl"
          data-apparition
          style={{ ["--delai" as string]: "300ms" }}
        >
          Développeur web{" "}
          <span className="font-mono text-accent">&lt;fullstack&gt;</span>
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-4"
          data-apparition
          style={{ ["--delai" as string]: "480ms" }}
        >
          <a
            href="#realisations"
            className="crochets py-2.5 font-mono text-lg tracking-widest text-accent"
          >
            Mes réalisations
          </a>
          <a
            href="#contact"
            className="crochets py-2.5 font-mono text-lg tracking-widest text-encre-douce"
          >
            Me contacter
          </a>
        </div>
      </div>
    </section>
  );
}
