"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MagneticFillButton from "./MagneticFillButton";

export default function StickyOrderBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const duration = reducedMotion ? 0 : 0.42;

      gsap.set(bar, { autoAlpha: 0, yPercent: 110 });
      ScrollTrigger.create({
        start: 600,
        onEnter: () =>
          gsap.to(bar, {
            autoAlpha: 1,
            yPercent: 0,
            duration,
            ease: "power3.out",
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to(bar, {
            autoAlpha: 0,
            yPercent: 110,
            duration,
            ease: "power2.in",
            overwrite: "auto",
          }),
      });
    },
    { scope: barRef },
  );

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3 backdrop-blur lg:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-sm font-bold text-navy">Hungry right now?</p>
          <p className="truncate text-xs text-muted">
            Free delivery on your first order
          </p>
        </div>
        <div className="shrink-0">
          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            className="h-12 rounded-pill px-6 text-base"
          >
            Order now
          </MagneticFillButton>
        </div>
      </div>
    </div>
  );
}
