import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding, coupleInitials, coupleNames } from "@/config/wedding";
import { formatDate, formatDay, formatTime } from "@/lib/wedding-format";
import { Corner, Ornament, Star8 } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

function DoorFace({ side }: { side: "left" | "right" }) {
  return (
    <div className="backface-hidden absolute inset-0 overflow-hidden bg-emerald-deep shadow-card">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, var(--gold) 1px, transparent 1.5px), radial-gradient(circle at 0 0, var(--gold) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className={`absolute inset-3 border border-gold/60 ${side === "left" ? "border-r-0" : "border-l-0"}`} />
      <div className={`absolute inset-5 border border-gold/30 ${side === "left" ? "border-r-0" : "border-l-0"}`} />
      <Corner className={`absolute top-2 h-14 w-14 ${side === "left" ? "left-2" : "right-2 -scale-x-100"}`} />
      <Corner className={`absolute bottom-2 h-14 w-14 ${side === "left" ? "left-2 -scale-y-100" : "right-2 -scale-100"}`} />
      <div className={`absolute inset-y-0 w-px bg-gold/50 ${side === "left" ? "right-0" : "left-0"}`} />
      {side === "left" ? (
        <p className="eyebrow absolute bottom-10 left-0 right-0 text-center text-[0.55rem] text-gold/80">Hooriqa</p>
      ) : (
        <p className="eyebrow absolute bottom-10 left-0 right-0 text-center text-[0.55rem] text-gold/80">Studio</p>
      )}
    </div>
  );
}

function DoorLining() {
  return <div className="backface-hidden absolute inset-0 bg-ivory-paper" style={{ transform: "rotateY(180deg)" }} />;
}

interface Props {
  open: boolean;
  onOpen: () => void;
  onEnter: () => void;
}

export function InvitationCard({ open, onOpen, onEnter }: Props) {
  const { groom, bride } = wedding.couple;
  const item = (d: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: open ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.9, delay: open ? 0.9 + d : 0, ease },
  });

  return (
    <div className="relative h-[min(80svh,37rem)] w-[min(88vw,25rem)]" style={{ perspective: 1800 }}>
      {/* inside of the card */}
      <div className="theme-ivory grain gold-frame absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-ivory-paper px-6 py-8 text-center shadow-card">
        <Corner className="absolute left-2 top-2 h-10 w-10 text-gold-deep" />
        <Corner className="absolute right-2 top-2 h-10 w-10 -scale-x-100 text-gold-deep" />
        <Corner className="absolute bottom-2 left-2 h-10 w-10 -scale-y-100 text-gold-deep" />
        <Corner className="absolute bottom-2 right-2 h-10 w-10 -scale-100 text-gold-deep" />

        <motion.p {...item(0)} className="font-arabic text-lg text-gold-deep md:text-xl" lang="ar" dir="rtl">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>
        <motion.p {...item(0.1)} className="eyebrow mt-3 text-[0.6rem] text-muted-foreground">
          Together with their families
        </motion.p>
        <motion.div {...item(0.2)} className="mt-3 flex items-center justify-center gap-2 font-display leading-none">
          <span className="text-gold-foil text-[clamp(3.5rem,14vh,5.5rem)] font-light">{groom.initial}</span>
          <span className="font-script text-[clamp(2rem,7vh,3rem)] text-burgundy">&</span>
          <span className="text-gold-foil text-[clamp(3.5rem,14vh,5.5rem)] font-light">{bride.initial}</span>
        </motion.div>
        <motion.h1 {...item(0.3)} className="font-display text-[clamp(1.6rem,4.5vh,2.2rem)] font-medium tracking-wide text-emerald">
          {coupleNames}
        </motion.h1>
        <motion.p {...item(0.4)} className="mt-2 max-w-[17rem] font-display text-base italic leading-snug text-muted-foreground md:text-lg">
          request the honour of your presence at the celebration of their Nikkah
        </motion.p>
        <motion.div {...item(0.5)}>
          <Ornament className="mx-auto my-3 w-36 text-gold-deep" />
        </motion.div>
        <motion.p {...item(0.55)} className="eyebrow text-[0.62rem] text-foreground">
          {formatDay(wedding.nikkah.start)} · {formatDate(wedding.nikkah.start)}
        </motion.p>
        <motion.p {...item(0.6)} className="mt-1 font-display text-sm text-muted-foreground">
          {formatTime(wedding.nikkah.start)} · {wedding.venue.city}
        </motion.p>
        <motion.div {...item(0.75)} className="mt-5">
          <Button variant="emerald" size="xl" onClick={onEnter} tabIndex={open ? 0 : -1} aria-hidden={!open}>
            Enter Invitation <ArrowRight />
          </Button>
        </motion.div>
      </div>

      {/* gatefold doors */}
      <motion.div
        className="preserve-3d absolute inset-y-0 left-0 w-1/2"
        style={{ transformOrigin: "left center" }}
        initial={false}
        animate={{ rotateY: open ? -118 : 0 }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      >
        <DoorFace side="left" />
        <DoorLining />
      </motion.div>
      <motion.div
        className="preserve-3d absolute inset-y-0 right-0 w-1/2"
        style={{ transformOrigin: "right center" }}
        initial={false}
        animate={{ rotateY: open ? 118 : 0 }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.08 }}
      >
        <DoorFace side="right" />
        <DoorLining />
      </motion.div>

      {/* wax seal / open trigger */}
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Open the invitation card"
        disabled={open}
        className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 focus-visible:outline-none"
        initial={false}
        animate={open ? { opacity: 0, scale: 1.6, filter: "blur(6px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease }}
        style={{ pointerEvents: open ? "none" : "auto" }}
      >
        <span className="bg-gold-foil shadow-gold-glow relative flex h-24 w-24 items-center justify-center rounded-full ring-1 ring-gold-light/60 transition-transform duration-500 hover:scale-105">
          <span className="absolute inset-1.5 rounded-full border border-emerald-night/30" />
          <Star8 className="absolute h-20 w-20 text-gold-deep/30" />
          <span className="relative font-display text-2xl font-semibold tracking-wider text-emerald-night">{coupleInitials}</span>
        </span>
        <span className="eyebrow text-[0.6rem] text-gold-light">Tap to open</span>
      </motion.button>
    </div>
  );
}
