"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

function getBorderRadius(element: HTMLElement) {
  const styles = getComputedStyle(element);
  const radii = [
    styles.borderTopLeftRadius,
    styles.borderTopRightRadius,
    styles.borderBottomRightRadius,
    styles.borderBottomLeftRadius,
  ]
    .map((value) => Number.parseFloat(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  return radii[0] ?? 32;
}

function getImageHandoff(stage: HTMLElement, target: HTMLElement) {
  const previousTransform = stage.style.transform;
  const previousClipPath = stage.style.clipPath;
  const previousBorderRadius = stage.style.borderRadius;
  const previousWidth = stage.style.width;
  const previousHeight = stage.style.height;

  stage.style.transform = "none";
  stage.style.clipPath = "";
  stage.style.borderRadius = "";
  stage.style.width = "";
  stage.style.height = "";

  const scrollY = window.scrollY || window.pageYOffset;
  const stageRect = stage.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const stageDocLeft = stageRect.left + window.scrollX;
  const stageDocTop = stageRect.top + scrollY;
  const targetDocLeft = targetRect.left + window.scrollX;
  const targetDocTop = targetRect.top + scrollY;
  const radius = getBorderRadius(target);

  stage.style.transform = previousTransform;
  stage.style.clipPath = previousClipPath;
  stage.style.borderRadius = previousBorderRadius;
  stage.style.width = previousWidth;
  stage.style.height = previousHeight;

  return {
    x: targetDocLeft - stageDocLeft,
    y: targetDocTop - stageDocTop,
    width: targetRect.width,
    height: targetRect.height,
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
          gsap.set(stage, {
            clearProps: "transform,clipPath,borderRadius,width,height",
          });
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
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          transformOrigin: "top left",
          willChange: "transform, width, height, border-radius",
          zIndex: 35,
          force3D: true,
        });

        timeline
          .to(
            stage,
            {
              x: () => getImageHandoff(stage, target).x,
              y: () => getImageHandoff(stage, target).y,
              duration: 1,
              ease: "none",
            },
            0,
          )
          .to(
            stage,
            {
              width: () => getImageHandoff(stage, target).width,
              duration: 0.58,
              ease: "none",
            },
            0,
          )
          .to(
            stage,
            {
              height: () => getImageHandoff(stage, target).height,
              duration: 0.82,
              ease: "none",
            },
            0,
          )
          .to(
            stage,
            {
              borderRadius: () => getImageHandoff(stage, target).radius,
              duration: 0.42,
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
