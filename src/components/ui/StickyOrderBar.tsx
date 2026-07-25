"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { tactileMotion } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-6px_24px_-8px_rgb(26_26_46/0.15)] backdrop-blur lg:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-sm font-bold text-navy">Hungry right now?</p>
          <p className="truncate text-xs text-muted">
            Free delivery on your first order
          </p>
        </div>
        <motion.div className="shrink-0" {...tactileMotion}>
          <Link
            href="/restaurants"
            className="inline-flex h-12 items-center justify-center rounded-pill bg-brand-dark px-6 text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Order now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
