export function SectionTitle({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl" data-reveal>
      <h2 className="inline-block font-avenir text-3xl font-bold uppercase tracking-wide text-foreground-muted sm:text-4xl lg:text-5xl">
        {title}
        {/* Trait lumineux animé (voir .title-line dans globals.css) */}
        <span className="title-line" aria-hidden="true" />
      </h2>
      {intro ? (
        <p className="mt-5 leading-relaxed text-foreground-muted">{intro}</p>
      ) : null}
    </div>
  );
}

/** Petit libellé teal en mono, façon « Mon parcours » dans la maquette. */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-accent">{children}</p>
  );
}
