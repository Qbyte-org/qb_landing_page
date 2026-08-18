"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { animation } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import BackToTopButton from "../ui/BackToTopButton";
import StickyOrderBar from "../ui/StickyOrderBar";
import QuickBiteBentoLoader from "../loader/QuickBiteBentoLoader";

export default function SiteShell({
  children,
  heroIntro = false,
}: {
  children: ReactNode;
  heroIntro?: boolean;
}) {
  const shellRef = useRef<HTMLDivElement>(null);

  // loaderDone starts true on pages without a loader,
  // false on the homepage so the hero intro waits for the loader.
  // onComplete is called at the START of the loader outro (t=2.8s),
  // giving a ~16ms React re-render gap that is imperceptible because
  // the loader outro animation is still playing over the top.
  const [loaderDone, setLoaderDone] = useState(!heroIntro);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // ── Non-heroIntro pages: simple nav slide-in on mount ────────────
      if (!heroIntro) {
        if (reducedMotion) {
          gsap.set("[data-intro-nav-parent]", {
            autoAlpha: 1,
            clearProps: "transform,filter,clipPath",
          });
          return;
        }
        gsap.from("[data-intro-nav-parent]", {
          autoAlpha: 0,
          x: -56,
          clipPath: "inset(0 100% 0 0 round 999px)",
          duration: 1,
          ease: animation.ease.premium,
        });
        return;
      }

      // ── heroIntro page: wait until loader signals done ───────────────
      if (!loaderDone) return;

      // gsap.from() immediately sets elements to the "from" state and
      // then animates them to their natural CSS state.  Because the
      // loader (z-index 9999) still covers the viewport for another
      // ~1 s during its outro, the user never sees elements snap to
      // their "from" state — they only see the smooth animate-in.
      if (reducedMotion) {
        gsap.set(
          [
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
          ].join(","),
          { autoAlpha: 1, clearProps: "transform,filter,clipPath" },
        );
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: animation.ease.premium },
        onComplete: () => {
          gsap.set("[data-intro-nav-content] > *", {
            clearProps: "transform",
          });
          gsap.set("[data-intro-nav-shell]", {
            clearProps: "transform,clipPath",
          });
        },
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
            scale: 0.96,
            duration: 0.48,
            stagger: 0.04,
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
    { scope: shellRef, dependencies: [heroIntro, loaderDone] },
  );

  return (
    <>
      {heroIntro && (
        <QuickBiteBentoLoader onComplete={() => setLoaderDone(true)} />
      )}
      <div ref={shellRef} className="flex min-h-full flex-col">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTopButton />
        <StickyOrderBar />
      </div>
    </>
  );
}
