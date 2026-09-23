"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, Flame, Leaf, MapPin, UtensilsCrossed, Wheat } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import FoodImage from "@/components/ui/FoodImage";
import { mealPeriods, restaurantDishes, type MealPeriod, type RestaurantDish } from "./restaurantDishes";
import { dishDetails } from "./restaurantPresentation";
import styles from "./Restaurants.module.css";

type MenuFilter = "All meals" | MealPeriod;
const filters: MenuFilter[] = ["All meals", ...mealPeriods];
const tabs = ["Details", "Ingredients", "Our kitchens"] as const;
const ingredientIcons = [Wheat, Flame, Leaf];

export default function RestaurantMenu({ selectedDish, onSelect }: { selectedDish: RestaurantDish; onSelect: (index: number) => void }) {
  const [selectedFilter, setSelectedFilter] = useState<MenuFilter>("All meals");
  const [tab, setTab] = useState<(typeof tabs)[number]>("Details");
  const reducedMotion = useReducedMotion();
  const index = restaurantDishes.findIndex(dish => dish.id === selectedDish.id);
  const details = dishDetails[selectedDish.id];
  const visibleDishes = restaurantDishes.filter(dish => selectedFilter === "All meals" || dish.period === selectedFilter);
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selectedFilter]);
  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + delta + tabs.length) % tabs.length;
    if (!delta && !["Home", "End"].includes(event.key)) return;
    event.preventDefault(); setTab(tabs[next]);
    document.getElementById(`menu-tab-${next}`)?.focus({ preventScroll: true });
  }

  return (
    <section id="restaurant-menu" data-nav-theme="neutral" aria-labelledby="restaurant-menu-title" className="relative bg-paper text-ink">
      <div data-menu-intro data-scroll-motion="off" className={styles.menuIntro}>
        <div data-menu-image-stage className={styles.menuVisual}>
          <p className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[.18em] text-cocoa"><span>The QuickBite menu</span><span className="text-brand-dark">{String(index + 1).padStart(2,"0")} / 06</span></p>
          <div className={styles.menuPlateArea}>
            <div data-menu-featured-plate className={styles.menuPlate}>
              <AnimatePresence initial={false}>
                <motion.div key={selectedDish.id} initial={{ opacity: 0, rotate: reducedMotion ? 0 : -30, scale: reducedMotion ? 1 : .85 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: reducedMotion ? 0 : 30, scale: reducedMotion ? 1 : .85 }} transition={{ duration: reducedMotion ? .12 : .65, ease: [.22,1,.36,1] }} className="absolute inset-0 overflow-hidden rounded-full border-4 border-paper sm:border-8">
                  <FoodImage src={selectedDish.image} alt={selectedDish.imageAlt} fill sizes="(min-width: 1024px) 42vw, 60vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button type="button" aria-label="Previous menu dish" onClick={() => onSelect((index - 1 + restaurantDishes.length) % restaurantDishes.length)} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 hover:bg-peach focus-visible:outline-2 focus-visible:outline-brand"><ArrowLeft className="size-4" /></button>
            <input type="range" min={0} max={restaurantDishes.length - 1} value={index} onChange={event => onSelect(Number(event.target.value))} aria-label="Choose menu dish" aria-valuetext={details.title} className="h-11 min-w-0 flex-1 cursor-pointer accent-brand" />
            <button type="button" aria-label="Next menu dish" onClick={() => onSelect((index + 1) % restaurantDishes.length)} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 hover:bg-peach focus-visible:outline-2 focus-visible:outline-brand"><ArrowRight className="size-4" /></button>
          </div>
        </div>
        <div role="tablist" aria-label="About this dish" aria-orientation="vertical" className={styles.menuTabs}>
          {tabs.map((label,i) => <button type="button" key={label} id={`menu-tab-${i}`} role="tab" aria-selected={tab === label} aria-controls="menu-dish-details" tabIndex={tab === label ? 0 : -1} onKeyDown={event => handleTabKey(event,i)} onClick={() => setTab(label)} className={`${styles.menuTab} focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand`}><span>{label}</span></button>)}
        </div>
        <div className={styles.menuDetails}>
          <p className="mb-4 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[.16em] text-cocoa"><span>Dish discovery</span><MapPin aria-hidden="true" className="size-4 text-brand" /></p>
          <h2 id="restaurant-menu-title" className={styles.menuTitle}>{details.title}</h2>
          <div id="menu-dish-details" data-lenis-prevent role="tabpanel" aria-labelledby={`menu-tab-${tabs.indexOf(tab)}`} tabIndex={0} className={`${styles.menuPanel} focus-visible:outline-2 focus-visible:outline-brand`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${selectedDish.id}-${tab}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? .1 : .2 }}>
                {tab === "Details" ? <>
                  <p className="max-w-md text-xs leading-relaxed text-cocoa sm:text-sm">{selectedDish.description}</p>
                  <dl className={styles.menuFacts}>{[["Good for",selectedDish.period],["Flavour",details.flavour],["Serving",details.serving],["Our first city","Ile-Ife"]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                </> : tab === "Ingredients" ? <>
                  <p className="text-xs leading-relaxed text-cocoa sm:text-sm">The familiar flavours in this dish.</p>
                  <ul className="mt-4 divide-y divide-ink/10">{details.ingredients.map((ingredient,i) => {const Icon = ingredientIcons[i]; return <li key={ingredient} className="flex items-center gap-3 py-3 text-sm"><Icon aria-hidden="true" className="size-5 text-brand" />{ingredient}</li>;})}</ul>
                  <p className="mt-3 text-[10px] leading-relaxed text-cocoa">Recipes vary by kitchen. Check ingredients and dietary needs with the restaurant when ordering opens.</p>
                </> : <>
                  <span className="inline-flex items-center gap-2 rounded-full bg-peach px-3 py-2 text-xs"><MapPin className="size-4 text-brand" /> Ile-Ife, Nigeria</span>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-cocoa">Good food begins with the people who make it. We&apos;re bringing neighbourhood kitchens and their familiar favourites closer to your door.</p>
                  <a href="#restaurant-list" className="mt-5 inline-flex min-h-11 items-center gap-5 text-sm font-semibold text-brand-dark">Meet the kitchens <ArrowDown className="size-4" /></a>
                </>}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.menuActions}>
            <div><p className="text-[9px] uppercase tracking-widest text-cocoa">On the way</p><p className="mt-1 text-sm font-semibold">A taste of what&apos;s next.</p></div>
            <MagneticFillButton href="/waitlist" variant="dark" className="min-h-11 rounded-full bg-dark-ink! px-5 py-3 text-xs">Get launch updates <ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>
          </div>
        </div>
      </div>
      <Container className="py-14 sm:py-20 lg:py-24">
        <Reveal className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-cocoa">The menu preview</p><h2 className="max-w-[18ch] font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-[-.04em]">Find your next favourite.</h2></div>
          <p className="max-w-xs text-sm leading-relaxed text-cocoa">A golden start, a proper lunch, or something warm for dinner. A little of what you&apos;re craving.</p>
        </Reveal>
        <div className="mb-7 mt-9 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
          <div role="group" aria-label="Filter menu by meal time" className="flex flex-wrap gap-2">{filters.map(filter => <MagneticFillButton key={filter} variant={selectedFilter === filter ? "dark" : "cream"} aria-pressed={selectedFilter === filter} aria-controls="restaurant-menu-results" onClick={() => setSelectedFilter(filter)} className={`min-h-11 rounded-full px-4 py-2 text-xs sm:text-sm ${selectedFilter === filter ? "bg-dark-ink! text-paper!" : "border! border-ink/15! bg-paper!"}`}>{filter}</MagneticFillButton>)}</div>
          <p role="status" aria-atomic="true" className="text-xs text-cocoa">{visibleDishes.length} dishes to discover</p>
        </div>
        <ul id="restaurant-menu-results" aria-label={`${selectedFilter} menu preview`} className="grid items-stretch gap-5 [overflow-anchor:none] md:grid-cols-2 xl:grid-cols-3">
          {visibleDishes.map(dish => {
            const dishIndex = restaurantDishes.indexOf(dish);
            const dark = dishIndex % 2 === 1;
            const info = dishDetails[dish.id];
            return <motion.li key={dish.id} data-menu-dish={dish.id} initial={false} whileInView={reducedMotion === false ? { opacity: [0,1], y: [12,0] } : undefined} viewport={{ once: true, amount: .1 }} transition={{ duration: .4 }} className={`min-w-0 overflow-hidden rounded-[1.6rem] border p-2.5 shadow-sm ${dark ? "border-ink bg-ink text-paper" : "border-ink/10 bg-cream text-ink"}`}>
              <div className="relative aspect-[1.5] overflow-hidden rounded-[1.1rem] bg-peach">
                <FoodImage src={dish.image} alt={dish.imageAlt} fill sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 95vw" className="object-cover" />
                <span className={`absolute right-2 top-2 rounded-xl px-3 py-2 text-[10px] font-semibold uppercase tracking-wider ${dark ? "bg-ink text-paper" : "bg-paper text-ink"}`}>{dish.period}</span>
              </div>
              <div className={`relative -mt-5 ml-2 mr-9 flex items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] ${dark ? "bg-brand text-paper" : "bg-peach text-ink"}`}><MapPin aria-hidden="true" className="size-3.5" /> Local favourites. Made in Ile-Ife.</div>
              <div className="px-2 pb-2 pt-4">
                <div className="flex items-center justify-between gap-3"><h3 className="max-w-[18ch] font-display text-lg font-semibold leading-tight">{info.title}</h3><MagneticFillButton href="#restaurant-menu" onClick={() => onSelect(dishIndex)} variant={dark ? "cream" : "dark"} ariaLabel={`View ${info.title}`} className={`size-11 shrink-0 rounded-full ${dark ? "bg-paper!" : "bg-dark-ink!"}`}><ArrowRight className="size-4" aria-hidden="true" /></MagneticFillButton></div>
                <div className={`mt-4 grid grid-cols-3 gap-2 border-t pt-3 ${dark ? "border-paper/15" : "border-ink/10"}`}>{info.ingredients.map((ingredient,i) => {const Icon = ingredientIcons[i]; return <div key={ingredient} className={`flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-2 ${dark ? "bg-paper/8" : "bg-peach/55"}`}><Icon aria-hidden="true" className={`size-4 ${dark ? "text-brand-light" : "text-brand-dark"}`} /><span className="text-center text-[10px] leading-tight">{ingredient}</span></div>;})}</div>
              </div>
            </motion.li>;
          })}
        </ul>
        <p className="mt-7 flex items-start gap-2.5 text-xs leading-relaxed text-cocoa"><UtensilsCrossed aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" /> A taste of what&apos;s coming. Full menus and ordering arrive with the QuickBite app.</p>
      </Container>
    </section>
  );
}
