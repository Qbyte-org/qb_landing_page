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
        "[data-hero-route]",
        "[data-hero-title]",
        "[data-hero-actions]",
        "[data-hero-float]",
        "[data-hero-next-image]",
        "[data-hero-image-media]",
        "[data-hero-bike]",
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
          x: -80,
          clipPath: "inset(0 100% 0 0 round 999px)",
          duration: 0.92,
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
          x: -170,
          clipPath: "inset(0 100% 0 0 round 999px)",
          duration: 1.16,
        })
        .from("[data-intro-nav-shell]", {
          autoAlpha: 0,
          x: -30,
          scaleX: 0.94,
          transformOrigin: "left center",
          duration: 0.66,
          stagger: 0.08,
        }, "-=0.5")
        .from(
          "[data-intro-nav-content]",
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.42,
            stagger: 0.035,
          },
          "-=0.3",
        )
        .from(
          "[data-hero-map-detail]",
          {
            autoAlpha: 0,
            y: 20,
            scale: 0.96,
            duration: 0.78,
            stagger: 0.08,
          },
          0.28,
        )
        .from(
          "[data-hero-route]",
          {
            autoAlpha: 0,
            y: 22,
            scale: 0.985,
            duration: 0.72,
          },
          0.42,
        )
        .from(
          "[data-hero-title] > span",
          {
            autoAlpha: 0,
            y: -64,
            filter: "blur(8px)",
            duration: 0.88,
            stagger: 0.14,
          },
          0.56,
        )
        .from(
          "[data-hero-float]",
          {
            autoAlpha: 0,
            y: -24,
            scale: 0.86,
            duration: 0.72,
            stagger: 0.08,
          },
          0.86,
        )
        .from(
          "[data-hero-actions] > *",
          { autoAlpha: 0, y: 34, scale: 0.94, duration: 0.52, stagger: 0.07 },
          1.16,
        )
        .from(
          "[data-hero-next-image]",
          {
            autoAlpha: 0,
            y: 58,
            scale: 1.025,
            clipPath: "inset(18% 0 0 0)",
            duration: 0.82,
          },
          0.94,
        )
        .from(
          "[data-hero-image-media]",
          {
            scale: 1.05,
            duration: 0.9,
          },
          1.02,
        )
        .from(
          "[data-hero-bike]",
          {
            autoAlpha: 0,
            scale: 0.84,
            duration: 0.5,
          },
          1.28,
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
