"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UtensilsCrossed } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import BrandPageCard from "../brand-pages/BrandPageCard";
import { mealPeriods, restaurantDishes, type MealPeriod } from "./restaurantDishes";

type MenuFilter = "All meals" | MealPeriod;

const filters: MenuFilter[] = ["All meals", ...mealPeriods];
const dishNames: Record<string, string> = {
  jollof: "Jollof, chicken & plantain",
  ofada: "Ofada rice & ayamase",
  "pounded-yam": "Yam & vegetable soup",
  "pepper-soup": "Assorted meat pepper soup",
  akara: "Golden akara",
  "puff-puff": "Puff-puff",
};

export default function RestaurantMenu() {
  const [selectedFilter, setSelectedFilter] = useState<MenuFilter>("All meals");
  const reducedMotion = useReducedMotion();
  const visibleDishes = restaurantDishes.filter(
    (dish) => selectedFilter === "All meals" || dish.period === selectedFilter,
  );

  useEffect(() => {
    // Keep reveals in the sections below aligned after the result count changes.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selectedFilter]);

  return (
    <section
      id="restaurant-menu"
      data-nav-theme="neutral"
      aria-labelledby="restaurant-menu-title"
      className="scroll-mt-24 bg-paper py-14 text-ink sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-12">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">
              <span aria-hidden="true" className="h-px w-8 bg-brand" />
              The menu preview
            </p>
            <h2
              id="restaurant-menu-title"
              className="max-w-[16ch] font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
            >
              Good food, for every mood.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-cocoa sm:text-lg">
            A golden start, a proper lunch, or something warm for dinner. Find a little of what you&apos;re craving.
          </p>
        </Reveal>

        <div className="mb-7 mt-9 flex flex-col justify-between gap-4 border-b border-ink/10 pb-5 sm:mt-11 lg:flex-row lg:items-center">
          <div role="group" aria-label="Filter menu by meal time" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const selected = selectedFilter === filter;
              const count = restaurantDishes.filter((dish) => filter === "All meals" || dish.period === filter).length;

              return (
                <MagneticFillButton
                  key={filter}
                  variant={selected ? "dark" : "cream"}
                  aria-pressed={selected}
                  aria-controls="restaurant-menu-results"
                  onClick={() => setSelectedFilter(filter)}
                  className={`min-h-11 rounded-pill px-4 py-2 text-xs sm:px-5 sm:text-sm ${selected ? "bg-dark-ink! text-paper!" : "border! border-ink/15! bg-paper! text-ink!"}`}
                >
                  {filter}
                  <span aria-hidden="true" className="ml-1 text-[0.65rem] tabular-nums opacity-65">{count}</span>
                </MagneticFillButton>
              );
            })}
          </div>
          <p role="status" aria-atomic="true" className="shrink-0 text-xs text-cocoa">
            {visibleDishes.length} dishes {selectedFilter === "All meals" ? "to discover" : `for ${selectedFilter.toLowerCase()}`}
          </p>
        </div>

        <ul
          id="restaurant-menu-results"
          aria-label={`${selectedFilter} menu preview`}
          className="grid items-stretch gap-5 [overflow-anchor:none] sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {visibleDishes.map((dish) => (
            <motion.li
              key={dish.id}
              data-menu-dish={dish.id}
              initial={false}
              whileInView={reducedMotion === false ? { opacity: [0, 1] } : undefined}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className="h-full min-w-0"
            >
              <BrandPageCard
                eyebrow={dish.period}
                title={dishNames[dish.id]}
                description={dish.description}
                image={{ src: dish.image, alt: dish.imageAlt }}
              >
                <MagneticFillButton
                  href="/waitlist"
                  variant="brand"
                  ariaLabel={`Get launch updates for ${dishNames[dish.id]}`}
                  className="min-h-11 rounded-pill bg-brand! px-5 py-3 text-sm"
                >
                  Get launch updates
                </MagneticFillButton>
              </BrandPageCard>
            </motion.li>
          ))}
        </ul>

        <p className="mt-7 flex items-start gap-2.5 text-sm leading-relaxed text-cocoa">
          <UtensilsCrossed aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
          A taste of what&apos;s coming. Full menus and ordering arrive with the QuickBite app.
        </p>
      </Container>
    </section>
  );
}
