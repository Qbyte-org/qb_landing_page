"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import FoodImage from "@/components/ui/FoodImage";
import { getDishOrbitFrame } from "./dishOrbitMotion";
import { restaurantDishes, type RestaurantDish } from "./restaurantDishes";

type DishOrbitPreviewProps = {
  dish: RestaurantDish;
  index: number;
  selected: boolean;
  position: MotionValue<number>;
  onSelect: (index: number) => void;
};

export default function DishOrbitPreview({ dish, index, selected, position, onSelect }: DishOrbitPreviewProps) {
  const frame = useTransform(position, (step) => getDishOrbitFrame(index - step, restaurantDishes.length));
  const left = useTransform(frame, (value) => `${value.x}%`);
  const top = useTransform(frame, (value) => `${value.y}%`);
  const opacity = useTransform(frame, (value) => value.opacity);
  const zIndex = useTransform(frame, (value) => value.isWrapping ? 5 : 20);
  const visibility = useTransform(frame, (value) => value.opacity === 0 ? "hidden" : "visible");
  const pointerEvents = useTransform(frame, (value) => value.isWrapping ? "none" : "auto");

  return (
    <motion.div
      data-orbit-preview={dish.id}
      style={{ left, top, opacity, zIndex, visibility, pointerEvents }}
      className="absolute aspect-square w-[13%] min-w-11 -translate-x-1/2 -translate-y-1/2"
    >
      <button
        type="button"
        aria-label={`Preview ${dish.imageAlt.toLowerCase()}`}
        aria-pressed={selected}
        onClick={() => onSelect(index)}
        className={`relative block size-full cursor-pointer overflow-hidden rounded-full border-[3px] bg-paper shadow-[0_8px_18px_color-mix(in_srgb,var(--color-ink)_12%,transparent)] transition-[border-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none ${selected ? "border-brand scale-110" : "border-paper motion-safe:hover:scale-110"}`}
      >
        <FoodImage src={dish.image} alt="" fill sizes="(min-width: 1920px) 100px, (min-width: 1648px) calc(3.12vw + 42px), (min-width: 1280px) calc(6.24vw - 10px), (min-width: 1024px) calc(6.24vw - 4px), (min-width: 736px) 90px, 13vw" className="object-cover" />
      </button>
    </motion.div>
  );
}
