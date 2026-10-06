"use client";

import Image from "@/components/ui/SiteImage";
import { motion } from "motion/react";
import { Bike, CookingPot, House, MapPin, ShoppingBag } from "lucide-react";
import { appDemoCopy, demoMeals, demoPlaces } from "@/content/home/app-preview";
import { brand } from "@/content/ui";
import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";

function NeighbourhoodMap({ tracking = false, reducedMotion }: { tracking?: boolean; reducedMotion: boolean | null }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 560 310" preserveAspectRatio="none" fill="none" className="absolute inset-0 size-full">
      <path d="M0 0h560v310H0z" className="fill-cream-200" />
      <g className="fill-sand/60">
        <rect x="-20" y="-12" width="148" height="84" rx="18" transform="rotate(-12 50 20)" />
        <rect x="173" y="-12" width="90" height="81" rx="15" transform="rotate(-12 210 25)" />
        <rect x="305" y="-25" width="100" height="90" rx="15" transform="rotate(-12 350 20)" />
        <rect x="450" y="-26" width="127" height="100" rx="15" transform="rotate(-12 500 20)" />
        <rect x="17" y="122" width="133" height="89" rx="18" transform="rotate(-12 75 165)" />
        <rect x="201" y="111" width="149" height="106" rx="18" transform="rotate(-12 275 160)" />
        <rect x="395" y="106" width="175" height="91" rx="18" transform="rotate(-12 475 150)" />
        <rect x="-26" y="269" width="159" height="87" rx="18" transform="rotate(-12 50 310)" />
        <rect x="182" y="271" width="140" height="87" rx="18" transform="rotate(-12 250 310)" />
        <rect x="380" y="251" width="200" height="90" rx="18" transform="rotate(-12 480 300)" />
      </g>
      <path d="M-20 105 579 -19M-20 256 579 132M147 -30 224 335M373 -30 450 335" className="stroke-paper" strokeWidth="17" />
      <path d="m62 193 10 6 6-10m232-173 8 4 5-9m165 196 8 4 5-9" className="stroke-cocoa/20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      {tracking && (
        <>
          <path d="M114 112 159 103Q171 100 175 115L194 207Q196 216 208 213L375 178Q384 176 386 186L396 232" className="stroke-paper" strokeWidth="12" strokeLinecap="round" />
          <motion.path d="M114 112 159 103Q171 100 175 115L194 207Q196 216 208 213L375 178Q384 176 386 186L396 232" className="stroke-brand" strokeWidth="5" strokeLinecap="round" initial={reducedMotion === false ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ duration: reducedMotion ? 0 : 1.2, ease: "easeInOut" }} />
          <circle cx="114" cy="112" r="8" className="fill-brand stroke-paper" strokeWidth="4" />
          <circle cx="396" cy="232" r="8" className="fill-dark-ink stroke-paper" strokeWidth="4" />
        </>
      )}
    </svg>
  );
}

export default function AppFeatureDemo({ activeFeature, reducedMotion }: { activeFeature: number; reducedMotion: boolean | null }) {
  return (
    <div data-app-feature-demo className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-paper/20 bg-paper text-ink shadow-[0_20px_60px_-25px_rgba(0,0,0,0.45)] @[28rem]/preview:rounded-[1.75rem]">
      {/* <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-ink/10 px-4 @[28rem]/preview:px-5">
        <span className="inline-flex items-center gap-1.5 font-display text-base font-bold tracking-[-0.05em]">
          <Image src={brand.mark} alt="" width={32} height={32} className="size-8" />
          <span>{brand.wordmark[0]}<span className="text-brand">{brand.wordmark[1]}</span></span>
        </span>
        <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[0.5625rem] font-medium tracking-wide text-cocoa @[28rem]/preview:text-[0.625rem]">{appDemoCopy.sample}</span>
      </div> */}

      <div className="relative min-h-0 flex-1">
        {activeFeature === 0 && (
          <div className="flex h-full flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <NeighbourhoodMap tracking reducedMotion={reducedMotion} />
              <span className="absolute top-[20%] left-[13%] flex items-center gap-1.5 rounded-lg bg-paper px-2.5 py-2 text-[0.625rem] font-semibold shadow-sm">
                <CookingPot className="size-3.5 text-brand" />{appDemoCopy.kitchen}
              </span>
              <span className="absolute right-[10%] bottom-[15%] flex items-center gap-1.5 rounded-lg bg-dark-ink px-2.5 py-2 text-[0.625rem] font-semibold text-paper shadow-sm">
                <House className="size-3.5" />{appDemoCopy.doorstep}
              </span>
              <motion.span aria-hidden="true" className="absolute top-[53%] left-[45%] grid size-12 place-items-center rounded-full border-4 border-paper bg-brand text-white shadow-[0_4px_14px_var(--color-brand-100)]" initial={reducedMotion === false ? { scale: 0.8 } : false} animate={{ scale: 1 }} transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 0.5 }}>
                <Bike className="size-6" strokeWidth={1.75} />
              </motion.span>
            </div>
            <div className="relative flex h-25 shrink-0 items-center gap-3 border-t border-ink/10 bg-paper px-4 @[28rem]/preview:gap-4 @[28rem]/preview:px-5">
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand"><ShoppingBag className="size-5" /></span>
              <div className="min-w-0">
                <p className="font-display text-base leading-tight font-semibold tracking-tight @[28rem]/preview:text-lg">{appDemoCopy.delivery}</p>
                <p className="mt-1.5 text-[0.625rem] leading-relaxed text-cocoa @[28rem]/preview:text-xs">{appDemoCopy.deliveryStatus}</p>
                <div aria-hidden="true" className="mt-3 flex gap-1.5"><span className="h-1 w-10 rounded-full bg-brand" /><span className="h-1 w-10 rounded-full bg-brand" /><span className="h-1 w-10 rounded-full bg-sand" /></div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 1 && (
          <div className="flex h-full flex-col bg-paper p-3 @[28rem]/preview:p-4">
            <p className="px-1 font-display text-lg font-semibold tracking-tight @[28rem]/preview:text-xl">{appDemoCopy.cart}</p>
            <div className="mt-3 grid min-h-0 flex-1 grid-rows-2 gap-2.5">
              {demoMeals.map((meal) => (
                <article key={meal.title} data-app-meal-postcard className="relative isolate overflow-hidden rounded-[1.5rem] border border-dashed border-ink/20 bg-cream-200 px-4 py-3 @[28rem]/preview:rounded-[1.75rem] @[28rem]/preview:px-5">
                  <BackgroundGrainTexture tone="light" className="opacity-20!" />
                  <div className="absolute top-1/2 -right-7 size-30 -translate-y-1/2 overflow-hidden rounded-full border-4 border-paper @[28rem]/preview:-right-5 @[28rem]/preview:size-36">
                    <Image src={meal.image} alt={meal.imageAlt} fill sizes="144px" className="object-cover" />
                  </div>
                  <div className="relative flex h-full max-w-[62%] flex-col justify-center @[28rem]/preview:max-w-[68%]">
                    <p className="text-[0.5rem] leading-relaxed font-semibold tracking-[0.08em] text-brand-dark uppercase @[28rem]/preview:text-[0.5625rem]">{meal.label}</p>
                    <p className="mt-1.5 font-display text-[1.125rem] leading-[1.05] font-semibold tracking-[-0.045em] @[28rem]/preview:text-[1.5rem]">{meal.title}</p>
                    <p className="mt-1.5 text-[0.5625rem] leading-relaxed font-medium text-cocoa @[28rem]/preview:text-[0.625rem]">{meal.kitchen}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeFeature === 2 && (
          <div className="flex h-full flex-col">
            <div className="relative h-29 shrink-0 overflow-hidden @[28rem]/preview:h-33">
              <NeighbourhoodMap reducedMotion={reducedMotion} />
              <span aria-hidden="true" className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full border-4 border-paper bg-brand text-white shadow-lg">
                <MapPin className="size-6" />
              </span>
            </div>
            <div className="flex-1 p-4 @[28rem]/preview:px-5">
              <p className="font-display text-lg font-semibold tracking-tight @[28rem]/preview:text-xl">{appDemoCopy.places}</p>
              <div className="mt-3 grid gap-2.5">
                {demoPlaces.map(({ title, detail, icon: Icon }, index) => (
                  <div key={title} className={`flex items-center gap-3 rounded-xl border p-2.5 ${index === 0 ? "border-brand/35 bg-brand-50" : "border-ink/10"}`}>
                    <Icon aria-hidden="true" className={`size-4 shrink-0 ${index === 0 ? "text-brand" : "text-cocoa"}`} />
                    <div>
                      <p className="text-xs font-semibold">{title}</p>
                      <p className="mt-0.5 text-[0.625rem] text-cocoa">{detail}</p>
                    </div>
                    <span aria-hidden="true" className={`ml-auto size-3 shrink-0 rounded-full border-3 ${index === 0 ? "border-brand bg-paper" : "border-sand"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeFeature === 3 && (
          <div data-app-phone-scene className="relative isolate grid h-full grid-cols-[0.75fr_1.25fr] items-center gap-1 overflow-hidden bg-cream-200 p-4 @[28rem]/preview:grid-cols-2 @[28rem]/preview:gap-3 @[28rem]/preview:px-7">
            <div aria-hidden="true" className="absolute top-1/2 right-[-10%] -z-1 size-60 -translate-y-1/2 rounded-full border border-brand/20 @[28rem]/preview:right-5 @[28rem]/preview:size-72" />
            <div className="min-w-0">
              <p className="text-[0.5rem] leading-relaxed font-semibold tracking-[0.1em] text-brand-dark uppercase @[28rem]/preview:text-[0.625rem]">{appDemoCopy.phoneEyebrow}</p>
              <p className="mt-3 whitespace-pre-line font-display text-lg leading-[1.08] font-semibold tracking-[-0.04em] @[28rem]/preview:text-[1.9rem]">{appDemoCopy.phoneTitle}</p>
              <p className="mt-3 text-[0.625rem] leading-relaxed text-cocoa @[28rem]/preview:text-xs">{appDemoCopy.phoneDetail}</p>
            </div>
            <div className="relative mx-auto h-full max-h-75 w-full max-w-43 -rotate-3 @[28rem]/preview:max-h-78 @[28rem]/preview:max-w-45">
              <Image data-app-phone-image src={appDemoCopy.phoneSrc} alt={appDemoCopy.phoneAlt} fill sizes="180px" className="object-contain drop-shadow-[0_9px_7px_rgba(28,18,15,0.2)]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
