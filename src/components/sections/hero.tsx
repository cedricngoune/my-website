import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Logo } from "@/src/components/logo";
import { Snake } from "@/src/components/animations/snake";
import { TypedTitle } from "@/src/components/animations/typed-title";
import { site } from "@/src/content/site";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 xl:pl-56"
    >
      <div
        className="grid-pattern absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <Snake className="snake-mask pointer-events-none absolute inset-0 h-full w-full opacity-40 light:opacity-30" />

      <div className="relative mx-auto w-full max-w-5xl">
        <p
          className="font-mono text-2xl tracking-widest text-accent"
          data-reveal
        >
          Hey, ici
        </p>

        <h1 className="mt-6">
          <span className="sr-only">{site.fullname}</span>
          <span className="mask-reveal">
            <span style={{ ["--delay" as string]: "140ms" }}>
              <span className="relative block w-full max-w-184 sm:max-w-160 lg:max-w-4xl">
                <Logo className="h-auto w-full text-foreground" />
              </span>
            </span>
          </span>
        </h1>

        <TypedTitle
          prefix="Développeur web"
          tag="fullstack"
          className="mt-13 font-avenir text-2xl font-thin text-foreground-muted sm:text-3xl lg:text-4xl"
        />
      </div>
    </section>
  );
}
