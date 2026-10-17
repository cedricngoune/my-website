import { VersionSwitch } from "@/src/components/version-switch";
import { site } from "@/src/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 sm:px-10 xl:pl-56">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 font-mono text-[0.6875rem] text-foreground-subtle">
        <span>
          {site.fullname} — {site.job}
        </span>
        <div className="flex flex-wrap items-center gap-6">
          <VersionSwitch current="v1" />
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
