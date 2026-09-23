"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ChefHat, MapPin } from "lucide-react";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";

const kitchenStories = [
  { title: "Neighbourhood kitchens", category: "Your signature plate", description: "Give nearby food lovers a new favourite.", image: "/images/food/pinterest/jollof-chicken-plantain.webp", alt: "A signature plate of jollof rice, chicken and plantain" },
  { title: "Independent home cooks", category: "Big flavour. Your kitchen.", description: "Make your much-loved recipe part of the story.", image: "/images/food/pinterest/akara-bean-cakes.webp", alt: "Fresh golden akara made in a local kitchen" },
  { title: "Ready for the food run", category: "From counter to table", description: "Bring kitchens, customers and riders together.", image: "/images/food/pinterest/jollof-takeaway.webp", alt: "A takeaway serving of jollof rice ready for collection" },
];

export default function PartnerShowcase() {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const story = kitchenStories[selected];

  function select(next: number) {
    setDirection(next >= selected ? 1 : -1);
    setSelected((next + kitchenStories.length) % kitchenStories.length);
  }

  return (
    <section id="partners-hero" data-nav-theme="neutral" data-scroll-hero aria-labelledby="partners-hero-title" className="relative isolate overflow-hidden bg-paper pt-32 text-ink lg:h-[max(46rem,100svh)] lg:pt-0">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[40%] bg-forest-dark lg:block" />
      <div className="relative mx-auto h-full w-full max-w-[112rem] px-5 sm:px-8 lg:px-[5vw]">
        <div data-scroll-hero-copy className="relative z-10 pb-9 lg:absolute lg:left-[5vw] lg:top-[30%] lg:w-[39%] lg:pb-0">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.17em] text-cocoa"><span className="h-px w-8 bg-brand" />For restaurants & home kitchens</p>
          <h1 id="partners-hero-title" className="font-display text-[clamp(2.9rem,5.4vw,6.2rem)] font-semibold leading-[1.03] tracking-[-0.065em]">You bring<br />the <span className="text-brand">flavour.</span><br />Let&apos;s grow.</h1>
          <p className="mt-6 max-w-[23rem] text-base leading-relaxed text-cocoa lg:max-w-[75%]">You put care into every plate. Bring your kitchen to a community built around good food, close to home.</p>
          <MagneticFillButton href="/waitlist" variant="brand" className="mt-7 min-h-14 rounded-full bg-brand! px-6 py-4 text-sm font-semibold sm:text-base">Join the partner waitlist<ArrowRight className="size-5 shrink-0" aria-hidden="true" /></MagneticFillButton>
          <a href="#partner-process" className="mt-5 flex min-h-10 w-fit items-center gap-3 border-b border-ink/20 text-xs font-semibold uppercase tracking-[0.1em] transition-colors hover:text-brand">How partnership works<ArrowRight className="size-4" aria-hidden="true" /></a>
        </div>

        <div className="relative -mx-5 min-h-[37rem] bg-forest-dark px-5 pb-8 pt-8 text-paper sm:-mx-8 sm:min-h-[44rem] sm:px-8 lg:static lg:mx-0 lg:min-h-0 lg:bg-transparent lg:p-0">
          <div className="relative ml-auto flex max-w-[21rem] items-start gap-3 lg:absolute lg:right-[5vw] lg:top-[20%] lg:max-w-[27%]">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-paper/20 text-brand"><ChefHat className="size-5" aria-hidden="true" /></span>
            <div><p className="text-sm font-medium leading-relaxed">Your kitchen. Your craft.<br />Our next great food story.</p><p className="mt-2 text-[0.65rem] uppercase tracking-[0.15em] text-paper/60">Made for local flavour</p></div>
          </div>

          <div data-scroll-hero-media className="relative mx-auto my-6 aspect-square w-[82%] max-w-[25rem] sm:my-8 sm:max-w-[30rem] lg:absolute lg:left-[41%] lg:top-[34%] lg:m-0 lg:w-[34%] lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[7%] translate-y-[12%] rounded-full bg-ink-deep/35 blur-2xl" />
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={story.title} custom={direction} variants={{ enter: (step: number) => ({ opacity: 0, x: reducedMotion ? 0 : step * 50, rotate: reducedMotion ? 0 : step * 24, scale: reducedMotion ? 1 : 0.82 }), center: { opacity: 1, x: 0, rotate: 0, scale: 1 }, exit: (step: number) => ({ opacity: 0, x: reducedMotion ? 0 : step * -50, rotate: reducedMotion ? 0 : step * -24, scale: reducedMotion ? 1 : 0.88 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 overflow-hidden rounded-full border-[7px] border-paper bg-paper shadow-xl shadow-ink/20 sm:border-[10px]">
                <FoodImage src={story.image} alt={story.alt} fill priority={selected === 0} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 480px, 82vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative ml-auto w-full max-w-md lg:absolute lg:right-0 lg:top-[49%] lg:w-[24%] lg:max-w-none">
            <div className="ml-auto flex w-fit items-center gap-3 rounded-l-full bg-paper py-3 pl-5 pr-5 sm:gap-4 lg:w-full" aria-label="Explore partner kitchen stories">
              {kitchenStories.map((item, index) => (
                <button key={item.title} type="button" onClick={() => select(index)} aria-label={item.title} aria-pressed={index === selected} className={`relative size-12 shrink-0 overflow-hidden rounded-full border-2 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:size-14 xl:size-16 ${selected === index ? "border-brand" : "border-transparent"}`}>
                  <FoodImage src={item.image} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="ml-auto mt-6 max-w-[21rem] pl-4 pr-5 sm:pr-8 lg:pr-[5vw]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-paper/60">{story.category}</p>
              <p className="mt-2 font-display text-lg font-semibold leading-tight xl:text-2xl" aria-live="polite">{story.title}</p>
              <p className="mt-3 text-xs leading-relaxed text-paper/65 sm:text-sm">{story.description}</p>
              <div className="mt-5 flex items-center gap-3">
                <MagneticFillButton as="button" variant="cream" onClick={() => select(selected - 1)} ariaLabel="Previous kitchen story" className="size-10 rounded-full"><ArrowLeft className="size-4" aria-hidden="true" /></MagneticFillButton>
                <MagneticFillButton as="button" variant="cream" onClick={() => select(selected + 1)} ariaLabel="Next kitchen story" className="size-10 rounded-full"><ArrowRight className="size-4" aria-hidden="true" /></MagneticFillButton>
                <span className="ml-auto text-xs tabular-nums text-paper/60">0{selected + 1} / 03</span>
              </div>
            </div>
          </div>
          <p className="mt-8 flex items-center justify-end gap-2 text-xs text-paper/60 lg:absolute lg:bottom-9 lg:right-[5vw] lg:mt-0"><MapPin className="size-3.5 text-brand" aria-hidden="true" />Starting locally. Growing together.</p>
        </div>
        <p className="py-6 text-xs text-cocoa lg:absolute lg:bottom-9 lg:left-[5vw] lg:py-0">Partner applications open with launch.</p>
      </div>
    </section>
  );
}
