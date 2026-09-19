"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import LinkArrow from "./LinkArrow";
import MagneticFillButton from "./MagneticFillButton";

export default function StickyOrderBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const isRestaurantPreview = usePathname() === "/restaurants";

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
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border px-4 py-3 backdrop-blur lg:hidden ${isRestaurantPreview ? "bg-paper/95" : "bg-white/95"}`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className={`text-sm font-bold ${isRestaurantPreview ? "text-ink" : "text-navy"}`}>
            {isRestaurantPreview ? "Be first at the table" : "Hungry right now?"}
          </p>
          <p className="truncate text-xs text-muted">
            {isRestaurantPreview ? "Get QuickBite launch updates" : "Free delivery on your first order"}
          </p>
        </div>
        <div className="shrink-0">
          {isRestaurantPreview ? (
            <MagneticFillButton href="/waitlist" variant="brand" className="h-12 rounded-pill bg-brand! px-5 text-sm">
              Join waitlist
            </MagneticFillButton>
          ) : <LinkArrow
            href="/restaurants"
            appearance="plain"
            className="h-12 justify-center rounded-pill bg-brand-dark px-6 text-base font-semibold text-white"
          >
            Order now
          </LinkArrow>}
        </div>
      </div>
    </div>
  );
}
