"use client";

import { restaurantHeroCopy } from "@/content/restaurants/sections";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Grid2X2, MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import SectionWave from "@/components/ui/SectionWave";
import RestaurantDishStage from "./RestaurantDishStage";
import { restaurantDishes } from "@/content/restaurants/dishes";
import { dishDetails } from "@/content/restaurants/presentation";
import { dishTransition, useRestaurantDishTransition } from "./useRestaurantDishTransition";

type Props = { selectedIndex: number; reducedMotion: boolean | null; onSelect: (index: number) => void; onStep: (direction: -1 | 1) => void };

export default function RestaurantHero({ selectedIndex, reducedMotion, onSelect, onStep }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const { index: displayedIndex, previousIndex } = useRestaurantDishTransition(selectedIndex, reducedMotion);
  const selected = restaurantDishes[displayedIndex];
  useEffect(() => {
    if (!sidebarOpen) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSidebarOpen(false); toggleRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true }); }
    };
    const compactScreen = window.matchMedia("(max-width: 1023px)");
    const closeOnCompactScreen = () => {
      if (!compactScreen.matches) return;
      setSidebarOpen(false);
      document.getElementById("restaurant-hero")?.querySelector<HTMLButtonElement>(`[aria-label="${restaurantHeroCopy.ariaLabelNextMeal}"]`)?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", close);
    compactScreen.addEventListener("change", closeOnCompactScreen);
    return () => {
      document.removeEventListener("keydown", close);
      compactScreen.removeEventListener("change", closeOnCompactScreen);
    };
  }, [sidebarOpen]);
  function closeSidebar() { setSidebarOpen(false); toggleRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true }); }

  return (
    <>
    <section id="restaurant-hero" data-scroll-hero data-nav-theme="neutral" aria-labelledby="restaurant-hero-title" className="relative isolate grid h-auto min-h-[max(100svh,calc(var(--dish-stage-height)+440px))] grid-cols-[minmax(0,1fr)] grid-rows-[var(--dish-stage-height)_auto] overflow-hidden bg-paper text-ink [--dish-stage-height:clamp(280px,44svh,500px)] lg:h-svh lg:min-h-0 lg:grid-cols-[52%_1fr_72px] lg:grid-rows-none lg:[@media(max-height:650px)]:h-auto lg:[@media(max-height:650px)]:min-h-[680px]">
      <RestaurantDishStage selectedIndex={displayedIndex} previousIndex={previousIndex} reducedMotion={reducedMotion} />

      <div data-restaurant-hero-copy data-scroll-hero-copy className="col-start-1 row-start-2 z-5 min-w-0 self-start px-6 pt-[clamp(28px,4svh,40px)] pb-[116px] lg:col-start-2 lg:row-start-1 lg:self-center lg:pt-[90px] lg:pr-[clamp(18px,2.5vw,48px)] lg:pb-[55px] lg:pl-[3vw] lg:[@media(max-height:740px)]:pt-[100px] [@media(max-width:380px)]:px-[18px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            data-dish-copy={selected.id}
            initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -42 }}
            animate={{ opacity: 1, x: 0, transition: { duration: reducedMotion ? 0 : .38, delay: reducedMotion ? 0 : dishTransition.copyEnterDelay, ease: dishTransition.settleEase } }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : "105%", transition: { duration: reducedMotion ? 0 : dishTransition.copyExitDuration, ease: [.55, 0, .85, .4], opacity: { duration: reducedMotion ? 0 : .22 } } }}
          >
            <p className="mb-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-cocoa sm:text-sm lg:mb-4"><span className="h-px w-7 bg-brand" />{restaurantHeroCopy.aLittleLocalGoodness}</p>
            <div className="min-h-0 lg:min-h-[265px] lg:[@media(max-height:740px)]:min-h-[218px]">
              <h1 id="restaurant-hero-title" className="max-w-[18ch] font-display text-[clamp(2rem,8.5vw,3.5rem)] leading-[1.04] font-semibold tracking-[-.045em] lg:max-w-[12ch] lg:text-[clamp(2.75rem,4.5vw,5.5rem)] lg:[@media(max-height:740px)]:text-[clamp(2.4rem,4vw,4.5rem)]">{selected.name}</h1>
              <p className="mt-3 text-sm font-semibold text-brand-dark sm:text-base lg:mt-4">{selected.note}</p>
              <p className="mt-4 max-w-xl text-base leading-[1.6] text-cocoa lg:max-w-md lg:text-[clamp(1rem,1.3vw,1.125rem)] lg:leading-[1.65] lg:[@media(max-height:740px)]:text-base">{selected.description}</p>
            </div>
            <MagneticFillButton href={restaurantHeroCopy.hrefRestaurantMenu} variant="dark" className="mt-5 min-h-12 rounded-full bg-dark-ink! px-6 py-3 text-sm sm:mt-7 sm:min-h-14 sm:px-8 sm:text-base [@media(max-width:380px)]:mt-3.5">{restaurantHeroCopy.exploreTheMenu}<ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>
            <p className="mt-4 hidden max-w-xs text-xs leading-relaxed text-cocoa sm:text-sm lg:block">{restaurantHeroCopy.yourNextFoodRunComingToThe}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div data-header-hero-rail className="absolute right-6 bottom-10 left-6 z-10 flex items-center justify-between lg:right-[110px] lg:bottom-[clamp(48px,6svh,64px)] lg:left-[4%] [@media(max-width:380px)]:right-[18px] [@media(max-width:380px)]:left-[18px]">
        <p className="flex items-baseline gap-1.5 text-ink tabular-nums lg:text-paper"><span className="font-display text-3xl font-semibold sm:text-4xl">{String(displayedIndex + 1).padStart(2,"0")}</span><span className="text-xs opacity-55">{"/ "}{String(restaurantDishes.length).padStart(2,"0")}</span></p>
        <div role="group" aria-label={restaurantHeroCopy.ariaLabelChooseADish} className="flex items-center gap-3 sm:gap-6">
          <MagneticFillButton variant="cream" ariaLabel={restaurantHeroCopy.ariaLabelPreviousMeal} onClick={() => onStep(-1)} className="min-h-11 rounded-full border! border-ink/15! px-4 text-xs"><ArrowLeft aria-hidden="true" className="size-4" /><span className="hidden sm:inline">{restaurantHeroCopy.previous}</span></MagneticFillButton>
          <MagneticFillButton variant="cream" ariaLabel={restaurantHeroCopy.ariaLabelNextMeal} onClick={() => onStep(1)} className="min-h-11 rounded-full border! border-ink/15! px-4 text-xs"><span className="hidden sm:inline">{restaurantHeroCopy.next}</span><ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>
        </div>
      </div>
      <div className="relative col-start-3 row-start-1 z-20 hidden flex-col items-center justify-between border-l border-ink/12 bg-paper px-2.5 pt-[135px] pb-[38px] lg:flex">
        <div ref={toggleRef} className="flex shrink-0">
          <MagneticFillButton variant="dark" ariaLabel={restaurantHeroCopy.ariaLabelOpenDishSelector} aria-expanded={sidebarOpen} aria-controls="restaurant-dish-sidebar" onClick={() => setSidebarOpen(true)} className="size-11 rounded-full bg-dark-ink! text-paper">
            <Grid2X2 aria-hidden="true" className="size-4" />
          </MagneticFillButton>
        </div>
        <span className="text-[10px] tracking-[.22em] text-cocoa uppercase [writing-mode:vertical-rl]">{restaurantHeroCopy.theLocalCollection}</span>
        <MapPin aria-hidden="true" className="hidden size-4 text-brand lg:block" />
      </div>
      <p role="status" className="sr-only">{restaurantHeroCopy.meal}{displayedIndex + 1}{restaurantHeroCopy.of}{restaurantDishes.length}{": "}{dishDetails[selected.id].title}</p>
      <AnimatePresence>
        {sidebarOpen && <>
          <motion.button type="button" aria-label={restaurantHeroCopy.ariaLabelCloseDishSelector} onClick={closeSidebar} className="absolute inset-0 z-40 hidden bg-dark-ink/40 lg:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside id="restaurant-dish-sidebar" ref={panelRef} aria-label={restaurantHeroCopy.ariaLabelDishSelector} className="absolute inset-y-0 right-0 z-45 hidden w-[min(360px,88vw)] flex-col bg-dark-ink px-[22px] pt-[115px] pb-6 text-paper lg:flex" initial={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} transition={{ duration: reducedMotion ? .15 : .5, ease: [.22,1,.36,1] }}>
            <div className="flex shrink-0 items-center justify-between border-b border-paper/15 pb-4"><p className="text-xs font-semibold uppercase tracking-widest">{restaurantHeroCopy.findYourFavourite}</p><button type="button" aria-label={restaurantHeroCopy.ariaLabelCloseDishSelector} onClick={closeSidebar} className="grid size-11 place-items-center rounded-full border border-paper/20 hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-brand"><X className="size-5" /></button></div>
            <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
              {restaurantDishes.map((dish,index) => <button type="button" key={dish.id} aria-pressed={selectedIndex === index} onClick={() => { onSelect(index); closeSidebar(); }} className={`group flex min-h-20 w-full cursor-pointer items-center gap-4 rounded-2xl p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand ${selectedIndex === index ? "bg-paper/10" : "hover:bg-paper/5"}`}><span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-paper/20"><FoodImage src={dish.image} alt="" fill sizes="64px" className="object-cover" /></span><span><span className="block text-[10px] uppercase tracking-widest text-brand-light">{dish.period}</span><span className="mt-1 block text-sm font-medium">{dishDetails[dish.id].title}</span></span><ArrowRight aria-hidden="true" className="ml-auto size-4 shrink-0 text-brand" /></button>)}
            </div>
            <p className="border-t border-paper/15 pt-4 text-xs text-paper/60">{restaurantHeroCopy.goodFoodStartsCloseToHomeIle}</p>
          </motion.aside>
        </>}
      </AnimatePresence>
    </section>
    <SectionWave to="paper" from="transparent" className="z-1 lg:-mt-16" />
    </>
  );
}
