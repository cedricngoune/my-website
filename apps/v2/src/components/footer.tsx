import { site } from "@portfolio/content";
import { VersionSwitch } from "@/src/components/version-switch";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-310 flex-wrap items-center justify-between gap-4 px-6 py-6 text-base text-foreground-muted sm:px-8">
        <span>
          © {new Date().getFullYear()} {site.fullname}
        </span>
        <VersionSwitch current="v2" />
      </div>
    </footer>
  );
}
