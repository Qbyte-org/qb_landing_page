"use client";

import Image from "next/image";
import { useRef } from "react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionWave from "../../ui/SectionWave";

const { heading, description, groups, dishes } = waitlistPage.plate;

// Where each dish rests on the table (centre and width, in percent of the stage), in dish order.
const layout = [
  { left: 50, top: 50, size: 36 },
  { left: 21, top: 24, size: 30 },
  { left: 79, top: 22, size: 27 },
  { left: 16, top: 59, size: 25 },
  { left: 50, top: 12, size: 28 },
  { left: 84, top: 56, size: 25 },
  { left: 28, top: 86, size: 27 },
  { left: 73, top: 86, size: 24 },
  { left: 50, top: 90, size: 15 },
  { left: 7, top: 40, size: 13 },
];

export default function PlateSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: "[data-plate-stage]", start: "top 85%", end: "center 45%", scrub: 0.8 },
      });
      // Each dish slides in from beyond its own edge of the table.
      gsap.utils.toArray<HTMLElement>("[data-plate-dish]").forEach((dish, index) => {
        const { left, top } = layout[index];
        const dx = left - 50, dy = top - 50;
        timeline.from(dish, { xPercent: dx * 4, yPercent: dy * 4 + (index === 0 ? 120 : 0), rotate: index % 2 ? 30 : -30, scale: 0.6, opacity: 0, ease: "power2.out", duration: 1 }, index * 0.1);
      });
      timeline.fromTo("[data-plate-name]", { opacity: 0.22 }, { opacity: 1, stagger: 0.1, ease: "none", duration: 0.4 }, 0.3);
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-labelledby="plate-title" className="relative bg-paper text-ink">
      <SectionWave to="paper" from="dark-ink" />
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-14 px-5 pt-6 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-24">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <h2 id="plate-title" className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">{heading}</h2>
          <p className="max-w-[40ch] text-lg leading-relaxed text-cocoa">{description}</p>
          <div className="mt-2 grid grid-cols-2 gap-6">
            {groups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-brand-dark">{group.label}</p>
                <ul className="flex flex-col gap-1 font-display text-[clamp(1.15rem,1.7vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em]">
                  {group.dishes.map((dish) => <li key={dish} data-plate-name>{dish}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div data-plate-stage className="relative mx-auto aspect-square w-full max-w-[42rem] lg:col-span-7 lg:col-start-6">
          <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-cream-200" />
          <div aria-hidden="true" className="absolute inset-[7%] rounded-full border border-dashed border-ink/15" />
          {dishes.map((dish, index) => {
            const spot = layout[index];
            return (
              <div
                key={dish.name}
                data-plate-dish
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.size}%`, zIndex: index === 0 ? 2 : 1 }}
              >
                <Image src={dish.src} alt={dish.name} width={640} height={640} sizes="(min-width: 1024px) 16rem, 36vw" className="h-auto w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
