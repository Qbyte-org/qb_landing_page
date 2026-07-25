"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { animation } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 18 },
  down: { y: -18 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  mode = "content",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  mode?: "content" | "image";
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const from = offsets[direction];

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(element, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      const timeline = gsap.timeline({
        paused: true,
        delay,
        defaults: {
          duration: animation.duration.slow,
          ease: animation.ease.premium,
        },
      });

      if (mode === "image") {
        timeline.fromTo(
          element,
          {
            autoAlpha: 1,
            clipPath: "inset(0 0 100% 0 round 1.75rem)",
            y: from.y ?? 0,
            x: from.x ?? 0,
          },
          {
            clipPath: "inset(0 0 0% 0 round 1.75rem)",
            y: 0,
            x: 0,
          },
        );
      } else {
        timeline.fromTo(
          element,
          {
            autoAlpha: 0,
            y: from.y ?? 0,
            x: from.x ?? 0,
            filter: "blur(8px)",
          },
          { autoAlpha: 1, y: 0, x: 0, filter: "blur(0px)" },
        );
      }

      ScrollTrigger.create({
        trigger: element,
        start: "top 88%",
        animation: timeline,
        ...(once
          ? { once: true }
          : { toggleActions: "play none none reverse" }),
      });
    },
    {
      scope: elementRef,
      dependencies: [delay, direction, mode, once],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={elementRef}
      className={className}
    >
      {children}
    </div>
  );
}
