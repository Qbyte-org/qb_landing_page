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
        "[data-intro-nav]",
        "[data-hero-kicker]",
        "[data-hero-title]",
        "[data-hero-description]",
        "[data-hero-actions]",
        "[data-hero-proof]",
        "[data-hero-image-reveal]",
        "[data-hero-decor]",
      ].join(",");

      if (reducedMotion) {
        gsap.set(introTargets, {
          autoAlpha: 1,
          clearProps: "transform,filter,clipPath",
        });
        return;
      }

      if (!heroIntro) {
        gsap.from("[data-intro-nav]", {
          autoAlpha: 0,
          y: -12,
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
        .from('[data-intro-nav="logo"]', {
          autoAlpha: 0,
          y: -14,
          duration: 0.34,
        })
        .from(
          '[data-intro-nav]:not([data-intro-nav="logo"])',
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.32,
            stagger: 0.04,
          },
          "-=0.2",
        )
        .from(
          "[data-hero-kicker]",
          { autoAlpha: 0, y: 22, filter: "blur(8px)", duration: 0.36 },
          "-=0.12",
        )
        .from(
          "[data-hero-title] > span",
          {
            autoAlpha: 0,
            y: 40,
            filter: "blur(10px)",
            duration: 0.5,
            stagger: 0.07,
          },
          "-=0.22",
        )
        .from(
          "[data-hero-description]",
          { autoAlpha: 0, y: 24, filter: "blur(7px)", duration: 0.38 },
          "-=0.3",
        )
        .from(
          "[data-hero-actions] > *",
          { autoAlpha: 0, y: 20, duration: 0.34, stagger: 0.04 },
          "-=0.22",
        )
        .from(
          "[data-hero-proof] > *",
          { autoAlpha: 0, y: 16, duration: 0.3, stagger: 0.03 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-image-reveal]",
          { clipPath: "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0 0 0%)",
            duration: 0.75,
            ease: "power4.inOut",
          },
          0.28,
        )
        .from(
          "[data-hero-decor]",
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.44,
            stagger: 0.05,
          },
          "-=0.34",
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
