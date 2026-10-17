"use client";

import { useEffect, useRef } from "react";

const CLICKABLE = "a, button, [role='button'], summary, label";
const RING_EASING = 0.18; // part du chemin parcourue par le cercle à chaque image

/**
 * Curseur : un point qui suit la souris et un cercle qui le rattrape en douceur.
 * Sur un élément cliquable, le cercle grossit et devient plein.
 * Désactivé sur les écrans tactiles (pas de souris = curseur natif).
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!root || !ring || !dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -100, y: -100 };
    const ringPosition = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      root.dataset.cursorVisible = "true";
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      root.dataset.cursorHover = target?.closest(CLICKABLE) ? "true" : "false";
    };

    const onLeave = () => {
      root.dataset.cursorVisible = "false";
    };

    const animate = () => {
      ringPosition.x += (mouse.x - ringPosition.x) * RING_EASING;
      ringPosition.y += (mouse.y - ringPosition.y) * RING_EASING;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" data-cursor-visible="false" data-cursor-hover="false">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
