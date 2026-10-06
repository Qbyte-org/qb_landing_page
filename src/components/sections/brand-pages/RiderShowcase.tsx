"use client";

import { useState } from "react";
import Image from "@/components/ui/SiteImage";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { riderContent, riderPaths } from "@/content/brand-pages";
import MagneticFillButton from "@/components/ui/MagneticFillButton";

export default function RiderShowcase() {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const path = riderPaths[selected];

  return (
    <section id="rider-hero" data-nav-theme="hero" data-scroll-hero aria-labelledby="rider-hero-title" className="relative isolate overflow-hidden bg-dark-ink px-5 pt-40 pb-10 text-paper sm:px-8 sm:pt-44 lg:pt-52 min-[75rem]:px-[5vw] min-[75rem]:pb-20">
      <div data-header-hero-rail className="relative mx-auto w-full max-w-[100rem]">
        <div data-rider-hero-canvas className="relative isolate grid gap-6 sm:grid-cols-2 sm:gap-8 min-[75rem]:min-h-[clamp(40rem,50vw,56rem)] min-[75rem]:grid-cols-12 min-[75rem]:grid-rows-[auto_minmax(8rem,1fr)_auto] min-[75rem]:gap-x-0 min-[75rem]:gap-y-6">
          <svg data-rider-backdrop aria-hidden="true" focusable="false" viewBox="0 0 1000 700" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full text-ink-soft min-[75rem]:block">
            <path d="M24 190H736Q760 190 760 166V164Q760 140 784 140H976Q1000 140 1000 164V676Q1000 700 976 700H274Q250 700 250 676V424Q250 400 226 400H24Q0 400 0 376V214Q0 190 24 190Z" fill="currentColor" />
          </svg>
          <div data-scroll-hero-copy className="relative z-3 min-w-0 sm:col-span-full min-[75rem]:col-start-1 min-[75rem]:col-end-7 min-[75rem]:row-start-1 min-[75rem]:self-start">
            <h1 id="rider-hero-title" className="font-display text-[clamp(2.5rem,4.1vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.06em]">{riderContent.hero.title[0]}<br />{riderContent.hero.title[1]}<span className="text-brand">{riderContent.hero.title[2]}</span></h1>
          </div>
          <div data-rider-location className="relative z-3 flex min-w-0 items-center gap-3 text-xs leading-normal text-paper/65 sm:col-span-full sm:text-sm min-[75rem]:col-start-10 min-[75rem]:col-end-13 min-[75rem]:row-start-1 min-[75rem]:justify-self-end min-[75rem]:self-start min-[75rem]:pt-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-paper/15 bg-paper/5 text-brand"><MapPin className="size-5" aria-hidden="true" /></span>
            <p><span className="flex flex-wrap gap-x-1.5"><span>{riderContent.hero.locationIntro}</span><strong className="font-semibold text-paper">{riderContent.hero.location}</strong></span><span className="mt-1 block">{riderContent.hero.launchNote}</span></p>
          </div>

          <div data-rider-bike-stage className="relative z-2 min-w-0 pb-10 sm:col-span-full sm:mx-auto sm:w-full min-[75rem]:pointer-events-none min-[75rem]:col-start-4 min-[75rem]:col-end-11 min-[75rem]:row-start-1 min-[75rem]:row-end-4 min-[75rem]:m-0 min-[75rem]:w-full min-[75rem]:self-end min-[75rem]:pb-0 min-[75rem]:pl-8">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 600 420" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[12%] bottom-10 h-[calc(88%-2.5rem)] w-full text-ink-soft min-[75rem]:hidden">
              <path d="M22 42H426Q448 42 448 20Q448 0 470 0H578Q600 0 600 22V398Q600 420 578 420H138Q116 420 116 398V386Q116 364 94 364H22Q0 364 0 342V64Q0 42 22 42Z" fill="currentColor" />
            </svg>
            <div data-scroll-hero-media="ride" className="relative aspect-[11/10] w-full">
              <motion.div animate={{ x: selected === 0 || reducedMotion ? 0 : -4, rotate: selected === 0 || reducedMotion ? 0 : -0.5 }} transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 origin-center">
                <Image src={riderContent.hero.image.src} alt={riderContent.hero.image.alt} fill priority quality={90} sizes="(min-width: 1800px) 920px, (min-width: 1200px) 53vw, (min-width: 640px) 95vw, 95vw" className="object-contain drop-shadow-[0_1rem_0.75rem_rgba(0,0,0,0.25)]" />
              </motion.div>
            </div>
          </div>

          <div data-rider-path-copy className="relative z-3 min-w-0 self-end sm:self-start lg:text-right min-[75rem]:col-start-1 min-[75rem]:col-end-4 min-[75rem]:row-start-3 min-[75rem]:self-end min-[75rem]:rounded-tr-[2rem] min-[75rem]:bg-dark-ink min-[75rem]:pt-6 min-[75rem]:pr-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={selected} initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                <p className="text-[0.65rem] font-semibold leading-[1.6] tracking-[0.12em] text-paper/55 uppercase lg:text-xs">0{selected + 1} / {riderContent.hero.chapterLabel}</p>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold leading-tight tracking-tight lg:text-[clamp(2rem,2.6vw,3rem)]">{path.short}</h2>
                <p className="mt-3 text-sm leading-relaxed text-paper/65 lg:mt-4 lg:text-lg">{path.description}</p>
                <MagneticFillButton href={path.href} variant="brand" className="mt-5 min-h-12 rounded-full bg-brand! px-4 py-3 text-xs font-semibold lg:mt-6 lg:min-h-14 lg:px-6 lg:text-sm">{path.action}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></MagneticFillButton>
              </motion.div>
            </AnimatePresence>
          </div>
          <div data-rider-path-controls className="relative z-3 min-w-0 self-end rounded-tl-[1.75rem] bg-dark-ink sm:self-start min-[75rem]:col-start-11 min-[75rem]:col-end-13 min-[75rem]:row-start-3 min-[75rem]:self-end min-[75rem]:pt-4 min-[75rem]:pl-4">
            <p className="mb-3 text-[0.65rem] font-semibold leading-[1.6] tracking-[0.12em] text-paper/55 uppercase">{riderContent.hero.pathsTitle}</p>
            <div className="grid gap-2" role="group" aria-label={riderContent.hero.pathsLabel}>
              {riderPaths.map((item, index) => (
                <button key={item.label} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`flex min-h-18 w-full cursor-pointer items-center gap-2 rounded-2xl border p-3 text-left text-xs leading-normal font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none ${selected === index ? "border-brand bg-ink-soft text-paper" : "border-paper/10 bg-paper/5 text-paper hover:bg-paper/10"}`}>
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${selected === index ? "bg-brand text-paper" : "bg-dark-ink text-brand"}`}><item.icon className="size-5" aria-hidden="true" /></span><span className="min-w-0 flex-1">{item.label}</span><ArrowUpRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
            {/* <a href={riderC ontent.hero.explore.href} className="mt-3 flex min-h-11 items-center justify-between gap-2 text-xs text-paper/65 transition-colors hover:text-brand">{riderContent.hero.explore.label}<ArrowDown className="size-4 shrink-0" aria-hidden="true" /></a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
