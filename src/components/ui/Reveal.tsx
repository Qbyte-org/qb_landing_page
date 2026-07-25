"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

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
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const from = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...from }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.5, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
