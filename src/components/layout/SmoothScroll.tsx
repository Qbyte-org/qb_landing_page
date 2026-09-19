"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { limitWheelDelta } from "@/lib/scroll-input";
import { bindScrollNavigation } from "@/lib/scroll-navigation";

declare global {
  interface Window {
    quickBiteLenis?: Lenis;
  }
}

export default function SmoothScroll({ enabled = true }: { enabled?: boolean }) {
  useGSAP(() => {
    if (!enabled) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis: Lenis = new Lenis({
        // The html element is fixed to h-full; observe the growing page body
        // so accordions and responsive layouts keep the scroll limit accurate.
        content: document.body,
        // Damping settles fast wheel bursts without restarting a long tween.
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.58,
        touchMultiplier: 1,
        // Native touch preserves browser momentum and selection gestures.
        syncTouch: false,
        stopInertiaOnNavigate: true,
        autoRaf: false,
        virtualScroll: (input) => {
          if (input.event.type === "wheel" && !input.event.ctrlKey && input.deltaY !== 0) {
            const delta = limitWheelDelta(
              input.deltaY,
              lenis.targetScroll - lenis.animatedScroll,
              window.innerHeight,
            );
            // Lenis ignores zero gestures before preventing native scrolling.
            // An epsilon keeps its event handling active without moving the target.
            input.deltaY = delta || Math.sign(input.deltaY) * Number.EPSILON;
          }
          return true;
        },
      });

      let scrollTime = 0;
      const updateLenis = (_time: number, elapsed: number) => {
        // A stalled frame must not fast-forward scrolling. Keep the existing
        // GSAP animation clock unchanged and cap only Lenis's elapsed time.
        scrollTime += Math.min(elapsed, 1000 / 30);
        lenis.raf(scrollTime);
      };
      const syncScrollTrigger = () => ScrollTrigger.update();

      window.quickBiteLenis = lenis;
      const unbindNavigation = bindScrollNavigation(lenis);
      lenis.on("scroll", syncScrollTrigger);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
      let disposed = false;
      let refreshFrame = 0;
      const refresh = () => {
        if (disposed) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
      };
      refresh();
      document.fonts?.ready.then(refresh).catch(() => undefined);

      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        unbindNavigation();
        lenis.off("scroll", syncScrollTrigger);
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
        if (window.quickBiteLenis === lenis) {
          delete window.quickBiteLenis;
        }
      };
    });
    return () => media.revert();
  }, { dependencies: [enabled], revertOnUpdate: true });

  return null;
}
