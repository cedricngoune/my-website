import { site } from "@portfolio/content";
import { MissionsAccordion, type Mission } from "@/src/components/missions-accordion";
import { SectionLabel, SectionTitle } from "@/src/components/section-label";

/**
 * Les données sont préparées ici (côté serveur) : le composant client ne reçoit
 * que ce qu'il affiche, sans importer le contenu partagé (qui utilise node:crypto).
 */
export function Missions() {
  const missions: Mission[] = site.projects.map((project) => ({
    client: project.client,
    initials: project.initials,
    period: project.period,
    // « Développeur full-stack · Consultant », sans doubler « CDI » déjà présent dans le rôle
    role: project.role.includes(project.name) ? project.role : `${project.role} · ${project.name}`,
    summary: project.summary,
    highlights: project.highlights,
    stack: project.stack,
  }));

  return (
    <section id="realisations" className="mx-auto max-w-[1240px] px-6 pb-10 pt-28 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Réalisations</SectionLabel>
          <SectionTitle main="Des missions menées" soft="de bout en bout" />
        </div>
        <a
          href={site.cv}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 rounded-full bg-button px-9 py-5 text-xl font-bold text-button-foreground transition-opacity hover:opacity-85"
        >
          Mon CV <span aria-hidden="true">↗</span>
        </a>
      </div>
      <MissionsAccordion missions={missions} />
    </section>
  );
}
