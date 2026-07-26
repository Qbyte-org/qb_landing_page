"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { animation } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import Header from "./Header";
import Footer from "./Footer";
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
        "[data-intro-nav-shell]",
        "[data-intro-nav-content]",
        "[data-hero-title]",
        "[data-hero-actions]",
        "[data-hero-next-image]",
      ].join(",");

      if (reducedMotion) {
        gsap.set(introTargets, {
          autoAlpha: 1,
          clearProps: "transform,filter,clipPath",
        });
        return;
      }

      if (!heroIntro) {
        gsap.from("[data-intro-nav-shell]", {
          autoAlpha: 0,
          x: -24,
          duration: animation.duration.base,
          stagger: 0.06,
          ease: animation.ease.premium,
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: animation.ease.premium },
      });

      timeline
        .from("[data-intro-nav-shell]", {
          autoAlpha: 0,
          x: -46,
          scaleX: 0.96,
          transformOrigin: "left center",
          duration: 0.54,
          stagger: 0.06,
        })
        .from(
          "[data-intro-nav-content]",
          {
            autoAlpha: 0,
            y: 8,
            duration: 0.34,
            stagger: 0.035,
          },
          "-=0.34",
        )
        .from(
          "[data-hero-title] > span",
          {
            autoAlpha: 0,
            y: -44,
            filter: "blur(10px)",
            duration: 0.72,
            stagger: 0.1,
          },
          0.48,
        )
        .from(
          "[data-hero-actions] > *",
          { autoAlpha: 0, y: 24, duration: 0.42, stagger: 0.07 },
          0.96,
        )
        .from(
          "[data-hero-next-image]",
          {
            autoAlpha: 0,
            y: 46,
            scale: 1.025,
            duration: 0.74,
          },
          0.72,
        );
    },
    { scope: shellRef, dependencies: [heroIntro] },
  );

  return (
    <div ref={shellRef} className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyOrderBar />
    </div>
  );
}
