import { Label, SectionTitle } from "@/src/components/sections/section-title";
import { SkillsNetwork } from "@/src/components/skills/skills-network";
import { stackIcons } from "@/src/components/skills/stack-icons";
import { site } from "@/src/content/site";

export function Skills() {
  const stacks = site.stacks
    .map((stack) => ({
      name: stack.name,
      iconPath: stackIcons[stack.name]?.path,
    }))
    .filter((stack): stack is { name: string; iconPath: string } =>
      Boolean(stack.iconPath),
    );

  return (
    <section
      id="skills"
      className="bg-background-2 px-6 py-24 sm:px-10 xl:pl-56"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle number="02" title="Ma boite à outils" />

        <div className="mt-12" data-reveal>
          <div className="mt-8">
            <SkillsNetwork stacks={stacks} />
          </div>
        </div>
      </div>
    </section>
  );
}
