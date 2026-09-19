"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from "motion/react";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import { restaurantDishes } from "./restaurantDishes";
import DishOrbitPreview from "./DishOrbitPreview";

type DishOrbitProps = {
  selectedIndex: number;
  position: MotionValue<number>;
  onSelect: (index: number) => void;
  onStep: (direction: -1 | 1) => void;
};

export default function DishOrbit({ selectedIndex, position, onSelect, onStep }: DishOrbitProps) {
  const reducedMotion = useReducedMotion();
  const selected = restaurantDishes[selectedIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Meal inspiration"
      className="mx-auto w-full max-w-[43rem] lg:mx-0 lg:max-w-none md:-mt-20"
    >
      <div data-orbit-stage className="relative aspect-[1.16] w-full">
        <svg aria-hidden="true" viewBox="0 0 640 552" className="pointer-events-none absolute inset-0 size-full">
          <path
            d="M51 326 A272 276 0 0 1 589 326"
            stroke="var(--color-paper)"
            strokeOpacity=".25"
            strokeWidth="1.5"
            strokeDasharray="7 11"
            fill="none"
          />
        </svg>

        {restaurantDishes.map((dish, index) => (
          <DishOrbitPreview
            key={dish.id}
            dish={dish}
            index={index}
            selected={index === selectedIndex}
            position={position}
            onSelect={onSelect}
          />
        ))}

        <div data-orbit-featured className="absolute bottom-[8%] left-1/2 z-10 aspect-square w-[60%] -translate-x-1/2 rounded-full bg-paper p-2 shadow-[0_22px_45px_color-mix(in_srgb,var(--color-ink)_18%,transparent)] sm:p-3">
          <div className="relative size-full overflow-hidden rounded-full bg-cream-200">
            <AnimatePresence initial={false}>
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, rotate: reducedMotion ? 0 : -12, scale: reducedMotion ? 1 : 1.08 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.94 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <FoodImage
                  src={selected.image}
                  alt={selected.imageAlt}
                  fill
                  priority={selectedIndex === 0}
                  sizes="(min-width: 1920px) 461px, (min-width: 1648px) calc(14.4vw + 191px), (min-width: 1280px) calc(28.8vw - 46px), (min-width: 1024px) calc(28.8vw - 21px), (min-width: 736px) 413px, calc(60vw - 20px)"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute inset-x-[10%] bottom-0 z-30 max-sm:-my-10! flex items-center justify-between">
          <MagneticFillButton
            ariaLabel="Previous meal"
            variant="cream"
            onClick={() => onStep(-1)}
            className="size-12 rounded-full border! border-paper/15! bg-paper! text-ink! shadow-sm shadow-ink/10 sm:size-14"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </MagneticFillButton>
          <span className="self-end pb-2 text-xs font-medium tabular-nums tracking-[0.2em] text-paper/70">
            {String(selectedIndex + 1).padStart(2, "0")} <span className="mx-1 opacity-50">/</span> {String(restaurantDishes.length).padStart(2, "0")}
          </span>
          <MagneticFillButton
            ariaLabel="Next meal"
            variant="cream"
            onClick={() => onStep(1)}
            className="size-12 rounded-full border! border-paper/15! bg-paper! text-ink! shadow-sm shadow-ink/10 sm:size-14"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </MagneticFillButton>
        </div>
      </div>
    </div>
  );
}
