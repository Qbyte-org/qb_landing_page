"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

function getBorderRadius(element: HTMLElement) {
  const radius = Number.parseFloat(getComputedStyle(element).borderTopLeftRadius);
  return Number.isFinite(radius) ? radius : 32;
}

function getImageHandoff(stage: HTMLElement, target: HTMLElement) {
  const previousTransform = stage.style.transform;
  const previousClipPath = stage.style.clipPath;
  const previousBorderRadius = stage.style.borderRadius;

  stage.style.transform = "none";
  stage.style.clipPath = "";
  stage.style.borderRadius = "";

  const scrollY = window.scrollY || window.pageYOffset;
  const stageRect = stage.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const stageDocLeft = stageRect.left + window.scrollX;
  const stageDocTop = stageRect.top + scrollY;
  const targetDocLeft = targetRect.left + window.scrollX;
  const targetDocTop = targetRect.top + scrollY;
  const scale = Math.max(0.08, targetRect.width / Math.max(stageRect.width, 1));
  const visibleHeight = targetRect.height / scale;
  const visibleWidth = targetRect.width / scale;
  const bottomInset = Math.max(0, stageRect.height - visibleHeight);
  const rightInset = Math.max(0, stageRect.width - visibleWidth);
  const radius = getBorderRadius(target) / scale;

  stage.style.transform = previousTransform;
  stage.style.clipPath = previousClipPath;
  stage.style.borderRadius = previousBorderRadius;

  return {
    x: targetDocLeft - stageDocLeft,
    y: targetDocTop - stageDocTop,
    scale,
    clipPath: `inset(0px ${rightInset}px ${bottomInset}px 0px round ${radius}px)`,
    radius: `${radius}px`,
  };
}

export function useHeroTransition(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const hero = scope.current;
      if (!hero) return;

      const stage = hero.querySelector<HTMLElement>("[data-hero-image-stage]");
      const target = document.querySelector<HTMLElement>("[data-hero-image-target]");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        if (stage) {
          gsap.set(stage, { clearProps: "transform,clipPath,borderRadius" });
        }
        return;
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
        "[data-hero-float]",
      ].flatMap((selector) =>
        Array.from(hero.querySelectorAll<HTMLElement>(selector)),
      );

      if (stage && target) {
        gsap.set(stage, {
          transformOrigin: "top left",
          willChange: "transform, clip-path, border-radius",
          zIndex: 35,
          force3D: true,
        });

        timeline.to(
          stage,
          {
            x: () => getImageHandoff(stage, target).x,
            y: () => getImageHandoff(stage, target).y,
            scale: () => getImageHandoff(stage, target).scale,
            clipPath: () => getImageHandoff(stage, target).clipPath,
            borderRadius: () => getImageHandoff(stage, target).radius,
            duration: 1,
            ease: "none",
          },
          0,
        );
      }

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
