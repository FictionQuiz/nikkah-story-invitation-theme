import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, Loader2, Minus, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { wedding } from "@/config/wedding";
import { makeId, makeRsvpSchema, readList, RSVP_KEY, upsertRsvp, writeList, type RsvpEntry } from "@/lib/guest-storage";
import { formatDate } from "@/lib/wedding-format";
import { cn } from "@/lib/utils";
import { Corner } from "./Ornament";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const schema = makeRsvpSchema(wedding.rsvp.maxGuests);
type Errors = Partial<Record<"name" | "attending" | "guests" | "message", string>>;

export function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ entry: RsvpEntry; updated: boolean } | null>(null);
  const [count, setCount] = useState(0);
  const lock = useRef(false);

  useEffect(() => setCount(readList<RsvpEntry>(RSVP_KEY).length), []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (lock.current) return; // blocks double clicks / double submits
    const parsed = schema.safeParse({ name, attending, guests, message });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`rsvp-${first}`)?.focus();
      return;
    }
    setErrors({});
    lock.current = true;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    const entry: RsvpEntry = { ...parsed.data, id: makeId(), submittedAt: new Date().toISOString() };
    const { list, updated } = upsertRsvp(readList<RsvpEntry>(RSVP_KEY), entry);
    writeList(RSVP_KEY, list);
    setCount(list.length);
    setResult({ entry, updated });
    setSubmitting(false);
    lock.current = false;
  };

  const edit = () => {
    setResult(null);
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`rsvp-${k}-error`} className="mt-2 text-sm text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="rsvp" className="theme-ivory grain section-pad relative overflow-hidden">
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="Kindly respond" script="Will you join us?" title="Guest RSVP" tone="emerald" />
        <Reveal>
          <div className="gold-frame relative bg-card px-5 py-10 shadow-soft sm:px-10 md:px-14 md:py-14">
            <Corner className="absolute left-2 top-2 h-10 w-10 text-gold-deep" />
            <Corner className="absolute right-2 top-2 h-10 w-10 -scale-x-100 text-gold-deep" />
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                  role="status"
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-4xl text-emerald">
                    {result.entry.attending === "yes" ? "JazakAllah Khair!" : "Thank you for letting us know"}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md font-display text-xl text-foreground/80">
                    {result.entry.attending === "yes"
                      ? `${result.entry.name}, we're delighted — we've reserved ${result.entry.guests} ${result.entry.guests === 1 ? "seat" : "seats"} for you.`
                      : `${result.entry.name}, you'll be missed. Your du'as mean the world to us.`}
                  </p>
                  {result.updated && (
                    <p className="mt-3 text-sm text-muted-foreground">Your earlier response was updated — no duplicate was created.</p>
                  )}
                  <Button variant="emeraldOutline" size="xl" className="mt-8" onClick={edit}>
                    Edit response
                  </Button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
                  <p className="text-center font-display text-lg italic text-muted-foreground">
                    Please respond by {formatDate(wedding.rsvp.deadline)}
                  </p>
                  <div>
                    <Label htmlFor="rsvp-name" className="eyebrow text-[0.6rem] text-gold-deep">
                      Guest name *
                    </Label>
                    <Input
                      id="rsvp-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={80}
                      autoComplete="name"
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                      className="mt-2 h-12 rounded-none border-x-0 border-t-0 bg-transparent px-0 font-display text-xl shadow-none focus-visible:ring-0 focus-visible:border-emerald"
                    />
                    {err("name")}
                  </div>

                  <fieldset>
                    <legend className="eyebrow text-[0.6rem] text-gold-deep">Will you attend? *</legend>
                    <div
                      id="rsvp-attending"
                      tabIndex={-1}
                      role="radiogroup"
                      aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
                      className="mt-3 grid gap-3 sm:grid-cols-2"
                    >
                      {(
                        [
                          ["yes", "Joyfully accept"],
                          ["no", "Regretfully decline"],
                        ] as const
                      ).map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          role="radio"
                          aria-checked={attending === val}
                          onClick={() => setAttending(val)}
                          className={cn(
                            "min-h-14 border px-4 font-display text-xl transition-all duration-300",
                            attending === val
                              ? "border-emerald bg-emerald text-ivory shadow-soft"
                              : "border-input bg-transparent text-foreground hover:border-emerald/60",
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {err("attending")}
                  </fieldset>

                  <AnimatePresence initial={false}>
                    {attending === "yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <Label id="rsvp-guests-label" className="eyebrow text-[0.6rem] text-gold-deep">
                          Number of guests (including you) *
                        </Label>
                        <div className="mt-3 flex items-center gap-4" role="group" aria-labelledby="rsvp-guests-label">
                          <Button type="button" variant="emeraldOutline" size="iconLg" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Fewer guests" disabled={guests <= 1}>
                            <Minus />
                          </Button>
                          <output id="rsvp-guests" aria-live="polite" className="w-16 text-center font-display text-4xl text-emerald">
                            {guests}
                          </output>
                          <Button
                            type="button"
                            variant="emeraldOutline"
                            size="iconLg"
                            onClick={() => setGuests((g) => Math.min(wedding.rsvp.maxGuests, g + 1))}
                            aria-label="More guests"
                            disabled={guests >= wedding.rsvp.maxGuests}
                          >
                            <Plus />
                          </Button>
                          <span className="text-sm text-muted-foreground">max {wedding.rsvp.maxGuests}</span>
                        </div>
                        {err("guests")}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <Label htmlFor="rsvp-message" className="eyebrow text-[0.6rem] text-gold-deep">
                      Message (optional)
                    </Label>
                    <Textarea
                      id="rsvp-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={500}
                      rows={3}
                      placeholder="Dietary needs, a note for the couple…"
                      aria-invalid={!!errors.message}
                      className="mt-2 rounded-none bg-transparent font-display text-lg"
                    />
                    <p className="mt-1 text-right text-xs text-muted-foreground">{message.length}/500</p>
                    {err("message")}
                  </div>

                  <Button type="submit" variant="emerald" size="xl" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send /> Send RSVP
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
            <p className="mt-8 flex items-start justify-center gap-2 text-center text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Demo storage: responses are saved only in this browser (localStorage), not an online database.
              {count > 0 && ` ${count} saved on this device.`}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
