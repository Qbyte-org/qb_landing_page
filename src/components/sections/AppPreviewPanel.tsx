"use client";

import Image from "next/image";
import { Bike, Check, CookingPot, House, MapPin, Store, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { appFeatures } from "@/content/site";

const featurePreviews = [
  [
    { icon: CookingPot, title: "From the kitchen", detail: "Keep up with your order" },
    { icon: Bike, title: "To your doorstep", detail: "Follow your rider on the map" },
  ],
  [
    { icon: Store, title: "Your go-to meal", detail: "From your favourite kitchen" },
    { icon: Store, title: "A little extra", detail: "Add a bite from another spot" },
  ],
  [
    { icon: House, title: "Home sweet home", detail: "Your usual delivery spot" },
    { icon: MapPin, title: "Your campus corner", detail: "Save it for the next craving" },
  ],
  [
    { icon: Wallet, title: "Your QuickBite wallet", detail: "Top up before you tuck in" },
    { icon: Check, title: "A quicker checkout", detail: "Ready for your next order" },
  ],
];

type AppPreviewPanelProps = {
  activeFeature: number;
  hasSelectedFeature: boolean;
  reducedMotion: boolean | null;
};

export default function AppPreviewPanel({
  activeFeature,
  hasSelectedFeature,
  reducedMotion,
}: AppPreviewPanelProps) {
  const feature = appFeatures[activeFeature];
  const FeatureIcon = feature.icon;

  return (
    <figure className="relative isolate flex min-w-0 flex-col justify-center overflow-hidden bg-paper px-5 py-8 text-ink sm:px-10 sm:py-10 lg:px-[3vw] lg:py-12">
      <figcaption className="flex items-center justify-between gap-4 border-b border-ink/15 pb-5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] sm:text-xs">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand" />
          The everyday food kit
        </span>
        <span className="shrink-0 rounded-pill border border-ink/20 px-3 py-1.5">App preview</span>
      </figcaption>

      <div className="relative mx-auto mt-7 w-full max-w-[46rem] flex-1 sm:mt-9">
        <p className="relative z-10 font-display text-[2.1rem] font-semibold leading-[0.98] tracking-[0.01em]! sm:text-[2.75rem] lg:text-[2.5rem] xl:text-5xl">
          Less tapping.<br />
          <span className="text-cocoa">More tasting.</span>
        </p>

        <div className="relative mt-5 h-[30rem] sm:mt-7 sm:h-[33rem] lg:h-[32rem] xl:h-[34rem]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-7 top-7 overflow-hidden rounded-[1.75rem] bg-brand sm:rounded-[2.5rem]">
            <div className="absolute -left-8 top-14 h-px w-[130%] -rotate-[28deg] bg-white/20" />
            <div className="absolute -left-8 top-32 h-px w-[130%] -rotate-[28deg] bg-white/20" />
            <div className="absolute -left-8 top-50 h-px w-[130%] -rotate-[28deg] bg-white/20" />
          </div>

          <div className="pointer-events-none absolute -left-9 -top-2 h-[26rem] w-[16rem] select-none min-[400px]:-left-6 min-[400px]:h-[28rem] min-[400px]:w-[18rem] sm:-left-5 sm:h-[32rem] sm:w-[21rem] lg:-left-9 lg:h-[29rem] lg:w-[19rem] xl:-left-4 xl:h-[33rem] xl:w-[22rem] 2xl:left-2">
            <Image
              src="/images/phone2.png"
              alt="QuickBite app home screen showing restaurant categories, a lunch offer, and a previous order"
              fill
              loading="lazy"
              sizes="(min-width: 1280px) 352px, (min-width: 1024px) 304px, (min-width: 640px) 336px, (min-width: 400px) 288px, 256px"
              className="object-contain"
            />
          </div>

          <div
            id="app-feature-preview"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="absolute bottom-0 right-0 w-[76%] max-w-[21rem] rounded-[1.25rem] border border-ink/10 bg-paper sm:bottom-10 sm:w-[57%] lg:bottom-0 lg:w-[66%] xl:bottom-8 xl:w-[58%]"
          >
            <motion.div
              key={feature.title}
              // Animate user selections only: SSR and the first client render
              // must agree before the browser's motion preference is available.
              initial={hasSelectedFeature && reducedMotion === false ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              className="min-h-[21rem] p-4 sm:min-h-[22rem] sm:p-5 xl:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-ink text-paper sm:size-11">
                  <FeatureIcon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span aria-hidden="true" className="font-mono text-[0.65rem] text-cocoa">
                  {String(activeFeature + 1).padStart(2, "0")} / {String(appFeatures.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 min-h-[7rem]">
                <p className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                  {feature.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-cocoa sm:text-sm">
                  {feature.description}
                </p>
              </div>

              <div className="space-y-3 border-t border-dashed border-ink/20 pt-4">
                {featurePreviews[activeFeature].map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-peach text-ink">
                      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-snug">{title}</p>
                      <p className="mt-0.5 text-[0.65rem] leading-relaxed text-cocoa">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-7 flex items-center justify-between gap-4 border-t border-ink/15 pt-5 sm:mt-8">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-cocoa sm:text-[0.65rem]">
          A little less effort. A lot more flavour.
        </p>
        <div className="flex shrink-0 gap-1.5">
          {appFeatures.map(({ title }, index) => (
            <span key={title} className={`h-1.5 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${index === activeFeature ? "w-5 bg-brand" : "w-1.5 bg-ink/20"}`} />
          ))}
        </div>
      </div>
    </figure>
  );
}
