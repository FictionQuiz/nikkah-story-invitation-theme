import { useMemo } from "react";
import { cn } from "@/lib/utils";

/** Deterministic pseudo-random generator so server and client render identical particles. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function GoldDust({ count = 36, seed = 7, className }: { count?: number; seed?: number; className?: string }) {
  const dots = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      i,
      left: r() * 100,
      top: r() * 100,
      size: 1 + r() * 3.2,
      dur: 10 + r() * 16,
      delay: -r() * 24,
      x: (r() - 0.5) * 120,
      o: 0.35 + r() * 0.6,
    }));
  }, [count, seed]);
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.i}
          className="animate-dust absolute rounded-full bg-gold-light"
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              boxShadow: `0 0 ${d.size * 4}px var(--gold)`,
              animationDelay: `${d.delay}s`,
              "--dust-dur": `${d.dur}s`,
              "--dust-x": `${d.x}px`,
              "--dust-o": d.o,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Stars({ count = 90, seed = 3, className }: { count?: number; seed?: number; className?: string }) {
  const stars = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      i,
      left: r() * 100,
      top: r() * 100,
      size: 0.6 + r() * 1.8,
      dur: 2 + r() * 4,
      delay: -r() * 6,
    }));
  }, [count, seed]);
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.i}
          className="animate-twinkle absolute rounded-full bg-ivory"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              "--tw-dur": `${s.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

const PETAL_TONES = ["var(--blush)", "var(--ivory)", "var(--burgundy-light)", "var(--gold-light)"];

export function Petals({ count = 14, seed = 11, className }: { count?: number; seed?: number; className?: string }) {
  const petals = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      i,
      left: r() * 100,
      size: 10 + r() * 14,
      dur: 14 + r() * 14,
      delay: -r() * 28,
      x: 40 + r() * 120,
      tone: PETAL_TONES[Math.floor(r() * PETAL_TONES.length)],
    }));
  }, [count, seed]);
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.i}
          viewBox="0 0 20 24"
          className="animate-petal absolute -top-8"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.2,
              animationDelay: `${p.delay}s`,
              "--petal-dur": `${p.dur}s`,
              "--petal-x": `${p.x}px`,
            } as React.CSSProperties
          }
        >
          <path d="M10 0 C18 6 20 16 10 24 C0 16 2 6 10 0Z" fill={p.tone} opacity="0.8" />
          <path d="M10 3 C11 10 11 16 10 21" stroke="var(--gold-deep)" strokeWidth="0.4" fill="none" opacity="0.5" />
        </svg>
      ))}
    </div>
  );
}
