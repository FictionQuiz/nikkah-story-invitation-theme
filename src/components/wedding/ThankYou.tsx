import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding, coupleNames } from "@/config/wedding";
import { Ornament } from "./Ornament";
import { GoldDust, Petals } from "./Particles";
import { Reveal, RevealWords } from "./Reveal";
import { ShareActions } from "./ShareActions";

export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

export function ThankYou() {
  const { groom, bride } = wedding.couple;
  return (
    <section id="thank-you" className="bg-night relative overflow-hidden text-center">
      <img src={wedding.heroImage} alt="" width={1920} height={1088} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-night/80 to-emerald-night" />
      <GoldDust count={40} seed={77} />
      <Petals count={10} seed={19} />
      <div className="section-pad relative mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow text-gold">With gratitude</p>
          <div className="mt-6 flex items-center justify-center gap-4 font-display leading-none">
            <span className="text-gold-foil text-[clamp(5rem,16vw,9rem)] font-light">{groom.initial}</span>
            <span className="font-script text-6xl text-gold-light">&</span>
            <span className="text-gold-foil text-[clamp(5rem,16vw,9rem)] font-light">{bride.initial}</span>
          </div>
          <p className="mt-2 font-script text-5xl text-ivory md:text-6xl">Thank you</p>
        </Reveal>
        <RevealWords text={wedding.thankYou} className="mx-auto mt-8 max-w-2xl font-display text-2xl italic leading-relaxed text-ivory/85" delay={0.2} />
        <Reveal delay={0.3}>
          <Ornament className="mx-auto mt-10" />
          <ShareActions className="mt-10" />
          <Button variant="glass" size="xl" className="mt-6 rounded-full" onClick={scrollToTop}>
            <ArrowUp /> Back to top
          </Button>
        </Reveal>
      </div>
      <footer className="relative border-t border-gold/15 px-5 py-8">
        <p className="eyebrow text-[0.6rem] text-gold">{wedding.brand.name}</p>
        <p className="mt-2 font-script text-2xl text-gold-light">{wedding.brand.tagline}</p>
        <p className="mt-3 text-xs text-ivory/50">
          The Nikkah of {coupleNames}
          {wedding.isSample && " · Sample invitation details, to be replaced"}
        </p>
      </footer>
    </section>
  );
}
