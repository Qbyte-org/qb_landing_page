"use client";

import { useState } from "react";
import Image from "@/components/ui/SiteImage";
import { AnimatePresence, motion } from "motion/react";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import { restaurantDishes } from "@/content/restaurants/dishes";
import { dishIngredients } from "@/content/restaurants/ingredients";
import { dishTransition } from "./useRestaurantDishTransition";

type Props = { selectedIndex: number; previousIndex: number | null; reducedMotion: boolean | null };

const { travelEase, settleEase } = dishTransition;

function TraySurface({ dishId, incoming = false }: { dishId: string; incoming?: boolean }) {
  return (
    <div data-dish-tray={dishId} className="absolute inset-0 overflow-hidden rounded-[clamp(28px,3vw,64px)] bg-dark-ink" style={{ transform: incoming ? "translateY(103%)" : undefined }}>
      <BackgroundGrainTexture className="opacity-70!" />
    </div>
  );
}

function DishTrays({ index, previousIndex, reducedMotion }: {
  index: number;
  previousIndex: number | null;
  reducedMotion: boolean | null;
}) {
  const moving = previousIndex !== null && !reducedMotion;
  const [settled, setSettled] = useState(!moving);

  return (
    <motion.div
      data-tray-strip
      className="absolute inset-0"
      initial={{ y: "0%" }}
      animate={{ y: moving ? ["0%", "-111%", "-98%", "-105%", "-103%"] : "0%" }}
      transition={moving ? { duration: 1.48, times: [0, .58, .78, .91, 1], ease: [travelEase, settleEase, settleEase, settleEase] } : { duration: 0 }}
      onAnimationComplete={() => setSettled(true)}
    >
      {moving && !settled && <TraySurface dishId={restaurantDishes[previousIndex].id} />}
      <TraySurface dishId={restaurantDishes[index].id} incoming={moving} />
    </motion.div>
  );
}

/** Trays travel along their tilted vertical axis; food has a separate horizontal track. */
export default function RestaurantDishStage({ selectedIndex, previousIndex, reducedMotion }: Props) {
  const dish = restaurantDishes[selectedIndex];
  return (
    <div data-restaurant-dish-stage className="pointer-events-none absolute inset-x-0 top-0 isolate z-0 h-[var(--dish-stage-height)] min-w-0 overflow-hidden lg:bottom-0 lg:h-auto lg:overflow-visible">
      <div aria-hidden="true" className="absolute -top-[34%] -left-[28%] -z-1 h-[130%] w-[115%] origin-bottom-right [transform:rotate(-22deg)] lg:-top-[43%] lg:-left-[19%] lg:h-[128%] lg:w-[72%] lg:[transform:rotate(calc(0deg_-_atan2(28vw,85svh)))]">
        <DishTrays key={dish.id} index={selectedIndex} previousIndex={previousIndex} reducedMotion={reducedMotion} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 z-2">
        {dishIngredients[dish.id].map((ingredient, slot) => (
          <div key={slot} className={`absolute block aspect-square ${slot === 0 ? "top-[37%] left-[5%] w-[23vw] lg:top-1/4 lg:left-[3%] lg:w-[clamp(100px,10vw,148px)]" : "top-[69%] left-[6%] w-[25vw] [filter:drop-shadow(0_10px_12px_color-mix(in_srgb,var(--color-dark-ink)_55%,transparent))] lg:top-[65%] lg:left-[3%] lg:w-[clamp(110px,13vw,184px)]"}`}>
            <AnimatePresence initial={false} mode="sync">
              <motion.span
                key={`${dish.id}-${ingredient.name}`}
                data-dish-ingredient={ingredient.name}
                data-ingredient-slot={slot === 0 ? "top" : "bottom"}
                className={`absolute inset-0 block ${slot === 0 ? "isolate" : ""}`}
                initial={{ y: reducedMotion ? 0 : slot === 0 ? "-65vh" : "65vh", rotate: ingredient.rotation + (reducedMotion ? 0 : slot === 0 ? -15 : 15), opacity: 1 }}
                animate={{ y: 0, rotate: ingredient.rotation, opacity: 1 }}
                exit={{ y: reducedMotion ? 0 : slot === 0 ? "-65vh" : "65vh", opacity: 0, transition: { duration: reducedMotion ? 0 : .38, ease: travelEase } }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 115, damping: 19, mass: .8, delay: .25 + slot * .06 }}
              >
                {slot === 0 ? <>
                  <span data-water-coaster className="absolute inset-[5%] rounded-full border border-tan/70 bg-[radial-gradient(ellipse_at_45%_35%,var(--color-sand),var(--color-tan))] shadow-[1px_2px_2px_color-mix(in_srgb,var(--color-dark-ink)_80%,transparent)]" />
                  <span className="absolute top-[12%] right-[9%] bottom-[8%] left-[13%] z-1 rounded-full bg-dark-ink/58 blur-[2px]" />
                  <span className="absolute inset-[7%] z-2">
                    <Image src={ingredient.src} alt="" fill unoptimized sizes="(min-width: 1024px) 10vw, 20vw" className="object-contain object-bottom" />
                  </span>
                </> : <Image src={ingredient.src} alt="" fill unoptimized sizes="(min-width: 1024px) 12vw, 23vw" className="object-contain" />}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div data-restaurant-featured className="absolute top-[58%] left-[27%] z-3 aspect-square w-[min(68%,36svh)] -translate-y-1/2 lg:top-[52%] lg:left-[12%] lg:w-[min(37%,63svh)]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={dish.id}
            data-dish-food={dish.id}
            initial={{ x: reducedMotion ? "0%" : "-165%", rotate: reducedMotion ? 0 : -8 }}
            animate={{ x: reducedMotion ? "0%" : ["-165%", "2.5%", "0%"], rotate: reducedMotion ? 0 : [-8, 1, 0] }}
            exit={{ x: reducedMotion ? "0%" : "250%", rotate: reducedMotion ? 0 : 5, opacity: reducedMotion ? 0 : 1, transition: { duration: reducedMotion ? 0 : dishTransition.exitDuration, ease: [.55, 0, .85, .4] } }}
            transition={reducedMotion ? { duration: 0 } : { duration: 1, delay: .08, times: [0, .8, 1], ease: [travelEase, settleEase] }}
            className="absolute inset-0 overflow-hidden rounded-full border-paper bg-peach shadow-[0_20px_35px_color-mix(in_srgb,var(--color-dark-ink)_24%,transparent)] [border-width:clamp(5px,.55vw,10px)]">
            <Image src={dish.image} alt={dish.imageAlt} fill unoptimized priority sizes="(min-width: 1024px) 37vw, 68vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
