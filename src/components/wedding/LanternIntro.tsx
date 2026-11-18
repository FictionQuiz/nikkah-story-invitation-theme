import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { InvitationCard } from "./InvitationCard";
import { Lantern } from "./Lantern";
import { GoldDust, Stars } from "./Particles";

type Stage = "fly" | "transform" | "card" | "open";

const FLY_MS = 5200;
const CARD_MS = FLY_MS + 1900;
const OPEN_MS = CARD_MS + 900;

const DISTANT = [
  { left: "14%", top: "70%", size: 10, dur: 22, delay: 0 },
  { left: "78%", top: "64%", size: 7, dur: 26, delay: 1.5 },
  { left: "86%", top: "82%", size: 12, dur: 20, delay: 0.6 },
  { left: "30%", top: "88%", size: 6, dur: 28, delay: 2.2 },
  { left: "62%", top: "92%", size: 8, dur: 24, delay: 0.3 },
];

export function LanternIntro({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("fly");

  useEffect(() => {
    if (reduce) {
      setStage("open");
      return;
    }
    const t1 = setTimeout(() => setStage("transform"), FLY_MS);
    const t2 = setTimeout(() => setStage((s) => (s === "transform" ? "card" : s)), CARD_MS);
    const t3 = setTimeout(() => setStage((s) => (s === "open" ? s : "open")), OPEN_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduce]);

  const flying = stage === "fly";
  const cardVisible = stage !== "fly";

  return (
    <motion.div
      className="bg-night fixed inset-0 z-[100] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${wedding.brand.name} invitation intro`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* camera: the whole sky zooms toward the lantern */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: flying ? 1.55 : 1.7 }}
        transition={{ duration: flying ? FLY_MS / 1000 : 2, ease: [0.45, 0, 0.25, 1] }}
      >
        <Stars count={110} />
        {DISTANT.map((d, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold-light"
            style={{ left: d.left, top: d.top, width: d.size, height: d.size * 1.3, boxShadow: `0 0 ${d.size * 3}px var(--gold)` }}
            animate={{ y: [0, -260], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald/40 to-transparent" />
      </motion.div>

      {/* atmospheric fog layers */}
      <div className="animate-fog pointer-events-none absolute -inset-x-1/4 bottom-[-10%] h-1/2 rounded-[50%] bg-emerald-light/15 blur-3xl" />
      <motion.div
        className="pointer-events-none absolute -inset-1/4 rounded-[50%] bg-ivory/5 blur-3xl"
        animate={{ scale: flying ? [1, 2.4] : 2.4, opacity: flying ? [0.6, 0] : 0 }}
        transition={{ duration: FLY_MS / 1000, ease: "easeIn" }}
      />
      <GoldDust count={40} seed={21} />

      {/* the flying lantern */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ x: "-22vw", y: "34vh", scale: 0.12, opacity: 0, rotate: -6 }}
          animate={
            flying
              ? {
                  x: ["-22vw", "12vw", "-6vw", "0vw"],
                  y: ["34vh", "12vh", "-2vh", "0vh"],
                  scale: [0.12, 0.32, 0.62, 1.05],
                  opacity: [0, 1, 1, 1],
                  rotate: [-6, 5, -3, 0],
                }
              : { x: "0vw", y: "0vh", scale: 2.6, opacity: 0, rotate: 0 }
          }
          transition={
            flying
              ? { duration: FLY_MS / 1000, times: [0, 0.38, 0.72, 1], ease: "easeInOut" }
              : { duration: 1.1, ease: [0.55, 0, 0.45, 1] }
          }
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.85 0.13 80 / 55%), oklch(0.8 0.105 83 / 12%) 45%, transparent 70%)" }}
            animate={{ opacity: flying ? [0.4, 0.7, 1] : 1, scale: flying ? [0.8, 1, 1.25] : 2 }}
            transition={{ duration: flying ? FLY_MS / 1000 : 1, ease: "easeIn" }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 28px oklch(0.85 0.13 80 / 70%))" }}
          >
            <Lantern className="relative h-[min(46vh,22rem)] w-auto" />
          </motion.div>
        </motion.div>
      </div>

      {/* golden flash as the lantern transforms */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.95 0.08 90 / 90%), oklch(0.8 0.105 83 / 40%) 35%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "transform" ? [0, 1, 0] : 0 }}
        transition={{ duration: 1.6, times: [0, 0.35, 1] }}
      />

      {/* the invitation card */}
      {cardVisible && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1600 }}>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.12, rotateY: -75, rotateX: 25, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.7, delay: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="preserve-3d"
          >
            <InvitationCard open={stage === "open"} onOpen={() => setStage("open")} onEnter={onEnter} />
          </motion.div>
        </div>
      )}

      {/* brand line */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: flying ? 1 : 0, y: flying ? 0 : -10 }}
        transition={{ duration: 1.2, delay: flying ? 0.8 : 0 }}
      >
        <p className="eyebrow text-gold">{wedding.brand.name} presents</p>
        <p className="mt-2 font-script text-2xl text-gold-light/90">{wedding.brand.tagline}</p>
      </motion.div>

      <button
        type="button"
        onClick={onEnter}
        className="eyebrow glass absolute right-4 top-4 z-20 rounded-full px-4 py-2.5 text-[0.6rem] text-gold-light transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold md:right-8 md:top-8"
      >
        Skip intro
      </button>
    </motion.div>
  );
}
