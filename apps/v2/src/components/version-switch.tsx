import { siteVersionUrls, type SiteVersion } from "@portfolio/content";

const versions: { id: SiteVersion; label: string }[] = [
  { id: "v1", label: "V1" },
  { id: "v2", label: "V2" },
];

/**
 * Switch entre les deux versions du site, en bas de page.
 * La version affichée est surlignée ; l'autre mène vers son adresse (voir packages/content/src/versions.ts).
 */
export function VersionSwitch({ current }: { current: SiteVersion }) {
  return (
    <nav aria-label="Version du site" className="flex items-center gap-3 text-sm">
      <span className="text-foreground-muted">Version du site</span>
      <div className="flex rounded-full border border-border bg-surface p-1">
        {versions.map((version) =>
          version.id === current ? (
            <span
              key={version.id}
              aria-current="page"
              className="rounded-full bg-button px-4 py-1.5 font-bold text-button-foreground"
            >
              {version.label}
            </span>
          ) : (
            <a
              key={version.id}
              href={siteVersionUrls[version.id]}
              className="rounded-full px-4 py-1.5 font-semibold text-foreground-muted transition-colors hover:text-foreground"
            >
              {version.label}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
