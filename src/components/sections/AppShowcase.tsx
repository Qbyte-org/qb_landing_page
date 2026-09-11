"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { appFeatures } from "@/content/site";
import AppPreviewPanel from "./AppPreviewPanel";
import MagneticFillButton from "../ui/MagneticFillButton";

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

const featureLabels = [
  "Follow your order",
  "Mix your favourites",
  "Save your places",
  "Pay your way",
];

const entrance = { y: [18, 0], opacity: [0.8, 1] };

export default function AppShowcase() {
  const [{ index: activeFeature, hasSelectedFeature }, setFeatureSelection] = useState({
    index: 0,
    hasSelectedFeature: false,
  });
  const reducedMotion = useReducedMotion();
  const feature = appFeatures[activeFeature];

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
        <div className="flex min-w-0 flex-col justify-center bg-cream-200 px-6 py-14 sm:px-10 sm:py-16 lg:px-[5vw]">
          <div className="mx-auto w-full max-w-[46rem]">
            <h2
              id="app-showcase-title"
              className="section-heading"
            >
              Your next bite.
              <span className="block text-brand-dark">Right here.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-cocoa sm:text-lg">
              The kitchens you love. The order you know by heart.
              All in one place, ready for your next craving.
            </p>

            <div role="group" aria-label="Explore QuickBite app features" className="mt-8 grid grid-cols-2 gap-3 sm:mt-10">
              {appFeatures.map(({ title, icon: Icon }, index) => (
                <MagneticFillButton
                  key={title}
                  type="button"
                  variant="light"
                  customFillClass="bg-brand"
                  customHoverTextColor="#ffffff"
                  contentClassName="flex w-full items-center gap-2.5 sm:gap-3"
                  aria-pressed={activeFeature === index}
                  aria-controls="app-feature-preview"
                  onClick={() => setFeatureSelection({ index, hasSelectedFeature: true })}
                  className={`min-h-20 rounded-card border! p-3 text-left text-sm font-medium leading-snug sm:min-h-22 sm:p-4 sm:text-base ${activeFeature === index ? "border-ink bg-ink! text-paper!" : "border-ink/20 bg-paper! text-ink!"}`}
                >
                  <Icon aria-hidden="true" className={`size-4 shrink-0 sm:size-5 ${activeFeature === index ? "text-paper" : "text-brand-dark"}`} strokeWidth={1.75} />
                  {featureLabels[index] ?? title}
                </MagneticFillButton>
              ))}
            </div>

            <p aria-hidden="true" className="mt-4 min-h-14 border-l-2 border-brand pl-4 text-sm leading-relaxed text-cocoa lg:hidden">
              {feature.description}
            </p>

            <div className="mt-8 border-t border-ink/15 pt-7 sm:mt-10 sm:pt-8">
              <MagneticFillButton
                href="/waitlist"
                variant="brand"
                customFillClass="bg-ink"
                customHoverTextColor="#fffaf5"
                className="group min-h-12 rounded-pill bg-brand! px-6 py-3 text-base font-semibold text-white!"
              >
                Get launch updates
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
              </MagneticFillButton>
              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-cocoa">
                <span>Coming to</span>
                <span className="inline-flex items-center gap-1.5"><AppStoreIcon /> iOS</span>
                <span className="inline-flex items-center gap-1.5"><GooglePlayIcon /> Android</span>
              </p>
            </div>
          </div>
        </div>

        <AppPreviewPanel
          activeFeature={activeFeature}
          hasSelectedFeature={hasSelectedFeature}
          reducedMotion={reducedMotion}
        />
      </motion.div>
    </section>
  );
}
