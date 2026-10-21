"use client";

import Image from "next/image";
import { useRef } from "react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionWave from "../../ui/SectionWave";
import PhoneFrame from "./PhoneFrame";

const { heading, note, steps } = waitlistPage.app;

export default function AppStorySection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const screens = gsap.utils.toArray<HTMLElement>("[data-story-screen]");
      const copies = gsap.utils.toArray<HTMLElement>("[data-story-step]");
      gsap.set(screens.slice(1), { autoAlpha: 0, yPercent: 6 });
      gsap.set(copies.slice(1), { opacity: 0.25 });

      // Each step holds for a moment, then hands over: the phone shows exactly the step being read.
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: { trigger: "[data-story-pin]", start: "top top", end: `+=${steps.length * 85}%`, pin: true, scrub: 0.6 },
      });
      steps.forEach((_, index) => {
        if (index === 0) return;
        const at = index * 1.6;
        timeline
          .to(screens[index - 1], { autoAlpha: 0, yPercent: -6 }, at)
          .to(screens[index], { autoAlpha: 1, yPercent: 0 }, at)
          .to(copies[index - 1], { opacity: 0.25 }, at)
          .to(copies[index], { opacity: 1 }, at);
      });
      timeline.fromTo("[data-story-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: (steps.length - 1) * 1.6 + 1 }, 0);
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-labelledby="story-title" className="relative isolate bg-dark-ink text-paper">
      <SectionWave to="ink" from="paper" />

      <div data-story-pin className="relative mx-auto max-w-[90rem] px-5 pb-24 sm:px-8 lg:flex lg:min-h-svh lg:items-center lg:px-12 lg:pb-0">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-center gap-10 lg:col-span-6">
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

          <div className="relative hidden lg:col-span-5 lg:col-start-8 lg:flex lg:items-center lg:justify-center">
            <PhoneFrame className="w-[19rem] xl:w-[20.5rem]">
              {steps.map((step, index) => (
                <Image
                  key={step.src}
                  data-story-screen
                  src={step.src}
                  alt={step.alt}
                  width={600}
                  height={1180}
                  sizes="20.5rem"
                  className="absolute inset-x-0 top-0 h-auto w-full"
                  style={index === 0 ? undefined : { opacity: 0 }}
                />
              ))}
            </PhoneFrame>
          </div>

          <div role="region" aria-roledescription="carousel" aria-label="QuickBite app screens" className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden">
            {steps.map((step, index) => (
              <div key={step.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${steps.length}`} className="flex w-[78%] max-w-[20rem] shrink-0 snap-start flex-col gap-5 rounded-[2rem] bg-ink-soft p-4 pb-6">
                <PhoneFrame className="rounded-[1.6rem] border-[0.35rem]">
                  <Image src={step.src} alt={step.alt} width={600} height={1180} sizes="(min-width: 640px) 20rem, 78vw" className="absolute inset-x-0 top-0 h-auto w-full" />
                </PhoneFrame>
                <div className="flex flex-col gap-1.5 px-1">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.025em]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-paper/68">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-paper/50 lg:hidden">{note}</p>
        </div>
      </div>
    </section>
  );
}
