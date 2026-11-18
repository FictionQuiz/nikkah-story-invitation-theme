import { cn } from "@/lib/utils";

/** Gold filigree divider used between headings and sections. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={cn("h-5 w-48 text-gold", className)} aria-hidden="true" fill="none">
      <path d="M0 12 H92" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path d="M148 12 H240" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path d="M92 12 C100 4, 108 4, 112 12 C108 20, 100 20, 92 12Z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M148 12 C140 4, 132 4, 128 12 C132 20, 140 20, 148 12Z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M120 3 L127 12 L120 21 L113 12Z" fill="currentColor" />
      <circle cx="84" cy="12" r="1.6" fill="currentColor" />
      <circle cx="156" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Corner flourish for framed cards. */
export function Corner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={cn("h-12 w-12 text-gold", className)} aria-hidden="true" fill="none">
      <path d="M2 58 V18 C2 9 9 2 18 2 H58" stroke="currentColor" strokeWidth="1" />
      <path d="M8 58 V22 C8 14 14 8 22 8 H58" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <path d="M14 14 C20 20 26 18 30 12 C24 12 18 8 14 14Z" fill="currentColor" opacity="0.85" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

/** Eight-point star — classic Islamic geometric motif. */
export function Star8({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-6 w-6 text-gold", className)} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 0 L24.6 8.9 L34.1 5.9 L31.1 15.4 L40 20 L31.1 24.6 L34.1 34.1 L24.6 31.1 L20 40 L15.4 31.1 L5.9 34.1 L8.9 24.6 L0 20 L8.9 15.4 L5.9 5.9 L15.4 8.9Z"
      />
    </svg>
  );
}
