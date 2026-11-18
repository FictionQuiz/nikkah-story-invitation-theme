import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { getCountdown, type CountdownParts } from "@/lib/countdown";
import { formatDate } from "@/lib/wedding-format";
import { Ornament } from "./Ornament";
import { GoldDust } from "./Particles";
import { Reveal } from "./Reveal";

const target = new Date(wedding.nikkah.start).getTime();

function Unit({ value, label }: { value: number | null; label: string }) {
  const display = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="glass relative flex flex-col items-center justify-center px-2 py-6 md:py-9">
      <div className="relative h-[clamp(3rem,9vw,5.5rem)] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "-60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "60%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-foil block font-display text-[clamp(3rem,9vw,5.5rem)] font-light leading-none tabular-nums"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow mt-3 text-[0.58rem] text-ivory/80">{label}</span>
    </div>
  );
}

export function Countdown() {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => setParts(getCountdown(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="section-pad bg-night relative overflow-hidden text-center">
      <div className="bg-burgundy-glow absolute inset-0" />
      <GoldDust count={20} seed={44} />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow text-gold">Counting every moment</p>
          <p className="mt-4 font-script text-5xl text-gold-light md:text-6xl">Until we say Qubool Hai</p>
          <Ornament className="mx-auto mt-6" />
        </Reveal>
        {parts?.done ? (
          <Reveal className="glass mx-auto mt-12 max-w-xl px-8 py-12">
            <Heart className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
            <p className="mt-4 font-display text-4xl text-ivory">Alhamdulillah — the Nikkah has taken place</p>
            <p className="mt-3 font-display text-lg italic text-muted-foreground">
              Thank you for your love and du'as on {formatDate(wedding.nikkah.start)}.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-5" role="timer" aria-live="off" aria-label="Time remaining until the Nikkah">
              <Unit value={parts?.days ?? null} label="Days" />
              <Unit value={parts?.hours ?? null} label="Hours" />
              <Unit value={parts?.minutes ?? null} label="Minutes" />
              <Unit value={parts?.seconds ?? null} label="Seconds" />
            </div>
            <p className="eyebrow mt-8 text-[0.6rem] text-ivory/70">until {formatDate(wedding.nikkah.start)}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
