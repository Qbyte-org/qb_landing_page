"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import LinkArrow from "../ui/LinkArrow";
import SectionWave, { type SectionWaveSurface } from "../ui/SectionWave";
import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";
import CtaFoodSlideshow from "./final-cta/CtaFoodSlideshow";
import CtaSunburst from "./final-cta/CtaSunburst";
import { ctaCopy } from "@/content/cta";

type FinalCTAProps = {
  id?: string;
  heading?: string;
  supportingCopy?: string;
  actionLabel?: string;
  actionHref?: string;
  splitBackground?: boolean;
  waveFrom?: SectionWaveSurface;
};

export default function FinalCTA({
  id = "final-cta",
  heading = ctaCopy.heading,
  supportingCopy = ctaCopy.supportingCopy,
  actionLabel = ctaCopy.actionLabel,
  actionHref = ctaCopy.actionHref,
  splitBackground = true,
  waveFrom = "paper",
}: FinalCTAProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const artworkId = useId().replace(/:/g, "");
  const inView = useInView(sectionRef, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const titleId = `${id}-title`;

  return (
    <section
      ref={sectionRef}
      id={id}
      data-nav-theme="dark"
      data-cta-artwork-playing={inView && reducedMotion === false}
      aria-labelledby={titleId}
      className="group/cta overflow-hidden bg-dark-ink text-paper scroll-mt-24"
    >
      <SectionWave to="ink" from={waveFrom} splitBackground={splitBackground} />
      <motion.div
        initial={false}
        whileInView={reducedMotion === false ? { y: [16, 0], opacity: [0.75, 1] } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid w-[90%] max-w-[1800px] gap-3 pt-14 sm:grid-cols-[minmax(0,1fr)_clamp(8rem,12vw,15rem)] sm:gap-4 sm:pt-20 [@media(640px<width<1024px)]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] [@media(640px<width<1024px)]:items-stretch lg:pt-24"
      >
        <div
          data-cta-copy
          className="relative isolate flex min-h-64 flex-col justify-between gap-14 overflow-hidden rounded-4xl bg-ink-soft p-6 sm:min-h-48 sm:gap-8 sm:p-7 [@media(640px<width<1024px)]:min-w-0 [@media(640px<width<1024px)]:gap-6 [@media(640px<width<1024px)]:p-[clamp(1.25rem,3.125vw,1.75rem)] lg:min-h-40 lg:flex-row lg:items-center lg:gap-4 lg:px-10 lg:py-8 xl:min-h-44 2xl:min-h-48 2xl:px-14"
        >
          <BackgroundGrainTexture />
          <svg
            aria-hidden="true"
            viewBox="0 0 600 260"
            className="pointer-events-none absolute -bottom-12 left-[18%] -z-10 h-64 w-[38rem] max-w-none text-brand sm:left-[5%] lg:-bottom-[2.8vw] lg:left-1/2 lg:h-auto lg:w-[60%] lg:-translate-x-1/2"
          >
            <CtaSunburst className="origin-[290px_220px] [transform-box:view-box] motion-safe:animate-[spin_56s_linear_infinite_paused] group-data-[cta-artwork-playing=true]/cta:[animation-play-state:running]" />
          </svg>

          <div className="relative z-10 flex max-w-[18rem] flex-col gap-2 sm:max-w-none lg:max-w-[18rem] 2xl:max-w-[28rem]">
            <h2
              id={titleId}
              className="max-w-72 font-display text-[1.9rem] font-semibold leading-tight tracking-[0.01em]! sm:max-w-none sm:text-3xl lg:whitespace-nowrap lg:text-[clamp(1.65rem,2.45vw,3rem)]"
            >
              {heading}
            </h2>
            <LinkArrow
              href={actionHref}
              variant="dark"
              className="group mt-4 w-64 min-h-12 text-base! normal-case! [--link-arrow-spacing:0em] sm:text-lg!"
            >
              {actionLabel}
            </LinkArrow>
          </div>


          <div className="relative self-start lg:ml-auto lg:max-w-[18rem] lg:self-auto lg:text-right 2xl:max-w-[28rem]">
            <svg
              aria-hidden="true"
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -right-1 -top-8 size-7 text-brand lg:-top-12 lg:right-14"
            >
              <path fill="currentColor" d="m20 0 3 12 8-8-3 12 12-2-10 8 9 7-12-1 1 12-8-10-7 10 1-12-12 1 10-8-12-7 12 2L8 4l9 8Z" />
            </svg>
            <p className="max-w-72 text-lg font-medium uppercase leading-tight sm:text-xl lg:text-[clamp(1rem,1.6vw,1.65rem)] 2xl:max-w-none">
              {supportingCopy}
            </p>
          </div>
        </div>

        <CtaFoodSlideshow />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto mt-12 h-[20vw] max-h-72 w-full select-none overflow-hidden [perspective:600px] sm:mt-16 lg:mt-5 lg:h-[15vw]"
      >
        <svg
          data-cta-wordmark
          viewBox="0 0 1400 250"
          className="h-full w-full origin-bottom text-paper/20 blur-[1px] [transform:rotateX(32deg)_scale(1.12)] sm:blur-[2px]"
          preserveAspectRatio="none"
        >
          <text
            x="700"
            y="220"
            textAnchor="middle"
            textLength="1350"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="font-display text-[245px] font-extrabold"
          >
            {ctaCopy.wordmark}
          </text>
          <defs>
            <linearGradient id={`${artworkId}-light`}>
              <stop offset="0" stopColor="var(--color-brand)" stopOpacity="0" />
              <stop offset=".4" stopColor="var(--color-brand)" stopOpacity=".45" />
              <stop offset=".5" stopColor="var(--color-peach)" stopOpacity=".65" />
              <stop offset=".6" stopColor="var(--color-brand)" stopOpacity=".45" />
              <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
            </linearGradient>
            <mask id={`${artworkId}-letters`} maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="250">
              <text x="700" y="220" textAnchor="middle" textLength="1350" lengthAdjust="spacingAndGlyphs" fill="white" className="font-display text-[245px] font-extrabold">
                {ctaCopy.wordmark}
              </text>
            </mask>
          </defs>
          <g mask={`url(#${artworkId}-letters)`}>
            <rect data-cta-wordmark-light className="motion-safe:animate-[cta-wordmark-illuminate_12s_ease-in-out_infinite_paused] group-data-[cta-artwork-playing=true]/cta:[animation-play-state:running]" x="-900" y="0" width="900" height="250" fill={`url(#${artworkId}-light)`} />
          </g>
        </svg>
      </div>
    </section>
  );
}
