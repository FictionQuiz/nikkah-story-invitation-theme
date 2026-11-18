import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, ChevronDown, Mail } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { wedding, coupleNames } from "@/config/wedding";
import { scrollToSection } from "@/lib/scroll-to-section";
import { formatDate, formatDay } from "@/lib/wedding-format";
import { Ornament } from "./Ornament";
import { GoldDust, Petals } from "./Particles";
import { useInvitationActions } from "./useInvitationActions";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { downloadNikkah } = useInvitationActions();
  const { groom, bride } = wedding.couple;

  const show = (d: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(10px)" },
    transition: { duration: 1.4, delay: revealed ? 0.3 + d : 0, ease },
  });

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y: bgY }}>
        <motion.img
          src={wedding.heroImage}
          alt=""
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: revealed ? 1 : 1.15 }}
          transition={{ duration: 3.2, ease }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-night/70 via-emerald-night/45 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--emerald-night)_95%)]" />
      <GoldDust count={34} seed={5} />
      <Petals count={12} />

      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 px-5 pb-16 pt-28 text-center">
        <motion.p {...show(0)} className="font-arabic text-xl text-gold-light md:text-2xl" lang="ar" dir="rtl">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>
        <motion.p {...show(0.15)} className="eyebrow mt-6 text-gold">
          The Nikkah of
        </motion.p>
        <motion.div {...show(0.3)} className="mt-4 flex items-center justify-center gap-3 font-display leading-[0.85] md:gap-6">
          <span className="text-gold-foil text-[clamp(6rem,22vw,13rem)] font-light">{groom.initial}</span>
          <span className="font-script text-[clamp(3rem,10vw,6rem)] text-gold-light">&</span>
          <span className="text-gold-foil text-[clamp(6rem,22vw,13rem)] font-light">{bride.initial}</span>
        </motion.div>
        <motion.h1 {...show(0.45)} className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] font-light tracking-wide text-ivory">
          {coupleNames}
        </motion.h1>
        <motion.div {...show(0.55)}>
          <Ornament className="mx-auto mt-5" />
        </motion.div>
        <motion.p {...show(0.65)} className="eyebrow mt-5 text-[0.65rem] text-ivory/85 md:text-xs">
          {formatDay(wedding.nikkah.start)} · {formatDate(wedding.nikkah.start)} · {wedding.venue.city}
        </motion.p>
        <motion.div {...show(0.8)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="gold" size="xl" asChild>
            <a
              href="#rsvp"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("rsvp");
              }}
            >
              <Mail /> RSVP now
            </a>
          </Button>
          <Button variant="goldOutline" size="xl" onClick={downloadNikkah}>
            <CalendarPlus /> Save the date
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#announcement"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("announcement");
        }}
        aria-label="Scroll to the invitation"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:flex flex-col items-center gap-2 text-gold-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="eyebrow text-[0.55rem]">Scroll</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-gold/60 pt-2">
          <span className="animate-scroll-dot h-2 w-1 rounded-full bg-gold" />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
