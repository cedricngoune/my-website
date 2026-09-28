"use client";

import { useEffect, useState } from "react";

/** Événement émis quand la saisie est terminée : la corde du badge l'écoute. */
export const HERO_TYPED_EVENT = "hero-typed";

type Phase = "waiting" | "prefix" | "brackets" | "tag" | "done";

const START_DELAY_MS = 1000; // laisse le logo finir d'apparaître
const BRACKETS_PAUSE_MS = 320;
const END_BLINK_MS = 1400; // le curseur clignote un peu avant de disparaître

function typingDelay() {
  return 55 + Math.random() * 60;
}

function announceTyped() {
  document.documentElement.dataset.heroTyped = "true";
  window.dispatchEvent(new Event(HERO_TYPED_EVENT));
}

export function TypedTitle({
  prefix,
  tag,
  className,
}: {
  prefix: string;
  tag: string;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [prefixLength, setPrefixLength] = useState(0);
  const [tagLength, setTagLength] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);

  // Démarrage (ou tout afficher d'un coup si le visiteur réduit les animations)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrefixLength(prefix.length);
      setTagLength(tag.length);
      setPhase("done");
      setCaretVisible(false);
      announceTyped();
      return;
    }
    const timer = setTimeout(() => setPhase("prefix"), START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [prefix.length, tag.length]);

  // Machine à écrire
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "prefix") {
      timer =
        prefixLength < prefix.length
          ? setTimeout(() => setPrefixLength((n) => n + 1), typingDelay())
          : setTimeout(() => setPhase("brackets"), BRACKETS_PAUSE_MS);
    } else if (phase === "brackets") {
      timer = setTimeout(() => setPhase("tag"), BRACKETS_PAUSE_MS);
    } else if (phase === "tag") {
      timer =
        tagLength < tag.length
          ? setTimeout(() => setTagLength((n) => n + 1), typingDelay())
          : setTimeout(() => {
              setPhase("done");
              announceTyped();
            }, 200);
    } else if (phase === "done" && caretVisible) {
      timer = setTimeout(() => setCaretVisible(false), END_BLINK_MS);
    }

    return () => clearTimeout(timer);
  }, [phase, prefixLength, tagLength, prefix.length, tag.length, caretVisible]);

  const showBrackets =
    phase === "brackets" || phase === "tag" || phase === "done";
  const caretInPrefix = phase === "waiting" || phase === "prefix";
  const caret = <span className="type-caret" aria-hidden="true" />;

  return (
    <p className={className}>
      <span className="sr-only">
        {prefix} &lt;{tag}&gt;
      </span>

      <span className="typed-stack" aria-hidden="true">
        <span className="typed-ghost">
          {prefix} <span className="font-mono text-accent">&lt;{tag}&gt;</span>
        </span>

        {/* Texte en cours de frappe */}
        <span className="typed-live">
          {prefix.slice(0, prefixLength)}
          {caretInPrefix ? caret : null}
          {showBrackets ? (
            <>
              {" "}
              <span className="font-mono text-accent">
                &lt;{tag.slice(0, tagLength)}
                {!caretInPrefix && caretVisible ? caret : null}&gt;
              </span>
            </>
          ) : null}
        </span>
      </span>
    </p>
  );
}
