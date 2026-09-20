import { SectionTitle } from "@/src/components/sections/section-title";
import { site } from "@/src/content/site";

export function Projects() {
  return (
    <section id="realisations" className="px-6 py-24 sm:px-10 xl:pl-56">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          number="03"
          title="Réalisations"
          intro="Quatre missions, du module front à fort trafic à la plateforme montée de zéro."
        />

        <div className="mt-12 space-y-4">
          {site.projects.map((project, index) => (
            <article
              key={project.name}
              className="group grid gap-6 border border-bord bg-surface p-6 transition-colors duration-300 hover:border-accent sm:grid-cols-[auto_1fr] sm:p-8"
              data-apparition
              style={{ ["--delai" as string]: `${index * 70}ms` }}
            >
              <div className="flex items-start gap-4 sm:flex-col sm:items-center sm:gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-bord-fort font-mono text-xs text-accent transition-colors duration-300 group-hover:border-accent">
                  {project.sigle}
                </span>
                <span className="font-mono text-[0.6875rem] text-encre-faible">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-avenir text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="font-mono text-xs text-encre-faible">
                    {project.period}
                  </p>
                </div>

                <p className="mt-1 text-sm text-encre-douce">
                  {project.client}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-encre-douce">
                  {project.resume}
                </p>

                <ul className="mt-4 space-y-2 font-mono text-[0.8125rem] text-encre-douce">
                  {project.points.map((point) => (
                    <li key={point} className="chevron">
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-bord pt-5 font-mono text-[0.6875rem] text-encre-faible">
                  {project.stack.map((techno) => (
                    <li key={techno}>{techno}</li>
                  ))}
                </ul>

                <p className="mt-4 font-mono text-[0.6875rem] text-accent">
                  {project.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
