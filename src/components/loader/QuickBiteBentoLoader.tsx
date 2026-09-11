"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Utensils } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticFillButton from "../ui/MagneticFillButton";

interface QuickBiteBentoLoaderProps {
  onComplete: () => void;
}

// A fixed pattern keeps the decorative ticket identical on server and client.
const barcode = [2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1];

export default function QuickBiteBentoLoader({
  onComplete,
}: QuickBiteBentoLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<(() => void) | null>(null);
  const completedRef = useRef(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const previousOverflow = document.body.style.overflow;
      let timeline: gsap.core.Timeline | undefined;
      let deferredCompletion: gsap.core.Tween | undefined;

      const complete = () => {
        if (completedRef.current) return;
        completedRef.current = true;
        timeline?.kill();
        deferredCompletion?.kill();
        document.body.style.overflow = previousOverflow;
        onComplete();
      };

      skipRef.current = complete;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // No entrance or delay for people who prefer less motion.
        deferredCompletion = gsap.delayedCall(0, complete);
      } else {
        document.body.style.overflow = "hidden";
        timeline = gsap.timeline({ onComplete: complete });
        timeline
          .from("[data-loader-ticket]", {
            y: 24,
            opacity: 0,
            duration: 0.46,
            ease: "power3.out",
          })
          .from(
            "[data-loader-copy]",
            {
              y: 10,
              opacity: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            0.12,
          )
          .from(
            "[data-loader-seal]",
            {
              scale: 0.75,
              rotation: -18,
              opacity: 0,
              duration: 0.34,
              ease: "back.out(1.3)",
            },
            0.3,
          )
          .to(
            "[data-loader-ticket]",
            { y: -12, opacity: 0, duration: 0.24, ease: "power2.in" },
            0.98,
          )
          .to(container, { opacity: 0, duration: 0.24 }, 1.08);
      }

      return () => {
        timeline?.kill();
        deferredCompletion?.kill();
        skipRef.current = null;
        document.body.style.overflow = previousOverflow;
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      data-quickbite-loader
      data-lenis-prevent
      aria-label="Welcome to QuickBite"
      className="fixed inset-0 z-[9999] flex touch-none flex-col justify-between overflow-y-auto bg-cream-200 px-5 py-5 text-ink sm:px-10 sm:py-8"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 text-xs font-medium sm:text-sm">
        <span className="font-display font-bold">QuickBite</span>
        <span className="text-cocoa">A little local goodness.</span>
      </div>

      <div className="grid flex-1 place-items-center py-7 sm:py-10">
        <div
          data-loader-ticket
          className="relative grid w-full max-w-[54rem] overflow-hidden rounded-2xl border border-ink/15 bg-paper sm:grid-cols-[minmax(0,1fr)_12rem] lg:grid-cols-[minmax(0,1fr)_15rem]"
        >
          <div className="p-6 sm:p-10 lg:p-12">
            <div data-loader-copy className="mb-6 flex items-center gap-2.5 sm:mb-10">
              <span className="grid size-8 place-items-center rounded-full bg-peach text-brand-dark">
                <Utensils aria-hidden="true" className="size-4" />
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:text-xs">
                From your neighbourhood
              </span>
            </div>

            <p data-loader-copy className="font-display text-[clamp(2rem,5.5vw,4rem)] font-extrabold leading-[1.08] tracking-tight">
              Good food.<br />
              <span className="text-brand-dark">Great moments.</span>
            </p>
            <p data-loader-copy className="mt-4 max-w-64 text-sm leading-relaxed text-cocoa sm:mt-5 sm:text-base">
              Your favourite flavours, just a bite away.
            </p>

            <div data-loader-copy className="mt-6 flex items-center justify-between gap-4 border-t border-ink/15 pt-4 sm:mt-10 sm:pt-5">
              <span className="text-xs font-medium sm:text-sm">Find. Order. Enjoy.</span>
              <ArrowUpRight aria-hidden="true" className="size-5 text-brand-dark" />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative flex items-center justify-between gap-5 border-t border-dashed border-ink/25 bg-peach/60 px-6 py-4 sm:flex-col sm:justify-center sm:gap-10 sm:border-l sm:border-t-0 sm:px-6 sm:py-10"
          >
            <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full border border-ink/15 bg-cream-200" />
            <span className="absolute -right-2.5 -top-2.5 size-5 rounded-full border border-ink/15 bg-cream-200 sm:-bottom-2.5 sm:-left-2.5 sm:right-auto sm:top-auto" />

            <div data-loader-seal className="relative grid size-16 shrink-0 place-items-center text-paper sm:size-28">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-brand-dark">
                <path
                  fill="currentColor"
                  d="m50 0 8 12 13-7 2 15 15 1-5 14 13 8-11 10 10 12-15 5 1 15-15-1-6 14-12-9-10 11-8-13-14 4-1-15-14-3 7-13-12-8 12-9-5-14 15-1 2-15 13 7Z"
                />
              </svg>
              <span className="relative -rotate-12 text-center font-display text-xs font-bold leading-tight sm:text-lg">
                Made<br />for you.
              </span>
            </div>

            <div className="min-w-0 text-center">
              <div className="mx-auto flex h-8 max-w-32 items-stretch justify-center gap-[3px] overflow-hidden text-ink sm:h-16">
                {barcode.map((width, index) => (
                  <span key={index} className="shrink-0 bg-current" style={{ width }} />
                ))}
              </div>
              <p className="mt-2 text-[0.55rem] font-medium uppercase tracking-[0.25em] sm:mt-3 sm:text-[0.6rem]">
                Your next good bite
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4">
        <p role="status" className="text-xs text-cocoa sm:text-sm">Welcome to QuickBite.</p>
        <MagneticFillButton
          type="button"
          variant="light"
          customFillClass="bg-ink"
          customHoverTextColor="#fffaf5"
          onClick={() => skipRef.current?.()}
          className="group min-h-11 rounded-full border! border-ink/20 bg-paper! px-4 text-xs font-medium text-ink! sm:text-sm"
        >
          Skip intro
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
        </MagneticFillButton>
      </div>
    </div>
  );
}
