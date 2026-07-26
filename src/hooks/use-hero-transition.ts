"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type TransitionMetrics = {
  x: number;
  y: number;
  scale: number;
  clipPath: string;
};

function getTransitionMetrics(
  hero: HTMLElement,
  stage: HTMLElement,
  target: HTMLElement,
): TransitionMetrics {
  const targetRect = target.getBoundingClientRect();
  const heroDocumentTop = hero.getBoundingClientRect().top + window.scrollY;
  const targetDocumentTop = targetRect.top + window.scrollY;
  const endScroll = heroDocumentTop + hero.offsetHeight;
  const targetTopAtEnd = targetDocumentTop - endScroll;
  const sourceWidth = stage.offsetWidth;
  const sourceHeight = stage.offsetHeight;
  const scale = Math.max(
    targetRect.width / sourceWidth,
    targetRect.height / sourceHeight,
  );
  const visibleSourceWidth = targetRect.width / scale;
  const visibleSourceHeight = targetRect.height / scale;
  const cropLeft = Math.max(0, (sourceWidth - visibleSourceWidth) / 2);
  const cropTop = Math.max(0, (sourceHeight - visibleSourceHeight) / 2);
  const cropRight = Math.max(0, sourceWidth - visibleSourceWidth - cropLeft);
  const cropBottom = Math.max(0, sourceHeight - visibleSourceHeight - cropTop);
  const targetRadius =
    Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 32;
  const radius = targetRadius / scale;

  return {
    x: targetRect.left - cropLeft * scale,
    y: targetTopAtEnd - cropTop * scale,
    scale,
    clipPath: `inset(${cropTop}px ${cropRight}px ${cropBottom}px ${cropLeft}px round ${radius}px)`,
  };
}

export function useHeroTransition(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const hero = scope.current;
      const stage = hero?.querySelector<HTMLElement>("[data-hero-image-stage]");
      const target = document.querySelector<HTMLElement>("[data-hero-image-target]");
      const overlay = hero?.querySelector<HTMLElement>("[data-hero-overlay]");
      if (!hero) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        if (stage) {
          gsap.set(stage, { clearProps: "transform,clipPath,opacity,visibility" });
        }
        if (target) {
          gsap.set(target, { autoAlpha: 1, clearProps: "transform" });
        }
        return;
      }

      if (stage && target) {
        gsap.set(stage, {
          transformOrigin: "top left",
          force3D: true,
          clipPath: "inset(0px 0px 0px 0px round 0px)",
        });
        gsap.set(target, { autoAlpha: 0, scale: 0.96, transformOrigin: "center" });
      }

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
      ].flatMap((selector) =>
        Array.from(hero.querySelectorAll<HTMLElement>(selector)),
      );

      if (stage && target) {
        timeline.to(
          stage,
          {
            x: () => getTransitionMetrics(hero, stage, target).x,
            y: () => getTransitionMetrics(hero, stage, target).y,
            scale: () => getTransitionMetrics(hero, stage, target).scale,
            clipPath: () => getTransitionMetrics(hero, stage, target).clipPath,
            duration: 1,
          },
          0,
        );
      }

      timeline.to(
        heroExitItems,
        {
          y: (index) => -70 - index * 22,
          autoAlpha: (index) => (index === 0 ? 0.12 : 0),
          duration: 0.78,
          stagger: 0.018,
        },
        0,
      );

      if (overlay) {
        timeline.to(overlay, { autoAlpha: 0.45, duration: 0.82 }, 0);
      }

      const nextImage = document.querySelector<HTMLElement>("[data-hero-next-image]");
      if (nextImage) {
        gsap.set(nextImage, { transformOrigin: "top center", force3D: true });
        timeline.to(
          nextImage,
          {
            y: -72,
            scale: 0.955,
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "3.25rem",
            duration: 1,
          },
          0,
        );
      }

      if (stage && target) {
        timeline
          .to(stage, { autoAlpha: 0, duration: 0.14 }, 0.88)
          .to(target, { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.82);
      }
    },
    { scope },
  );
}
