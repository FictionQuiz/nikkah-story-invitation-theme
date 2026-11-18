import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { coupleInitials, wedding } from "@/config/wedding";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "details", label: "Nikkah" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
  { id: "wishes", label: "Wishes" },
] as const;

export function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so the closing mobile menu doesn't interrupt the scroll.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.9, delay: visible ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border,padding] duration-500",
        scrolled ? "glass border-x-0 border-t-0 py-3" : "border-b border-transparent py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#home" onClick={go("home")} className="group flex items-center gap-3" aria-label={`${coupleInitials} — back to top`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 font-display text-sm tracking-wider text-gold transition-colors group-hover:bg-gold/10">
            {wedding.couple.groom.initial}
            <span className="font-script text-xs text-gold-light">&</span>
            {wedding.couple.bride.initial}
          </span>
          <span className="eyebrow hidden text-[0.6rem] text-gold-light sm:inline">{wedding.brand.name}</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "eyebrow relative py-2 text-[0.62rem] transition-colors hover:text-gold",
                  active === l.id ? "text-gold" : "text-foreground/80",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500",
                    active === l.id ? "w-full" : "w-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            // Avoid animating height: measuring "auto" makes the animation library reset the scroll position.
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-5 mt-3 grid grid-cols-2 gap-px overflow-hidden border border-gold/25 bg-gold/20">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-background"
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className={cn(
                      "flex min-h-14 items-center justify-center font-display text-xl transition-colors hover:text-gold",
                      active === l.id ? "text-gold" : "text-foreground",
                    )}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
