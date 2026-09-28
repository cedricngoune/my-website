import { site } from "@/src/content/site";

/**
 * Petit bonhomme qui tient un document « Voir mon CV ».
 * Il flotte doucement et cligne des yeux ; au survol, il lève le document
 * vers le visiteur et rougit un peu. Animations dans globals.css (.cv-buddy).
 */
export function CvBuddy() {
  if (!site.cv) return null;

  return (
    <a
      href={site.cv}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Voir mon CV (PDF, nouvel onglet)"
      title="Voir mon CV"
      className="cv-buddy block w-[7.5rem] text-foreground-muted"
    >
      <svg
        viewBox="0 0 120 112"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-auto w-full overflow-visible"
      >
        <g className="character">
          {/* Jambes */}
          <g stroke="currentColor" strokeWidth="2.2">
            <path d="M31 80v20h-5" />
            <path d="M41 80v20h5" />
          </g>

          {/* Corps */}
          <rect
            x="24"
            y="46"
            width="24"
            height="36"
            rx="7"
            fill="var(--accent-soft)"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Tête */}
          <circle
            cx="36"
            cy="28"
            r="13"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Mèche */}
          <path
            d="M29 17q4-5 9-2q3-4 7 0"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Yeux */}
          <g className="eyes" fill="currentColor">
            <circle cx="31.5" cy="27" r="1.6" />
            <circle cx="40.5" cy="27" r="1.6" />
          </g>
          {/* Joues (au survol) */}
          <g className="cheeks" fill="#f59eb6">
            <circle cx="28.5" cy="32" r="2" />
            <circle cx="43.5" cy="32" r="2" />
          </g>
          {/* Sourire */}
          <path d="M32 32.5q4 3.5 8 0" stroke="currentColor" strokeWidth="1.8" />

          {/* Bras gauche (le long du corps) */}
          <path d="M25 52q-7 10-4 19" stroke="currentColor" strokeWidth="2.2" />

          {/* Bras droit + document, qui se lèvent ensemble au survol */}
          <g className="arm-doc">
            <path d="M47 52q8 4 13 2" stroke="currentColor" strokeWidth="2.2" />

            <g transform="rotate(6 86 48)">
              <rect
                x="60"
                y="20"
                width="52"
                height="62"
                rx="3"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="1.8"
              />
              {/* Coin corné */}
              <path d="M102 20v9h10" stroke="var(--accent)" strokeWidth="1.5" />

              <text
                x="68"
                y="38"
                fill="var(--accent)"
                fontFamily="var(--font-mono), monospace"
                fontSize="9"
                fontWeight="700"
              >
                Voir
              </text>
              <text
                x="68"
                y="50"
                fill="var(--accent)"
                fontFamily="var(--font-mono), monospace"
                fontSize="9"
                fontWeight="700"
              >
                mon CV
              </text>

              {/* Lignes de texte factices */}
              <g stroke="var(--border-strong)" strokeWidth="2">
                <path d="M68 60h36" />
                <path d="M68 66h30" />
                <path d="M68 72h34" />
              </g>
            </g>

            {/* Main qui tient la feuille */}
            <circle
              cx="61"
              cy="54"
              r="3"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </g>
        </g>
      </svg>
    </a>
  );
}
