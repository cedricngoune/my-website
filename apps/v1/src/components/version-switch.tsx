import { siteVersionUrls, type SiteVersion } from "@portfolio/content";

const versions: { id: SiteVersion; label: string }[] = [
  { id: "v1", label: "v1" },
  { id: "v2", label: "v2" },
];

/**
 * Switch entre les deux versions du site, en bas de page.
 * La version affichée est surlignée ; l'autre mène vers son adresse (voir packages/content/src/versions.ts).
 */
export function VersionSwitch({ current }: { current: SiteVersion }) {
  return (
    <nav aria-label="Version du site" className="flex items-center gap-3">
      <span>version</span>
      <div className="flex border border-border p-0.5">
        {versions.map((version) =>
          version.id === current ? (
            <span
              key={version.id}
              aria-current="page"
              className="bg-accent px-3 py-1 text-background"
            >
              {version.label}
            </span>
          ) : (
            <a
              key={version.id}
              href={siteVersionUrls[version.id]}
              className="px-3 py-1 text-foreground-muted transition-colors duration-200 hover:text-accent"
            >
              {version.label}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
