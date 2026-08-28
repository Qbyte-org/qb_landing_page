"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

const MOVING_HIGHLIGHTS = [
  "radial-gradient(20.7% 50% at 50% 0%, rgb(255 250 245) 0%, rgba(240, 100, 0, 0.12) 100%)",
  "radial-gradient(16.2% 41.2% at 100% 50%, rgb(240 215 194) 0%, rgba(255, 250, 245, 0.08) 100%)",
  "radial-gradient(20.7% 50% at 50% 100%, rgb(255 250 245) 0%, rgba(240, 100, 0, 0.12) 100%)",
  "radial-gradient(16.6% 43.1% at 0% 50%, rgb(240 215 194) 0%, rgba(255, 250, 245, 0.08) 100%)",
];

const HOVER_HIGHLIGHT =
  "radial-gradient(32% 50% at 24.325% 25.675%, rgb(255 250 245) 0%, rgba(240, 100, 0, 0.22) 100%)";

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
      className={`relative flex h-min w-full items-center rounded-full border-[1.5px] border-[#fffaf5]/15 bg-[#2a211d]/55 p-px transition-colors duration-500 hover:bg-[#2a211d]/38 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative z-10 w-full rounded-[inherit] bg-[#241813] ${containerClassName}`}>
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
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
    </div>
  );
}
