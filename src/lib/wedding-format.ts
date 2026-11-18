import { wedding } from "@/config/wedding";

const tz = wedding.timeZone;

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "long" }).format(new Date(iso));
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

export function formatShortDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", day: "numeric", month: "short" }).format(new Date(iso));
}

export function formatDayNumber(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, day: "2-digit" }).format(new Date(iso));
}

export function formatMonthYear(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, month: "long", year: "numeric" }).format(new Date(iso));
}
