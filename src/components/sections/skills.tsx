import { Label, SectionTitle } from "@/src/components/sections/section-title";
import { site } from "@/src/content/site";

export function Skills() {
  const categories = Array.from(
    new Set(site.stacks.map((tech) => tech.category)),
  );

  return (
    <section
      id="competences"
      className="bg-background-2 px-6 py-24 sm:px-10 xl:pl-56"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle number="02" title="Ma boite à outils" />

        <div className="mt-12" data-reveal>
          <Label>stacks techniques</Label>

          <div className="mt-8 space-y-8">
            {categories.map((category, index) => (
              <div
                key={category}
                className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[9rem_1fr]"
                data-reveal
                style={{ ["--delay" as string]: `${index * 70}ms` }}
              >
                <p className="font-mono text-xs tracking-widest text-foreground-subtle">
                  {category}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {site.stacks
                    .filter((tech) => tech.category === category)
                    .map((tech) => (
                      <li
                        key={tech.name}
                        className="group flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 transition-colors duration-200 hover:border-accent"
                      >
                        <span className="font-mono text-[0.625rem] text-accent">
                          {tech.initials}
                        </span>
                        <span className="text-sm text-foreground-muted transition-colors group-hover:text-foreground">
                          {tech.name}
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
