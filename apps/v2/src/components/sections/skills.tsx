import {
  siDocker,
  siNestjs,
  siNodedotjs,
  siPostgresql,
  siRabbitmq,
  siReact,
  siSymfony,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { SectionLabel, SectionTitle } from "@/src/components/section-label";

/** Les outils mis en avant, sur une seule ligne (logos simple-icons, licence CC0). */
const tools: { name: string; icon: SimpleIcon }[] = [
  { name: "React", icon: siReact },
  { name: "TypeScript", icon: siTypescript },
  { name: "NestJS", icon: siNestjs },
  { name: "Symfony", icon: siSymfony },
  { name: "Node.js", icon: siNodedotjs },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Docker", icon: siDocker },
  { name: "RabbitMQ", icon: siRabbitmq },
];

export function Skills() {
  return (
    <section id="competences" className="mx-auto max-w-[1240px] px-6 pb-10 pt-28 sm:px-8">
      <SectionLabel>Mon terrain de jeu</SectionLabel>
      <SectionTitle main="Les outils que j'utilise" soft="au quotidien" />

      {/* Une seule ligne : sur petit écran, elle défile horizontalement */}
      <div className="mt-11 overflow-x-auto pb-2">
        <ul className="flex min-w-[900px] gap-3">
          {tools.map(({ name, icon }) => (
            <li
              key={name}
              className="flex flex-1 flex-col items-center gap-2.5 rounded-[18px] bg-surface px-2.5 py-[18px]"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-8 w-8 ${icon.hex === "000000" ? "icon-on-dark-invert" : ""}`}
                fill={`#${icon.hex}`}
                aria-hidden="true"
              >
                <path d={icon.path} />
              </svg>
              <span className="text-base font-semibold">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
