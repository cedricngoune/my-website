import { ThemeToggle } from "@/src/components/theme-toggle";
import { site } from "@/src/content/site";

/** Barre haute : bouton CV et bascule de thème, comme dans la maquette. */
export function Header() {
  return (
    <header
      data-header
      data-defile="false"
      className="fixed inset-x-0 top-0 z-30 border-b border-transparent transition-colors duration-300 data-[defile=true]:border-bord data-[defile=true]:bg-fond/85 data-[defile=true]:backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-6 py-4 sm:px-10 xl:pl-56">
        <a
          href="#accueil"
          className="font-mono text-xs tracking-widest text-encre-douce transition-colors hover:text-accent xl:opacity-0"
        >
          {site.initial}
        </a>

        <div className="flex items-center gap-2.5">
          {site.cv ? (
            <a
              href={site.cv}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-sm border border-accent px-3.5 py-1.5 font-mono text-xs tracking-widest text-accent transition-colors duration-200 hover:bg-accent hover:text-fond"
            >
              CV
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
