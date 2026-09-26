export function SectionTitle({
  number,
  title,
  intro,
}: {
  number: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl" data-apparition>
      <h2 className="flex items-baseline gap-3">
        <span className="font-avenir text-4xl font-bold tracking-tight text-encre sm:text-5xl">
          {number}.
        </span>
        <span className="font-avenir text-2xl font-bold uppercase tracking-wide text-encre-douce sm:text-3xl">
          {title}
        </span>
      </h2>
      {intro ? (
        <p className="mt-5 leading-relaxed text-encre-douce">{intro}</p>
      ) : null}
    </div>
  );
}

/** Petit libellé teal en mono, façon « Mon parcours » dans la maquette. */
export function Libelle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-accent">{children}</p>
  );
}
