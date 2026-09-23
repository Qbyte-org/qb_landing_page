"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Smartphone, UsersRound } from "lucide-react";
import MagneticFillButton from "@/components/ui/MagneticFillButton";

const riderPaths = [
  {
    label: "Independent riders",
    short: "Ride your way.",
    description: "Your phone, your next pickup, your local food run. Join the QuickBite rider community.",
    icon: Smartphone,
    action: "Join the rider waitlist",
    href: "/waitlist",
  },
  {
    label: "Dispatch teams",
    short: "Bring your team.",
    description: "Connect your delivery team with local kitchens. Let's talk about your dispatch partnership.",
    icon: UsersRound,
    action: "Talk about your fleet",
    href: "mailto:quickbiteinfo01@gmail.com?subject=QuickBite%20dispatch%20partnership",
  },
];

export default function RiderShowcase() {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const path = riderPaths[selected];

  return (
    <section id="rider-hero" data-nav-theme="neutral" data-scroll-hero aria-labelledby="rider-hero-title" className="relative isolate overflow-hidden bg-paper px-5 pb-7 pt-32 text-ink sm:px-8 lg:h-[max(45rem,100svh)] lg:px-[5vw] lg:pb-8 lg:pt-36">
      <div className="relative mx-auto flex h-full w-full max-w-[100rem] flex-col">
        <div className="relative z-20 flex items-start justify-between gap-6 lg:pointer-events-none">
          <div data-scroll-hero-copy className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cocoa"><span className="size-2 rounded-full bg-brand" />The QuickBite rider community</p>
            <h1 id="rider-hero-title" className="font-display text-[clamp(2.8rem,5.7vw,6.4rem)] font-semibold leading-[1.04] tracking-[-0.06em]">Good food.<br />Great <span className="text-brand">journeys.</span></h1>
          </div>
          <div className="hidden max-w-40 pt-7 text-sm leading-relaxed text-cocoa xl:block">
            <span className="mb-3 flex size-12 items-center justify-center rounded-full border border-ink/15"><MapPin className="size-5 text-brand" aria-hidden="true" /></span>
            First stop: <strong className="block font-semibold text-ink">Ile-Ife, Nigeria.</strong>
            <span className="mt-2 block text-xs">Preparing for launch.</span>
          </div>
        </div>

        <div className="relative mt-8 min-h-[21rem] flex-1 sm:min-h-[29rem] lg:static lg:mt-0 lg:min-h-0">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[25%] rounded-[2rem] bg-cream-200 lg:top-[43%] lg:rounded-[3rem]" />
          <div aria-hidden="true" className="absolute bottom-[15%] right-0 top-[14%] w-[28%] rounded-[2rem] bg-cream-200 lg:top-[37%]" />
          <div data-scroll-hero-media className="absolute inset-x-[2%] bottom-0 h-full lg:inset-x-auto lg:left-[24%] lg:h-[83%] lg:w-[63%]">
            <motion.div animate={{ x: selected === 0 ? 0 : reducedMotion ? 0 : -16, rotate: selected === 0 || reducedMotion ? 0 : -2 }} transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-full w-full origin-bottom">
              <Image src="/images/riders/reference-moped.webp" alt="White moped with a red front wheel, photographed from the front and side" fill priority sizes="(min-width: 1024px) 62vw, 94vw" className="object-contain object-bottom" />
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 mt-6 grid gap-5 sm:grid-cols-[1fr_1fr] lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-5 lg:mt-0 lg:flex lg:items-end lg:justify-between">
          <div className="min-w-0 rounded-[1.6rem] bg-paper p-5 lg:pointer-events-auto lg:w-[25%] lg:max-w-80 lg:rounded-bl-none lg:pl-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={selected} initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                <p className="text-xs uppercase tracking-[0.16em] text-cocoa">0{selected + 1} / Your next chapter</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight lg:text-[clamp(1.4rem,2vw,2.4rem)]">{path.short}</h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-cocoa">{path.description}</p>
                <MagneticFillButton href={path.href} variant="brand" className="mt-5 min-h-12 rounded-full bg-brand! px-5 py-3 text-xs font-semibold xl:text-sm">{path.action}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></MagneticFillButton>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="rounded-[1.6rem] bg-paper p-4 lg:pointer-events-auto lg:w-[22%] lg:max-w-64">
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cocoa">Two ways to move with us</p>
            <div className="grid gap-2" aria-label="Choose your rider path">
              {riderPaths.map((item, index) => (
                <button key={item.label} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${selected === index ? "border-ink bg-ink text-paper" : "border-ink/10 bg-cream-200 text-ink hover:border-brand"}`}>
                  <item.icon className={`size-5 shrink-0 ${selected === index ? "text-brand" : "text-cocoa"}`} aria-hidden="true" />{item.label}<ArrowUpRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
            <a href="#rider-paths" className="mt-4 flex min-h-8 items-center justify-between gap-2 text-xs text-cocoa transition-colors hover:text-brand">Explore the rider experience<ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
