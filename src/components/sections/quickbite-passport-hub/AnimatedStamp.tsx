import { motion } from "motion/react";
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
      className="relative w-max rotate-[-7deg]"
    >
      <div
        ref={inkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-20%] rounded-full bg-[var(--passport-accent)] opacity-0 blur-2xl"
      />
      <div
        className="relative overflow-hidden rounded-[1.05rem] border-[0.18rem] border-dashed border-[var(--passport-accent)] px-4 py-3 text-center text-[var(--passport-accent)] sm:px-5 sm:py-3.5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(58,36,24,.08) 0 1px, transparent 1.5px), radial-gradient(circle at 78% 42%, rgba(58,36,24,.08) 0 1px, transparent 1.5px)",
          backgroundSize: "12px 12px, 17px 17px",
        }}
      >
        <div className="absolute inset-0 bg-[var(--passport-accent)] opacity-[0.025]" />
        <p className="relative text-[0.64rem] font-black uppercase leading-none tracking-[0.24em] sm:text-[0.7rem]">
          Entry stamp
        </p>
        <p className="relative mt-1 font-serif text-xl font-black uppercase leading-none tracking-[-0.06em] sm:text-2xl">
          {city.name}
        </p>
        <p className="relative mt-2 text-[0.7rem] font-black tracking-[0.25em] sm:text-xs">
          07 / 2026
        </p>
      </div>
    </motion.div>
  );
}
