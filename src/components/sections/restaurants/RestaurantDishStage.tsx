"use client";

import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import FoodImage from "@/components/ui/FoodImage";
import { restaurantDishes } from "./restaurantDishes";
import styles from "./Restaurants.module.css";

type Props = { selectedIndex: number; position: MotionValue<number>; reducedMotion: boolean | null };

/** The whole still life turns together; no preview travels across the main plate. */
export default function RestaurantDishStage({ selectedIndex, position, reducedMotion }: Props) {
  const dish = restaurantDishes[selectedIndex];
  const rotation = useTransform(position, (step) => -22 + Math.sin(step * Math.PI / 3) * 8);
  return (
    <div data-restaurant-dish-stage className={styles.dishStage}>
      <motion.div aria-hidden="true" className={styles.angledSurface} style={{ rotate: reducedMotion ? -22 : rotation }} />
      <div aria-hidden="true" className={styles.plateHalo} />
      <div data-restaurant-featured className={styles.featuredDish}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div key={dish.id}
            initial={{ opacity: 0, rotate: reducedMotion ? 0 : -38, scale: reducedMotion ? 1 : .82, clipPath: reducedMotion ? "inset(0%)" : "inset(0% 100% 0% 0%)" }}
            animate={{ opacity: 1, rotate: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, rotate: reducedMotion ? 0 : 38, scale: reducedMotion ? 1 : .9 }}
            transition={{ duration: reducedMotion ? .15 : .8, ease: [.22, 1, .36, 1] }}
            className="absolute inset-0 rounded-full bg-paper p-1.5 shadow-2xl shadow-ink/20 sm:p-2.5">
            <div className="relative size-full overflow-hidden rounded-full">
              <FoodImage src={dish.image} alt={dish.imageAlt} fill priority={selectedIndex === 0} sizes="(min-width: 1024px) 40vw, 52vw" className="object-cover" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        <motion.div key={dish.id} aria-hidden="true" className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0, rotate: reducedMotion ? 0 : -16 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: reducedMotion ? 0 : 16 }} transition={{ duration: reducedMotion ? .1 : .75 }}>
          {[1, 2, 3].map((offset) => {
            const other = restaurantDishes[(selectedIndex + offset) % restaurantDishes.length];
            return <div key={offset} className={`${styles.satellite} ${styles[`satellite${offset}`]}`}><FoodImage src={other.image} alt="" fill sizes="(min-width: 1024px) 9vw, 15vw" className="object-cover" /></div>;
          })}
        </motion.div>
      </AnimatePresence>
      <span aria-hidden="true" className={styles.stageNote}>Made here. Loved here.</span>
    </div>
  );
}
