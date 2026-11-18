import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";

/** Soft ambient pad + random pentatonic chimes, used when no music file is configured. */
function createAmbient() {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(master);

  const oscs = [146.83, 220, 277.18, 329.63].map((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = (i - 1.5) * 4;
    g.gain.value = 0.18;
    o.connect(g).connect(filter);
    o.start();
    return o;
  });

  const notes = [587.33, 659.25, 739.99, 880, 987.77, 1174.66];
  const chime = () => {
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = notes[Math.floor(Math.random() * notes.length)] ?? 880;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 3.1);
  };
  const timer = window.setInterval(() => Math.random() > 0.25 && chime(), 1400);
  master.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 2.5);

  return {
    stop() {
      window.clearInterval(timer);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      window.setTimeout(() => {
        oscs.forEach((o) => o.stop());
        void ctx.close();
      }, 900);
    },
  };
}

export function MusicController({ visible }: { visible: boolean }) {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);

  const stopAll = useCallback(() => {
    audioRef.current?.pause();
    ambientRef.current?.stop();
    ambientRef.current = null;
  }, []);

  useEffect(() => stopAll, [stopAll]);

  const startAmbient = () => {
    try {
      ambientRef.current = createAmbient();
      return true;
    } catch {
      return false;
    }
  };

  const toggle = async () => {
    if (on) {
      stopAll();
      setOn(false);
      return;
    }
    const src = wedding.music.src;
    if (src) {
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio(src);
          audioRef.current.loop = true;
          audioRef.current.volume = 0.5;
        }
        await audioRef.current.play();
        setOn(true);
        return;
      } catch {
        toast.info("Music file unavailable", { description: "Playing the built-in ambient melody instead." });
      }
    }
    if (startAmbient()) setOn(true);
    else toast.error("Audio isn't supported on this device");
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn background music off" : "Turn background music on"}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className={cn(
        "glass fixed bottom-5 left-5 z-40 flex h-12 items-center gap-3 rounded-full pl-2 pr-5 shadow-card transition-colors hover:border-gold md:bottom-8 md:left-8",
      )}
    >
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", on ? "bg-gold-foil text-emerald-night" : "border border-gold/50 text-gold")}>
        {on ? <Music2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </span>
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-0.5 rounded-full bg-gold"
            animate={{ height: on ? [4, 14, 6, 12, 4] : 4 }}
            transition={{ duration: 1.2, repeat: on ? Infinity : 0, delay: i * 0.15 }}
          />
        ))}
      </span>
      <span className="eyebrow text-[0.58rem] text-gold-light">Music {on ? "On" : "Off"}</span>
    </motion.button>
  );
}
