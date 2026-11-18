import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Copy, MapPin, Navigation } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";
import { Reveal } from "./Reveal";
import { SampleBadge } from "./SampleBadge";
import { SectionHeading } from "./SectionHeading";

export function VenueSection() {
  const { venue } = wedding;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venue.name}, ${venue.address}`);
      toast.success("Address copied");
    } catch {
      toast.error("Couldn't copy the address", { description: venue.address });
    }
  };

  return (
    <section id="venue" className="theme-ivory grain section-pad relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="The venue" script="Where we gather" title="Venue Experience" tone="emerald" />
        <div ref={ref} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden shadow-card sm:aspect-[16/9]">
            <motion.img
              src={venue.image}
              alt={venue.imageAlt}
              width={1600}
              height={1024}
              loading="lazy"
              style={{ y, scale: 1.18 }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-night/70 via-transparent to-transparent" />
          </div>
          <Reveal className="relative mx-4 -mt-24 md:absolute md:bottom-10 md:left-10 md:mx-0 md:mt-0 md:max-w-md">
            <div className="glass p-8 text-ivory shadow-card">
              <p className="eyebrow text-[0.6rem] text-gold">Nikkah · Baraat</p>
              <h3 className="mt-3 font-display text-4xl text-ivory">
                {venue.name} {wedding.isSample && <SampleBadge className="ml-1 align-middle text-gold-light" />}
              </h3>
              <p className="mt-3 flex gap-2 font-display text-lg text-ivory/85">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {venue.address}
              </p>
              <ul className="mt-5 space-y-1.5 text-sm text-ivory/75">
                {venue.details.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> {d}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button variant="gold" size="xl" asChild>
                  <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation /> Get directions
                  </a>
                </Button>
                <Button variant="goldOutline" size="xl" onClick={copyAddress}>
                  <Copy /> Copy address
                </Button>
              </div>
              {wedding.isSample && (
                <p className="mt-4 text-xs text-ivory/60">Sample map link — replace it with the real venue location.</p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
