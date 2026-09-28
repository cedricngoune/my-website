import {
  LANYARD_CENTER_X,
  RIBBON_WIDTH_UNITS,
} from "@/src/components/lanyard-config";

const ARM_TOP = 144.74; // haut du bras bas du C
const ARM_BOTTOM = 187.14; // bas du bras (= bas du logo)
const FOLD_HEIGHT = 5.5; // repli visible au-dessus du bras

export function LanyardLoop() {
  const left = LANYARD_CENTER_X - RIBBON_WIDTH_UNITS / 2;
  const right = LANYARD_CENTER_X + RIBBON_WIDTH_UNITS / 2;
  const top = ARM_TOP - 3;
  const radius = 4;

  const bottom = ARM_BOTTOM;
  const band = `M${left} ${bottom} V${top + radius} Q${left} ${top} ${left + radius} ${top} H${right - radius} Q${right} ${top} ${right} ${top + radius} V${bottom} Z`;
  const fold = `M${left} ${top + FOLD_HEIGHT} V${top + radius} Q${left} ${top} ${left + radius} ${top} H${right - radius} Q${right} ${top} ${right} ${top + radius} V${top + FOLD_HEIGHT} Z`;

  return (
    <svg
      viewBox="0 0 750.74 187.14"
      className="lanyard-loop pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      {/* Légère ombre du ruban sur le bras */}
      <rect
        x={left - 2}
        y={ARM_TOP}
        width={RIBBON_WIDTH_UNITS + 4}
        height={ARM_BOTTOM - ARM_TOP}
        fill="#000"
        opacity="0.14"
      />
      <path d={band} className="lanyard-loop-band" />
      <path d={fold} className="lanyard-loop-fold" />
      {/* Liserés sur les bords, comme la couture d'un vrai cordon */}
      <path
        d={`M${left + 0.9} ${top + FOLD_HEIGHT} V${bottom} M${right - 0.9} ${top + FOLD_HEIGHT} V${bottom}`}
        className="lanyard-loop-edge"
        strokeWidth="1.2"
      />
    </svg>
  );
}
