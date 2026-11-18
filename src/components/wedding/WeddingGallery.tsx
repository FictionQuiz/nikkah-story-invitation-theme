import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useState } from "react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "./SectionHeading";

const images = wedding.gallery;

export function WeddingGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const open = index !== null;
  const current = index !== null ? images[index] : undefined;

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setIndex((i) => (i === null ? i : (i + step + images.length) % images.length));
    },
    [],
  );

  return (
    <section id="gallery" className="section-pad bg-night relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Moments" script="A glimpse of our story" title="Wedding Gallery" />
        <div className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
          {images.map((img, i) => (
            <motion.button
              key={img.src + i}
              type="button"
              onClick={() => {
                setDir(1);
                setIndex(i);
              }}
              aria-label={`Open photo: ${img.caption}`}
              className="group relative mb-3 block w-full overflow-hidden break-inside-avoid border border-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:mb-5"
              initial={{ opacity: 0, y: 40, clipPath: "inset(12% 12% 12% 12%)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.1, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-emerald-night/85 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="font-display text-lg text-ivory">{img.caption}</span>
                <Expand className="h-4 w-4 text-gold" aria-hidden="true" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-emerald-night/95 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed inset-0 z-[91] flex flex-col items-center justify-center p-4 focus:outline-none md:p-10"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">{current?.caption ?? "Gallery photo"}</Dialog.Title>
            <div className="relative flex h-[75svh] w-full max-w-5xl items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                {current && (
                  <motion.img
                    key={index}
                    src={current.src}
                    alt={current.alt}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 80, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: dir * -80, scale: 0.96 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) go(1);
                      else if (info.offset.x > 60) go(-1);
                    }}
                    className="max-h-full max-w-full cursor-grab touch-pan-y border border-gold/30 object-contain shadow-card active:cursor-grabbing"
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="mt-5 text-center">
              <p className="font-display text-2xl text-ivory">{current?.caption}</p>
              <p className="eyebrow mt-1 text-[0.58rem] text-gold">
                {(index ?? 0) + 1} / {images.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="glass absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-gold transition-colors hover:border-gold md:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="glass absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-gold transition-colors hover:border-gold md:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <Dialog.Close
              aria-label="Close gallery"
              className="glass absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-gold transition-colors hover:border-gold md:right-8 md:top-8"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
