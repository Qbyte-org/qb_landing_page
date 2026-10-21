"use client";

import Image from "next/image";
import { useRef } from "react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionWave from "../../ui/SectionWave";

const { heading, description, dishes } = waitlistPage.plate;

// Where each dish rests on the plate (percent of the stage) and how far away it starts.
const layout = [
  { left: 50, top: 50, size: 46, from: { x: 0, y: 70, rotate: -30 } },
  { left: 22, top: 25, size: 30, from: { x: -60, y: -40, rotate: 35 } },
  { left: 79, top: 27, size: 30, from: { x: 60, y: -45, rotate: -25 } },
  { left: 80, top: 75, size: 28, from: { x: 65, y: 40, rotate: 30 } },
  { left: 21, top: 76, size: 24, from: { x: -60, y: 45, rotate: -35 } },
  { left: 51, top: 12, size: 18, from: { x: 10, y: -70, rotate: 40 } },
];

export default function PlateSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: "[data-plate-stage]", start: "top 85%", end: "center 45%", scrub: 0.8 },
      });
      gsap.utils.toArray<HTMLElement>("[data-plate-dish]").forEach((dish, index) => {
        const { from } = layout[index];
        timeline.from(dish, { xPercent: from.x * 2.2, yPercent: from.y * 2.2, rotate: from.rotate, scale: 0.6, opacity: 0, ease: "power2.out", duration: 1 }, index * 0.14);
      });
      timeline.fromTo("[data-plate-name]", { opacity: 0.22 }, { opacity: 1, stagger: 0.14, ease: "none", duration: 0.5 }, 0.3);
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-labelledby="plate-title" className="relative bg-paper text-ink">
      <SectionWave to="paper" from="dark-ink" />
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-14 px-5 pt-6 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-24">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <h2 id="plate-title" className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">{heading}</h2>
          <p className="max-w-[38ch] text-lg leading-relaxed text-cocoa">{description}</p>
          <ul className="mt-2 flex flex-col gap-1.5 font-display text-[clamp(1.35rem,2.1vw,1.9rem)] font-semibold tracking-[-0.025em]">
            {dishes.map((dish) => <li key={dish.name} data-plate-name>{dish.name}</li>)}
          </ul>
        </div>
        <div data-plate-stage className="relative mx-auto aspect-square w-full max-w-[40rem] lg:col-span-7 lg:col-start-6">
          <div aria-hidden="true" className="absolute inset-[9%] rounded-full bg-cream-200" />
          <div aria-hidden="true" className="absolute inset-[3%] rounded-full border border-dashed border-ink/15" />
          {dishes.map((dish, index) => {
            const spot = layout[index];
            return (
              <div
                key={dish.name}
                data-plate-dish
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.size}%` }}
              >
                <Image src={dish.src} alt={dish.name} width={640} height={640} sizes="(min-width: 1024px) 18rem, 40vw" className="h-auto w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
