"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { animation } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import BackToTopButton from "../ui/BackToTopButton";
import StickyOrderBar from "../ui/StickyOrderBar";

export default function SiteShell({
  children,
  heroIntro = false,
}: {
  children: ReactNode;
  heroIntro?: boolean;
}) {
  const shellRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const introTargets = [
        "[data-intro-nav-parent]",
        "[data-intro-nav-shell]",
        "[data-intro-nav-content]",
        "[data-hero-map-detail]",
        "[data-hero-title]",
        "[data-hero-actions]",
        "[data-hero-float]",
        "[data-hero-next-image]",
        "[data-hero-image-stage]",
        "[data-hero-image-media]",
      ].join(",");

      if (reducedMotion) {
        gsap.set(introTargets, {
          autoAlpha: 1,
          clearProps: "transform,filter,clipPath",
        });
        return;
      }

      if (!heroIntro) {
        gsap.from("[data-intro-nav-parent]", {
          autoAlpha: 0,
          x: -56,
          clipPath: "inset(0 100% 0 0 round 999px)",
          duration: 1,
          ease: animation.ease.premium,
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: animation.ease.premium },
      });

      timeline
        .from("[data-intro-nav-parent]", {
          autoAlpha: 0,
          x: -96,
          clipPath: "inset(0 100% 0 0 round 999px)",
          duration: 1.18,
        })
        .from(
          "[data-intro-nav-shell]",
          {
            autoAlpha: 0,
            x: (index) => (index === 0 ? -44 : -62),
            scaleX: 0.95,
            transformOrigin: "left center",
            duration: 0.84,
            stagger: 0.1,
          },
          0.08,
        )
        .from(
          "[data-intro-nav-content] > *",
          {
            autoAlpha: 0,
            y: 8,
            duration: 0.48,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.5,
        )
        .from(
          "[data-hero-map-detail]",
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.97,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.28,
        )
        .from(
          "[data-hero-title] > span",
          {
            autoAlpha: 0,
            y: -46,
            filter: "blur(8px)",
            duration: 0.86,
            stagger: 0.13,
          },
          0.36,
        )
        .from(
          "[data-hero-float]",
          {
            autoAlpha: 0,
            y: -20,
            scale: 0.88,
            duration: 0.62,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.86,
        )
        .from(
          "[data-hero-actions] > *",
          {
            autoAlpha: 0,
            y: 32,
            scale: 0.95,
            duration: 0.54,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.98,
        )
        .from(
          "[data-hero-next-image]",
          {
            autoAlpha: 0,
            y: 64,
            scale: 1.025,
            clipPath: "inset(18% 0 0 0)",
            duration: 0.9,
          },
          0.94,
        )
        .from(
          "[data-hero-image-stage]",
          {
            scale: 1.04,
            duration: 0.92,
            ease: "power3.out",
          },
          1.04,
        );
    },
    { scope: shellRef, dependencies: [heroIntro] },
  );

  return (
    <div ref={shellRef} className="flex min-h-full flex-col">
      <SmoothScroll />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
      <StickyOrderBar />
    </div>
  );
}
