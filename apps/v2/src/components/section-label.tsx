export const SectionLabel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`inline-block rounded-full bg-surface px-5 py-2 text-lg text-foreground-body ${className}`}
    >
      {children}
    </p>
  );
};

export const SectionTitle = ({
  main,
  soft,
}: {
  main: React.ReactNode;
  soft?: React.ReactNode;
}) => {
  return (
    <h2 className="mt-6 text-[clamp(40px,4.6vw,64px)] font-bold leading-[1.08] tracking-[-0.03em]">
      {main}
      {soft ? (
        <>
          <br />
          <span className="text-foreground-soft">{soft}</span>
        </>
      ) : null}
    </h2>
  );
};
