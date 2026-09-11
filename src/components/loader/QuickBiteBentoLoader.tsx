"use client";

import { useRef } from "react";
import { ArrowRight, Bike, MapPin, ShoppingBasket } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticFillButton from "../ui/MagneticFillButton";

const pages = [
  { label: "Discover", title: "Good food.", accent: "Closer to home.", copy: "Your favourite local flavours, all in one place.", icon: MapPin, surface: "bg-paper text-ink", iconSurface: "border-ink/15 bg-cream-200 text-brand-dark" },
  { label: "Choose", title: "A little craving.", accent: "A lot of choice.", copy: "Find your usual. Make room for something new.", icon: ShoppingBasket, surface: "bg-[#1c120f] text-paper", iconSurface: "border-paper/20 bg-paper/10 text-paper" },
  { label: "Enjoy", title: "Your next bite.", accent: "On its way.", copy: "From the kitchens you love to the places you call home.", icon: Bike, surface: "bg-brand text-white", iconSurface: "border-white/30 bg-white/10 text-white" },
] as const;

export default function QuickBiteBentoLoader({
  onReady,
  onComplete,
  exiting,
}: {
  onReady: () => void;
  onComplete: () => void;
  exiting: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef(onReady);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    let requested = false;
    let sequence: gsap.core.Timeline | undefined;
    let deferred: gsap.core.Tween | undefined;
    function ready() {
      if (requested) return;
      requested = true;
      sequence?.kill();
      deferred?.kill();
      onReady();
    }
    skipRef.current = ready;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      deferred = gsap.delayedCall(0, ready);
    } else {
      sequence = gsap.timeline({ onComplete: ready });
      sequence.from("[data-loader-copy='0']", { opacity: 0, y: 16, duration: 0.38, stagger: 0.06, ease: "power3.out" });
      pages.slice(1).forEach((_, offset) => {
        const index = offset + 1;
        const position = index * 0.86;
        sequence!
          .to('[data-loader-page="' + (index - 1) + '"]', { autoAlpha: 0, yPercent: -5, duration: 0.3, ease: "power2.inOut" }, position)
          .fromTo('[data-loader-page="' + index + '"]', { autoAlpha: 0, xPercent: 6 }, { autoAlpha: 1, xPercent: 0, duration: 0.38, ease: "power3.out" }, position)
          .from('[data-loader-copy="' + index + '"]', { y: 18, opacity: 0, duration: 0.32, stagger: 0.05, ease: "power3.out" }, position + 0.08)
          .set(container, { attr: { "data-active-page": index + 1 } }, position);
      });
      sequence.to({}, { duration: 0.62 });
    }
    return () => {
      sequence?.kill();
      deferred?.kill();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, { scope: containerRef, dependencies: [onReady] });

  useGSAP(() => {
    if (!exiting) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The shell has already prepared its entrance before this overlay fades.
    gsap.to(containerRef.current, {
      autoAlpha: 0,
      duration: reduced ? 0 : 0.24,
      ease: "power2.out",
      onComplete,
    });
  }, { scope: containerRef, dependencies: [exiting, onComplete], revertOnUpdate: true });

  return (
    <div
      ref={containerRef}
      data-quickbite-loader
      data-active-page="1"
      data-lenis-prevent
      aria-label="Welcome to QuickBite"
      className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-y-auto bg-cream-200 px-5 py-5 text-ink sm:px-10 sm:py-8"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 text-xs font-medium sm:text-sm">
        <span className="font-display font-bold">QuickBite</span>
        <span className="text-right text-cocoa">A little local goodness.</span>
      </div>

      <div aria-hidden="true" className="relative my-6 min-h-80 flex-1 overflow-hidden rounded-[1.75rem] sm:my-8 sm:rounded-[2.5rem]">
        {pages.map(({ label, title, accent, copy, icon: Icon, surface, iconSurface }, index) => (
          <div key={label} data-loader-page={index} className={["absolute inset-0 flex flex-col justify-between gap-4 p-6 sm:p-10 lg:p-16", surface, index === 0 ? "visible" : "invisible"].join(" ")}>
            <div className="flex items-center justify-between gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:text-xs">
              <span>QuickBite / {label}</span>
              <span className="tabular-nums">0{index + 1} / 03</span>
            </div>
            <div className="grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_12rem]">
              <div>
                <p data-loader-copy={index} className="font-display text-[clamp(2rem,6.4vw,6.25rem)] font-semibold leading-[1.06] tracking-[0.01em]!">
                  {title}<span className="mt-1 block">{accent}</span>
                </p>
                <p data-loader-copy={index} className="mt-5 max-w-md text-sm leading-relaxed opacity-80 sm:text-lg">{copy}</p>
              </div>
              <div data-loader-copy={index} className={["hidden aspect-square items-center justify-center rounded-full border sm:flex sm:size-24 lg:size-48", iconSurface].join(" ")}>
                <Icon className="size-10 lg:size-20" strokeWidth={1.15} />
              </div>
            </div>
            <div className="flex gap-2">
              {pages.map((page, step) => <span key={page.label} className={["h-1 w-10 rounded-full bg-current sm:w-16", step === index ? "opacity-90" : "opacity-20"].join(" ")} />)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4">
        <p role="status" className="text-xs text-cocoa sm:text-sm">Welcome to QuickBite.</p>
        <MagneticFillButton
          type="button"
          variant="light"
          onClick={() => skipRef.current()}
          className="group min-h-11 rounded-full border! border-ink/20 bg-paper! px-4 text-xs font-medium text-ink! sm:text-sm"
        >
          Skip intro
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
        </MagneticFillButton>
      </div>
    </div>
  );
}
