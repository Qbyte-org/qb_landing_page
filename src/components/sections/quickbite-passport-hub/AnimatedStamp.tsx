import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { RefObject } from "react";
import type { PassportCity } from "./passportHub.data";

export default function AnimatedStamp({
  city,
  stampRef,
  inkRef,
}: {
  city: PassportCity;
  stampRef: RefObject<HTMLDivElement | null>;
  inkRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      ref={stampRef}
      whileHover={{ scale: 1.035, rotate: -5 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-40 max-w-full rotate-[-3deg] sm:w-44"
    >
      <div
        ref={inkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-20%] rounded-full bg-[var(--passport-accent)] opacity-0 blur-2xl"
      />
      <div
        className="relative overflow-hidden rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink sm:py-4"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] opacity-10" />
        <div className="relative flex items-center justify-between gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cocoa">
          <span>Entry stamp</span>
          <MapPin aria-hidden="true" className="size-4 text-[var(--passport-accent)]" />
        </div>
        <p className="relative mt-3 font-display text-xl font-semibold leading-tight tracking-[0.02em] sm:text-2xl">
          {city.name}
        </p>
        <div className="relative mt-3 flex items-center justify-between border-t border-dashed border-ink/20 pt-2 text-[0.65rem] font-medium tracking-[0.12em] text-cocoa">
          <span>07 / 2026</span>
          <ArrowUpRight aria-hidden="true" className="size-4 text-[var(--passport-accent)]" />
        </div>
      </div>
    </motion.div>
  );
}
