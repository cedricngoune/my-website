"use client";

import { useEffect, useState } from "react";
import { SPLASH_DONE_EVENT } from "@/src/components/splash";

const FIRST_SENTENCE = "Je crée des interfaces web modernes";
const SECOND_SENTENCE = "Je crée des expériences pour les ";
const AUDIENCES = ["agences", "startups", "artisans"];

const TYPE_DELAY = 70; // ms par lettre écrite
const ERASE_DELAY = 35; // ms par lettre effacée
const HOLD_DELAY = 1600; // pause une fois le texte écrit
const GAP_DELAY = 250; // pause une fois le texte effacé

/**
 * Sous-titre animé, en boucle :
 * 1. « Je crée des interfaces web modernes » s'écrit puis s'efface ;
 * 2. « Je crée des expériences pour les » s'écrit et reste ;
 * 3. « agences », « startups », « artisans » s'écrivent et s'effacent tour à tour ;
 * 4. la phrase s'efface et tout recommence.
 * Démarre quand l'écran de chargement a disparu.
 */
export function TypedSubtitle() {
  const [sentence, setSentence] = useState("");
  const [word, setWord] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSentence(FIRST_SENTENCE);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const wait = (callback: () => void, delay: number) => {
      timer = setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
    };

    const type = (set: (value: string) => void, text: string, length: number, done: () => void) => {
      set(text.slice(0, length));
      if (length < text.length) wait(() => type(set, text, length + 1, done), TYPE_DELAY);
      else wait(done, HOLD_DELAY);
    };

    const erase = (set: (value: string) => void, text: string, length: number, done: () => void) => {
      set(text.slice(0, length));
      if (length > 0) wait(() => erase(set, text, length - 1, done), ERASE_DELAY);
      else wait(done, GAP_DELAY);
    };

    const showAudience = (index: number) => {
      if (index === AUDIENCES.length) {
        erase(setSentence, SECOND_SENTENCE, SECOND_SENTENCE.length - 1, start);
        return;
      }
      const audience = AUDIENCES[index];
      type(setWord, audience, 1, () =>
        erase(setWord, audience, audience.length - 1, () => showAudience(index + 1)),
      );
    };

    const start = () =>
      type(setSentence, FIRST_SENTENCE, 1, () =>
        erase(setSentence, FIRST_SENTENCE, FIRST_SENTENCE.length - 1, () =>
          type(setSentence, SECOND_SENTENCE, 1, () => showAudience(0)),
        ),
      );

    const begin = () => wait(start, 300);
    if (document.documentElement.dataset.splashDone === "true") begin();
    else window.addEventListener(SPLASH_DONE_EVENT, begin, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener(SPLASH_DONE_EVENT, begin);
    };
  }, []);

  return (
    <p className="mt-6 min-h-[42px] text-[clamp(20px,2.2vw,28px)] text-foreground-muted">
      {/* Les lecteurs d'écran lisent une version fixe plutôt que chaque lettre */}
      <span className="sr-only">
        {FIRST_SENTENCE}. {SECOND_SENTENCE}
        {AUDIENCES.join(", ")}.
      </span>
      <span aria-hidden="true">
        {sentence}
        <span className="font-bold text-foreground">{word}</span>
        <span className="typing-caret text-foreground">|</span>
      </span>
    </p>
  );
}
