import { motion } from "framer-motion";
import { CalendarPlus, Clock, MapPin, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding, type EventTheme } from "@/config/wedding";
import { formatShortDate, formatTime } from "@/lib/wedding-format";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { useInvitationActions } from "./useInvitationActions";

const THEMES: Record<EventTheme, { ring: string; accent: string; tint: string; label: string }> = {
  marigold: { ring: "border-marigold/70", accent: "text-marigold", tint: "from-marigold/30", label: "bg-marigold text-emerald-night" },
  ivory: { ring: "border-ivory/70", accent: "text-ivory", tint: "from-ivory/20", label: "bg-ivory text-emerald" },
  burgundy: { ring: "border-burgundy-light/80", accent: "text-blush", tint: "from-burgundy/60", label: "bg-burgundy text-ivory" },
  champagne: { ring: "border-gold/70", accent: "text-gold-light", tint: "from-gold/25", label: "bg-gold-foil text-emerald-night" },
};

export function EventSchedule() {
  const { downloadEvent, downloadAll } = useInvitationActions();
  return (
    <section id="events" className="section-pad bg-emerald-deep relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Wedding festivities" script="Four evenings of joy" title="Event Schedule" />
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {wedding.events.map((ev, i) => {
            const t = THEMES[ev.theme];
            return (
              <motion.article
                key={ev.id}
                initial={{ opacity: 0, y: 60, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard max={6}>
                  <div className={cn("group relative flex h-full flex-col overflow-hidden border bg-emerald-night shadow-card", t.ring)}>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={ev.image}
                        alt={`${ev.name} decor`}
                        width={1024}
                        height={1280}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                      />
                      <div className={cn("absolute inset-0 bg-gradient-to-t via-emerald-night/30 to-transparent", t.tint)} />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-night via-emerald-night/20 to-transparent" />
                      <span className={cn("eyebrow absolute left-4 top-4 px-3 py-1.5 text-[0.55rem]", t.label)}>
                        {formatShortDate(ev.start)}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className={cn("font-script text-3xl", t.accent)}>{ev.subtitle}</p>
                        <h3 className="font-display text-5xl font-light text-ivory">{ev.name}</h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <p className="font-display text-lg leading-snug text-ivory/85">{ev.description}</p>
                      <ul className="space-y-2.5 text-sm text-ivory/80">
                        <li className="flex gap-3">
                          <Clock className={cn("h-4 w-4 shrink-0", t.accent)} aria-hidden="true" />
                          {formatTime(ev.start)} – {formatTime(ev.end)}
                        </li>
                        <li className="flex gap-3">
                          <MapPin className={cn("h-4 w-4 shrink-0", t.accent)} aria-hidden="true" />
                          <span>
                            {ev.venue}
                            <span className="block text-ivory/60">{ev.address}</span>
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <Shirt className={cn("h-4 w-4 shrink-0", t.accent)} aria-hidden="true" />
                          {ev.dressCode}
                        </li>
                      </ul>
                      <Button variant="goldOutline" className="mt-auto h-11" onClick={() => downloadEvent(ev.id)}>
                        <CalendarPlus /> Add {ev.name}
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-14 text-center">
          <Button variant="gold" size="xl" onClick={downloadAll}>
            <CalendarPlus /> Add all events to calendar
          </Button>
        </div>
      </div>
    </section>
  );
}
