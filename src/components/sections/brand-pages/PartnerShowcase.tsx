"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ChefHat, MapPin } from "lucide-react";
import { partnerContent } from "@/content/brand-pages";
import { partnerDishes } from "@/content/partner-dishes";
import { useRouteTransitionActive } from "@/components/layout/PageTransitions";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import SectionWave from "@/components/ui/SectionWave";

type PartnerShowcaseProps = { selected: number; onSelect: (index: number) => void };

export default function PartnerShowcase({ selected, onSelect }: PartnerShowcaseProps) {
  const [direction, setDirection] = useState(1);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const routeTransitionActive = useRouteTransitionActive();
  const heroReady = !routeTransitionActive;
  const story = partnerDishes[selected];

  const revealThumbnailGroup = useCallback((index: number) => {
    const strip = thumbnailsRef.current;
    const firstInGroup = strip?.children[Math.floor(index / 3) * 3] as HTMLElement | undefined;
    if (!strip || !firstInGroup) return;
    // Keep three complete thumbnails visible, without moving the page.
    const inset = Number.parseFloat(getComputedStyle(strip).paddingLeft) || 0;
    strip.scrollTo({
      left: firstInGroup.offsetLeft - inset,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, [reducedMotion]);

  useEffect(() => {
    revealThumbnailGroup(selected);
  }, [selected, revealThumbnailGroup]);

  function select(next: number) {
    setDirection(next >= selected ? 1 : -1);
    onSelect((next + partnerDishes.length) % partnerDishes.length);
  }

  return (
    <>
      <section id="partners-hero" data-nav-theme="neutral" data-scroll-hero aria-labelledby="partners-hero-title" className="relative isolate overflow-hidden bg-paper pt-34 text-ink sm:pt-38 lg:flex lg:min-h-[max(46rem,100svh)] lg:pt-40 lg:pb-16">
        <div data-partner-display-panel aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-2/5 bg-dark-ink lg:block" />
        <div data-header-hero-rail className="relative mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:grid lg:grid-cols-[minmax(0,40fr)_minmax(0,57fr)] lg:gap-[3%] lg:px-[5vw]">
          <div data-scroll-hero-copy className="relative z-2 pb-12 lg:self-start lg:py-6">
            <motion.div data-partner-copy-intro className="motion-reduce:opacity-100! motion-reduce:transform-none!" initial={{ opacity: 0, y: 28 }} whileInView={heroReady ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}>
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.17em] text-cocoa"><span className="h-px w-8 shrink-0 bg-brand" />{partnerContent.hero.eyebrow}</p>
              <h1 id="partners-hero-title" className="font-display text-[clamp(2.9rem,5.4vw,6.2rem)] font-semibold leading-[1.03] tracking-[-.065em]">{partnerContent.hero.title[0]}<br />{partnerContent.hero.title[1]}<span className="text-brand">{partnerContent.hero.title[2]}</span><br />{partnerContent.hero.title[3]}</h1>
              <p className="mt-6 max-w-[23rem] text-base leading-relaxed text-cocoa">{partnerContent.hero.description}</p>
              <MagneticFillButton href={partnerContent.hero.action.href} variant="brand" className="mt-7 min-h-14 rounded-full bg-brand! px-6 py-4 text-sm font-semibold sm:text-base">{partnerContent.hero.action.label}<ArrowRight className="size-5 shrink-0" aria-hidden="true" /></MagneticFillButton>
              <a href={partnerContent.hero.secondaryAction.href} className="mt-5 flex min-h-10 w-fit items-center gap-3 border-b border-ink/20 text-xs font-semibold uppercase tracking-[0.1em] transition-colors hover:text-brand">{partnerContent.hero.secondaryAction.label}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></a>
              <p data-partner-launch-note className="mt-7 text-xs leading-relaxed text-cocoa">{partnerContent.hero.launchNote}</p>
            </motion.div>
          </div>

          <div data-partner-display className="relative isolate -mx-5 grid gap-8 bg-dark-ink px-5 py-8 text-paper sm:-mx-8 sm:px-8 sm:py-10 lg:m-0 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,32%)] lg:grid-rows-[auto_1fr_auto] lg:gap-x-[4%] lg:bg-transparent lg:p-0">
            <BackgroundGrainTexture className="opacity-30! lg:hidden" />
            <div className="relative min-w-0 pb-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start lg:pt-10 lg:pb-0">
              <div data-scroll-hero-media data-partner-featured className="relative mx-auto aspect-square w-[90%] max-w-120 lg:-ml-[8%] lg:w-[112%] lg:max-w-none">
                <motion.div data-partner-dish-intro className="absolute inset-0 motion-reduce:opacity-100! motion-reduce:transform-none!" initial={{ opacity: 0, x: 28, rotate: -12, scale: 0.9 }} whileInView={heroReady ? { opacity: 1, x: 0, rotate: 0, scale: 1 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <div aria-hidden="true" className="absolute inset-[7%] translate-y-[12%] rounded-full bg-ink-deep/35 blur-2xl" />
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div key={story.id} custom={direction} variants={{ enter: (step: number) => ({ opacity: 0, x: reducedMotion ? 0 : step * 50, rotate: reducedMotion ? 0 : step * 24, scale: reducedMotion ? 1 : 0.82 }), center: { opacity: 1, x: 0, rotate: 0, scale: 1 }, exit: (step: number) => ({ opacity: 0, x: reducedMotion ? 0 : step * -50, rotate: reducedMotion ? 0 : step * -24, scale: reducedMotion ? 1 : 0.88 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 overflow-hidden rounded-full border-[7px] border-paper bg-paper shadow-xl shadow-ink/20 sm:border-[10px]">
                      <FoodImage src={story.image} alt={story.alt} fill priority={selected === 0} sizes="(min-width: 1024px) 36vw, (min-width: 640px) 480px, 82vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            <aside data-partner-story-panel aria-label={partnerContent.hero.storiesLabel} className="relative mx-auto flex w-full min-w-0 max-w-md flex-col gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start lg:pt-6 lg:pb-6">
              <motion.div data-partner-craft-intro className="border-b border-paper/15 pb-5 motion-reduce:opacity-100! motion-reduce:transform-none!" initial={{ opacity: 0, y: 16 }} whileInView={heroReady ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-paper/20 text-brand"><ChefHat className="size-4" aria-hidden="true" /></span>
                  <p className="min-w-0 text-sm font-medium leading-relaxed lg:text-xs xl:text-sm">{partnerContent.hero.craftTitle[0]}<br />{partnerContent.hero.craftTitle[1]}</p>
                </div>
                <p className="mt-4 text-[0.6rem] leading-relaxed tracking-[0.15em] text-paper/55 uppercase">{partnerContent.hero.craftCaption}</p>
              </motion.div>

              <motion.div data-partner-thumbnail-rail className="relative isolate rounded-l-full bg-paper after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-screen after:bg-paper after:content-[''] motion-reduce:opacity-100! motion-reduce:transform-none!" initial={{ opacity: 0, x: 80 }} whileInView={heroReady ? { opacity: 1, x: 0 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}>
                <div ref={thumbnailsRef} data-partner-dishes data-lenis-prevent className="relative flex snap-x snap-mandatory scroll-px-2 items-center gap-2 overflow-x-auto overscroll-x-contain rounded-l-full p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={partnerContent.hero.storiesLabel}>
                  {partnerDishes.map((item, index) => (
                    <button key={item.id} type="button" onClick={() => select(index)} onFocus={() => revealThumbnailGroup(index)} aria-label={item.title} aria-pressed={index === selected} className={`relative aspect-square min-w-0 shrink-0 basis-[calc((100%_-_1rem)/3)] snap-start overflow-hidden rounded-full border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${selected === index ? "border-brand" : "border-transparent hover:border-brand/50"}`}>
                      <FoodImage src={item.image} alt="" fill sizes="(min-width: 1024px) 7vw, 130px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
              <motion.div data-partner-story-details className="min-h-48 lg:min-h-56 xl:min-h-52 motion-reduce:opacity-100! motion-reduce:transform-none!" aria-live="polite" aria-atomic="true" initial={{ opacity: 0, y: 16 }} whileInView={heroReady ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <AnimatePresence initial={false} mode="wait">
                  <motion.div key={story.id} data-partner-story-content initial={reducedMotion === false ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion === false ? -10 : 0 }} transition={{ duration: reducedMotion === false ? 0.24 : 0, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="text-[0.6rem] font-semibold leading-relaxed tracking-[0.15em] text-paper/55 uppercase">{story.category}</p>
                    <h2 className="mt-3 font-display text-[clamp(1.4rem,1.7vw,1.875rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-balance">{story.title}</h2>
                    <p className="mt-4 text-sm leading-[1.75] text-paper/65 lg:text-[.8125rem] xl:text-sm">{story.description}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div data-partner-story-controls className="flex items-center justify-between gap-3 border-t border-paper/15 pt-5 motion-reduce:opacity-100! motion-reduce:transform-none!" initial={{ opacity: 0, y: 12 }} whileInView={heroReady ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <span className="whitespace-nowrap text-xs tabular-nums text-paper/50"><span className="font-semibold text-paper">{String(selected + 1).padStart(2, "0")}</span> / {String(partnerDishes.length).padStart(2, "0")}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <MagneticFillButton as="button" variant="cream" onClick={() => select(selected - 1)} ariaLabel={partnerContent.hero.previousLabel} className="size-11 rounded-full"><ArrowLeft className="size-4" aria-hidden="true" /></MagneticFillButton>
                  <MagneticFillButton as="button" variant="cream" onClick={() => select(selected + 1)} ariaLabel={partnerContent.hero.nextLabel} className="size-11 rounded-full"><ArrowRight className="size-4" aria-hidden="true" /></MagneticFillButton>
                </div>
              </motion.div>
            </aside>
            <p className="relative flex items-center justify-end gap-2 text-xs text-paper/60 lg:col-span-full lg:row-start-3 lg:min-h-6"><MapPin className="size-3.5 shrink-0 text-brand" aria-hidden="true" />{partnerContent.hero.locationNote}</p>
          </div>
        </div>
      </section>
      <SectionWave to="paper" from="dark-ink" className="lg:hidden" />
      <SectionWave to="paper" from="paper" splitBackground="ink-right" className="hidden lg:block" />
    </>
  );
}
