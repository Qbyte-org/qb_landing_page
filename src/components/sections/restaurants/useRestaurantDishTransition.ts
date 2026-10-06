"use client";

import { useEffect, useRef, useState } from "react";
import { restaurantDishes } from "@/content/restaurants/dishes";
import { dishIngredients } from "@/content/restaurants/ingredients";

export const dishTransition = {
  duration: 1.56,
  exitDuration: .66,
  copyExitDuration: .42,
  copyEnterDelay: .28,
  travelEase: [.65, 0, .25, 1] as const,
  settleEase: [.22, 1, .36, 1] as const,
};

/** One decoded selection drives the tray, food, ingredients, copy and counter. */
export function useRestaurantDishTransition(selectedIndex: number, reducedMotion: boolean | null) {
  const [displayed, setDisplayed] = useState({ index: selectedIndex, previousIndex: null as number | null });
  const nextChangeAt = useRef(0);

  useEffect(() => {
    if (selectedIndex === displayed.index) return;
    let cancelled = false;
    let timer = 0;
    const dish = restaurantDishes[selectedIndex];
    const sources = [dish.image, ...dishIngredients[dish.id].map(({ src }) => src)];

    Promise.all(sources.map(async (src) => {
      const image = new window.Image();
      image.src = src;
      await image.decode().catch(() => undefined);
    })).then(() => {
      if (cancelled) return;
      const delay = reducedMotion ? 0 : Math.max(0, nextChangeAt.current - performance.now());
      timer = window.setTimeout(() => {
        nextChangeAt.current = performance.now() + (reducedMotion ? 0 : dishTransition.duration * 1000);
        setDisplayed({ index: selectedIndex, previousIndex: displayed.index });
      }, delay);
    });

    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [displayed.index, reducedMotion, selectedIndex]);

  return displayed;
}
