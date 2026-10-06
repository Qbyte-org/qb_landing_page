"use client";

import { restaurantMenuDetailsCopy } from "@/content/restaurants/sections";

import { tabs } from "@/content/restaurants/menu-tabs";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Flame, Leaf, MapPin, Wheat } from "lucide-react";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import { expandableCardTransition } from "@/components/ui/ExpandableCardDialog";
import type { RestaurantMenuDish } from "@/content/restaurants/menu";

const ingredientIcons = [Wheat, Flame, Leaf];

export default function RestaurantMenuDetails({ dish, layoutPrefix, onClose, onVisitKitchens }: {
  dish: RestaurantMenuDish;
  layoutPrefix: string;
  onClose: () => void;
  onVisitKitchens: () => void;
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const reducedMotion = useReducedMotion();
  const tabId = (index: number) => `dish-tab-${index}-${layoutPrefix}`;
  const panelId = `dish-panel-${layoutPrefix}`;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + delta + tabs.length) % tabs.length;
    if (!delta && !["Home", "End"].includes(event.key)) return;
    event.preventDefault();
    setTab(tabs[next]);
    document.getElementById(tabId(next))?.focus({ preventScroll: true });
  }

  return (
    <div data-menu-intro className="grid min-h-0 grid-cols-[minmax(0,1fr)] bg-paper md:min-h-[min(660px,calc(100dvh-3rem))] md:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
      <motion.div layoutId={reducedMotion ? undefined : `menu-image-${dish.id}-${layoutPrefix}`} transition={{ layout: reducedMotion ? { duration: 0 } : expandableCardTransition }} className="relative h-[clamp(190px,30dvh,300px)] min-w-0 overflow-hidden bg-dark-ink md:h-auto">
        <FoodImage src={dish.image} alt={dish.imageAlt} fill sizes="(min-width: 1024px) 520px, 95vw" className="object-cover" />
        <motion.span initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : .1, delay: 0 } }} transition={{ delay: reducedMotion ? 0 : .3, duration: reducedMotion ? 0 : .2 }} className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-dark-ink/85 px-4 py-2 text-xs text-paper"><MapPin aria-hidden="true" className="size-4" />{restaurantMenuDetailsCopy.madeInIleIfe}</motion.span>
      </motion.div>
      <motion.div
        data-menu-detail-content
        initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : 6, transition: { duration: reducedMotion ? 0 : .1, delay: 0 } }}
        transition={{ delay: reducedMotion ? 0 : .32, duration: reducedMotion ? 0 : .22, ease: [.22, 1, .36, 1] }}
        className="flex min-w-0 flex-col px-[22px] py-6 md:px-[clamp(24px,3vw,44px)] md:pt-[66px] md:pb-8 [@media(max-width:380px)]:px-[18px]"
      >
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-brand-dark">{dish.period}{restaurantMenuDetailsCopy.theQuickBiteMenu}</p>
        <h2 id={`menu-detail-title-${layoutPrefix}`} className="max-w-[17ch] font-display text-[clamp(1.65rem,5vw,2.25rem)] leading-[1.08] font-semibold tracking-[-.04em] md:text-[clamp(1.75rem,3vw,2.6rem)]">{dish.title}</h2>
        <div role="tablist" aria-label={restaurantMenuDetailsCopy.ariaLabelAboutThisDish} className="mt-5 flex gap-[18px] border-b border-ink/12 md:mt-7 md:gap-4 [@media(max-width:380px)]:gap-3.5">
          {tabs.map((label, index) => <button type="button" key={label} id={tabId(index)} role="tab" aria-selected={tab === label} aria-controls={panelId} tabIndex={tab === label ? 0 : -1} onKeyDown={event => handleTabKey(event, index)} onClick={() => setTab(label)} className="min-h-11 cursor-pointer border-b-2 border-transparent text-xs font-semibold text-cocoa focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand aria-selected:border-brand aria-selected:text-brand-dark [@media(max-width:380px)]:text-[11px]">{label}</button>)}
        </div>
        <div id={panelId} data-lenis-prevent role="tabpanel" aria-labelledby={tabId(tabs.indexOf(tab))} tabIndex={0} className="min-h-0 flex-1 pt-[18px] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand md:min-h-60 md:pt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .15 }}>
              {tab === tabs[0] ? <>
                <p className="text-sm leading-relaxed text-cocoa">{dish.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-x-3.5 gap-y-[18px] md:mt-[26px] md:gap-x-4 md:gap-y-[22px]">
                  {[[restaurantMenuDetailsCopy.goodFor, dish.period], [restaurantMenuDetailsCopy.flavour, dish.flavour], [restaurantMenuDetailsCopy.serving, dish.serving], [restaurantMenuDetailsCopy.ourFirstCity, restaurantMenuDetailsCopy.firstCity]].map(([label, value]) => <div key={label}><dt className="text-[9px] tracking-[.12em] text-cocoa uppercase">{label}</dt><dd className="mt-1.5 text-sm leading-[1.4] md:text-[15px]">{value}</dd></div>)}
                </dl>
              </> : tab === tabs[1] ? <>
                <p className="text-sm leading-relaxed text-cocoa">{restaurantMenuDetailsCopy.theFamiliarFlavoursInThisDish}</p>
                <ul className="mt-3 divide-y divide-ink/10">
                  {dish.ingredients.map((ingredient, index) => { const Icon = ingredientIcons[index % ingredientIcons.length]; return <li key={ingredient} className="flex items-center gap-3 py-3 text-sm"><Icon aria-hidden="true" className="size-5 text-brand" />{ingredient}</li>; })}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-cocoa">{restaurantMenuDetailsCopy.recipesVaryByKitchenCheckIngredientsAnd}</p>
              </> : <>
                <span className="inline-flex items-center gap-2 rounded-full bg-peach px-3 py-2 text-xs"><MapPin aria-hidden="true" className="size-4 text-brand" />{restaurantMenuDetailsCopy.ileIfeNigeria}</span>
                <p className="mt-4 text-sm leading-relaxed text-cocoa">{restaurantMenuDetailsCopy.goodFoodBeginsWithThePeopleWho}</p>
                <MagneticFillButton onClick={onVisitKitchens} variant="cream" className="mt-5 min-h-11 rounded-full px-4 text-sm">{restaurantMenuDetailsCopy.meetTheKitchens}<ArrowDown aria-hidden="true" className="size-4" /></MagneticFillButton>
              </>}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5 md:mt-6 md:pt-[22px]">
          <p className="text-xs leading-relaxed text-cocoa">{restaurantMenuDetailsCopy.aTasteOfWhatSNext}<br />{restaurantMenuDetailsCopy.orderingOpensWithTheApp}</p>
          <MagneticFillButton href={restaurantMenuDetailsCopy.hrefWaitlist} onClick={onClose} variant="dark" className="min-h-12 rounded-full bg-dark-ink! px-5 py-3 text-xs [@media(max-width:380px)]:w-full">{restaurantMenuDetailsCopy.getLaunchUpdates}<ArrowRight aria-hidden="true" className="size-4" /></MagneticFillButton>
        </div>
      </motion.div>
    </div>
  );
}
