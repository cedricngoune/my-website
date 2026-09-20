import { site } from "@/src/content/site";

export function Footer() {
  return (
    <footer className="border-t border-bord px-6 py-8 sm:px-10 xl:pl-56">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem] text-encre-faible">
        <span>
          {site.fullname} — {site.job}
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
