"use client";

import { useEffect, useRef } from "react";

import { HERO_TYPED_EVENT } from "@/src/components/typed-title";
import { LOGO_VIEWBOX_WIDTH, RIBBON_WIDTH_UNITS } from "./lanyard-config";

const SEGMENTS = 32;
const ITERATIONS = 32; // passes de contrainte : plus = corde plus raide
const DAMPING = 0.975;
const GRAVITY_FALL = 1.1; // pendant la chute
const GRAVITY_IDLE = 0.12; // une fois accrochée
const SLACK = 1.012; // 1,2 % de mou : de quoi onduler sans pendouiller
const SCROLL_KICK = 0.09; // élan latéral donné par le scroll
const WIND = 0.018; // petit souffle permanent
const MAX_SWING_DEG = 14;

const BACK_STRAND_OFFSET = 0.3; // décalage du brin arrière, en fraction de la largeur

type Point = { x: number; y: number; px: number; py: number };

function pagePoint(element: Element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
}

/** Chemin lissé qui passe par les milieux des segments. */
function smoothPath(points: Point[]) {
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    d += ` Q${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  return d + ` L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
}

export function Rope() {
  const svgRef = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGPathElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);
  const frontRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const back = backRef.current;
    const edge = edgeRef.current;
    const front = frontRef.current;
    if (!svg || !back || !edge || !front) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let points: Point[] = [];
    let state: "hidden" | "falling" | "attaching" | "attached" = "hidden";
    let attachProgress = 0;
    let fallLength = 0;
    let lastScrollY = window.scrollY;
    let swingAngle = 0;
    let swingVelocity = 0;
    let frame = 0;

    const findAnchor = () => document.querySelector("[data-rope-anchor]");
    const findEnd = () => document.querySelector("[data-rope-end]");
    const findSwing = () =>
      document.querySelector<HTMLElement>("[data-rope-swing]");

    function drop() {
      const anchorElement = findAnchor();
      const endElement = findEnd();
      if (!anchorElement || !endElement || state !== "hidden") return;

      const anchor = pagePoint(anchorElement);
      const end = pagePoint(endElement);
      fallLength = Math.hypot(end.x - anchor.x, end.y - anchor.y) * SLACK;

      // Tous les points partent de l'accroche : la corde se déroule en tombant
      points = Array.from({ length: SEGMENTS + 1 }, (_, i) => ({
        x: anchor.x + (i % 2 ? 0.5 : -0.5), // léger décalage pour éviter l'alignement parfait
        y: anchor.y + i * 0.5,
        px: anchor.x,
        py: anchor.y,
      }));
      state = reduceMotion ? "attached" : "falling";
      svg!.style.visibility = "visible";
    }

    function step() {
      const anchorElement = findAnchor();
      const endElement = findEnd();
      if (!anchorElement || !endElement) return;
      const anchor = pagePoint(anchorElement);
      const end = pagePoint(endElement);

      // Mouvement réduit : simple ligne droite, recalculée si la mise en page bouge
      if (reduceMotion) {
        points = points.map((_, i) => {
          const t = i / SEGMENTS;
          const x = anchor.x + (end.x - anchor.x) * t;
          const y = anchor.y + (end.y - anchor.y) * t;
          return { x, y, px: x, py: y };
        });
        return;
      }

      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      const distance = Math.hypot(end.x - anchor.x, end.y - anchor.y);
      const length = state === "falling" ? fallLength : distance * SLACK;
      const rest = length / SEGMENTS;
      const gravity = state === "falling" ? GRAVITY_FALL : GRAVITY_IDLE;
      const time = performance.now() / 1000;

      // 1. Intégration (vitesse implicite = position - position précédente)
      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const weight = Math.sin((Math.PI * i) / SEGMENTS); // 0 aux bouts, 1 au milieu
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + WIND * Math.sin(time * 1.3 + i * 0.35) * weight;
        p.x += state === "falling" ? 0 : -scrollDelta * SCROLL_KICK * weight;
        p.y += vy + gravity;
      }

      // 2. Extrémités : l'accroche suit le logo ; le bout rejoint puis suit le badge
      points[0].x = anchor.x;
      points[0].y = anchor.y;
      const tail = points[SEGMENTS];
      if (state === "attaching") {
        attachProgress = Math.min(1, attachProgress + 0.06);
        tail.x += (end.x - tail.x) * attachProgress;
        tail.y += (end.y - tail.y) * attachProgress;
        if (attachProgress >= 1) state = "attached";
      } else if (state === "attached") {
        tail.x = end.x;
        tail.y = end.y;
      }

      // 3. Contraintes de longueur entre points voisins
      for (let pass = 0; pass < ITERATIONS; pass++) {
        for (let i = 0; i < SEGMENTS; i++) {
          const a = points[i];
          const b = points[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          // Pendant la chute, une corde ne se « pousse » pas : on ne corrige que l'étirement
          if (state === "falling" && d < rest) continue;
          const diff = (d - rest) / d;
          const aFixed = i === 0;
          const bFixed = i + 1 === SEGMENTS && state === "attached";
          if (aFixed && bFixed) continue;
          const shareA = aFixed ? 0 : bFixed ? 1 : 0.5;
          const shareB = bFixed ? 0 : aFixed ? 1 : 0.5;
          a.x += dx * diff * shareA;
          a.y += dy * diff * shareA;
          b.x -= dx * diff * shareB;
          b.y -= dy * diff * shareB;
        }
        points[0].x = anchor.x;
        points[0].y = anchor.y;
      }

      // 4. Fin de la chute : la corde est déroulée, on l'accroche au badge
      if (state === "falling" && tail.y - anchor.y > fallLength * 0.96) {
        state = "attaching";
        attachProgress = 0;
      }

      // 5. Balancement du badge : ressort amorti vers l'angle du bout de corde
      const swing = findSwing();
      if (swing && state === "attached") {
        // Au repos le badge pend droit : il ne réagit qu'au mouvement latéral
        // du bas de la corde (vitesse = position - position précédente).
        const near = points[SEGMENTS - 3];
        const lateralSpeed = near.x - near.px;
        const target = -lateralSpeed * 3.2;
        swingVelocity += (target - swingAngle) * 0.05;
        swingVelocity *= 0.93;
        swingAngle += swingVelocity;
        const clamped = Math.max(
          -MAX_SWING_DEG,
          Math.min(MAX_SWING_DEG, swingAngle),
        );
        swing.style.transform = `rotate(${clamped.toFixed(2)}deg)`;
      }
    }

    function render() {
      if (state === "hidden") return;

      // Largeur du ruban à l'échelle du logo affiché
      const logo = findAnchor()?.parentElement;
      const scale = logo
        ? logo.getBoundingClientRect().width / LOGO_VIEWBOX_WIDTH
        : 1;
      const width = Math.max(5, RIBBON_WIDTH_UNITS * scale);

      // Brin avant : le long de la simulation
      const frontPath = smoothPath(points);
      // Brin arrière : même forme, légèrement décalé à gauche en haut,
      // les deux brins se rejoignent en bas sur l'attache du badge
      const backPoints = points.map((p, i) => {
        const taper = 1 - i / SEGMENTS;
        return { ...p, x: p.x - width * BACK_STRAND_OFFSET * taper };
      });

      back!.setAttribute("d", smoothPath(backPoints));
      edge!.setAttribute("d", frontPath);
      front!.setAttribute("d", frontPath);
      back!.setAttribute("stroke-width", width.toFixed(1));
      edge!.setAttribute("stroke-width", width.toFixed(1));
      front!.setAttribute("stroke-width", Math.max(3, width - 2.4).toFixed(1));
    }

    function loop() {
      if (state !== "hidden") {
        step();
        render();
      }
      frame = requestAnimationFrame(loop);
    }

    // La corde tombe quand le sous-titre a fini de se taper
    if (document.documentElement.dataset.heroTyped === "true") drop();
    window.addEventListener(HERO_TYPED_EVENT, drop);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(HERO_TYPED_EVENT, drop);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-full"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="absolute left-0 top-0 overflow-visible"
        width="1"
        height="1"
        style={{ visibility: "hidden" }}
      >
        {/* Brin arrière (plus sombre), puis brin avant avec un liseré sur les bords */}
        <path
          ref={backRef}
          className="lanyard-back"
          fill="none"
          strokeLinecap="butt"
        />
        <path
          ref={edgeRef}
          className="lanyard-edge"
          fill="none"
          strokeLinecap="butt"
        />
        <path
          ref={frontRef}
          className="lanyard-front"
          fill="none"
          strokeLinecap="butt"
        />
      </svg>
    </div>
  );
}
