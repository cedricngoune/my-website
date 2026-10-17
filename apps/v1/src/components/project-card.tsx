"use client";

import { useRef, useState, type KeyboardEvent } from "react";

export type ProjectTech = {
  name: string;
  iconPath?: string;
  shortname: string;
};

export type ProjectCard = {
  id: string;
  client: string;
  initials: string;
  period: string;
  current: boolean;
  role: string;
  summary: string;
  highlights: string[];
  stack: ProjectTech[];
};

const formatNumber = (index: number) => String(index + 1).padStart(2, "0");

export function ProjectSelect({ projects }: { projects: ProjectCard[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = projects.length;
  const selected = projects[selectedIndex];

  const select = (index: number, focus = false) => {
    const next = (index + count) % count;
    setSelectedIndex(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(selectedIndex + moves[event.key], true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(count - 1, true);
    }
  };

  if (!selected) return null;

  return (
    <div className="project-select">
      {/* Liste des missions (le « roster ») */}
      <div className="project-roster-wrap">
        <div
          className="project-roster"
          role="tablist"
          aria-label="Missions"
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
        >
          {projects.map((project, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={project.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`project-tab-${index}`}
                aria-selected={isSelected}
                aria-controls="project-panel"
                aria-label={`${project.client}, ${project.period}`}
                tabIndex={isSelected ? 0 : -1}
                className="project-slot"
                data-selected={isSelected}
                onClick={() => select(index)}
              >
                <span className="project-slot-art" aria-hidden="true">
                  {project.initials}
                </span>
                <span className="project-slot-text min-w-0 text-left">
                  <span className="project-slot-client">{project.client}</span>
                  <span className="project-slot-period">{project.period}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="project-hint" aria-hidden="true">
          ▲▼ ou clic pour changer
        </p>
      </div>

      {/* Carte de la mission choisie : la clé relance l'animation d'entrée */}
      <div
        className="project-stage"
        role="tabpanel"
        id="project-panel"
        aria-labelledby={`project-tab-${selectedIndex}`}
      >
        <article key={selected.id} className="project-card">
          <div className="project-card-inner">
            <header className="flex items-center gap-4">
              <span className="project-gem" aria-hidden="true">
                {formatNumber(selectedIndex)}
              </span>
              <div className="min-w-0">
                <h3 className="font-avenir text-xl font-bold leading-tight text-foreground sm:text-2xl">
                  {selected.client}
                </h3>
                <p className="mt-1 font-mono text-xs text-foreground-subtle">
                  {selected.period}
                </p>
              </div>
              {selected.current ? (
                <span className="project-live">EN COURS</span>
              ) : null}
            </header>

            <p className="project-type">{selected.role}</p>

            <p className="mt-5 leading-relaxed text-foreground">
              {selected.summary}
            </p>

            <ul className="mt-4 space-y-2 font-mono text-[0.8125rem] leading-relaxed text-foreground-muted">
              {selected.highlights.map((point) => (
                <li key={point} className="chevron">
                  {point}
                </li>
              ))}
            </ul>

            <div className="project-stack">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-foreground-subtle">
                Technos utilisées
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {selected.stack.map((tech, index) => (
                  <li
                    key={tech.name}
                    className="project-orb glass-orb"
                    tabIndex={0}
                    aria-label={tech.name}
                    style={{ ["--i" as string]: index }}
                  >
                    {tech.iconPath ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="glass-orb-icon"
                        aria-hidden="true"
                      >
                        <path d={tech.iconPath} />
                      </svg>
                    ) : (
                      <span className="project-orb-text" aria-hidden="true">
                        {tech.shortname}
                      </span>
                    )}
                    <span className="project-orb-name" aria-hidden="true">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
