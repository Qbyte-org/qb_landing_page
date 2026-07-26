"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const ReactOdometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <span>0</span>,
});

export interface ScrollOdometerProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function ScrollOdometer({
  value,
  decimals = 0,
  duration = 1800,
  className = "",
}: ScrollOdometerProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCurrentValue(value);
        return;
      }

      ScrollTrigger.create({
        trigger: element,
        start: "top 90%",
        onEnter: () => setCurrentValue(value),
        onLeaveBack: () => setCurrentValue(0),
        onRefresh: (self) => {
          if (self.progress > 0) setCurrentValue(value);
        },
      });
    },
    { scope: containerRef, dependencies: [value], revertOnUpdate: true },
  );

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-nowrap items-baseline whitespace-nowrap [&_.odometer]:whitespace-nowrap [&_.odometer]:leading-none ${className}`}
    >
      <ReactOdometer
        value={currentValue}
        format={decimals > 0 ? "(,ddd).dd" : "(,ddd)"}
        duration={duration}
      />
    </span>
  );
}
