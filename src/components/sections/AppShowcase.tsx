"use client";

import { appShowcaseCopy } from "@/content/home/sections";

import { featureLabels } from "@/content/home/app-showcase";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { appFeatures } from "@/content/site";
import AppPreviewPanel from "./AppPreviewPanel";
import MagneticFillButton from "../ui/MagneticFillButton";
import LinkArrow from "../ui/LinkArrow";

function AppStoreIcon() {
  return (
    <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.3s-2.1-.8-2.1-3.3ZM14.2 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 0 2-.6 2.5-1.2Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.6 2.3 13 11.7 3.6 21.1c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Zm10.8 8.4 2.9-2.9 3.3 1.9c.8.5.8 1.6 0 2.1l-3.3 1.9-2.9-3Zm-1 1 2.9 2.9-9.4 5.4 6.5-8.3Zm0-2L6.9 1.7l9.4 5.4-2.9 2.9Z" />
    </svg>
  );
}

const entrance = { y: [18, 0], opacity: [0.8, 1] };

export default function AppShowcase() {
  const [{ index: activeFeature, direction }, setFeatureSelection] = useState({
    index: 0,
    direction: 1,
  });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="app"
      data-nav-theme="neutral"
      aria-labelledby="app-showcase-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-paper text-ink"
    >
      <motion.div
        data-app-banner
        initial={false}
        whileInView={reducedMotion === false ? entrance : undefined}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="grid w-full lg:grid-cols-2"
      >
        <div className="flex min-w-0 flex-col justify-center bg-cream-200 px-6 py-10 sm:px-10 sm:pb-12 sm:pt-20 lg:px-[5vw]">
          <div className="mx-auto w-full max-w-[46rem]">
            <h2
              id="app-showcase-title"
              className="section-heading"
            >{appShowcaseCopy.yourNextBite}<span className="block text-brand-dark">{appShowcaseCopy.rightHere}</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-cocoa sm:text-lg">{appShowcaseCopy.theKitchensYouLoveTheOrderYou}</p>

            <div role="group" aria-label={appShowcaseCopy.ariaLabelExploreQuickBiteAppFeatures} className="mt-6 grid grid-cols-2 gap-3 sm:mt-7">
              {appFeatures.map(({ title, icon: Icon }, index) => (
                <MagneticFillButton
                  key={title}
                  type="button"
                  variant="light"
                  customFillClass="bg-brand"
                  customHoverTextColor="var(--color-white)"
                  contentClassName="flex w-full items-center gap-2.5 sm:gap-3"
                  aria-pressed={activeFeature === index}
                  aria-controls="app-feature-preview"
                  onClick={() => setFeatureSelection((previous) => previous.index === index ? previous : { index, direction: index > previous.index ? 1 : -1 })}
                  className={`min-h-16 rounded-card border! p-3 text-left text-sm font-medium leading-snug sm:min-h-18 sm:p-4 sm:text-base ${activeFeature === index ? "border-ink bg-ink! text-paper!" : "border-ink/20 bg-paper! text-ink!"}`}
                >
                  <Icon aria-hidden="true" className={`size-4 shrink-0 sm:size-5 ${activeFeature === index ? "text-paper" : "text-brand-dark"}`} strokeWidth={1.75} />
                  {featureLabels[index] ?? title}
                </MagneticFillButton>
              ))}
            </div>

            <div className="mt-6 border-t border-ink/15 pt-4 sm:mt-7 sm:pt-5">
              <LinkArrow
                href={appShowcaseCopy.hrefWaitlist}
                variant="light"
                className="min-h-12 w-64! text-base! font-semibold normal-case! [--link-arrow-spacing:0em]"
              >{appShowcaseCopy.getLaunchUpdates}</LinkArrow>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-cocoa">
                <span>{appShowcaseCopy.comingTo}</span>
                <span className="inline-flex items-center gap-1.5"><AppStoreIcon />{appShowcaseCopy.iOS}</span>
                {/* <span className="inline-flex items-center gap-1.5"><GooglePlayIcon /> Android</span> */}
              </p>
            </div>
          </div>
        </div>

        <AppPreviewPanel
          activeFeature={activeFeature}
          direction={direction}
          reducedMotion={reducedMotion}
        />
      </motion.div>
    </section>
  );
}
