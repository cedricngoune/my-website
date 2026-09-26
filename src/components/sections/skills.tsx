import { Libelle, SectionTitle } from "@/src/components/sections/section-title";
import { site } from "@/src/content/site";

export function Skills() {
  const categories = Array.from(
    new Set(site.stacks.map((techno) => techno.category)),
  );

  return (
    <section
      id="competences"
      className="bg-fond-2 px-6 py-24 sm:px-10 xl:pl-56"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle number="02" title="Ma boite à outils" />

        <div className="mt-12" data-apparition>
          <Libelle>stacks techniques</Libelle>

          <div className="mt-8 space-y-8">
            {categories.map((categorie, index) => (
              <div
                key={categorie}
                className="grid gap-4 border-t border-bord pt-6 sm:grid-cols-[9rem_1fr]"
                data-apparition
                style={{ ["--delai" as string]: `${index * 70}ms` }}
              >
                <p className="font-mono text-xs tracking-widest text-encre-faible">
                  {categorie}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {site.stacks
                    .filter((techno) => techno.category === categorie)
                    .map((techno) => (
                      <li
                        key={techno.name}
                        className="group flex items-center gap-2 rounded-sm border border-bord px-3 py-1.5 transition-colors duration-200 hover:border-accent"
                      >
                        <span className="font-mono text-[0.625rem] text-accent">
                          {techno.sigle}
                        </span>
                        <span className="text-sm text-encre-douce transition-colors group-hover:text-encre">
                          {techno.name}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
