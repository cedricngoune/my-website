import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { site } from "@/src/content/site";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 xl:pl-56"
    >
      <div className="trame absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-5xl">
        <p
          className="font-mono text-xs tracking-widest text-accent"
          data-apparition
        >
          Hey, je m'appelle
        </p>

        <h1 className="mt-5 font-avenir text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">
          <span className="masque">
            <span style={{ ["--delai" as string]: "140ms" }}>
              {site.firstname}{" "}
              <span className="uppercase">
                {site.fullname.replace(site.firstname, "").trim()}
              </span>
            </span>
          </span>
        </h1>

        <p
          className="mt-4 font-avenir text-xl font-light text-encre-douce sm:text-2xl"
          data-apparition
          style={{ ["--delai" as string]: "300ms" }}
        >
          Développeur web
          <span className="font-mono text-accent">&lt;fullstack&gt;</span>
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          data-apparition
          style={{ ["--delai" as string]: "480ms" }}
        >
          <a
            href="#realisations"
            className="rounded-sm border border-accent px-5 py-2.5 font-mono text-xs tracking-widest text-accent transition-colors duration-200 hover:bg-accent hover:text-fond"
          >
            Voir mes réalisations
          </a>
          <a
            href="#contact"
            className="rounded-sm border border-bord-fort px-5 py-2.5 font-mono text-xs tracking-widest text-encre-douce transition-colors duration-200 hover:border-encre-douce hover:text-encre"
          >
            Me contacter
          </a>
        </div>

        <div
          className="mt-12 flex flex-wrap items-center gap-5 font-mono text-xs text-encre-faible"
          data-apparition
          style={{ ["--delai" as string]: "560ms" }}
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {site.location}
          </span>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Envoyer un mail"
            className="transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
