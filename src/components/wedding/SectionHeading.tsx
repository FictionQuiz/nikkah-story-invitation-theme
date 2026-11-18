import { cn } from "@/lib/utils";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  script?: string;
  className?: string;
  tone?: "gold" | "emerald";
}

export function SectionHeading({ eyebrow, title, script, className, tone = "gold" }: Props) {
  return (
    <Reveal className={cn("mx-auto mb-14 max-w-2xl text-center md:mb-20", className)}>
      <p className={cn("eyebrow", tone === "gold" ? "text-gold" : "text-gold-deep")}>{eyebrow}</p>
      {script && (
        <p className={cn("mt-4 font-script text-4xl md:text-5xl", tone === "gold" ? "text-gold-light" : "text-burgundy")}>
          {script}
        </p>
      )}
      <h2 className="mt-2 font-display text-4xl font-light leading-tight text-foreground md:text-6xl">{title}</h2>
      <Ornament className={cn("mx-auto mt-6", tone === "emerald" && "text-gold-deep")} />
    </Reveal>
  );
}
