"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useHeroTransition(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const hero = scope.current;
      if (!hero) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      const heroExitItems = [
        "[data-hero-kicker]",
        "[data-hero-title]",
        "[data-hero-description]",
        "[data-hero-actions]",
        "[data-hero-proof]",
        "[data-hero-float]",
      ].flatMap((selector) =>
        Array.from(hero.querySelectorAll<HTMLElement>(selector)),
      );

      timeline.to(
        heroExitItems,
        {
          y: (index) => -70 - index * 18,
          autoAlpha: (index) => (index < 2 ? 0.18 : 0),
          duration: 0.78,
          stagger: 0.018,
        },
        0,
      );
    },
    { scope },
  );
}
