"use client";

import { ArrowRight, MapPin, UtensilsCrossed } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import LinkArrow from "@/components/ui/LinkArrow";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import DishOrbit from "./DishOrbit";
import { mealPeriods, restaurantDishes } from "./restaurantDishes";
import { useDishOrbitSteps } from "./useDishOrbitSteps";

export default function RestaurantHero() {
  const { selectedIndex, position, reducedMotion, selectDish, stepDish } = useDishOrbitSteps(restaurantDishes.length);
  const selected = restaurantDishes[selectedIndex];

  return (
    <section
      id="restaurant-hero"
      data-nav-theme="hero"
      aria-labelledby="restaurant-hero-title"
      className="relative isolate overflow-hidden bg-dark-ink text-paper pb-12 pt-40 sm:pb-14 sm:pt-38 lg:pb-16 lg:pt-48 xl:pt-52"
    >
      {/* Background texture */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-44 min-[500px]:-top-20 -z-10 h-[42rem] w-[135%] rounded-[30%] sm:rounded-[50%] bg-ink-soft/50 sm:-right-[14%] sm:-top-[39rem] sm:h-[78rem] sm:w-[105rem] lg:-top-[41rem] bg-[url('/images/footer-grain.svg')] bg-size-[128px_128px] opacity-8" />
      
      {/* Align the copy with the home hero and let the orbit reach the desktop edge. */}
      <Container className="lg:max-w-none lg:pl-[max(4.5rem,calc((100%-103rem)/2+4.5rem))] lg:pr-0 xl:pl-[max(10rem,calc((100%-103rem)/2+10rem))]">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_min(48%,48rem)] lg:gap-8">
          <div className="relative z-20 min-w-0">
            <div className="min-h-68 lg:min-h-[31rem] xl:min-h-[28rem]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                >
                  <p className="text-sm font-semibold text-brand sm:text-base">{selected.note}</p>
                  <h1 id="restaurant-hero-title" className="mt-3 max-w-[13ch] font-display text-[2.7rem] font-semibold leading-[1.03] tracking-[0.01em]! text-paper min-[430px]:text-[3.1rem] sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[5.4rem]">
                    {selected.name}
                  </h1>
                  <p className="mt-5 max-w-[26rem] text-base leading-relaxed text-paper/70 sm:text-lg">{selected.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p role="status" className="sr-only">Meal {selectedIndex + 1} of {restaurantDishes.length}: {selected.name}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <MagneticFillButton href="#restaurant-list" variant="brand" className="h-14 rounded-4xl bg-brand! px-7 text-base font-semibold sm:h-[3.75rem] sm:px-8">
                Explore kitchens <ArrowRight className="size-5" strokeWidth={2.35} aria-hidden="true" />
              </MagneticFillButton>
              <LinkArrow href="/waitlist" variant="dark" className="min-w-56! text-base! normal-case! pb-3! mt-3! [--link-arrow-spacing:0em]">
                Get launch updates
              </LinkArrow>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-paper/60">A little preview. Ordering opens with the QuickBite app.</p>
          </div>

          <DishOrbit selectedIndex={selectedIndex} position={position} onSelect={selectDish} onStep={stepDish} />
        </div>
      </Container>

      <Container>
        <div className="sm:mb-8 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-paper/15 pt-4 mt-20 sm:mt-12">
          <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-paper/70 sm:text-xs">
            <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
            On the menu in Ile-Ife
          </p>
          <div role="group" aria-label="Choose a meal time" className="flex items-center gap-1 sm:gap-5">
            {mealPeriods.map((period) => (
              <MagneticFillButton
                key={period}
                variant={selected.period === period ? "cream" : "dark"}
                aria-pressed={selected.period === period}
                onClick={() => selectDish(restaurantDishes.findIndex((dish) => dish.period === period))}
                className={`relative min-h-11 rounded-pill px-3 text-xs sm:px-4 sm:text-sm ${selected.period === period ? "bg-paper! text-ink!" : "bg-transparent! text-paper/70!"}`}
              >
                {period}
              </MagneticFillButton>
            ))}
          </div>
          <span className="hidden items-center gap-2 text-xs font-medium text-paper/70 lg:flex">
            <UtensilsCrossed className="size-4 text-brand" aria-hidden="true" />
            A taste of what&apos;s coming
          </span>
        </div>
      </Container>
    </section>
  );
}
