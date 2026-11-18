import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { coupleNames, wedding } from "@/config/wedding";
import { AnnouncementSection } from "@/components/wedding/AnnouncementSection";
import { Countdown } from "@/components/wedding/Countdown";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { EventSchedule } from "@/components/wedding/EventSchedule";
import { FamilySection } from "@/components/wedding/FamilySection";
import { BackToTop } from "@/components/wedding/FloatingControls";
import { GuestWishes } from "@/components/wedding/GuestWishes";
import { HeroSection } from "@/components/wedding/HeroSection";
import { LanternIntro } from "@/components/wedding/LanternIntro";
import { MusicController } from "@/components/wedding/MusicController";
import { Navbar } from "@/components/wedding/Navbar";
import { NikkahDetails } from "@/components/wedding/NikkahDetails";
import { RSVPForm } from "@/components/wedding/RSVPForm";
import { ThankYou } from "@/components/wedding/ThankYou";
import { VenueSection } from "@/components/wedding/VenueSection";
import { WeddingGallery } from "@/components/wedding/WeddingGallery";

const title = `${coupleNames} — Nikkah Invitation · ${wedding.brand.name}`;
const description = `You are warmly invited to the Nikkah of ${coupleNames}. A cinematic invitation by ${wedding.brand.name} — ${wedding.brand.tagline}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://nikkah-story-invitation-theme.hooriqa-studio07.workers.dev/og-wedding.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/svg+xml" },
      { property: "og:image:alt", content: "Elegant emerald and champagne gold HOORIQA STUDIO Nikkah invitation artwork" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://nikkah-story-invitation-theme.hooriqa-studio07.workers.dev/og-wedding.svg" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const [intro, setIntro] = useState(true);

  // Keep the page still while the lantern opening plays.
  useEffect(() => {
    const el = document.documentElement;
    el.style.overflow = intro ? "hidden" : "";
    if (!intro) window.scrollTo({ top: 0 });
    return () => {
      el.style.overflow = "";
    };
  }, [intro]);

  const enter = useCallback(() => setIntro(false), []);
  const revealed = !intro;

  return (
    <>
      <AnimatePresence>{intro && <LanternIntro key="intro" onEnter={enter} />}</AnimatePresence>
      <Navbar visible={revealed} />
      <main aria-hidden={intro ? true : undefined}>
        <HeroSection revealed={revealed} />
        <AnnouncementSection />
        <CoupleSection />
        <FamilySection />
        <NikkahDetails />
        <Countdown />
        <EventSchedule />
        <VenueSection />
        <WeddingGallery />
        <RSVPForm />
        <GuestWishes />
        <ThankYou />
      </main>
      <MusicController visible={revealed} />
      <BackToTop />
    </>
  );
}
