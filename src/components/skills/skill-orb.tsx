"use client";

import { useEffect, useId, useRef } from "react";

const RADIUS = 49; // rayon de la boule, repère 100 × 100
const FILAMENT_RADIUS = 51.5; // le filament passe juste autour
const FILAMENT_POINTS = 72;

/** Contour qui ondule doucement : somme de sinusoïdes qui glissent dans le temps. */
function filamentPath(time: number) {
  let d = "";
  for (let i = 0; i <= FILAMENT_POINTS; i++) {
    const angle = (i / FILAMENT_POINTS) * Math.PI * 2;
    const r =
      FILAMENT_RADIUS +
      1.1 * Math.sin(3 * angle + time * 2.2) +
      0.7 * Math.sin(7 * angle - time * 3.4) +
      0.35 * Math.sin(13 * angle + time * 5);
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    d += `${i === 0 ? "M" : " L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

export function SkillOrb({
  name,
  iconPath,
  active,
  onActiveChange,
}: {
  name: string;
  iconPath: string;
  active: boolean;
  onActiveChange: (active: boolean) => void;
}) {
  const filamentRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const glowId = `glow-${useId().replace(/:/g, "")}`;

  // Animation du filament uniquement quand la boule est active
  useEffect(() => {
    const filament = filamentRef.current;
    const spark = sparkRef.current;
    if (!active || !filament || !spark) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const start = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      const time = reduceMotion ? 0 : (now - start) / 1000;
      filament.setAttribute("d", filamentPath(time));
      const angle = time * 2.6 - Math.PI / 2;
      spark.setAttribute("cx", (50 + 52 * Math.cos(angle)).toFixed(2));
      spark.setAttribute("cy", (50 + 52 * Math.sin(angle)).toFixed(2));
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div
      className="skill-orb"
      data-active={active}
      onMouseEnter={() => onActiveChange(true)}
      onMouseLeave={() => onActiveChange(false)}
      onTouchStart={() => onActiveChange(true)}
      onTouchEnd={() => setTimeout(() => onActiveChange(false), 1400)}
    >
      <svg className="skill-orb-base" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={RADIUS} className="skill-orb-fill" />
        <circle cx="50" cy="50" r={RADIUS - 5} className="skill-orb-rim" />
        {/* Logo simple-icons (24 × 24) agrandi et centré */}
        <g transform="translate(29 29) scale(1.75)">
          <path d={iconPath} className="skill-orb-icon" />
        </g>
      </svg>

      <svg
        className="skill-orb-fx"
        viewBox="-20 -20 140 140"
        aria-hidden="true"
      >
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={filamentRef}
          className="skill-orb-filament"
          filter={`url(#${glowId})`}
        />
        <circle
          ref={sparkRef}
          r="1.8"
          className="skill-orb-spark"
          filter={`url(#${glowId})`}
        />
      </svg>

      <span className="skill-name">{name}</span>
    </div>
  );
}
