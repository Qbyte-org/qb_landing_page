"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

const MOVING_HIGHLIGHTS = [
  "radial-gradient(20.7% 50% at 50% 0%, var(--color-paper) 0%, color-mix(in srgb,var(--color-brand) 12%,transparent) 100%)",
  "radial-gradient(16.2% 41.2% at 100% 50%, var(--color-apricot) 0%, color-mix(in srgb,var(--color-paper) 8%,transparent) 100%)",
  "radial-gradient(20.7% 50% at 50% 100%, var(--color-paper) 0%, color-mix(in srgb,var(--color-brand) 12%,transparent) 100%)",
  "radial-gradient(16.6% 43.1% at 0% 50%, var(--color-apricot) 0%, color-mix(in srgb,var(--color-paper) 8%,transparent) 100%)",
];

const HOVER_HIGHLIGHT =
  "radial-gradient(32% 50% at 24.325% 25.675%, var(--color-paper) 0%, color-mix(in srgb,var(--color-brand) 22%,transparent) 100%)";

type HoverBorderGradientProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
};

export default function HoverBorderGradient({
  children,
  className = "",
  containerClassName = "px-4 py-2",
  duration = 2,
}: HoverBorderGradientProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isHovered || reduceMotion) return;

    const interval = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % MOVING_HIGHLIGHTS.length);
    }, duration * 1000);

    return () => window.clearInterval(interval);
  }, [duration, isHovered, reduceMotion]);

  return (
    <div
      className={`relative flex h-min w-full items-center rounded-full border-[1.5px] border-paper/15 bg-ink/55 p-px transition-colors duration-500 hover:bg-ink/38 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative z-10 w-full rounded-[inherit] bg-espresso ${containerClassName}`}>
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
        <AnimatePresence initial={false}>
          <motion.div
            key={isHovered ? "hover" : `moving-${highlightIndex}`}
            aria-hidden="true"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : duration, ease: "linear" }}
            style={{
              background: isHovered
                ? HOVER_HIGHLIGHT
                : MOVING_HIGHLIGHTS[highlightIndex],
              filter: "blur(2px) brightness(1.5)",
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
