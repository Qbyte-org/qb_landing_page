"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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
  const { prefix, target, suffix, hasComma } = parse(value);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const format = (current: number) => {
        const rounded = Math.round(current);
        const digits = hasComma
          ? rounded.toLocaleString("en-US")
          : String(rounded);
        element.textContent = `${prefix}${digits}${suffix}`;
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        format(target);
        return;
      }

      const counter = { value: 0 };
      format(0);
      gsap.to(counter, {
        value: target,
        duration: 1.6,
        ease: "power4.out",
        onUpdate: () => format(counter.value),
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [hasComma, prefix, suffix, target] },
  );

  const formattedTarget = hasComma
    ? target.toLocaleString("en-US")
    : String(target);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedTarget}
      {suffix}
    </span>
  );
}
