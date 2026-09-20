import { sections } from "@/src/content/site";

/** Navigation verticale numérotée, collée au bord gauche. */
export function Rail() {
  return (
    <nav
      data-nav
      aria-label="Sections du site"
      className="fixed left-0 top-1/2 z-20 hidden -translate-y-1/2 pl-10 xl:block"
    >
      <ul className="space-y-6">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group flex flex-col gap-2 font-mono text-[0.6875rem] tracking-wider text-encre-faible transition-colors duration-200 hover:text-encre-douce data-[actif=true]:text-accent"
            >
              <span className="tiret" aria-hidden="true" />
              <span>
                {String(index + 1).padStart(2, "0")}. {section.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
