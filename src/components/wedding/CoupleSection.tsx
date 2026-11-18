import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { Corner, Ornament } from "./Ornament";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type Person = typeof wedding.couple.bride;

function Portrait({ person, role, reverse }: { person: Person; role: string; reverse?: boolean }) {
  return (
    <div className={cn("grid items-center gap-10 md:grid-cols-2 md:gap-16", reverse && "md:[&>*:first-child]:order-2")}>
      <TiltCard className="mx-auto w-full max-w-sm">
        <div className="relative p-3">
          <div className="arch absolute inset-0 border border-gold-deep/60" />
          <div className="arch absolute inset-[6px] border border-gold-deep/30" />
          <motion.div
            className="arch relative overflow-hidden shadow-soft"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              src={person.image}
              alt={person.imageAlt}
              width={896}
              height={1152}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[2s] ease-out hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-night/40 to-transparent" />
          </motion.div>
          <Corner className="absolute -bottom-2 -left-2 h-14 w-14 -scale-y-100 text-gold-deep" />
          <Corner className="absolute -bottom-2 -right-2 h-14 w-14 -scale-100 text-gold-deep" />
        </div>
      </TiltCard>
      <Reveal className={cn("text-center md:text-left", reverse && "md:text-right")} delay={0.2}>
        <p className="eyebrow text-gold-deep">{role}</p>
        <h3 className="mt-3 font-script text-7xl leading-none text-emerald md:text-8xl">{person.name}</h3>
        <p className="mt-3 font-display text-2xl text-foreground">{person.fullName}</p>
        <p className="mt-1 font-display text-lg italic text-muted-foreground">{person.parents}</p>
        <Ornament className={cn("mx-auto my-6 text-gold-deep", reverse ? "md:ml-auto md:mr-0" : "md:ml-0")} />
        <p className="mx-auto max-w-md font-display text-xl leading-relaxed text-foreground/85 md:mx-0 md:inline-block">
          {person.bio}
        </p>
      </Reveal>
    </div>
  );
}

export function CoupleSection() {
  return (
    <section id="couple" className="theme-ivory grain section-pad relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Meet the couple" script="Two hearts, one story" title="The Bride & The Groom" tone="emerald" />
        <div className="space-y-24 md:space-y-32">
          <Portrait person={wedding.couple.bride} role="The Bride" />
          <Portrait person={wedding.couple.groom} role="The Groom" reverse />
        </div>
      </div>
    </section>
  );
}
