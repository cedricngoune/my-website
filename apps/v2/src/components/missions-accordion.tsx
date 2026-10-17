"use client";

import { useId, useState } from "react";

export type Mission = {
  client: string;
  initials: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

/**
 * Réalisations : accordéon des missions à droite, carte de la mission ouverte à gauche.
 * Une seule mission ouverte à la fois ; la première l'est par défaut.
 */
export function MissionsAccordion({ missions }: { missions: Mission[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const active = missions[openIndex] ?? missions[0];

  if (!active) return null;

  return (
    <div className="mt-12 flex flex-wrap items-start gap-10">
      <div className="relative min-w-0 flex-[1_1_320px] pr-7 pt-7">
        <span
          aria-hidden="true"
          className="absolute -bottom-7 left-7 right-0 top-0 rounded-[28px] border-[1.5px] border-frame"
        />
        <div className="relative flex min-h-105 flex-col justify-between rounded-[28px] border border-border bg-card p-9 text-card-foreground">
          <div className="flex justify-between gap-3 text-[15px] text-card-muted">
            <span>{active.period}</span>
            <span className="text-right">{active.role}</span>
          </div>
          <p className="text-[120px] font-extrabold leading-none tracking-tighter">
            {active.initials}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Technos utilisées">
            {active.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-chip-border px-3.5 py-1.5 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accordéon */}
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
        {missions.map((mission, index) => {
          const isOpen = index === openIndex;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          return (
            <div key={mission.client}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`w-full px-7 py-6 text-left text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                    isOpen
                      ? "bg-accordion-open text-accordion-open-foreground"
                      : "bg-surface text-accordion-closed-foreground hover:text-foreground"
                  }`}
                >
                  {mission.client}
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="bg-surface px-7 pb-7 pt-5"
              >
                <p className="text-[17px] text-foreground-body">
                  {mission.summary}
                </p>
                <ul className="mt-4 grid list-disc gap-x-7 gap-y-2.5 pl-5 text-base text-bullet sm:grid-cols-2">
                  {mission.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
