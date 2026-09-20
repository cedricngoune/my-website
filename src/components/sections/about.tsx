import { Libelle, SectionTitle } from "@/src/components/sections/section-title";
import { site } from "@/src/content/site";

export function About() {
  return (
    <section id="profil" className="px-6 py-24 sm:px-10 xl:pl-56">
      <div className="mx-auto max-w-5xl">
        <SectionTitle number="01" title="À propos" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="relative mx-auto lg:mx-0" data-apparition>
            <div className="halo-accent" aria-hidden="true" />
            <div className="relative h-52 w-52 overflow-hidden rounded-full border border-bord-fort bg-accent-sourd">
              {site.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={site.photo}
                  alt={site.fullname}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="grid h-full w-full place-items-center font-avenir text-5xl font-bold text-encre">
                  {site.initial}
                </span>
              )}
            </div>
          </div>

          <div
            className="space-y-5 leading-relaxed text-encre-douce"
            data-apparition
            style={{ ["--delai" as string]: "120ms" }}
          >
            {site.about.map((paragraphe) => (
              <p key={paragraphe.slice(0, 32)}>{paragraphe}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div data-apparition>
            <Libelle>Mon parcours</Libelle>
            <ol className="mt-6 border-l border-bord pl-6">
              {site.schools.map((formation) => (
                <li
                  key={formation.description}
                  className="relative pb-7 last:pb-0"
                >
                  <span
                    className="absolute left-[-1.6rem] top-1.5 h-2 w-2 rounded-full border border-accent bg-fond"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-xs text-encre-faible">
                    {formation.year}
                  </p>
                  <p className="mt-1 text-sm font-medium text-encre">
                    {formation.description}
                  </p>
                  <p className="text-sm text-encre-douce">{formation.school}</p>
                </li>
              ))}
            </ol>
          </div>

          <div data-apparition style={{ ["--delai" as string]: "120ms" }}>
            <Libelle>En bref</Libelle>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-6 border-b border-bord pb-4">
                <dt className="text-encre-faible">Poste actuel</dt>
                <dd className="text-right">CDI, ELPEV Group</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-bord pb-4">
                <dt className="text-encre-faible">Basé à</dt>
                <dd className="text-right">{site.location}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-bord pb-4">
                <dt className="text-encre-faible">Certifié</dt>
                <dd className="text-right">{site.certifications.join(", ")}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-encre-faible">Langues</dt>
                <dd className="text-right text-encre-douce">
                  {site.langages.join(" · ")}
                </dd>
              </div>
            </dl>

            <ul className="mt-8 grid grid-cols-2 gap-4">
              {site.figures.map((figure) => (
                <li key={figure.legend} className="border-l border-accent pl-4">
                  <p className="font-avenir text-2xl font-bold tracking-tight">
                    {figure.value}
                  </p>
                  <p className="mt-0.5 text-xs text-encre-faible">
                    {figure.legend}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
