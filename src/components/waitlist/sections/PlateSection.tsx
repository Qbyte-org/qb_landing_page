"use client";

import Image from "next/image";
import { useRef } from "react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionWave from "../../ui/SectionWave";
import PlatedDish, { type Vessel } from "./PlatedDish";

const { heading, description, groups, centre, dishes } = waitlistPage.plate;

// The dishes sit on one orbit around the centre bowl, evenly spaced and clockwise from the top.
const ORBIT = 37; // radius, percent of the stage
const spots = dishes.map((dish, index) => {
  const angle = -90 + (360 / dishes.length) * index;
  return {
    left: 50 + ORBIT * Math.cos((angle * Math.PI) / 180),
    top: 50 + ORBIT * Math.sin((angle * Math.PI) / 180),
    size: dish.vessel === "saucer" ? 17 : dish.vessel === "own" ? 24 : 22,
  };
});

export default function PlateSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // The table is set as it scrolls into view: the bowl lands, then each dish arrives from beyond the orbit.
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: "[data-plate-stage]", start: "top 85%", end: "center 50%", scrub: 0.8 },
      });
      timeline.from("[data-plate-centre]", { scale: 0.7, rotate: -40, opacity: 0, ease: "power2.out", duration: 1 }, 0);
      gsap.utils.toArray<HTMLElement>("[data-plate-dish]").forEach((dish, index) => {
        const { left, top } = spots[index];
        timeline.from(dish, { xPercent: (left - 50) * 3.5, yPercent: (top - 50) * 3.5, rotate: index % 2 ? 40 : -40, scale: 0.6, opacity: 0, ease: "power2.out", duration: 1 }, 0.15 + index * 0.09);
      });
      timeline.fromTo("[data-plate-name]", { opacity: 0.22 }, { opacity: 1, stagger: 0.09, ease: "none", duration: 0.4 }, 0.3);

      // Once set, the orbit turns slowly while every dish stays upright.
      gsap.timeline({ scrollTrigger: { trigger: "[data-plate-stage]", start: "center 50%", end: "bottom top", scrub: true } })
        .to("[data-plate-orbit]", { rotate: 24, ease: "none" }, 0)
        .to("[data-plate-upright]", { rotate: -24, ease: "none" }, 0);
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
          <div aria-hidden="true" className="absolute inset-[22%] rounded-full bg-cream-200" />
          <div data-plate-orbit className="absolute inset-0">
            <div aria-hidden="true" className="absolute rounded-full border border-dashed border-ink/15" style={{ inset: `${50 - ORBIT}%` }} />
            {dishes.map((dish, index) => {
              const spot = spots[index];
              return (
                <div key={dish.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.size}%` }}>
                  <div data-plate-upright>
                    <div data-plate-dish>
                      <PlatedDish src={dish.src} alt={dish.name} vessel={dish.vessel as Vessel} sizes="(min-width: 1024px) 10rem, 24vw" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* The centre bowl: the real photographed bowl, seated in a drawn ceramic rim. */}
          <div data-plate-centre className="absolute top-1/2 left-1/2 z-10 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a3d36_0,#1c1411_55%,#0d0907_100%)] p-[5.5%] [filter:drop-shadow(0_22px_24px_rgba(42,33,29,0.28))]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image src={centre.src} alt={centre.name} fill sizes="(min-width: 1024px) 17rem, 40vw" className="object-cover" />
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(13,9,7,0.55)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
