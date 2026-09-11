"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export default function FinalCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="final-cta"
      data-nav-theme="neutral"
      aria-labelledby="final-cta-title"
      className="overflow-hidden bg-cream-200 pt-14 text-[#2a211d] scroll-mt-24 sm:pt-20 lg:pt-24"
    >
      <motion.div
        initial={false}
        whileInView={reducedMotion === false ? { y: [16, 0], opacity: [0.75, 1] } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid w-[90%] max-w-[1800px] gap-3 sm:grid-cols-[minmax(0,1fr)_clamp(8rem,12vw,15rem)] sm:gap-4"
      >
        <div
          data-cta-copy
          className="relative isolate flex min-h-64 flex-col justify-between gap-14 overflow-hidden rounded-4xl bg-[#fffaf5] p-6 sm:min-h-48 sm:gap-8 sm:p-7 lg:min-h-40 lg:flex-row lg:items-center lg:gap-4 lg:px-10 lg:py-8 xl:min-h-44 2xl:min-h-48 2xl:px-14"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 600 260"
            className="pointer-events-none absolute -bottom-12 left-[18%] -z-10 h-64 w-[38rem] max-w-none text-[#f06400] sm:left-[5%] lg:-bottom-[2.8vw] lg:left-1/2 lg:h-auto lg:w-[60%] lg:-translate-x-1/2"
          >
            <g stroke="currentColor" strokeOpacity=".18" strokeWidth="0.8">
              <path d="M290 220 5 75M290 220 80 0M290 220 160 0M290 220 230 0M290 220 295 0M290 220 360 0M290 220 440 0M290 220 550 0M290 220 600 85M290 220 600 185M290 220 590 260M290 220 20 260M290 220 0 175" />
            </g>
            <path
              fill="currentColor"
              d="M290 158Q302 174 313 163Q317 182 332 176Q331 195 349 196Q338 211 354 220Q338 229 349 244Q331 245 332 264Q317 258 313 277Q302 266 290 282Q278 266 267 277Q263 258 248 264Q249 245 231 244Q242 229 226 220Q242 211 231 196Q249 195 248 176Q263 182 267 163Q278 174 290 158Z"
            />
          </svg>

          <h2
            id="final-cta-title"
            className="max-w-72 font-display text-[1.9rem] font-extrabold leading-tight sm:max-w-none sm:text-3xl lg:whitespace-nowrap lg:text-[clamp(1.65rem,2.45vw,3rem)]"
          >
            Find, Order &amp; Enjoy
          </h2>

          <div className="relative self-start lg:ml-auto lg:max-w-[18rem] lg:self-auto lg:text-right 2xl:max-w-[23rem]">
            <svg
              aria-hidden="true"
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -right-1 -top-8 size-7 text-[#f06400] lg:-top-12 lg:right-14"
            >
              <path fill="currentColor" d="m20 0 3 12 8-8-3 12 12-2-10 8 9 7-12-1 1 12-8-10-7 10 1-12-12 1 10-8-12-7 12 2L8 4l9 8Z" />
            </svg>
            <p className="max-w-72 text-lg font-medium uppercase leading-tight sm:text-xl lg:text-[clamp(1.1rem,1.6vw,1.875rem)] 2xl:max-w-none">
              Your next favourite meal starts here!
            </p>
            <Link
              href="/restaurants"
              className="group mt-1 inline-flex min-h-11 items-center gap-1 text-base font-medium decoration-[#f06400] underline-offset-4 hover:underline focus-visible:rounded-sm sm:text-lg"
            >
              Explore restaurants
              <ArrowUpRight aria-hidden="true" className="size-4 text-[#f06400] transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div
          data-cta-media
          className="group relative min-h-40 overflow-hidden rounded-4xl bg-[#f4dfcc] sm:min-h-0"
        >
          <Image
            src="/images/food/hero-fast.webp"
            alt="Golden samosas with fresh peppers and dipping sauce"
            fill
            loading="lazy"
            sizes="(min-width: 2000px) 240px, (min-width: 1067px) 12vw, (min-width: 640px) 128px, 90vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-12 h-[20vw] max-h-72 w-full select-none overflow-hidden [perspective:600px] sm:mt-16 lg:mt-5 lg:h-[15vw]"
      >
        <svg
          viewBox="0 0 1400 250"
          className="h-full w-full origin-bottom text-[#2a211d]/20 blur-[1px] [transform:rotateX(32deg)_scale(1.12)] sm:blur-[2px]"
          preserveAspectRatio="none"
        >
          <text
            x="700"
            y="220"
            textAnchor="middle"
            textLength="1350"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="font-display text-[245px] font-extrabold"
          >
            QUICKBITE
          </text>
        </svg>
      </div>
    </section>
  );
}
