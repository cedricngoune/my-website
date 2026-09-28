"use client";

import { useState } from "react";

type BadgeProps = {
  name: string;
  photo: string;
  company: string;
  location: string;
  languages: string[];
};

export function Badge({
  name,
  photo,
  company,
  location,
  languages,
}: BadgeProps) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((value) => !value);
  const city = location.split(" (")[0];

  return (
    <div className="relative mx-auto w-60 pt-2">
      {/* Point d'accroche de la corde, au centre de l'attache */}
      <span
        data-rope-end
        className="absolute left-1/2 top-2 h-px w-px"
        aria-hidden="true"
      />

      <div data-rope-swing className="badge-hanging">
        <span className="badge-clip" aria-hidden="true" />

        <div className="badge-scene">
          <div
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={
              flipped
                ? "Retourner le badge côté photo"
                : "Retourner le badge pour voir mes infos"
            }
            onBlur={toggle}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
              }
            }}
            data-flipped={flipped}
            className="badge-card grid cursor-pointer"
          >
            {/* Recto */}
            <div className="flex flex-col justify-between items-center badge-face rounded-2xl border border-border-strong bg-surface p-5 text-center shadow-high">
              <span
                className="mx-auto mb-4 block h-1.5 w-10 rounded-full bg-background"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt={name}
                className="mx-auto h-50 w-50 rounded-xl object-cover"
                draggable={false}
              />
              <p className="mt-4 font-avenir text-lg font-bold text-foreground">
                {name}
              </p>
            </div>

            {/* Verso */}
            <div className="badge-face badge-back rounded-2xl border border-border-strong bg-surface p-5 shadow-high">
              <span
                className="mx-auto mb-4 block h-1.5 w-10 rounded-full bg-background"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-accent">infos.yml</p>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="font-mono text-[0.6875rem] text-foreground-subtle">
                    basé à
                  </dt>
                  <dd className="text-foreground">{location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] text-foreground-subtle">
                    langues
                  </dt>
                  <dd className="text-foreground">{languages.join(" · ")}</dd>
                </div>

                <div>
                  <dt className="font-mono text-[0.6875rem] text-foreground-subtle">
                    statut
                  </dt>
                  <dd className="flex items-center gap-2 text-foreground">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    En poste · {company}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
