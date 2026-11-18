/**
 * ─────────────────────────────────────────────────────────────
 *  HOORIQA STUDIO — CENTRAL WEDDING CONFIGURATION
 *  Edit every name, date, venue, image and link here.
 *  Everything marked SAMPLE is placeholder content to replace.
 * ─────────────────────────────────────────────────────────────
 */
import heroImage from "@/assets/hero-floral.jpg";
import brideImage from "@/assets/bride.jpg";
import groomImage from "@/assets/groom.jpg";
import mehndiImage from "@/assets/mehndi.jpg";
import nikkahImage from "@/assets/nikkah.jpg";
import baraatImage from "@/assets/baraat.jpg";
import walimaImage from "@/assets/walima.jpg";
import venueImage from "@/assets/venue.jpg";
import handsImage from "@/assets/gallery-hands.jpg";
import lanternsImage from "@/assets/gallery-lanterns.jpg";
import stationeryImage from "@/assets/gallery-stationery.jpg";

export type EventTheme = "marigold" | "ivory" | "burgundy" | "champagne";

export interface WeddingEvent {
  id: string;
  name: string;
  subtitle: string;
  /** ISO 8601 with timezone offset, e.g. 2027-12-12T17:00:00+05:00 */
  start: string;
  end: string;
  venue: string;
  address: string;
  description: string;
  dressCode: string;
  image: string;
  theme: EventTheme;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const wedding = {
  /** Set to false once every SAMPLE detail has been replaced. */
  isSample: true,

  brand: {
    name: "HOORIQA STUDIO",
    tagline: "Every Invitation Tells a Story.",
  },

  /** IANA timezone used to display all dates and times. */
  timeZone: "Asia/Karachi",

  couple: {
    groom: {
      name: "Ayaan",
      fullName: "Ayaan Malik", // SAMPLE surname
      initial: "A",
      parents: "Son of Mr. & Mrs. Imran Malik", // SAMPLE
      bio: "A quiet soul with a generous heart — Ayaan finds poetry in sunrise prayers, old books and long drives along the Karachi coast.", // SAMPLE
      image: groomImage,
      imageAlt: "The groom in an ivory sherwani with gold embroidery and pearls",
    },
    bride: {
      name: "Zara",
      fullName: "Zara Raza", // SAMPLE surname
      initial: "Z",
      parents: "Daughter of Mr. & Mrs. Ahmed Raza", // SAMPLE
      bio: "Graceful, warm and endlessly kind — Zara brings light to every room, with a love for calligraphy, jasmine and her grandmother's stories.", // SAMPLE
      image: brideImage,
      imageAlt: "The bride in a burgundy and gold embroidered lehenga with a sheer veil",
    },
  },

  announcement:
    "With the blessings of Allah and the love of our families, we invite you to celebrate the beginning of our forever.",

  verse: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا",
    translation:
      "“And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them.”",
    reference: "Surah Ar-Rum · 30:21",
  },

  families: {
    message:
      "Together with joyful hearts, the families of the bride and groom request the honour of your presence and du'as as their children unite in the sacred bond of Nikkah.",
    bride: {
      title: "The Raza Family", // SAMPLE
      members: ["Mr. & Mrs. Ahmed Raza", "Mrs. Rukhsana Begum (Grandmother)", "Hamza & Hania Raza"], // SAMPLE
    },
    groom: {
      title: "The Malik Family", // SAMPLE
      members: ["Mr. & Mrs. Imran Malik", "Haji Abdul Malik (Grandfather)", "Sara & Usman Malik"], // SAMPLE
    },
  },

  nikkah: {
    title: "The Nikkah Ceremony",
    start: "2027-12-12T17:00:00+05:00",
    end: "2027-12-12T21:00:00+05:00",
    note: "Maghrib prayer will be offered at the venue. Dinner to follow.",
  },

  venue: {
    name: "Royal Wedding Venue", // SAMPLE
    address: "Sample Address, Clifton Block 5, Karachi, Pakistan", // SAMPLE
    city: "Karachi, Pakistan",
    /** SAMPLE map link — replace with the real venue's Google Maps share URL. */
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Clifton%2C+Karachi%2C+Pakistan",
    image: venueImage,
    imageAlt: "A white marble palace venue glowing at dusk beside a reflecting pool of floating candles",
    details: ["Valet parking available", "Separate family seating", "Prayer area on site"],
  },

  events: [
    {
      id: "mehndi",
      name: "Mehndi",
      subtitle: "A night of colour & song",
      start: "2027-12-10T19:00:00+05:00",
      end: "2027-12-10T23:30:00+05:00",
      venue: "The Raza Residence Lawn", // SAMPLE
      address: "Sample Address, DHA Phase 6, Karachi", // SAMPLE
      description: "Henna, dholki, marigolds and laughter — an evening of music and celebration with family and friends.",
      dressCode: "Marigold, mustard & emerald",
      image: mehndiImage,
      theme: "marigold",
    },
    {
      id: "nikkah",
      name: "Nikkah",
      subtitle: "The sacred union",
      start: "2027-12-12T17:00:00+05:00",
      end: "2027-12-12T21:00:00+05:00",
      venue: "Royal Wedding Venue", // SAMPLE
      address: "Sample Address, Clifton Block 5, Karachi", // SAMPLE
      description: "The blessed ceremony of Nikkah, witnessed by loved ones, followed by du'a and dinner.",
      dressCode: "Ivory, pastels & gold",
      image: nikkahImage,
      theme: "ivory",
    },
    {
      id: "baraat",
      name: "Baraat",
      subtitle: "The grand arrival",
      start: "2027-12-13T20:00:00+05:00",
      end: "2027-12-14T00:00:00+05:00",
      venue: "Royal Wedding Venue — Grand Hall", // SAMPLE
      address: "Sample Address, Clifton Block 5, Karachi", // SAMPLE
      description: "The groom's procession arrives with music and rose petals for the Rukhsati and a royal evening.",
      dressCode: "Jewel tones & formal wear",
      image: baraatImage,
      theme: "burgundy",
    },
    {
      id: "walima",
      name: "Walima",
      subtitle: "A celebration of gratitude",
      start: "2027-12-15T20:00:00+05:00",
      end: "2027-12-15T23:30:00+05:00",
      venue: "The Pearl Banquet", // SAMPLE
      address: "Sample Address, Shahrah-e-Faisal, Karachi", // SAMPLE
      description: "An elegant reception hosted by the groom's family to share the joy of the newlyweds.",
      dressCode: "Champagne, blush & black tie",
      image: walimaImage,
      theme: "champagne",
    },
  ] satisfies WeddingEvent[],

  /** Replace these with your own photographs (any size; they are shown in a masonry grid). */
  gallery: [
    { src: nikkahImage, alt: "Ivory floral arch with a Quran stand and candles", caption: "Where forever begins", width: 1024, height: 1280 },
    { src: handsImage, alt: "Henna-decorated hands holding a gold ring box", caption: "A promise in gold", width: 1024, height: 1024 },
    { src: lanternsImage, alt: "Brass lanterns glowing among ivory roses", caption: "Lanterns of the night", width: 1024, height: 1280 },
    { src: stationeryImage, alt: "Ivory invitation card with emerald wax seal on velvet", caption: "Every invitation tells a story", width: 1280, height: 1024 },
    { src: mehndiImage, alt: "Henna hands holding a plate of rose petals and candles", caption: "Mehndi rang", width: 1024, height: 1280 },
    { src: venueImage, alt: "Marble palace venue at dusk", caption: "The royal venue", width: 1600, height: 1024 },
    { src: baraatImage, alt: "Burgundy floral tunnel with crystal lamps", caption: "The grand arrival", width: 1024, height: 1280 },
    { src: walimaImage, alt: "Banquet table with candelabras and roses", caption: "A table of gratitude", width: 1024, height: 1280 },
  ] satisfies GalleryImage[],

  heroImage,

  music: {
    /**
     * Path to a music file in /public (e.g. "/audio/nikkah-theme.mp3").
     * Leave empty to use the built-in ambient chime melody.
     */
    src: "",
    title: "Ambient chimes",
  },

  rsvp: {
    deadline: "2027-11-20T23:59:00+05:00",
    maxGuests: 6,
  },

  thankYou:
    "Your presence and du'as are the most precious gifts we could ask for. Thank you for being part of our story.",
};

export type Wedding = typeof wedding;

export const coupleInitials = `${wedding.couple.groom.initial} & ${wedding.couple.bride.initial}`;
export const coupleNames = `${wedding.couple.groom.name} & ${wedding.couple.bride.name}`;
