"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

/* -------------------------------------------------------------------------- */
/*  Son d'interrupteur, synthétisé avec la Web Audio API (aucun fichier audio) */
/* -------------------------------------------------------------------------- */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  audioCtx ??= new Ctor();
  return audioCtx;
}

/** Un « clac » court : un claquement aigu + un « toc » mécanique grave. */
function playSwitchSound(turningOn: boolean) {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.35; // volume global
  master.connect(ctx.destination);

  // 1. Claquement : bruit blanc de 40 ms qui s'éteint très vite, filtré
  const duration = 0.04;
  const buffer = ctx.createBuffer(
    1,
    Math.ceil(ctx.sampleRate * duration),
    ctx.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = turningOn ? 3200 : 2200;
  filter.Q.value = 1.2;
  noise.connect(filter).connect(master);
  noise.start(now);

  // 2. Toc mécanique : sinus grave dont la hauteur chute
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(turningOn ? 180 : 140, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);
  oscGain.gain.setValueAtTime(0.6, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc.connect(oscGain).connect(master);
  osc.start(now);
  osc.stop(now + 0.07);
}

/* -------------------------------------------------------------------------- */
/*  Composant                                                                  */
/*                                                                             */
/*  Mode sombre : ampoule éteinte qui dort (yeux fermés + « zzz »).            */
/*                Au survol, elle se réveille, sourit et s'illumine.           */
/*  Mode clair  : ampoule allumée qui sourit, avec ses rayons.                 */
/*  Les états visuels sont pilotés en CSS (.ampoule dans globals.css).         */
/* -------------------------------------------------------------------------- */

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const glassRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);

  const lit = theme === "light";

  function switchTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const turningOn = next === "light";

    playSwitchSound(turningOn);

    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}

    // Petit scintillement à l'allumage (désactivé si reduced-motion)
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (turningOn && !reduceMotion) {
      glassRef.current?.animate(
        [{ opacity: 0.3 }, { opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }],
        { duration: 280, easing: "steps(4, end)" },
      );
    }
  }

  const label = lit ? "Éteindre la lumière (mode sombre)" : "Allumer la lumière (mode clair)";

  return (
    <button
      type="button"
      onClick={switchTheme}
      aria-label={label}
      title={label}
      aria-pressed={lit}
      data-state={lit ? "on" : "off"}
      className="bulb relative grid h-10 w-10 place-items-center text-foreground-muted transition-transform duration-150 active:scale-90"
    >
      <svg
        viewBox="0 0 40 40"
        width="34"
        height="34"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="overflow-visible"
      >
        {/* Rayons */}
        <g className="lit rays" stroke="var(--accent)" strokeWidth="2">
          <path d="M20 1.5v-3" />
          <path d="M8.5 5.5 6.3 3.3" />
          <path d="M31.5 5.5l2.2-2.2" />
          <path d="M4.5 15.5h-3" />
          <path d="M35.5 15.5h3" />
          <path d="M6.3 24.5l-2.4 1.4" />
          <path d="M33.7 24.5l2.4 1.4" />
        </g>

        {/* Verre */}
        <path
          ref={glassRef}
          className="glass"
          stroke="currentColor"
          strokeWidth="1.8"
          d="M14.5 26C14.5 23.2 10 21 10 15.5a10 10 0 0 1 20 0C30 21 25.5 23.2 25.5 26Z"
        />

        {/* Culot */}
        <g stroke="currentColor" strokeWidth="1.8">
          <path d="M15 29h10" />
          <path d="M16 32h8" />
          <path d="M18 35h4" />
        </g>

        {/* Visage endormi */}
        <g className="unlit" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.8 15.2q1.5 1.5 3 0" />
          <path d="M22.2 15.2q1.5 1.5 3 0" />
          <circle cx="20" cy="20" r="1" />
        </g>

        {/* « zzz » qui s'envolent */}
        <g
          className="unlit zzz"
          fill="var(--accent)"
          fontFamily="var(--font-mono), monospace"
          fontWeight="700"
        >
          <text className="z" x="28" y="8" fontSize="6">z</text>
          <text className="z" x="32" y="3" fontSize="7.5">z</text>
          <text className="z" x="36.5" y="-2.5" fontSize="9">Z</text>
        </g>

        {/* Visage réveillé et souriant */}
        <g className="lit face">
          <circle cx="16.3" cy="14.6" r="1.4" fill="#2a1f45" />
          <circle cx="23.7" cy="14.6" r="1.4" fill="#2a1f45" />
          <circle cx="16.8" cy="14.1" r="0.45" fill="#fff" />
          <circle cx="24.2" cy="14.1" r="0.45" fill="#fff" />
          <path
            d="M16 18.6q4 4 8 0"
            stroke="#2a1f45"
            strokeWidth="1.5"
          />
          <circle cx="13.6" cy="18" r="1.3" fill="#f59eb6" opacity="0.7" />
          <circle cx="26.4" cy="18" r="1.3" fill="#f59eb6" opacity="0.7" />
        </g>
      </svg>
    </button>
  );
}
