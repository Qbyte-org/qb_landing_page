"use client";

import FinalCTA from "./FinalCTA";
import RestaurantDirectory from "./restaurants/RestaurantDirectory";
import RestaurantHero from "./restaurants/RestaurantHero";
import RestaurantMenu from "./restaurants/RestaurantMenu";
import { restaurantDishes } from "./restaurants/restaurantDishes";
import { useDishOrbitSteps } from "./restaurants/useDishOrbitSteps";

export default function RestaurantsExperience() {
  const { selectedIndex, position, reducedMotion, selectDish, stepDish } = useDishOrbitSteps(restaurantDishes.length);

  return (
    <div className="overflow-hidden bg-paper text-ink">
      <RestaurantHero selectedIndex={selectedIndex} position={position} reducedMotion={reducedMotion} onSelect={selectDish} onStep={stepDish} />
      <RestaurantMenu selectedDish={restaurantDishes[selectedIndex]} onSelect={selectDish} />
      {/* <RestaurantOffers /> */}
      <RestaurantDirectory />
      <FinalCTA
        id="restaurant-cta"
        heading="Your next food run."
        supportingCopy="Join the waitlist for launch news and a first look at QuickBite in Ile-Ife."
        actionLabel="Join the waitlist"
        actionHref="/waitlist"
        splitBackground={false}
      />
    </div>
  );
}


