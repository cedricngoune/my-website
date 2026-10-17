import { site } from "@portfolio/content";
import { SectionLabel } from "@/src/components/section-label";

export function Contact() {
  const phoneHref = `tel:+33${site.phone.replace(/\s/g, "").replace(/^0/, "")}`;

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-6 py-28 sm:px-8">
      <div className="flex flex-col items-center gap-5 rounded-[36px] bg-surface px-6 py-20 text-center">
        <SectionLabel className="!bg-background">Contact</SectionLabel>
        <h2 className="text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] tracking-[-0.03em]">
          Travaillons ensemble
        </h2>
        <p className="max-w-[560px] text-[19px] text-foreground-body">
          Un projet, une API à reprendre, un site à créer ou un bug qui traîne ? Écrivez-moi, je réponds
          sous 24 heures.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2.5 rounded-full bg-button px-10 py-5 text-xl font-bold text-button-foreground transition-opacity hover:opacity-85"
        >
          M'écrire <span aria-hidden="true">↗</span>
        </a>
        <div className="mt-2 flex flex-wrap justify-center gap-7 font-semibold">
          <a href={site.links.linkedin} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
            LinkedIn
          </a>
          <a href={site.links.github} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
            GitHub
          </a>
          <a href={phoneHref} className="underline-offset-4 hover:underline">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
