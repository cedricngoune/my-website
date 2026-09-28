import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { SectionTitle } from "@/src/components/sections/section-title";
import { site } from "@/src/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="overflow-x-clip px-6 py-24 sm:px-10 xl:pl-56"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="À vous de jouer" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div data-reveal>
            <p className="font-avenir text-2xl font-light leading-snug sm:text-3xl">
              Si ça vous parle, let's get in touch!
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-9 inline-flex items-center gap-2.5 border border-accent px-6 py-3 font-mono text-xs tracking-widest text-accent transition-colors duration-200 hover:bg-accent hover:text-background"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Écrire un mail
            </a>
          </div>

          <ul
            className="space-y-4 font-mono text-sm"
            data-reveal
            style={{ ["--delay" as string]: "120ms" }}
          >
            <li className="border-b border-border pb-4">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-foreground-muted transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            {site.phone ? (
              <li className="border-b border-border pb-4">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-foreground-muted transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
            ) : null}
            <li className="border-b border-border pb-4">
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 text-foreground-muted transition-colors hover:text-accent"
              >
                <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 text-foreground-muted transition-colors hover:text-accent"
              >
                <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
