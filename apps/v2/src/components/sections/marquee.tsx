const companies = ["ELPEV Group", "Hermès", "PMU", "Reforest'Action", "Nanotera", "GoMind"];

/** Bandeau qui défile avec les entreprises pour lesquelles Cédric a travaillé. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border py-8">
      <p className="sr-only">Entreprises pour lesquelles j'ai travaillé : {companies.join(", ")}.</p>
      <div
        aria-hidden="true"
        className="marquee-track flex w-max gap-24 whitespace-nowrap text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-0.02em]"
      >
        {[...companies, ...companies].map((company, index) => (
          <span key={`${company}-${index}`}>{company}</span>
        ))}
      </div>
    </div>
  );
}
