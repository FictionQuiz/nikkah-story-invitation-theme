import { z } from "zod";

/**
 * DEMO STORAGE ONLY — RSVPs and wishes are kept in this browser's localStorage.
 * Nothing is sent online. Connect a real database to collect responses from all guests.
 */

export const RSVP_KEY = "hooriqa:rsvps";
export const WISHES_KEY = "hooriqa:wishes";

export function makeRsvpSchema(maxGuests: number) {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Please enter your full name")
        .max(80, "Name must be 80 characters or fewer"),
      attending: z.enum(["yes", "no"], {
        errorMap: () => ({ message: "Please let us know whether you can attend" }),
      }),
      guests: z.number().int(),
      message: z.string().trim().max(500, "Message must be 500 characters or fewer"),
    })
    .superRefine((v, ctx) => {
      if (v.attending === "yes" && (v.guests < 1 || v.guests > maxGuests)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guests"],
          message: `Please choose between 1 and ${maxGuests} guests`,
        });
      }
    })
    .transform((v) => ({ ...v, guests: v.attending === "yes" ? v.guests : 0 }));
}

export type RsvpInput = z.output<ReturnType<typeof makeRsvpSchema>>;
export interface RsvpEntry extends RsvpInput {
  id: string;
  submittedAt: string;
}

export const normalizeName = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

/** Adds an RSVP, replacing an earlier one from the same guest instead of duplicating it. */
export function upsertRsvp(list: RsvpEntry[], entry: RsvpEntry) {
  const key = normalizeName(entry.name);
  const existing = list.findIndex((r) => normalizeName(r.name) === key);
  if (existing === -1) return { list: [...list, entry], updated: false };
  const next = [...list];
  next[existing] = { ...entry, id: list[existing]?.id ?? entry.id };
  return { list: next, updated: true };
}

export const wishSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60, "Name must be 60 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(3, "Please write a short wish")
    .max(400, "Wishes must be 400 characters or fewer"),
});

export type WishInput = z.output<typeof wishSchema>;
export interface Wish extends WishInput {
  id: string;
  createdAt: string;
  sample?: boolean;
}

/** Newest first; ignores an identical repeat of the same guest's wish. */
export function addWish(list: Wish[], wish: Wish) {
  const dup = list.some(
    (w) => normalizeName(w.name) === normalizeName(wish.name) && w.message.trim() === wish.message.trim(),
  );
  if (dup) return { list, duplicate: true };
  return { list: [wish, ...list], duplicate: false };
}

export function readList<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeList<T>(key: string, list: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}
