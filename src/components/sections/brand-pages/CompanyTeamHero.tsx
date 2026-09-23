"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, Code2, HeartHandshake, MapPin, Palette, Store } from "lucide-react";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import SectionWave from "@/components/ui/SectionWave";

const profiles = [
  {
    id: "product",
    label: "Product & design",
    shortLabel: "The experience",
    title: "Thoughtful by design.",
    description: "Turning everyday food runs into something that feels effortless. Simple discovery, clear choices and a little delight along the way.",
    focus: "Making room for the everyday.",
    icon: Palette,
    image: "/images/team/white-ninja.webp",
    imageAlt: "White knitted ninja art toy",
    portraitPosition: "object-[50%_50%]",
  },
  {
    id: "engineering",
    label: "Engineering",
    shortLabel: "The builders",
    title: "Small details. Big care.",
    description: "Connecting the pieces behind each food run. Building a useful, dependable product around the people who will use it.",
    focus: "Good ideas, carefully built.",
    icon: Code2,
    image: "/images/team/demo-robot.webp",
    imageAlt: "Grey hoodie robot with glowing eyes",
    portraitPosition: "object-[46%_50%]",
  },
  {
    id: "partnerships",
    label: "Kitchen partnerships",
    shortLabel: "The local connection",
    title: "Keeping it local.",
    description: "Listening to the kitchens that give a neighbourhood its flavour. Bringing their food, stories and perspective to the QuickBite table.",
    focus: "Great food starts with people.",
    icon: Store,
    image: "/images/team/black-ninja.webp",
    imageAlt: "Black art-toy ninja with a red headband",
    portraitPosition: "object-[54%_50%]",
  },
  {
    id: "community",
    label: "Community & care",
    shortLabel: "The people people",
    title: "A bigger table for all.",
    description: "Making space for food lovers, kitchens and future riders. Learning from real routines, shared stories and the community around us.",
    focus: "A little local goodness, together.",
    icon: HeartHandshake,
    image: "/images/team/orange-robot.webp",
    imageAlt: "Friendly orange robot forming a heart with its hands",
    portraitPosition: "object-[50%_50%]",
  },
] as const;

/** A full-height arched profile selector inspired by the coffee-card reference. */
export default function CompanyTeamHero() {
  const [selection, setSelection] = useState({ index: 0, direction: 1 });
  const reducedMotion = useReducedMotion();
  const profile = profiles[selection.index];
  const ProfileIcon = profile.icon;
  const shouldAnimate = reducedMotion === false;

  function selectProfile(index: number) {
    setSelection((current) => index === current.index ? current : {
      index,
      direction: index > current.index ? 1 : -1,
    });
  }

  function stepProfile(direction: -1 | 1) {
    setSelection((current) => ({
      index: (current.index + direction + profiles.length) % profiles.length,
      direction,
    }));
  }

  return (
    <>
      <section id="company-hero" aria-labelledby="company-hero-title" data-nav-theme="hero" data-scroll-hero className="relative isolate overflow-hidden bg-dark-ink pt-36 text-paper sm:pt-40 lg:min-h-svh lg:pt-32">
        {/* <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <BackgroundGrainTexture />
          <div className="absolute -right-1/4 top-0 aspect-square w-[90%] rounded-full bg-ink-soft/30" />
        </div> */}
        <Container className="max-w-[1600px]! lg:px-12 xl:px-16">
          <div id="company-team" className="grid gap-9 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.25fr)_minmax(0,.9fr)] lg:items-stretch lg:gap-10 xl:gap-14">
            <div data-scroll-hero-copy className="order-1 min-w-0 pb-2 lg:flex lg:flex-col lg:justify-center lg:py-14">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
                <span aria-hidden="true" className="h-px w-8 bg-brand" />
                About QuickBite
              </p>
              <h1 id="company-hero-title" className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.03] tracking-[0.01em]! sm:text-5xl lg:text-[clamp(2.3rem,3.1vw,3.3rem)]">
                The people<br /><span className="text-brand">behind the bite.</span>
              </h1>
              <div className="mt-8 flex items-center gap-3 border-t border-paper/15 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-paper/55 lg:mt-9">
                <span className="tabular-nums text-brand-light">0{selection.index + 1} / 0{profiles.length}</span>
                One shared appetite
              </div>
              <div className="relative mt-5 min-h-[13rem] sm:min-h-[11rem] lg:min-h-[14rem]" aria-live="polite" aria-atomic="true">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={profile.id}
                    initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldAnimate ? { opacity: 0, y: -12 } : { opacity: 0 }}
                    transition={{ duration: shouldAnimate ? 0.24 : 0 }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-light">{profile.label}</p>
                    <h2 className="mt-3 max-w-[14ch] font-display text-[1.8rem] font-semibold leading-[1.08] tracking-[0.01em]! sm:text-3xl">{profile.title}</h2>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70 sm:text-base">{profile.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <MagneticFillButton href="/contact" variant="brand" className="min-h-12 rounded-full bg-brand! px-6 py-3 text-sm">
                  Say hello
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </MagneticFillButton>
                <a href="#business-plan" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-paper/30 underline-offset-8 transition-colors hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                  Our plans
                  <ArrowDown aria-hidden="true" size={16} />
                </a>
              </div>
            </div>

            <div data-scroll-hero-media className="relative order-2 mx-auto w-full max-w-[32rem] lg:order-2 lg:mt-6 lg:flex lg:max-w-none">
              <div className="relative isolate aspect-[.68] w-full overflow-hidden rounded-t-[16rem] border-x border-t border-paper/20 bg-cream-200 lg:aspect-auto lg:min-h-[40rem] lg:flex-1">
                <AnimatePresence initial={false} custom={selection.direction} mode="sync">
                  <motion.div
                    key={profile.id}
                    custom={selection.direction}
                    variants={{
                      enter: (direction: number) => ({ y: `${direction * 100}%`, rotate: direction * 8, opacity: 0 }),
                      present: { y: "0%", rotate: 0, opacity: 1 },
                      leave: (direction: number) => ({ y: `${direction * -100}%`, rotate: direction * -8, opacity: 0 }),
                    }}
                    initial={shouldAnimate ? "enter" : false}
                    animate="present"
                    exit={shouldAnimate ? "leave" : { opacity: 0 }}
                    transition={{ duration: shouldAnimate ? 0.72 : 0, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 bottom-28 top-0"
                  >
                    <Image
                      src={profile.image}
                      alt={profile.imageAlt}
                      fill
                      preload
                      sizes="(min-width: 1600px) 540px, (min-width: 1024px) 38vw, (min-width: 640px) 512px, 90vw"
                      className={`object-cover ${profile.portraitPosition}`}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-28 items-center justify-between gap-3 border-t border-ink/10 bg-cream-200 px-5 py-5 text-ink sm:px-7">
                  <div className="min-w-0">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold"><ProfileIcon aria-hidden="true" size={15} className="shrink-0 text-brand" />{profile.label}</p>
                    <p className="mt-2 max-w-48 text-xs leading-relaxed text-cocoa">{profile.focus}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <MagneticFillButton as="button" onClick={() => stepProfile(-1)} ariaLabel="Previous team profile" variant="cream" className="size-10 rounded-full border! border-ink/15! bg-paper! sm:size-11">
                      <ArrowLeft aria-hidden="true" size={18} />
                    </MagneticFillButton>
                    <MagneticFillButton as="button" onClick={() => stepProfile(1)} ariaLabel="Next team profile" variant="cream" className="size-10 rounded-full border! border-ink/15! bg-paper! sm:size-11">
                      <ArrowRight aria-hidden="true" size={18} />
                    </MagneticFillButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-3 flex flex-col justify-center pb-10 lg:py-14">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-paper/55">Different skills. One team.</p>
              <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-1" role="group" aria-label="Choose a team profile">
              {profiles.map((item, index) => {
                const active = selection.index === index;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectProfile(index)}
                    className={`group relative flex min-h-20 items-center gap-3 rounded-full border px-3 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none ${active ? "border-brand bg-brand text-paper" : "border-paper/15 bg-paper/5 text-paper hover:border-paper/40 hover:bg-paper/10"}`}
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-paper/25 bg-cream-200">
                      <Image src={item.image} alt="" fill sizes="48px" className="object-cover object-[50%_30%]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${active ? "text-paper/80" : "text-paper/45"}`}>{item.shortLabel}</span>
                      <span className="mt-1 block text-sm font-semibold leading-tight">{item.label}</span>
                    </span>
                    <Icon aria-hidden="true" className="mr-1 size-4 shrink-0 opacity-65" />
                  </button>
                );
              })}
              </div>
              <p className="mt-8 max-w-64 text-sm leading-relaxed text-paper/60">Different skills. One shared appetite for making everyday food runs better.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs text-paper/50"><MapPin aria-hidden="true" size={15} className="shrink-0 text-brand" />Starting in Ile-Ife, Nigeria.</span>
            </div>
          </div>
        </Container>
      </section>
      <SectionWave to="paper" />
    </>
  );
}
