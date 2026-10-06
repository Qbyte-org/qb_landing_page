"use client";

import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { appFeatures } from "@/content/site";
import { appDemoCopy, appFeatureSummaries } from "@/content/home/app-preview";
import AppFeatureDemo from "./AppFeatureDemo";

type AppPreviewPanelProps = {
  activeFeature: number;
  direction: number;
  reducedMotion: boolean | null;
};

function DealCard({ activeFeature, direction, reducedMotion }: AppPreviewPanelProps) {
  const isPresent = useIsPresent();
  const animate = reducedMotion === false;

  return (
    <motion.div
      data-app-dealt-card={isPresent ? "active" : "leaving"}
      aria-hidden={!isPresent}
      inert={!isPresent}
      custom={direction}
      initial={animate ? { x: direction * -28, y: 22, rotate: direction * -3, scale: 0.94 } : false}
      animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
      exit="dealBack"
      variants={{ dealBack: (exitDirection: number) => animate ? {
        x: [0, exitDirection * 115, exitDirection * 16],
        y: [0, -18, 24],
        rotate: [0, exitDirection * 11, exitDirection * 3],
        scale: [1, 0.98, 0.9],
        opacity: [1, 1, 0],
        zIndex: [20, 20, 0],
        transition: { duration: 0.62, times: [0, 0.5, 1], ease: [0.22, 1, 0.36, 1] },
      } : { opacity: 0, transition: { duration: 0 } } }}
      transition={{ duration: animate ? 0.52 : 0, delay: animate ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-10 origin-bottom will-change-transform"
    >
      <AppFeatureDemo activeFeature={activeFeature} reducedMotion={reducedMotion} />
    </motion.div>
  );
}

export default function AppPreviewPanel({ activeFeature, direction, reducedMotion }: AppPreviewPanelProps) {
  const feature = appFeatures[activeFeature];

  return (
    <figure className="relative isolate flex min-w-0 flex-col justify-center overflow-hidden bg-dark-ink px-5 py-9 text-paper sm:px-10 sm:py-10 lg:px-[3vw]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full border border-paper/8" />

      <div data-app-preview-stage className="@container/preview relative z-1 mx-auto w-full max-w-[46rem]">
        <div className="mb-6 flex items-center justify-between gap-3 text-[0.625rem] font-semibold tracking-[0.14em] uppercase sm:text-xs">
          <span className="text-paper/60">
            {appDemoCopy.preview}
          </span>
          <span aria-hidden="true" className="font-mono tracking-normal">
            {String(activeFeature + 1).padStart(2, "0")}
            <span className="mx-2 text-paper/30">/</span>
            <span className="text-paper/45">{String(appFeatures.length).padStart(2, "0")}</span>
          </span>
        </div>

        <div data-app-card-stack className="relative mx-1 h-96 @[28rem]/preview:h-100">
          <div aria-hidden="true" className="absolute inset-x-4 -bottom-5 top-8 rotate-[-3deg] rounded-[1.5rem] border border-paper/25 bg-cocoa-dark @[28rem]/preview:rounded-[1.75rem]" />
          <div aria-hidden="true" className="absolute inset-x-1.5 -bottom-2.5 top-4 rotate-[2deg] rounded-[1.5rem] border border-paper/30 bg-sand @[28rem]/preview:rounded-[1.75rem]" />
          <AnimatePresence initial={false} custom={direction}>
            <DealCard key={activeFeature} activeFeature={activeFeature} direction={direction} reducedMotion={reducedMotion} />
          </AnimatePresence>
        </div>

        <figcaption id="app-feature-preview" role="status" aria-live="polite" aria-atomic="true" className="mt-10 min-h-20 min-w-0">
          <h3 className="font-display text-[clamp(1.375rem,4.5cqw,1.8rem)] leading-tight font-semibold tracking-[-0.04em]">{feature.title}</h3>
          <p className="mt-2 max-w-[40ch] text-xs leading-relaxed text-paper/60 @[28rem]/preview:text-sm">{appFeatureSummaries[activeFeature]}</p>
        </figcaption>
      </div>
    </figure>
  );
}
