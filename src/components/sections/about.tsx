import { Badge } from "@/src/components/badge";
import { site } from "@/src/content/site";

export function About() {
  const timeline = [
    ...[...site.schools].reverse().map((school) => ({
      ...school,
      year: school.year.slice(0, 4),
      current: false,
    })),
  ];

  return (
    <section id="about" className="about-section px-6 py-24 sm:px-10 xl:pl-56">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-start gap-14 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <div className="lg:pt-[4.6rem]">
            <Badge
              name={site.fullname}
              photo={site.photo}
              company={site.currentJob.school}
              location={site.location}
              languages={site.languages}
              certifications={site.certifications}
            />
          </div>

          <div className="lg:pt-16">
            <p
              className="font-avenir text-xl font-light leading-tight text-foreground sm:text-4xl lg:text-[2.6rem]"
              data-reveal
            >
              {site.tagline.map((segment) => (
                <span
                  key={segment.text}
                  className={
                    "accent" in segment && segment.accent
                      ? "text-accent"
                      : undefined
                  }
                >
                  {segment.text}
                </span>
              ))}
            </p>

            <p
              className="mt-6 max-w-xl leading-relaxed text-foreground-muted"
              data-reveal
              style={{ ["--delay" as string]: "120ms" }}
            >
              {site.about[0]}
            </p>

            {/* Frise du parcours */}
            <ol
              className="timeline mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-y-0"
              data-reveal
            >
              {timeline.map((step, index) => (
                <li
                  key={step.description}
                  className="timeline-step relative sm:pt-7"
                  style={{ ["--i" as string]: index }}
                >
                  <span
                    className="timeline-dot"
                    data-current={step.current}
                    aria-hidden="true"
                  />
                  <p className="font-mono text-xs text-accent">{step.year}</p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">
                    {step.description}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground-subtle">
                    {step.school}
                  </p>
                </li>
              ))}
              <li className="timeline-next">à suivre</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
