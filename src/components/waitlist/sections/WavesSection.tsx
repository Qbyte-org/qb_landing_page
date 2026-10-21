"use client";

import Image from "next/image";
import { useRef } from "react";
import { waitlistCopy, waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import BackgroundGrainTexture from "../../ui/BackgroundGrainTexture";
import MagneticFillButton from "../../ui/MagneticFillButton";
import SectionWave from "../../ui/SectionWave";

const waves = waitlistPage.waves;

export default function WavesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // The line fills up to the first wave and stops there: that's where a signup today lands.
      gsap.timeline({ scrollTrigger: { trigger: "[data-waves-track]", start: "top 80%", end: "top 40%", scrub: 0.6 } })
        .fromTo("[data-waves-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none" })
        .fromTo("[data-wave-first]", { scale: 0.6, opacity: 0.4 }, { scale: 1, opacity: 1, ease: "back.out(2)", duration: 0.4 }, ">-0.1");
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-labelledby="waves-title" className="relative bg-cream text-ink">
      <SectionWave to="paper" from="dark-ink" className="text-cream!" />
      <div className="mx-auto flex max-w-[90rem] flex-col gap-16 px-5 pt-6 pb-24 sm:px-8 sm:pb-32 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 id="waves-title" className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] lg:col-span-7">{waves.heading}</h2>
          <p className="max-w-[38ch] text-lg leading-relaxed text-cocoa lg:col-span-4 lg:col-start-9">{waves.description}</p>
        </div>

        <ol data-waves-track className="relative grid grid-cols-3 gap-4" aria-label="How invites go out">
          <span aria-hidden="true" className="absolute top-[1.1rem] right-[16.66%] left-[16.66%] h-px bg-ink/15" />
          <span aria-hidden="true" data-waves-fill className="absolute top-[1.1rem] left-[16.66%] h-px w-[33.33%] origin-left bg-brand" />
          {waves.items.map((wave, index) => (
            <li key={wave.label} className="relative flex flex-col items-center gap-4 text-center">
              <span
                aria-hidden="true"
                {...(index === 0 ? { "data-wave-first": true } : {})}
                className={`grid size-9 place-items-center rounded-full ${index === 0 ? "bg-brand" : index === 1 ? "border border-ink/25 bg-cream" : "border border-dashed border-ink/25 bg-cream"}`}
              >
                <span className={`size-2.5 rounded-full ${index === 0 ? "bg-dark-ink" : "bg-ink/20"}`} />
              </span>
              <span className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{wave.label}</span>
              <span className="text-sm text-cocoa sm:text-base">{wave.detail}</span>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="relative isolate flex min-h-[20rem] flex-col justify-between gap-8 overflow-hidden rounded-[2.5rem] bg-brand p-8 text-dark-ink sm:p-10 lg:col-span-7">
            <div className="pointer-events-none absolute -right-14 -bottom-20 w-64 sm:w-80" aria-hidden="true">
              <Image src="/images/food/hero-cutouts/pounded-yam.webp" alt="" width={640} height={640} sizes="20rem" className="h-auto w-full" />
            </div>
            <div className="relative flex max-w-[24rem] flex-col gap-3">
              <h3 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">{waves.communityHeading}</h3>
              <p className="text-base leading-relaxed sm:text-lg">{waves.communityDescription}</p>
            </div>
            <MagneticFillButton
              href={waitlistCopy.result.communityHref}
              external
              rel="noopener noreferrer"
              variant="dark"
              className="relative h-13 self-start rounded-full bg-dark-ink! px-6 text-base font-semibold text-paper! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-ink"
            >
              {waves.communityLabel}
            </MagneticFillButton>
          </div>

          <a href={waves.nominateHref} className="group relative isolate flex min-h-[20rem] items-end overflow-hidden rounded-[2.5rem] text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:col-span-5">
            <Image src="/images/food/restaurant-hero/jollof-chicken.webp" alt="" fill sizes="(min-width: 1024px) 36vw, 100vw" className="-z-10 object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]" />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-deep/90 via-ink-deep/25 to-transparent" />
            <span className="flex flex-col gap-1.5 p-8 sm:p-10">
              <span className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em]">{waves.nominateHeading}</span>
              <span className="text-base underline underline-offset-4">{waves.nominateLabel}</span>
            </span>
            <BackgroundGrainTexture className="-z-10" />
          </a>
        </div>
      </div>
    </section>
  );
}
