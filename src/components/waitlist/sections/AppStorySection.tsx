"use client";

import Image from "next/image";
import { useRef } from "react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionWave from "../../ui/SectionWave";
import PhoneFrame from "./PhoneFrame";

const { heading, note, steps } = waitlistPage.app;

// Resting place of a card in the pile: 0 is the front card.
const slot = (depth: number) => ({
  y: depth * 26,
  scale: 1 - depth * 0.06,
  rotate: [0, 5, -5, 9][Math.min(depth, 3)],
  zIndex: steps.length - depth,
});

export default function AppStorySection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card]");
      const copies = gsap.utils.toArray<HTMLElement>("[data-story-step]");
      const captions = gsap.utils.toArray<HTMLElement>("[data-story-caption]");
      cards.forEach((card, index) => gsap.set(card, slot(index)));
      gsap.set(copies.slice(1), { opacity: 0.25 });
      gsap.set(captions.slice(1), { autoAlpha: 0, y: 16 });

      // Scrolling deals the pile: the front card is thrown aside and the rest move up a place.
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: { trigger: "[data-story-pin]", start: "top top", end: `+=${steps.length * 80}%`, pin: true, scrub: 0.6 },
      });
      steps.forEach((_, index) => {
        if (index === 0) return;
        const at = (index - 1) * 1.4 + 0.4;
        const thrown = cards[index - 1];
        // The thrown card stays solid until it is clear of the pile, so it never ghosts over the next screen.
        timeline
          .to(thrown, { xPercent: index % 2 ? -135 : 135, yPercent: -25, rotate: index % 2 ? -22 : 22 }, at)
          .to(thrown, { autoAlpha: 0, duration: 0.25 }, at + 0.75);
        cards.slice(index).forEach((card, offset) => timeline.to(card, slot(offset), at));
        timeline
          .to(copies[index - 1], { opacity: 0.25 }, at)
          .to(copies[index], { opacity: 1 }, at)
          .to(captions[index - 1], { autoAlpha: 0, y: -16, duration: 0.5 }, at)
          .to(captions[index], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.5);
      });
      timeline.fromTo("[data-story-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: (steps.length - 1) * 1.4 + 1 }, 0);
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-labelledby="story-title" className="relative isolate bg-dark-ink text-paper">
      <SectionWave to="ink" from="paper" />

      <div data-story-pin className="relative mx-auto flex min-h-svh max-w-[90rem] items-center px-5 py-16 sm:px-8 lg:px-12 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-10 lg:col-span-6">
            <h2 id="story-title" className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">{heading}</h2>

            <ol className="relative hidden flex-col gap-9 pl-8 lg:flex">
              <span aria-hidden="true" className="absolute top-1 bottom-1 left-0 w-px bg-paper/15" />
              <span aria-hidden="true" data-story-progress className="absolute top-1 bottom-1 left-0 w-px origin-top bg-brand" />
              {steps.map((step) => (
                <li key={step.title} data-story-step className="flex max-w-[30rem] flex-col gap-2">
                  <h3 className="font-display text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.025em]">{step.title}</h3>
                  <p className="text-base leading-relaxed text-paper/68">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="hidden text-sm text-paper/50 lg:block">{note}</p>
          </div>

          <div className="flex flex-col items-center gap-10 lg:col-span-5 lg:col-start-8">
            <div className="relative mb-14 w-[12rem] sm:w-[16rem] lg:mb-16 lg:w-[19rem] xl:w-[20.5rem]" aria-label="QuickBite app screens" role="group">
              {/* Sizes the pile; the cards stack on top of it. */}
              <div aria-hidden="true" className="invisible aspect-[736/1492]" />
              {steps.map((step, index) => (
                <div
                  key={step.src}
                  data-deck-card
                  className="absolute inset-0 origin-bottom will-change-transform"
                  style={{ zIndex: steps.length - index }}
                >
                  <PhoneFrame className="h-full w-full" sizes="(min-width: 1280px) 20.5rem, (min-width: 1024px) 19rem, 16rem">
                    <Image src={step.src} alt={step.alt} width={600} height={1300} sizes="(min-width: 1280px) 20.5rem, (min-width: 1024px) 19rem, 16rem" className="absolute inset-x-0 top-0 h-auto w-full" />
                  </PhoneFrame>
                </div>
              ))}
            </div>

            <div className="w-full max-w-[24rem] text-center lg:hidden motion-safe:grid">
              {steps.map((step) => (
                <div key={step.title} data-story-caption className="flex flex-col gap-1.5 motion-safe:col-start-1 motion-safe:row-start-1 motion-reduce:mb-6">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-paper/68 sm:text-base">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-paper/50 lg:hidden">{note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
