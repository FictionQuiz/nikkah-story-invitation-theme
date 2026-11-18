import { describe, expect, it } from "vitest";
import { getCountdown } from "@/lib/countdown";
import { buildICS, toICSDate } from "@/lib/ics";
import { addWish, makeRsvpSchema, upsertRsvp, type RsvpEntry, type Wish } from "@/lib/guest-storage";
import { wedding } from "@/config/wedding";
import { formatDate, formatDay } from "@/lib/wedding-format";

describe("countdown", () => {
  it("splits remaining time into days, hours, minutes, seconds", () => {
    const now = Date.UTC(2027, 11, 1, 0, 0, 0);
    const target = now + ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000;
    expect(getCountdown(target, now)).toEqual({ done: false, days: 2, hours: 3, minutes: 4, seconds: 5 });
  });
  it("shows the completed state once the event time has passed", () => {
    expect(getCountdown(1000, 2000).done).toBe(true);
  });
});

describe("nikkah date", () => {
  it("is Sunday 12 December 2027 in Karachi", () => {
    expect(formatDate(wedding.nikkah.start)).toBe("12 December 2027");
    expect(formatDay(wedding.nikkah.start)).toBe("Sunday");
  });
});

describe("calendar file", () => {
  it("converts the Karachi start time to UTC", () => {
    expect(toICSDate("2027-12-12T17:00:00+05:00")).toBe("20271212T120000Z");
  });
  it("produces a valid VEVENT", () => {
    const ics = buildICS([
      { uid: "x@hooriqa", title: "Nikkah, Ayaan & Zara", description: "d", location: "Karachi", start: wedding.nikkah.start, end: wedding.nikkah.end },
    ]);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("DTSTART:20271212T120000Z");
    expect(ics).toContain("SUMMARY:Nikkah\\, Ayaan & Zara");
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });
});

describe("RSVP", () => {
  const schema = makeRsvpSchema(6);
  it("requires a name and attendance choice", () => {
    const r = schema.safeParse({ name: "", attending: "", guests: 1, message: "" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const paths = r.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("name");
      expect(paths).toContain("attending");
    }
  });
  it("limits attending guests to the configured maximum", () => {
    expect(schema.safeParse({ name: "Ali", attending: "yes", guests: 7, message: "" }).success).toBe(false);
    expect(schema.safeParse({ name: "Ali", attending: "yes", guests: 6, message: "" }).success).toBe(true);
  });
  it("records 0 guests when declining", () => {
    const r = schema.safeParse({ name: "Ali", attending: "no", guests: 3, message: "" });
    expect(r.success && r.data.guests).toBe(0);
  });
  it("updates an earlier response from the same guest instead of duplicating", () => {
    const a: RsvpEntry = { id: "1", name: "Sara Khan", attending: "yes", guests: 2, message: "", submittedAt: "" };
    const b: RsvpEntry = { ...a, id: "2", name: "  sara   KHAN ", guests: 3 };
    const res = upsertRsvp([a], b);
    expect(res.updated).toBe(true);
    expect(res.list).toHaveLength(1);
    expect(res.list[0]?.guests).toBe(3);
  });
});

describe("wishes", () => {
  it("ignores an identical repeat wish from the same guest", () => {
    const w: Wish = { id: "1", name: "Ali", message: "Mubarak!", createdAt: "" };
    expect(addWish([w], { ...w, id: "2" }).duplicate).toBe(true);
    expect(addWish([w], { ...w, id: "3", message: "Congrats" }).list[0]?.id).toBe("3");
  });
});
