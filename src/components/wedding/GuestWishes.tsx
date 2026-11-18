import { AnimatePresence, motion } from "framer-motion";
import { Heart, Info, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addWish, makeId, readList, wishSchema, WISHES_KEY, writeList, type Wish } from "@/lib/guest-storage";
import { Reveal } from "./Reveal";
import { SampleBadge } from "./SampleBadge";
import { SectionHeading } from "./SectionHeading";

const SAMPLE_WISHES: Wish[] = [
  { id: "s1", name: "Khala Nasreen", message: "May Allah fill your home with barakah, sukoon and endless laughter. Mubarak ho!", createdAt: "2027-11-01T10:00:00Z", sample: true },
  { id: "s2", name: "Hamza", message: "To my sister and the luckiest man alive — may your story be the most beautiful one yet.", createdAt: "2027-11-02T10:00:00Z", sample: true },
];

export function GuestWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const busy = useRef(false);

  useEffect(() => setWishes(readList<Wish>(WISHES_KEY)), []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    const parsed = wishSchema.safeParse({ name, message });
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as "name" | "message";
        next[k] ??= i.message;
      });
      setErrors(next);
      return;
    }
    busy.current = true;
    setErrors({});
    const res = addWish(wishes, { ...parsed.data, id: makeId(), createdAt: new Date().toISOString() });
    if (res.duplicate) {
      toast.info("You've already shared this wish");
    } else {
      setWishes(res.list);
      writeList(WISHES_KEY, res.list);
      setMessage("");
      toast.success("Your wish has been added", { description: "JazakAllah Khair for your kind words." });
    }
    setTimeout(() => (busy.current = false), 600);
  };

  const shown = [...wishes, ...SAMPLE_WISHES];

  return (
    <section id="wishes" className="section-pad bg-emerald-deep relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Du'as & greetings" script="Leave a little love" title="Guest Wishes" />
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <form onSubmit={submit} noValidate className="glass space-y-6 p-6 md:p-8">
              <div>
                <Label htmlFor="wish-name" className="eyebrow text-[0.6rem] text-gold">
                  Your name *
                </Label>
                <Input
                  id="wish-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className="mt-2 h-12 rounded-none bg-transparent font-display text-lg"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-2 text-sm text-destructive" role="alert">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="wish-message" className="eyebrow text-[0.6rem] text-gold">
                  Your wishes *
                </Label>
                <Textarea
                  id="wish-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={400}
                  rows={5}
                  aria-invalid={!!errors.message}
                  className="mt-2 rounded-none bg-transparent font-display text-lg"
                  placeholder="Share a du'a or a heartfelt wish…"
                />
                <p className="mt-1 text-right text-xs text-muted-foreground">{message.length}/400</p>
                {errors.message && <p className="mt-1 text-sm text-destructive" role="alert">{errors.message}</p>}
              </div>
              <Button type="submit" variant="gold" size="xl" className="w-full">
                <Send /> Send wishes
              </Button>
              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Wishes are stored on this device only (localStorage) until a real database is connected — other guests won't see them yet.
              </p>
            </form>
          </Reveal>
          <div className="grid content-start gap-4 sm:grid-cols-2" aria-live="polite">
            <AnimatePresence initial={false}>
              {shown.map((w) => (
                <motion.figure
                  key={w.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative border border-gold/25 bg-emerald-night/60 p-6"
                >
                  <Heart className="h-4 w-4 text-gold" aria-hidden="true" />
                  <blockquote className="mt-3 break-words font-display text-lg italic leading-relaxed text-ivory/90">“{w.message}”</blockquote>
                  <figcaption className="mt-4 flex items-center justify-between gap-2">
                    <span className="eyebrow break-all text-[0.6rem] text-gold">— {w.name}</span>
                    {w.sample && <SampleBadge className="text-gold-light" />}
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
