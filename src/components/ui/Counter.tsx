"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Parses strings like "500K+", "2,000+", "12" into a count-up animation
// that preserves the prefix/suffix and thousands formatting.
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value, hasComma: false };
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    target: parseInt(digits.replace(/,/g, ""), 10),
    suffix,
    hasComma: digits.includes(","),
  };
}

export default function Counter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const { prefix, target, suffix, hasComma } = parse(value);
  const [display, setDisplay] = useState(reduce ? target : 0);

  useEffect(() => {
    // Reduced-motion users already start at the final value (initial state).
    if (!inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  const formatted = hasComma ? display.toLocaleString("en-US") : String(display);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
