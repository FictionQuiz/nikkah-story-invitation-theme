import { CalendarDays, Clock, MapPin, Sun } from "lucide-react";
import { wedding } from "@/config/wedding";
import { formatDate, formatDay, formatDayNumber, formatMonthYear, formatTime } from "@/lib/wedding-format";
import { Corner, Ornament } from "./Ornament";
import { Reveal } from "./Reveal";
import { SampleBadge } from "./SampleBadge";
import { SectionHeading } from "./SectionHeading";
import { ShareActions } from "./ShareActions";
import { TiltCard } from "./TiltCard";

export function NikkahDetails() {
  const { nikkah, venue } = wedding;
  const rows = [
    { icon: CalendarDays, label: "Date", value: formatDate(nikkah.start) },
    { icon: Sun, label: "Day", value: formatDay(nikkah.start) },
    { icon: Clock, label: "Time", value: `${formatTime(nikkah.start)} – ${formatTime(nikkah.end)}` },
    { icon: MapPin, label: "Venue", value: venue.name, sample: wedding.isSample },
  ];
  return (
    <section id="details" className="theme-ivory grain section-pad relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading eyebrow="Save the date" script="The blessed day" title={nikkah.title} tone="emerald" />
        <Reveal>
          <TiltCard max={5} className="mx-auto max-w-3xl">
            <div className="grain relative overflow-hidden bg-emerald-deep px-6 py-14 text-ivory shadow-card md:px-14">
              <div className="absolute inset-3 border border-gold/60" />
              <div className="absolute inset-5 border border-gold/25" />
              <Corner className="absolute left-3 top-3" />
              <Corner className="absolute right-3 top-3 -scale-x-100" />
              <Corner className="absolute bottom-3 left-3 -scale-y-100" />
              <Corner className="absolute bottom-3 right-3 -scale-100" />

              <div className="relative text-center">
                <p className="eyebrow text-gold">{formatDay(nikkah.start)}</p>
                <p className="text-gold-foil mt-2 font-display text-[clamp(5rem,16vw,8rem)] font-light leading-none">
                  {formatDayNumber(nikkah.start)}
                </p>
                <p className="font-display text-2xl tracking-[0.2em] text-ivory uppercase md:text-3xl">
                  {formatMonthYear(nikkah.start)}
                </p>
                <Ornament className="mx-auto mt-6" />
              </div>

              <dl className="relative mt-10 grid gap-px overflow-hidden border border-gold/20 bg-gold/20 sm:grid-cols-2">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-start gap-4 bg-emerald-night/80 p-5">
                    <r.icon className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <dt className="eyebrow text-[0.58rem] text-gold/80">{r.label}</dt>
                      <dd className="mt-1 font-display text-xl text-ivory">
                        {r.value} {r.sample && <SampleBadge className="ml-1 align-middle text-gold-light" />}
                      </dd>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4 bg-emerald-night/80 p-5 sm:col-span-2">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <dt className="eyebrow text-[0.58rem] text-gold/80">Address</dt>
                    <dd className="mt-1 font-display text-xl text-ivory">{venue.address}</dd>
                  </div>
                </div>
              </dl>
              <p className="relative mt-8 text-center font-display text-lg italic text-ivory/75">{nikkah.note}</p>
              <ShareActions className="relative mt-8" />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
