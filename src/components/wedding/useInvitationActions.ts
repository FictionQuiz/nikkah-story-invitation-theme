import { useCallback } from "react";
import { toast } from "sonner";
import { wedding, coupleNames } from "@/config/wedding";
import { buildICS, downloadICS, type CalendarEvent } from "@/lib/ics";
import { formatDate } from "@/lib/wedding-format";

function pageUrl() {
  if (typeof window === "undefined") return "";
  return window.location.href.split("#")[0] ?? window.location.href;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without async clipboard access.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export function toCalendarEvent(e: (typeof wedding.events)[number]): CalendarEvent {
  const url = pageUrl();
  return {
    uid: `${e.id}-${e.start}@hooriqa.studio`,
    title: `${e.name} · ${coupleNames}`,
    description: `${e.description}\nDress code: ${e.dressCode}\nInvitation: ${pageUrl()}`,
    location: `${e.venue}, ${e.address}`,
    start: e.start,
    end: e.end,
    ...(url ? { url } : {}),
  };
}

export function useInvitationActions() {
  const copyLink = useCallback(async () => {
    const ok = await copyText(pageUrl());
    if (ok) toast.success("Invitation link copied", { description: "Paste it anywhere to share." });
    else toast.error("Couldn't copy the link", { description: pageUrl() || "Please copy the address bar URL." });
  }, []);

  const share = useCallback(async () => {
    const data = {
      title: `${coupleNames} — Nikkah Invitation`,
      text: `You're invited to the Nikkah of ${coupleNames} on ${formatDate(wedding.nikkah.start)}.`,
      url: pageUrl(),
    };
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await copyLink();
  }, [copyLink]);

  const downloadNikkah = useCallback(() => {
    const nikkah = wedding.events.find((e) => e.id === "nikkah") ?? wedding.events[0];
    if (!nikkah) return;
    downloadICS("nikkah-ayaan-zara.ics", buildICS([toCalendarEvent(nikkah)]));
    toast.success("Calendar invite downloaded", { description: "Open the file to add the Nikkah to your calendar." });
  }, []);

  const downloadEvent = useCallback((id: string) => {
    const ev = wedding.events.find((e) => e.id === id);
    if (!ev) return;
    downloadICS(`${ev.id}-ayaan-zara.ics`, buildICS([toCalendarEvent(ev)]));
    toast.success(`${ev.name} added`, { description: "Open the downloaded file to save it to your calendar." });
  }, []);

  const downloadAll = useCallback(() => {
    downloadICS("ayaan-zara-wedding-events.ics", buildICS(wedding.events.map(toCalendarEvent)));
    toast.success("All events downloaded", { description: "Mehndi, Nikkah, Baraat & Walima." });
  }, []);

  return { share, copyLink, downloadNikkah, downloadEvent, downloadAll };
}
