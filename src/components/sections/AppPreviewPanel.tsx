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


      <div className="relative mx-auto mt-7 w-full max-w-[46rem] flex-1 sm:mt-12">
        <div className="flex items-center justify-between gap-4">
          <p className="relative z-10 font-display text-[2.1rem] font-semibold leading-[0.98] tracking-[0.01em]! sm:text-[2.75rem] lg:text-[2.5rem] xl:text-5xl">
            Your everyday food kit.
          </p>
        </div>

        <div data-app-preview-stage className="@container mt-6 overflow-hidden rounded-[1.75rem] border border-ink/15 bg-cream sm:mt-8">
          <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-3.5">
            <span className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
              QuickBite
            </span>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-cocoa">App preview</span>
          </div>

          <div className="grid @md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
            <div data-app-phone-stage className="relative flex min-w-0 items-center justify-center overflow-hidden bg-cream-200 px-3 py-4 @md:py-6">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-1/2 h-px -rotate-12 bg-ink/10" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-[58%] h-px -rotate-12 bg-ink/10" />
              <div className="relative h-[21rem] w-full max-w-[15rem] select-none @md:h-[25rem] @md:max-w-[17rem]">
                <Image
                  src="/images/phone2.png"
                  alt="QuickBite app home screen showing restaurant categories, a lunch offer, and a previous order"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 272px, (min-width: 1024px) 220px, (min-width: 640px) 272px, 240px"
                  className="object-contain"
                />
              </div>
            </div>

            <div
              id="app-feature-preview"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="flex min-w-0 items-center border-t border-dashed border-ink/20 bg-paper @md:border-l @md:border-t-0"
            >
              <motion.div
                key={feature.title}
                // The first render stays identical on the server and client.
                initial={hasSelectedFeature && reducedMotion === false ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
                className="w-full min-w-0 p-5 @md:px-5 @md:py-7 @xl:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <FeatureIcon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <span aria-hidden="true" className="font-mono text-[0.65rem] text-cocoa">
                    {String(activeFeature + 1).padStart(2, "0")} / {String(appFeatures.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-5 font-display text-xl font-semibold leading-tight @md:min-h-12 @lg:text-2xl">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cocoa @md:min-h-[4.5rem]">
                  {feature.description}
                </p>

                <div className="mt-5 space-y-4 border-t border-dashed border-ink/20 pt-5">
                  {featurePreviews[activeFeature].map(({ icon: Icon, title, detail }) => (
                    <div key={title} className="flex items-start gap-2.5 @md:min-h-12">
                      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-dark" strokeWidth={1.75} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug">{title}</p>
                        <p className="mt-1 text-[0.65rem] leading-relaxed text-cocoa">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
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
