"use client";

import Lenis from "lenis";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

declare global {
  interface Window {
    quickBiteLenis?: Lenis;
  }
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.35,
      autoRaf: false,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    const syncScrollTrigger = () => ScrollTrigger.update();

    lenisRef.current = lenis;
    window.quickBiteLenis = lenis;
    lenis.on("scroll", syncScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      if (window.quickBiteLenis === lenis) {
        delete window.quickBiteLenis;
      }
    };
  });

  return null;
}
