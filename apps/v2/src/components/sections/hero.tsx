import Image from "next/image";
import { site } from "@portfolio/content";
import { TypedSubtitle } from "@/src/components/typed-subtitle";

export function Hero() {
  return (
    <section
      id="accueil"
      className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-6 pb-22 pt-16 sm:px-8 sm:pt-18"
    >
      <div className="min-w-0 flex-[3_1_520px]">
        <p className="flex items-center gap-3 text-[26px] font-medium">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-foreground" />
          Bonjour !
        </p>
        <h1 className="mt-4 text-[clamp(48px,6.6vw,92px)] font-bold leading-[1.02] tracking-[-0.03em]">
          Je suis {site.fullname}
        </h1>
        <TypedSubtitle />
        <div className="mt-10 flex flex-wrap gap-3.5">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-button px-10 py-5 text-xl font-bold text-button-foreground transition-opacity hover:opacity-85"
          >
            Me contacter <span aria-hidden="true">↗</span>
          </a>
          <a
            href={site.cv}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-surface px-8 py-5 text-xl font-semibold transition-opacity hover:opacity-85"
          >
            Mon CV
          </a>
        </div>
      </div>

      <div className="flex min-w-0 flex-[2_1_340px] justify-center">
        <div className="relative aspect-[4/5] w-[400px] max-w-[82%] sm:max-w-full">
          <span aria-hidden="true" className="absolute -inset-3 rounded-full border-[1.5px] border-frame" />
          <Image
            src={site.photo}
            alt={`Portrait de ${site.fullname}`}
            fill
            priority
            sizes="(max-width: 640px) 80vw, 400px"
            className="rounded-full object-cover"
          />
          {/* Badge circulaire qui tourne */}
          <div
            aria-hidden="true"
            className="badge-spin absolute -left-10 top-2 h-[150px] w-[150px] rounded-full bg-[radial-gradient(circle_at_70%_70%,#111111,#8a8580_55%,#e8e4de)] max-sm:h-[110px] max-sm:w-[110px]"
          >
            <svg viewBox="0 0 150 150" className="h-full w-full">
              <defs>
                <path id="badge-circle" d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
              </defs>
              <text fontSize="13" fontWeight="600" letterSpacing="3.2" fill="#ffffff">
                <textPath href="#badge-circle">FULLSTACK ✦ API ✦ INTERFACES ✦ PORTFOLIO ✦</textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
