"use client";

import { restaurantsExperienceCopy } from "@/content/home/sections";

import FinalCTA from "./FinalCTA";
import RestaurantDirectory from "./restaurants/RestaurantDirectory";
import RestaurantHero from "./restaurants/RestaurantHero";
import RestaurantMenu from "./restaurants/RestaurantMenu";
import { restaurantDishes } from "@/content/restaurants/dishes";
import { useDishOrbitSteps } from "./restaurants/useDishOrbitSteps";

export default function RestaurantsExperience() {
  const { selectedIndex, reducedMotion, selectDish, stepDish } = useDishOrbitSteps(restaurantDishes.length);

  return (
    <div className="overflow-hidden bg-paper text-ink">
      <RestaurantHero selectedIndex={selectedIndex} reducedMotion={reducedMotion} onSelect={selectDish} onStep={stepDish} />
      <RestaurantMenu />
      {/* <RestaurantOffers /> */}
      <RestaurantDirectory />
      <FinalCTA
        id="restaurant-cta"
        heading={restaurantsExperienceCopy.headingYourNextFoodRun}
        supportingCopy={restaurantsExperienceCopy.supportingCopyJoinTheWaitlistForLaunchNews}
        actionLabel={restaurantsExperienceCopy.actionLabelJoinTheWaitlist}
        actionHref={restaurantsExperienceCopy.actionHrefWaitlist}
        splitBackground={false}
      />
    </div>
  );
}
