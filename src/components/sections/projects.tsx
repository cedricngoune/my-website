import { ProjectSelect, type ProjectCard } from "@/src/components/project-card";
import { SectionTitle } from "@/src/components/sections/section-title";
import {
  stackAbbreviation,
  stackIcons,
} from "@/src/components/skills/stack-icons";
import { site } from "@/src/content/site";

export function Projects() {
  const projects: ProjectCard[] = site.projects.map((project) => ({
    id: project.id,
    client: project.client,
    initials: project.initials,
    period: project.period,
    current: project.period.toLowerCase().startsWith("depuis"),
    role: project.role.includes(project.name)
      ? project.role
      : `${project.role} · ${project.name}`,
    summary: project.summary,
    highlights: project.highlights,
    stack: project.stack.map((name) => ({
      name,
      iconPath: stackIcons[name]?.path,
      shortname: stackAbbreviation(name),
    })),
  }));

  return (
    <section
      id="realisations"
      className="overflow-x-clip px-6 py-24 sm:px-10 xl:pl-56"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="J'ai travaillé pour eux" intro="" />

        <div className="mt-12" data-reveal>
          <ProjectSelect projects={projects} />
        </div>
      </div>
    </section>
  );
}
