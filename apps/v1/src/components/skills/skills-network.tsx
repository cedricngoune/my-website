"use client";

import { useState } from "react";
import { SkillOrb } from "@/src/components/skills/skill-orb";

type Stack = { name: string; iconPath: string };
type Point = { x: number; y: number };

const RING_RADIUS = 38; // rayon de la couronne, en % de la largeur du réseau
const START_ANGLE_DEG = -90;

function pointAt(angleDeg: number, radius: number): Point {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
}

const CENTER: Point = { x: 50, y: 50 };

export function SkillsNetwork({ stacks }: { stacks: Stack[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const count = stacks.length;

  const nodes = stacks.map((stack, index) => ({
    ...stack,
    index,
    ...pointAt(START_ANGLE_DEG + (index * 360) / count, RING_RADIUS),
  }));

  const neighbors = (index: number) =>
    count < 3 ? [] : [(index - 1 + count) % count, (index + 1) % count];

  // Liens de la couronne : i -> i + 1 (le dernier rejoint le premier)
  const ringLinks =
    count < 3
      ? []
      : nodes.map((node) => ({ a: node.index, b: (node.index + 1) % count }));

  const isRingLinkLit = (a: number, b: number) =>
    activeIndex !== null && (a === activeIndex || b === activeIndex);

  return (
    <div className="skills-network">
      <svg className="skills-links" viewBox="0 0 100 100" aria-hidden="true">
        {/* Rayons : ordinateur -> techno */}
        {nodes.map((node) => {
          const lit = activeIndex === node.index;
          return (
            <g key={`spoke-${node.name}`} data-active={lit}>
              <line
                className="skills-link"
                x1={CENTER.x}
                y1={CENTER.y}
                x2={node.x}
                y2={node.y}
                pathLength={1}
                style={{ ["--i" as string]: node.index }}
              />
              <line
                className="skills-current"
                x1={CENTER.x}
                y1={CENTER.y}
                x2={node.x}
                y2={node.y}
              />
            </g>
          );
        })}

        {/* Couronne : techno <-> techno voisine */}
        {ringLinks.map(({ a, b }) => {
          const lit = isRingLinkLit(a, b);
          // Le courant part toujours de la boule survolée vers sa voisine
          const from = nodes[lit && b === activeIndex ? b : a];
          const to = nodes[lit && b === activeIndex ? a : b];
          return (
            <g key={`ring-${a}-${b}`} data-active={lit} data-ring>
              <line
                className="skills-link"
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                pathLength={1}
                style={{ ["--i" as string]: count + a }}
              />
              <line
                className="skills-current"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
            </g>
          );
        })}
      </svg>

      <ComputerCore />

      <ul className="contents">
        {nodes.map((node) => (
          <li
            key={node.name}
            className="skills-node"
            data-neighbor={
              activeIndex !== null &&
              neighbors(activeIndex).includes(node.index)
            }
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              ["--i" as string]: node.index,
            }}
          >
            <SkillOrb
              name={node.name}
              iconPath={node.iconPath}
              active={activeIndex === node.index}
              onActiveChange={(active) =>
                setActiveIndex((current) =>
                  active ? node.index : current === node.index ? null : current,
                )
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComputerCore() {
  return (
    <div className="skills-core" aria-hidden="true">
      <svg viewBox="0 0 64 56" className="skills-computer">
        {/* Écran */}
        <rect
          x="4"
          y="4"
          width="56"
          height="36"
          rx="4"
          className="computer-frame"
        />
        <rect
          x="8"
          y="8"
          width="48"
          height="28"
          rx="2"
          className="computer-screen"
        />
        {/* </> sur l'écran, avec un curseur qui clignote */}
        <path
          d="M24 17l-5 5 5 5M40 17l5 5-5 5M34 15l-4 14"
          className="computer-code"
        />
        <rect x="47" y="27" width="4" height="1.6" className="computer-caret" />
        {/* Pied et socle */}
        <path d="M27 40h10l2 8H25z" className="computer-frame" />
        <rect
          x="18"
          y="48"
          width="28"
          height="4"
          rx="2"
          className="computer-frame"
        />
      </svg>
    </div>
  );
}
