import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Layered SVG lantern: metal frame with cylindrical shading, glowing glass,
 * mehrab filigree, flickering flame, specular highlight and tassel.
 */
export function Lantern({ className }: { className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (s: string) => `${s}${raw}`;
  const metal = `url(#${id("metal")})`;

  const ribs = [-40, -21, 0, 21, 40];
  const ribPath = (o: number) => {
    const bulge = o * 0.22;
    const x = 100 + o;
    return `M${x} 90 C${x + bulge} 135 ${x + bulge} 185 ${x} 228`;
  };

  return (
    <svg viewBox="0 0 200 320" className={cn("overflow-visible", className)} aria-hidden="true">
      <defs>
        <linearGradient id={id("metal")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style={{ stopColor: "var(--gold-deep)" }} />
          <stop offset="0.3" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "oklch(0.4 0.08 60)" }} />
        </linearGradient>
        <radialGradient id={id("glass")} cx="0.5" cy="0.55" r="0.65">
          <stop offset="0" style={{ stopColor: "oklch(0.99 0.04 95)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="0.75" style={{ stopColor: "oklch(0.72 0.14 65)" }} />
          <stop offset="1" style={{ stopColor: "oklch(0.45 0.12 50)" }} />
        </radialGradient>
        <radialGradient id={id("flame")} cx="0.5" cy="0.6" r="0.5">
          <stop offset="0" style={{ stopColor: "oklch(1 0 0)" }} />
          <stop offset="0.4" style={{ stopColor: "oklch(0.95 0.1 95)" }} />
          <stop offset="1" style={{ stopColor: "oklch(0.8 0.16 60)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id("shade")} x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "oklch(1 0 0)", stopOpacity: 0.35 }} />
          <stop offset="0.25" style={{ stopColor: "oklch(1 0 0)", stopOpacity: 0 }} />
          <stop offset="0.7" style={{ stopColor: "oklch(0.2 0.05 50)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "oklch(0.2 0.05 50)", stopOpacity: 0.55 }} />
        </linearGradient>
        <clipPath id={id("body")}>
          <path d="M58 88 L142 88 C153 132 153 186 142 230 L58 230 C47 186 47 132 58 88Z" />
        </clipPath>
      </defs>

      {/* hanging ring + finial */}
      <circle cx="100" cy="12" r="8" fill="none" stroke={metal} strokeWidth="3" />
      <path d="M100 20 C94 26 94 32 100 38 C106 32 106 26 100 20Z" fill={metal} />

      {/* dome */}
      <path d="M62 80 C66 56 84 40 100 36 C116 40 134 56 138 80Z" fill={metal} />
      <path d="M70 78 C76 60 88 48 100 44 C112 48 124 60 130 78" fill="none" stroke="oklch(0.35 0.07 55)" strokeWidth="0.8" opacity="0.6" />
      {[76, 88, 100, 112, 124].map((x) => (
        <circle key={x} cx={x} cy={70} r="2.2" fill="oklch(0.98 0.06 95)" opacity="0.85" />
      ))}
      <rect x="54" y="78" width="92" height="11" rx="2" fill={metal} />

      {/* glowing glass body */}
      <g clipPath={`url(#${id("body")})`}>
        <rect x="40" y="86" width="120" height="148" fill={`url(#${id("glass")})`} />
        {/* mehrab filigree panels */}
        {[-30, -10, 10, 30].map((o) => (
          <path
            key={o}
            d={`M${100 + o - 8} 222 V140 C${100 + o - 8} 122 ${100 + o} 112 ${100 + o} 104 C${100 + o} 112 ${100 + o + 8} 122 ${100 + o + 8} 140 V222`}
            fill="none"
            stroke="oklch(0.5 0.1 55)"
            strokeWidth="1.2"
            opacity="0.55"
          />
        ))}
        {[120, 150, 180, 205].map((y) =>
          [-30, -10, 10, 30].map((o) => (
            <path
              key={`${y}${o}`}
              d={`M${100 + o} ${y - 4} L${100 + o + 3} ${y} L${100 + o} ${y + 4} L${100 + o - 3} ${y}Z`}
              fill="oklch(0.55 0.1 55)"
              opacity="0.45"
            />
          )),
        )}
        {/* candle + flame */}
        <rect x="93" y="182" width="14" height="34" rx="2" fill="oklch(0.97 0.02 90)" opacity="0.9" />
        <g className="animate-flicker">
          <ellipse cx="100" cy="168" rx="26" ry="34" fill={`url(#${id("flame")})`} />
          <path d="M100 150 C107 162 108 172 100 180 C92 172 93 162 100 150Z" fill="oklch(0.99 0.05 95)" />
        </g>
        <rect x="40" y="86" width="120" height="148" fill={`url(#${id("shade")})`} />
      </g>

      {/* frame ribs */}
      {ribs.map((o) => (
        <path key={o} d={ribPath(o)} fill="none" stroke={metal} strokeWidth={o === 0 ? 2.6 : 2.2} />
      ))}
      <path d="M58 88 C47 132 47 186 58 230" fill="none" stroke={metal} strokeWidth="3.4" />
      <path d="M142 88 C153 132 153 186 142 230" fill="none" stroke={metal} strokeWidth="3.4" />
      <rect x="52" y="155" width="96" height="5" rx="2" fill={metal} opacity="0.9" />

      {/* base */}
      <rect x="54" y="228" width="92" height="10" rx="2" fill={metal} />
      <path d="M60 238 C66 252 84 262 100 264 C116 262 134 252 140 238Z" fill={metal} />
      {[72, 86, 100, 114, 128].map((x) => (
        <circle key={x} cx={x} cy={245} r="1.8" fill="oklch(0.98 0.06 95)" opacity="0.75" />
      ))}
      <path d="M100 264 C95 270 95 276 100 282 C105 276 105 270 100 264Z" fill={metal} />

      {/* tassel */}
      <g opacity="0.9">
        {[-6, -3, 0, 3, 6].map((o) => (
          <path key={o} d={`M100 282 C${100 + o * 0.6} 296 ${100 + o} 304 ${100 + o * 1.2} 316`} stroke="var(--gold)" strokeWidth="1.1" fill="none" />
        ))}
        <circle cx="100" cy="284" r="3.5" fill="var(--burgundy-light)" />
      </g>
    </svg>
  );
}
