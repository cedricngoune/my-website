"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/src/components/logo-mark";

/** Événement envoyé quand l'écran de chargement a disparu (le sous-titre démarre alors). */
export const SPLASH_DONE_EVENT = "splash-done";

const SEEN_KEY = "splash-seen";
const LETTERS = "LOADING".split("");

type Phase = "loading" | "leaving" | "done";

function markDone() {
  document.documentElement.dataset.splashDone = "true";
  window.dispatchEvent(new Event(SPLASH_DONE_EVENT));
}

/**
 * Écran de chargement : logo, « LOADING » qui pulse et barre de progression,
 * puis le rideau remonte. Affiché une fois par session de navigation.
 */
export function Splash() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === "true";
    } catch {}

    if (alreadySeen) {
      setPhase("done");
      markDone();
      return;
    }

    document.body.style.overflow = "hidden";
    const leaveTimer = setTimeout(() => setPhase("leaving"), 1800);
    const doneTimer = setTimeout(() => {
      // Marqué « vu » seulement une fois terminé (en dev, React lance l'effet deux fois)
      try {
        sessionStorage.setItem(SEEN_KEY, "true");
      } catch {}
      setPhase("done");
      document.body.style.overflow = "";
      markDone();
    }, 2500);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Chargement du site"
      data-phase={phase}
      className="splash fixed inset-0 z-[90] flex flex-col items-center justify-center gap-7 bg-[#111111] text-[#f6f3ef]"
    >
      <LogoMark className="h-[54px] w-24" />
      <p aria-hidden="true" className="flex gap-2.5 text-[22px] font-bold tracking-[0.3em]">
        {LETTERS.map((letter, index) => (
          <span
            key={index}
            className="splash-letter"
            style={{ ["--i" as string]: index }}
          >
            {letter}
          </span>
        ))}
      </p>
      <div aria-hidden="true" className="h-0.5 w-56 overflow-hidden bg-[#3a3a3a]">
        <div className="splash-bar h-full w-full bg-[#f6f3ef]" />
      </div>
    </div>
  );
}
