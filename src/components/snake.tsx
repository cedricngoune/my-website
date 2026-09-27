"use client";

import { useEffect, useRef } from "react";

/**
 * Snake façon Nokia 3310 qui se promène tout seul sur la trame du héros.
 *
 * - Taille des cases : 18 px = 72 px / 4, donc le serpent tombe pile dans la grille.
 * - Il joue en pilote automatique : il file vers la pastille la plus proche
 *   en évitant les murs et son propre corps.
 * - Quand il se coince ou atteint sa taille max, il clignote (« game over »)
 *   puis repart.
 * - Pause automatique quand le héros n'est plus à l'écran.
 * - Image fixe si le visiteur a demandé de réduire les animations.
 */

const CELL = 18; // 72 / 4 : aligné sur la trame
const GAP = 3; // espace entre les « pixels » LCD
const STEP_MS = 170; // vitesse : plus grand = plus lent
const START_LENGTH = 6;
const MAX_LENGTH = 26;
const GROWTH_PER_FOOD = 3;
const BLINKS = 8; // nombre de frames du clignotement de fin

type Point = { x: number; y: number };

const DIRECTIONS: Point[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

export function Snake({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvasRef.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const canvas: HTMLCanvasElement = element;
    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    let snake: Point[] = [];
    let direction = DIRECTIONS[0];
    let food: Point = { x: 0, y: 0 };
    let growth = 0;
    let blinking = 0; // > 0 pendant l'animation de « game over »
    let tick = 0;

    const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
    const inside = (p: Point) => p.x >= 0 && p.y >= 0 && p.x < cols && p.y < rows;

    /** La pastille apparaît dans la zone la plus visible de la trame (voir le masque CSS). */
    function placeFood() {
      for (let attempt = 0; attempt < 60; attempt++) {
        const candidate = {
          x: Math.floor(cols * (0.12 + Math.random() * 0.56)),
          y: Math.floor(rows * (0.1 + Math.random() * 0.55)),
        };
        if (!snake.some((s) => same(s, candidate))) {
          food = candidate;
          return;
        }
      }
      food = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };
    }

    function reset() {
      const y = Math.max(0, Math.floor(rows * 0.35));
      const x0 = Math.min(cols - 1, Math.max(START_LENGTH, Math.floor(cols * 0.15)));
      snake = Array.from({ length: START_LENGTH }, (_, i) => ({ x: x0 - i, y }));
      direction = DIRECTIONS[0];
      growth = 0;
      blinking = 0;
      placeFood();
    }

    function step() {
      tick++;

      if (blinking > 0) {
        blinking--;
        if (blinking === 0) reset();
        return;
      }

      const head = snake[0];
      // La queue avance aussi (sauf si on grandit) : sa case sera libre.
      const body = growth > 0 ? snake : snake.slice(0, -1);
      const blocked = (p: Point) => !inside(p) || body.some((s) => same(s, p));

      const options = DIRECTIONS.filter(
        (d) => !(d.x === -direction.x && d.y === -direction.y),
      )
        .map((d) => ({ d, p: { x: head.x + d.x, y: head.y + d.y } }))
        .filter((o) => !blocked(o.p));

      if (options.length === 0) {
        blinking = BLINKS; // coincé : game over
        return;
      }

      const distance = (p: Point) =>
        Math.abs(p.x - food.x) + Math.abs(p.y - food.y);

      options.sort(
        (a, b) =>
          distance(a.p) - distance(b.p) ||
          Number(b.d === direction) - Number(a.d === direction),
      );

      // Une petite hésitation de temps en temps : plus vivant qu'un robot parfait.
      const choice =
        options.length > 1 && Math.random() < 0.08 ? options[1] : options[0];

      direction = choice.d;
      snake.unshift(choice.p);

      if (same(choice.p, food)) {
        growth += GROWTH_PER_FOOD;
        placeFood();
      }

      if (growth > 0) growth--;
      else snake.pop();

      if (snake.length >= MAX_LENGTH) blinking = BLINKS; // partie « gagnée »
    }

    function drawCell(p: Point, inset: number) {
      ctx.fillRect(
        p.x * CELL + inset,
        p.y * CELL + inset,
        CELL - inset * 2,
        CELL - inset * 2,
      );
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle =
        getComputedStyle(canvas).getPropertyValue("--accent").trim() ||
        "#ad90f1";

      // Pendant le game over, le serpent clignote comme sur le 3310
      const visible = blinking === 0 || blinking % 2 === 1;
      if (visible) snake.forEach((segment) => drawCell(segment, GAP));

      // Pastille : plus petite, clignote doucement
      if (blinking === 0 && tick % 6 !== 0) drawCell(food, GAP + 3);
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(width / CELL);
      rows = Math.floor(height / CELL);

      // On ne recommence que si le serpent ou la pastille sortent du cadre
      if (snake.length === 0 || !snake.every(inside) || !inside(food)) reset();
      draw();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Mouvement réduit : une image fixe, pas de boucle
    if (reduceMotion) {
      return () => resizeObserver.disconnect();
    }

    let frame = 0;
    let last = 0;
    let running = false;

    function loop(time: number) {
      if (time - last >= STEP_MS) {
        last = time;
        step();
        draw();
      }
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    // Pas d'animation quand le héros est hors de l'écran
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(canvas);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
