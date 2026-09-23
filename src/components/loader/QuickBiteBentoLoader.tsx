"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import FoodImage from "../ui/FoodImage";
import MagneticFillButton from "../ui/MagneticFillButton";

const initialGrid = {
  "--tile-left": "46%",
  "--tile-right": "54%",
  "--tile-top": "44%",
  "--tile-bottom": "56%",
} as CSSProperties;

const photographs = [
  { src: "/images/food/pinterest/jollof-chicken-plantain.webp", alt: "Jollof rice, glazed chicken and fried plantain" },
  { src: "/images/food/pinterest/akara-bean-cakes.webp", alt: "Freshly fried golden akara" },
  { src: "/images/food/pinterest/pounded-yam-greens.webp", alt: "Pounded yam served with leafy vegetable soup" },
];

/** An opening story, not a simulated network loading indicator. */
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
  const stageRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const callbacksRef = useRef({ onReady, onComplete });
  const requestedRef = useRef(false);
  const completedRef = useRef(false);

  // Updating shell callbacks must not recreate or fast-forward the intro.
  useEffect(() => {
    callbacksRef.current = { onReady, onComplete };
  }, [onReady, onComplete]);

  useGSAP(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // The page beneath is inert. Start keyboard users on the intro's one action.
    container.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });

    let disposed = false;
    requestedRef.current = false;
    completedRef.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function ready(reason: "completed" | "skipped") {
      if (requestedRef.current || disposed) return;
      requestedRef.current = true;
      sequence.pause();
      container!.dataset.introPlayback = reason;
      callbacksRef.current.onReady();
    }
    const sequence = gsap.timeline({ paused: true, onComplete: () => ready("completed") });
    skipRef.current = () => ready("skipped");

    // Every visitor gets the complete story. Reduced motion keeps the same
    // frames and reading time, using a fixed grid and gentle crossfades.
    if (reduced) {
      gsap.set(stage, {
        "--tile-left": "18%", "--tile-right": "82%",
        "--tile-top": "24%", "--tile-bottom": "76%",
      });
    }
    sequence
      .set(container, { attr: { "data-intro-frame": "brand" } }, 0)
      .fromTo(stage, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
      .from("[data-loader-brand]", { opacity: 0, ...(reduced ? {} : { scale: 0.7 }), duration: 0.5, ease: "power3.out" }, 0.08)
      .set(container, { attr: { "data-intro-frame": "discover" } }, 2.6)
      .to("[data-loader-brand]", { opacity: 0, duration: 0.5 }, 2.6)
      .fromTo('[data-loader-photo="0"]', { opacity: 0, ...(reduced ? {} : { scale: 1.13 }) }, { opacity: 1, ...(reduced ? {} : { scale: 1 }), duration: 1.2, ease: "power2.out" }, 2.6)
      .to("[data-loader-label]", { opacity: 1, duration: 0.6, stagger: reduced ? 0 : 0.08 }, 2.8)
      .set(container, { attr: { "data-intro-frame": "order" } }, 7)
      .fromTo('[data-loader-photo="1"]', { opacity: 0, ...(reduced ? {} : { scale: 1.1 }) }, { opacity: 1, ...(reduced ? {} : { scale: 1 }), duration: 1.2, ease: "power2.out" }, 7)
      .set(container, { attr: { "data-intro-frame": "enjoy" } }, 11.4)
      .fromTo('[data-loader-photo="2"]', { opacity: 0, ...(reduced ? {} : { scale: 1.1 }) }, { opacity: 1, ...(reduced ? {} : { scale: 1 }), duration: 1.2, ease: "power2.out" }, 11.4)
      // Complete the last photograph, then retrace the opening grid. Readiness
      // is sent only after this closing chapter, never when the page loads.
      .set(container, { attr: { "data-intro-frame": "closing" } }, 16)
      .to("[data-loader-label]", { opacity: 0, duration: 0.6 }, 16)
      .to("[data-loader-photo]", { opacity: 0, duration: 0.75 }, 16.6)
      .to("[data-loader-brand]", { opacity: 1, duration: 0.6 }, 17)
      .to({}, { duration: 0.8 }, 19.2);

    if (!reduced) {
      sequence
        .to(stage, {
          "--tile-left": "34%", "--tile-right": "66%",
          "--tile-top": "35%", "--tile-bottom": "65%",
          duration: 1.3, ease: "power3.inOut",
        }, 0)
        .to(stage, {
          "--tile-left": "18%", "--tile-right": "82%",
          "--tile-top": "24%", "--tile-bottom": "76%",
          duration: 1.4, ease: "power3.inOut",
        }, 2.5)
        .to(stage, {
          "--tile-left": "12%", "--tile-right": "88%",
          "--tile-top": "20%", "--tile-bottom": "80%",
          duration: 1.8, ease: "power2.inOut",
        }, 4.6)
        .to(stage, {
          "--tile-left": "24%", "--tile-right": "88%",
          "--tile-top": "20%", "--tile-bottom": "70%",
          duration: 1.4, ease: "power3.inOut",
        }, 7)
        .to(stage, {
          "--tile-left": "10%", "--tile-right": "76%",
          "--tile-top": "16%", "--tile-bottom": "82%",
          duration: 1.8, ease: "power2.inOut",
        }, 8.8)
        .to(stage, {
          "--tile-left": "18%", "--tile-right": "82%",
          "--tile-top": "26%", "--tile-bottom": "78%",
          duration: 1.4, ease: "power3.inOut",
        }, 11.4)
        .to(stage, {
          "--tile-left": "8%", "--tile-right": "92%",
          "--tile-top": "17%", "--tile-bottom": "83%",
          duration: 1.8, ease: "power2.inOut",
        }, 13.4)
        .to(stage, {
          "--tile-left": "34%", "--tile-right": "66%",
          "--tile-top": "35%", "--tile-bottom": "65%",
          duration: 1.5, ease: "power3.inOut",
        }, 16)
        .to(stage, {
          ...initialGrid,
          duration: 1.5, ease: "power3.inOut",
        }, 17.7);
    }

    const syncVisibility = () => {
      if (requestedRef.current || disposed) return;
      sequence.paused(document.hidden);
      container.dataset.introPlayback = document.hidden ? "paused" : "playing";
    };
    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();

    return () => {
      disposed = true;
      sequence.kill();
      document.removeEventListener("visibilitychange", syncVisibility);
      skipRef.current = () => {};
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    if (!exiting || !requestedRef.current) return;
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The hero remains hidden until this exit has also finished.
    const exit = gsap.to(containerRef.current, {
      autoAlpha: 0,
      paused: true,
      duration: reduced ? 0.15 : 0.28,
      ease: "power2.out",
      onComplete: () => {
        if (disposed || completedRef.current) return;
        completedRef.current = true;
        callbacksRef.current.onComplete();
      },
    });
    const syncVisibility = () => exit.paused(document.hidden);
    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();
    return () => {
      disposed = true;
      exit.kill();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, { scope: containerRef, dependencies: [exiting], revertOnUpdate: true });

  return (
    <div
      ref={containerRef}
      data-quickbite-loader
      data-intro-frame="brand"
      data-intro-playback="pending"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to QuickBite"
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-paper px-5 py-5 text-ink sm:px-10 sm:py-8"
    >
      <div className="flex shrink-0 items-center justify-between gap-4">
        <span className="flex items-center gap-2.5 font-display text-base font-semibold sm:text-lg">
          <Image src="/logo-mark.svg" alt="" width={34} height={34} priority className="size-8" />
          QuickBite
        </span>
        <span className="max-w-32 text-right text-xs text-cocoa sm:max-w-none sm:text-sm">A little local goodness.</span>
      </div>

      <div ref={stageRef} style={initialGrid} aria-hidden="true" className="relative my-5 min-h-0 flex-1 sm:my-7">
        <div className="absolute inset-y-0 left-[var(--tile-left)] w-px bg-brand/45" />
        <div className="absolute inset-y-0 left-[var(--tile-right)] w-px bg-brand/45" />
        <div className="absolute inset-x-0 top-[var(--tile-top)] h-px bg-brand/45" />
        <div className="absolute inset-x-0 top-[var(--tile-bottom)] h-px bg-brand/45" />

        <div className="absolute left-[var(--tile-left)] top-[var(--tile-top)] h-[calc(var(--tile-bottom)-var(--tile-top))] w-[calc(var(--tile-right)-var(--tile-left))] overflow-hidden bg-brand">
          <div data-loader-brand className="absolute inset-0 flex items-center justify-center">
            <Image src="/logo-mark-light.svg" alt="" width={100} height={100} priority className="size-[clamp(2.5rem,9vw,7rem)]" />
          </div>
          {photographs.map((photograph, index) => (
            <div key={photograph.src} data-loader-photo={index} className="absolute inset-0 opacity-0">
              <FoodImage src={photograph.src} alt={photograph.alt} fill priority sizes="(min-width: 1280px) 65vw, 75vw" className="object-cover" />
            </div>
          ))}
        </div>

        <span data-loader-label className="absolute left-[var(--tile-left)] top-[var(--tile-top)] -translate-y-full pb-1 font-display text-[clamp(2.1rem,6.8vw,6.5rem)] font-semibold leading-none tracking-[-0.06em] text-brand opacity-0">GOOD</span>
        <span data-loader-label className="absolute right-[calc(100%-var(--tile-right))] top-[var(--tile-bottom)] pt-1 font-display text-[clamp(2.1rem,6.8vw,6.5rem)] font-semibold leading-none tracking-[-0.06em] text-brand opacity-0">FOOD.</span>

        <span data-loader-label className="absolute right-[calc(100%-var(--tile-left))] top-[var(--tile-top)] hidden max-w-28 pr-3 pt-3 text-right text-[0.65rem] font-medium uppercase leading-tight tracking-[0.08em] text-cocoa opacity-0 sm:block">Familiar kitchens.<br />Fresh possibilities.</span>
        <span data-loader-label className="absolute left-[var(--tile-right)] top-[var(--tile-bottom)] hidden max-w-24 -translate-y-full pb-3 pl-3 text-[0.65rem] font-medium uppercase leading-tight tracking-[0.08em] text-cocoa opacity-0 lg:block">Every craving<br />has a home.</span>
        <span data-loader-label className="absolute left-[var(--tile-left)] top-[var(--tile-bottom)] mt-4 hidden max-w-28 text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.12em] text-cocoa opacity-0 sm:block">Discover.<br />Order. Enjoy.</span>

        {["top", "bottom"].flatMap((vertical) => ["left", "right"].map((horizontal) => (
          <span key={`${vertical}-${horizontal}`} className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" style={{ left: `var(--tile-${horizontal})`, top: `var(--tile-${vertical})` }} />
        )))}
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
