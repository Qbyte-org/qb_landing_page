"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

const MOVING_HIGHLIGHTS = [
  "radial-gradient(20.7% 50% at 50% 0%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0.05) 100%)",
  "radial-gradient(16.2% 41.2% at 100% 50%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0.05) 100%)",
  "radial-gradient(20.7% 50% at 50% 100%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0.05) 100%)",
  "radial-gradient(16.6% 43.1% at 0% 50%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0.05) 100%)",
];

const HOVER_HIGHLIGHT =
  "radial-gradient(32% 50% at 24.325% 25.675%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0.1) 100%)";

type HoverBorderGradientProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
};

export default function HoverBorderGradient({
  children,
  className = "",
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
      className={`relative flex h-min w-full items-center overflow-hidden rounded-full border-[1.5px] border-white/10 bg-black/20 p-px transition-colors duration-500 hover:bg-black/10 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 w-full rounded-[inherit] bg-black px-4 py-2">
        {children}
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        initial={false}
        animate={{
          background: isHovered
            ? HOVER_HIGHLIGHT
            : MOVING_HIGHLIGHTS[highlightIndex],
        }}
        transition={{ duration: reduceMotion ? 0 : duration, ease: "linear" }}
        style={{ filter: "blur(2px) brightness(1.5)" }}
      />
    </div>
  );
}
