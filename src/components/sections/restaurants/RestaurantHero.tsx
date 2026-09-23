"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Grid2X2, MapPin, X } from "lucide-react";
import { AnimatePresence, motion, type MotionValue } from "motion/react";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import RestaurantDishStage from "./RestaurantDishStage";
import { restaurantDishes } from "./restaurantDishes";
import { dishDetails } from "./restaurantPresentation";
import styles from "./Restaurants.module.css";

type Props = { selectedIndex: number; position: MotionValue<number>; reducedMotion: boolean | null; onSelect: (index: number) => void; onStep: (direction: -1 | 1) => void };

export default function RestaurantHero({ selectedIndex, position, reducedMotion, onSelect, onStep }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const selected = restaurantDishes[selectedIndex];
  useEffect(() => {
    if (!sidebarOpen) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSidebarOpen(false); toggleRef.current?.focus({ preventScroll: true }); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [sidebarOpen]);
  function closeSidebar() { setSidebarOpen(false); toggleRef.current?.focus({ preventScroll: true }); }

  return (
    <section id="restaurant-hero" data-scroll-hero data-nav-theme="neutral" aria-labelledby="restaurant-hero-title" className={styles.hero}>
      <RestaurantDishStage selectedIndex={selectedIndex} position={position} reducedMotion={reducedMotion} />
      <div data-restaurant-hero-copy data-scroll-hero-copy className={styles.heroCopy}>
        <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-cocoa sm:text-xs"><span className="h-px w-7 bg-brand" /> A little local goodness</p>
        <div className={styles.copyWindow}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected.id} initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }} transition={{ duration: reducedMotion ? .1 : .24 }}>
              <h1 id="restaurant-hero-title" className={styles.heroTitle}>{selected.name}</h1>
              <p className="mt-4 text-xs font-semibold text-brand-dark sm:text-sm">{selected.note}</p>
              <p className={styles.heroDescription}>{selected.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <MagneticFillButton href="#restaurant-menu" variant="dark" className="mt-5 min-h-12 rounded-full bg-dark-ink! px-6 py-3 text-sm sm:mt-7 sm:min-h-14 sm:px-8">Explore the menu <ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>
        <p className="mt-4 max-w-xs text-[10px] leading-relaxed text-cocoa sm:text-xs">Your next food run, coming to the QuickBite app.</p>
      </div>
      <div className={styles.heroBottom}>
        <p className="flex items-baseline gap-1.5 tabular-nums"><span className="font-display text-3xl font-semibold sm:text-4xl">{String(selectedIndex + 1).padStart(2,"0")}</span><span className="text-xs opacity-55">/ {String(restaurantDishes.length).padStart(2,"0")}</span></p>
        <div role="group" aria-label="Choose a dish" className="flex items-center gap-3 sm:gap-6">
          <MagneticFillButton variant="cream" ariaLabel="Previous meal" onClick={() => onStep(-1)} className="min-h-11 rounded-full border! border-ink/15! px-4 text-xs"><ArrowLeft aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Previous</span></MagneticFillButton>
          <MagneticFillButton variant="cream" ariaLabel="Next meal" onClick={() => onStep(1)} className="min-h-11 rounded-full border! border-ink/15! px-4 text-xs"><span className="hidden sm:inline">Next</span><ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>
        </div>
        <a href="#restaurant-menu" aria-label="Discover the menu" className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink focus-visible:outline-2 focus-visible:outline-brand"><ArrowDown className="size-4" /></a>
      </div>
      <div className={styles.miniRail}>
        <button ref={toggleRef} type="button" aria-label="Open dish selector" aria-expanded={sidebarOpen} aria-controls="restaurant-dish-sidebar" onClick={() => setSidebarOpen(true)} className="grid size-11 cursor-pointer place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><Grid2X2 aria-hidden="true" className="size-4" /></button>
        <span className={styles.railLabel}>The local collection</span>
        <MapPin aria-hidden="true" className="hidden size-4 text-brand lg:block" />
      </div>
      <p role="status" className="sr-only">Meal {selectedIndex + 1} of {restaurantDishes.length}: {dishDetails[selected.id].title}</p>
      <AnimatePresence>
        {sidebarOpen && <>
          <motion.button type="button" aria-label="Close dish selector" onClick={closeSidebar} className="absolute inset-0 z-40 bg-dark-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside id="restaurant-dish-sidebar" ref={panelRef} aria-label="Dish selector" className={styles.dishSidebar} initial={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} transition={{ duration: reducedMotion ? .15 : .5, ease: [.22,1,.36,1] }}>
            <div className="flex shrink-0 items-center justify-between border-b border-paper/15 pb-4"><p className="text-xs font-semibold uppercase tracking-widest">Find your favourite</p><button type="button" aria-label="Close dish selector" onClick={closeSidebar} className="grid size-11 place-items-center rounded-full border border-paper/20 hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-brand"><X className="size-5" /></button></div>
            <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
              {restaurantDishes.map((dish,index) => <button type="button" key={dish.id} aria-pressed={selectedIndex === index} onClick={() => { onSelect(index); closeSidebar(); }} className={`group flex min-h-20 w-full cursor-pointer items-center gap-4 rounded-2xl p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand ${selectedIndex === index ? "bg-paper/10" : "hover:bg-paper/5"}`}><span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-paper/20"><FoodImage src={dish.image} alt="" fill sizes="64px" className="object-cover" /></span><span><span className="block text-[10px] uppercase tracking-widest text-brand-light">{dish.period}</span><span className="mt-1 block text-sm font-medium">{dishDetails[dish.id].title}</span></span><ArrowRight aria-hidden="true" className="ml-auto size-4 shrink-0 text-brand" /></button>)}
            </div>
            <p className="border-t border-paper/15 pt-4 text-xs text-paper/60">Good food starts close to home. Ile-Ife, Nigeria.</p>
          </motion.aside>
        </>}
      </AnimatePresence>
    </section>
  );
}
