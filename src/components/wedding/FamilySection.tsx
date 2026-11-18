import { wedding } from "@/config/wedding";
import { Corner, Ornament, Star8 } from "./Ornament";
import { Reveal } from "./Reveal";
import { SampleBadge } from "./SampleBadge";

function FamilyColumn({ label, title, members }: { label: string; title: string; members: string[] }) {
  return (
    <div className="text-center">
      <p className="eyebrow text-[0.6rem] text-gold-deep">{label}</p>
      <h3 className="mt-3 font-display text-3xl text-emerald md:text-4xl">{title}</h3>
      <ul className="mt-5 space-y-2 font-display text-lg text-foreground/80">
        {members.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export function FamilySection() {
  const { families } = wedding;
  return (
    <section id="family" className="section-pad bg-emerald-deep relative overflow-hidden">
      <Reveal className="relative mx-auto max-w-4xl">
        <div className="theme-ivory grain gold-frame relative overflow-hidden bg-ivory-paper px-6 py-16 shadow-card md:px-16 md:py-20">
          <Corner className="absolute left-3 top-3 text-gold-deep" />
          <Corner className="absolute right-3 top-3 -scale-x-100 text-gold-deep" />
          <Corner className="absolute bottom-3 left-3 -scale-y-100 text-gold-deep" />
          <Corner className="absolute bottom-3 right-3 -scale-100 text-gold-deep" />
          <div className="text-center">
            <Star8 className="mx-auto text-gold-deep" />
            <p className="eyebrow mt-5 text-gold-deep">With love from our families</p>
            <p className="mx-auto mt-6 max-w-2xl font-display text-2xl italic leading-relaxed text-foreground md:text-3xl">
              {families.message}
            </p>
            <Ornament className="mx-auto mt-8 text-gold-deep" />
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <FamilyColumn label="Family of the bride" title={families.bride.title} members={families.bride.members} />
            <span className="mx-auto font-script text-6xl text-burgundy" aria-hidden="true">
              &
            </span>
            <FamilyColumn label="Family of the groom" title={families.groom.title} members={families.groom.members} />
          </div>
          {wedding.isSample && (
            <div className="mt-10 flex justify-center">
              <SampleBadge>Sample family names</SampleBadge>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
