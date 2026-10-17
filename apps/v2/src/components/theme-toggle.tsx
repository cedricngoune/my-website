"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

let audioContext: AudioContext | null = null;

/** Petit « clic » d'interrupteur synthétisé (aucun fichier audio). */
function playSwitchSound(goingDark: boolean) {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    audioContext ??= new Ctor();
    const ctx = audioContext;
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(goingDark ? 140 : 180, now);
    oscillator.frequency.exponentialRampToValueAtTime(60, now + 0.05);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  } catch {}
}

/**
 * Bascule clair / sombre : le soleil se transforme en lune.
 * L'animation est pilotée en CSS par data-theme (.sun-rays, .sun-core, .moon-shadow).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function switchTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    playSwitchSound(next === "dark");
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const label = theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre";

  return (
    <button
      type="button"
      onClick={switchTheme}
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
      className="grid h-[46px] w-[46px] place-items-center rounded-full border border-border bg-surface text-foreground transition-transform duration-150 active:scale-90"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <defs>
          <mask id="moon-cut">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <circle className="moon-shadow" cx="26" cy="4" r="7" fill="black" />
          </mask>
        </defs>
        <circle className="sun-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#moon-cut)" />
        <g className="sun-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="4.6" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.4" y2="19.4" />
          <line x1="4.6" y1="19.4" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  );
}
