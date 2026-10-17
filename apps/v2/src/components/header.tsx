import { LogoMark } from "@/src/components/logo-mark";
import { ThemeToggle } from "@/src/components/theme-toggle";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#competences", label: "Compétences" },
  { href: "#experiences", label: "Expériences" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-310 flex-wrap items-center justify-between gap-5 px-6 py-5 sm:px-8">
        <a
          href="#accueil"
          aria-label="Accueil, Cédric Ngouné"
          className="inline-flex text-foreground"
        >
          <LogoMark className="h-8 w-14" />
        </a>
        <div className="flex flex-wrap items-center gap-6 sm:gap-9">
          <nav
            aria-label="Navigation principale"
            className="hidden flex-wrap gap-9 text-lg font-medium md:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
