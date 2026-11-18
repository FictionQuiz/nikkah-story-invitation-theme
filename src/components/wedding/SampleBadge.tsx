import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Marks placeholder content that should be replaced in the wedding configuration. */
export function SampleBadge({ children = "Sample", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-1.5 rounded-full border border-dashed border-current px-3 py-1 text-[0.55rem] opacity-70",
        className,
      )}
    >
      {children}
    </span>
  );
}
