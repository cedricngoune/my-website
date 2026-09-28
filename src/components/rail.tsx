import { sections } from "@/src/content/site";

/** Navigation verticale numérotée, collée au bord gauche, avec le bonhomme CV. */
export function Rail() {
  return (
    <div className="fixed left-0 top-1/2 z-20 hidden -translate-y-1/2 pl-10 xl:block">
      <nav data-nav aria-label="Sections du site">
        <ul className="space-y-6">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex flex-col gap-2 font-mono text-[1rem] tracking-wider text-foreground-subtle transition-colors duration-200 hover:text-foreground-muted data-[active=true]:text-accent"
              >
                <span className="nav-tick" aria-hidden="true" />
                <span>
                  {String(index + 1).padStart(2, "0")}. {section.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
