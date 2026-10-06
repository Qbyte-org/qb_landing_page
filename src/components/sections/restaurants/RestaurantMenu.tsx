"use client";

import { restaurantMenuCopy } from "@/content/restaurants/sections";

import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Flame, Leaf, MapPin, Wheat } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import ExpandableCardDialog, { expandableCardTransition } from "@/components/ui/ExpandableCardDialog";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import FoodImage from "@/components/ui/FoodImage";
import { mealPeriods, type MealPeriod } from "@/content/restaurants/dishes";
import { restaurantMenuDishes } from "@/content/restaurants/menu";
import RestaurantMenuDetails from "./RestaurantMenuDetails";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";

type MenuFilter = typeof restaurantMenuCopy.allMeals | MealPeriod;
const filters: MenuFilter[] = [restaurantMenuCopy.allMeals, ...mealPeriods];
const ingredientIcons = [Wheat, Flame, Leaf];
const initialMobileCount = 6;
const mobilePageSize = 3;

export default function RestaurantMenu() {
  const [selectedFilter, setSelectedFilter] = useState<MenuFilter>(restaurantMenuCopy.allMeals);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(initialMobileCount);
  const filterRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const pendingAnchorRef = useRef<string | null>(null);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const visibleDishes = restaurantMenuDishes.filter(dish => selectedFilter === restaurantMenuCopy.allMeals || dish.period === selectedFilter);
  const mobileCount = Math.min(mobileVisibleCount, visibleDishes.length);
  const activeDish = activeIndex === null ? null : restaurantMenuDishes[activeIndex];
  const closeDetails = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selectedFilter, mobileVisibleCount]);

  function selectFilter(filter: MenuFilter) {
    setSelectedFilter(filter);
    setMobileVisibleCount(initialMobileCount);
  }

  function scrollToMenuTarget(target: HTMLElement) {
    const lenis = window.quickBiteLenis;
    if (lenis && !lenis.isStopped) {
      lenis.resize();
      lenis.scrollTo(target, { offset: -100, duration: .55, immediate: Boolean(reducedMotion) });
    } else {
      target.scrollIntoView({ block: "start", behavior: reducedMotion ? "instant" : "smooth" });
    }
  }

  function showMoreDishes() {
    const nextDish = visibleDishes[mobileCount];
    if (!nextDish) return;
    setMobileVisibleCount(count => Math.min(count + mobilePageSize, visibleDishes.length));
    requestAnimationFrame(() => {
      const card = document.getElementById(`menu-preview-${nextDish.id}-${id}`);
      if (!card) return;
      card.querySelector<HTMLButtonElement>("[data-menu-card-trigger]")?.focus({ preventScroll: true });
      scrollToMenuTarget(card);
    });
  }

  function showFewerDishes() {
    setMobileVisibleCount(initialMobileCount);
    requestAnimationFrame(() => {
      const filters = filterRef.current;
      if (!filters) return;
      filters.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus({ preventScroll: true });
      scrollToMenuTarget(filters);
    });
  }

  function openDetails(index: number, event: MouseEvent<HTMLButtonElement>) {
    returnFocusRef.current = event.currentTarget;
    // Keep the source card visible if the viewport becomes mobile while its
    // dialog is open, so closing can still return focus to that card.
    const position = visibleDishes.indexOf(restaurantMenuDishes[index]) + 1;
    setMobileVisibleCount(count => Math.max(count, Math.ceil(position / mobilePageSize) * mobilePageSize));
    setActiveIndex(index);
  }

  function visitKitchens() {
    pendingAnchorRef.current = "restaurant-list";
    closeDetails();
  }

  const finishClose = useCallback(() => {
    const anchor = pendingAnchorRef.current;
    pendingAnchorRef.current = null;
    if (!anchor) return;
    // Called after the dialog has released its scroll lock, including Lenis.
    requestAnimationFrame(() => {
      const target = document.getElementById(anchor);
      if (!target) return;
      const focusTarget = () => {
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
          target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
        }
        target.focus({ preventScroll: true });
      };
      const lenis = window.quickBiteLenis;
      if (lenis && !lenis.isStopped) {
        lenis.resize();
        lenis.scrollTo(target, { duration: .9, onComplete: focusTarget });
      } else {
        target.scrollIntoView({ behavior: "instant" });
        focusTarget();
      }
    });
  }, []);

  return (
    <section id="restaurant-menu" data-nav-theme="neutral" aria-labelledby="restaurant-menu-title" className="relative scroll-mt-24 mt-20 bg-paper text-dark-ink">
      <LayoutGroup id={id}>
        <Container className="py-14 sm:py-20 lg:py-24">
          <Reveal className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-cocoa">{restaurantMenuCopy.theMenuPreview}</p>
              <h2 id="restaurant-menu-title" className="max-w-[18ch] font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-[-.04em]">{restaurantMenuCopy.findYourNextFavourite}</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-cocoa">{restaurantMenuCopy.aGoldenStartAProperLunchOr}</p>
          </Reveal>
          <div className="mb-7 mt-9 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
            <div ref={filterRef} role="group" aria-label={restaurantMenuCopy.ariaLabelFilterMenuByMealTime} className="flex scroll-mt-24 flex-wrap gap-2">
              {filters.map(filter => <MagneticFillButton key={filter} variant={selectedFilter === filter ? "dark" : "cream"} aria-pressed={selectedFilter === filter} aria-controls="restaurant-menu-results" onClick={() => selectFilter(filter)} className={`min-h-11 rounded-full px-4 py-2 text-xs sm:text-sm ${selectedFilter === filter ? "bg-dark-ink! text-paper!" : "border! border-ink/15! bg-paper!"}`}>{filter}</MagneticFillButton>)}
            </div>
            <p role="status" aria-atomic="true" className="text-xs text-cocoa"><span className="md:hidden">{restaurantMenuCopy.showing}{mobileCount}{restaurantMenuCopy.of}{visibleDishes.length}{restaurantMenuCopy.dishes}</span><span className="hidden md:inline">{visibleDishes.length}{restaurantMenuCopy.dishesToDiscover}</span></p>
          </div>
          <ul id="restaurant-menu-results" data-scroll-motion="off" aria-label={restaurantMenuCopy.ariaLabelFormat(selectedFilter)} className="grid items-stretch gap-5 [overflow-anchor:none] md:grid-cols-2 xl:grid-cols-3">
            {visibleDishes.map((dish, position) => {
              const dishIndex = restaurantMenuDishes.indexOf(dish);
              const dark = dishIndex % 2 === 1;
              return (
                <motion.li key={dish.id} id={`menu-preview-${dish.id}-${id}`} data-menu-dish={dish.id} layoutId={reducedMotion ? undefined : `menu-card-${dish.id}-${id}`} initial={false} transition={{ layout: reducedMotion ? { duration: 0 } : expandableCardTransition }} style={{ borderRadius: 40 }} className={`group relative min-w-0 scroll-mt-24 overflow-hidden border shadow-sm ${position >= mobileVisibleCount ? "hidden md:block" : ""} ${dark ? "border-ink bg-ink text-paper" : "border-ink/10 bg-cream text-dark-ink"}`}>
                  <button type="button" data-menu-card-trigger aria-label={restaurantMenuCopy.ariaLabelViewFormat(dish.title)} aria-haspopup="dialog" aria-expanded={activeIndex === dishIndex} aria-controls={activeIndex === dishIndex ? `menu-dialog-${id}` : undefined} onClick={event => openDetails(dishIndex, event)} className="absolute inset-0 z-10 cursor-pointer rounded-[2.5rem]! focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-brand" />
                  <motion.div layoutId={reducedMotion ? undefined : `menu-image-${dish.id}-${id}`} transition={{ layout: reducedMotion ? { duration: 0 } : expandableCardTransition }} data-menu-card-image className="relative aspect-[1.35] overflow-hidden bg-peach rounded-b-4xl">
                    <FoodImage src={dish.image} alt={dish.imageAlt} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 48vw, 95vw" className="object-cover" />
                    <span className={`absolute right-5 top-5 rounded-[2.5rem] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider ${dark ? "bg-ink text-paper" : "bg-paper text-dark-ink"}`}>{dish.period}</span>
                    <span className={`absolute bottom-4 left-4 flex items-center gap-2 rounded-[2.5rem] px-3 py-2.5 text-[10px] ${dark ? "bg-dark-ink text-paper" : "bg-paper text-dark-ink"}`}><MapPin aria-hidden="true" className="size-3.5" />{restaurantMenuCopy.localFavouritesMadeInIleIfe}</span>
                  </motion.div>
                  <div className="px-5 pb-5 pt-4">
                    <BackgroundGrainTexture className={`${dark ? "opacity-20 hover:opacity-10" : "opacity-50"}`} />
                    <div className="flex min-h-12 items-center justify-between gap-3">
                      <h3 className="max-w-[18ch] font-display text-lg font-semibold leading-tight">{dish.title}</h3>
                      <span aria-hidden="true" className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${dark ? "bg-paper text-dark-ink group-hover:bg-brand group-hover:text-paper" : "bg-dark-ink text-paper group-hover:bg-brand"}`}><ArrowRight className="size-4" /></span>
                    </div>
                    <div className={`mt-4 grid grid-cols-3 gap-2 border-t pt-3 ${dark ? "border-paper/15" : "border-ink/10"}`}>
                      {dish.ingredients.map((ingredient, index) => {
                        const Icon = ingredientIcons[index % ingredientIcons.length];
                        return <div key={ingredient} className={`flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-[2.5rem] px-1 py-2 ${dark ? "bg-dark-ink" : "bg-peach"}`}><Icon aria-hidden="true" className={`size-4 ${dark ? "text-brand-light" : "text-brand-dark"}`} /><span className="text-center text-[10px] leading-tight">{ingredient}</span></div>;
                      })}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
          {visibleDishes.length > initialMobileCount && (
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden">
              {mobileCount < visibleDishes.length && <MagneticFillButton type="button" variant="dark" aria-controls="restaurant-menu-results" aria-expanded={mobileCount > initialMobileCount} onClick={showMoreDishes} className="min-h-12 rounded-full bg-dark-ink! px-6 text-sm">{restaurantMenuCopy.show}{Math.min(mobilePageSize, visibleDishes.length - mobileCount)}{restaurantMenuCopy.moreDishes}<ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>}
              {mobileCount > initialMobileCount && <MagneticFillButton type="button" variant="cream" aria-controls="restaurant-menu-results" onClick={showFewerDishes} className="min-h-12 rounded-full border! border-ink/15! px-6 text-sm">{restaurantMenuCopy.showFewerDishes}</MagneticFillButton>}
            </div>
          )}
          {/* <p className="mt-7 flex items-start gap-2.5 text-xs leading-relaxed text-cocoa"><UtensilsCrossed aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" /> A taste of what&apos;s coming. Full menus and ordering arrive with the QuickBite app.</p> */}
        </Container>
        <AnimatePresence>
          {activeDish && (
            <ExpandableCardDialog key={activeDish.id} id={`menu-dialog-${id}`} layoutId={`menu-card-${activeDish.id}-${id}`} labelledBy={`menu-detail-title-${id}`} onClose={closeDetails} onAfterClose={finishClose} returnFocusRef={returnFocusRef}>
              <RestaurantMenuDetails dish={activeDish} layoutPrefix={id} onClose={closeDetails} onVisitKitchens={visitKitchens} />
            </ExpandableCardDialog>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
