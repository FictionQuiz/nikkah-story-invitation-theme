import { wedding } from "@/config/wedding";
import { Ornament, Star8 } from "./Ornament";
import { GoldDust } from "./Particles";
import { Reveal, RevealWords } from "./Reveal";

export function AnnouncementSection() {
  return (
    <section id="announcement" className="section-pad bg-night relative overflow-hidden text-center">
      <div className="bg-burgundy-glow absolute inset-0 opacity-60" />
      <GoldDust count={18} seed={31} />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <Star8 className="mx-auto h-8 w-8" />
          <p className="eyebrow mt-6 text-gold">A sacred announcement</p>
        </Reveal>
        <RevealWords
          text={wedding.announcement}
          className="mt-8 font-display text-[clamp(1.9rem,4.6vw,3.6rem)] font-light italic leading-[1.25] text-ivory"
          delay={0.2}
        />
        <Reveal delay={0.4}>
          <Ornament className="mx-auto mt-12" />
          <p className="mt-10 font-arabic text-2xl leading-loose text-gold-light md:text-3xl" lang="ar" dir="rtl">
            {wedding.verse.arabic}
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-display text-lg italic text-muted-foreground md:text-xl">
            {wedding.verse.translation}
          </p>
          <p className="eyebrow mt-4 text-[0.6rem] text-gold/80">{wedding.verse.reference}</p>
        </Reveal>
      </div>
    </section>
  );
}
