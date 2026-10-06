"use client";

import { restaurantDirectoryCopy } from "@/content/restaurants/sections";

import { filters, type KitchenFilter, kitchenCategories, kitchenPhotoDescriptions } from "@/content/restaurants/directory";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { restaurants, type Restaurant } from "@/content/site";
import { ScrollTrigger } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import CategoryCard from "../categories/CategoryCard";

function KitchenCard({ restaurant, index }: { restaurant: Restaurant; index: number }) {
  return (
    <Reveal data-restaurant-card="" delay={(index % 2) * 0.06} className="h-full min-w-0 w-full">
      <CategoryCard
        layout="grid"
        category={{
          name: restaurant.name,
          image: restaurant.image,
          imageAlt: restaurant.imageAlt,
          imageKind: restaurant.imageKind,
          description: kitchenPhotoDescriptions[restaurant.name] ?? restaurant.cuisine,
          icon: MapPin,
          meta: `Ile-Ife · ${kitchenCategories[restaurant.name]}`,
          tint: "var(--color-cream-200)",
          rating: String(restaurant.rating),
          time: restaurant.eta,
        }}
        timeLabel={restaurantDirectoryCopy.timeLabelEstTime}
        actionHref={restaurantDirectoryCopy.actionHrefWaitlist}
        actionLabel={restaurantDirectoryCopy.actionLabelGetUpdates}
        actionAriaLabel={restaurantDirectoryCopy.actionAriaLabelGetLaunchUpdatesForFormat(restaurant.name)}
      />
    </Reveal>
  );
}

export default function RestaurantDirectory() {
  const [selectedFilter, setSelectedFilter] = useState<KitchenFilter>(filters[0]);
  const visibleRestaurants = restaurants.filter(
    (restaurant) => selectedFilter === filters[0] || kitchenCategories[restaurant.name] === selectedFilter,
  );

  useEffect(() => {
    // Filtering moves the cards and CTA; refresh their scroll reveal positions.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selectedFilter]);

  return (
    <section
      id="restaurant-list"
      data-nav-theme="neutral"
      aria-labelledby="restaurant-directory-title"
      className="scroll-mt-24 bg-paper py-14 text-ink sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-12">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">
              <span aria-hidden="true" className="h-px w-8 bg-brand" />{restaurantDirectoryCopy.aLittleLocalGoodness}</p>
            <h2
              id="restaurant-directory-title"
              className="max-w-[15ch] font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
            >{restaurantDirectoryCopy.meetYourNextFavourite}</h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-cocoa sm:text-lg">{restaurantDirectoryCopy.fromAProperPlateOfJollofTo}</p>
        </Reveal>

        <div className="mb-7 mt-9 flex flex-col justify-between gap-4 border-b border-ink/10 pb-5 sm:mt-11 lg:flex-row lg:items-center">
          <div role="group" aria-label={restaurantDirectoryCopy.ariaLabelFilterKitchens} className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <MagneticFillButton
                key={filter}
                variant={selectedFilter === filter ? "dark" : "cream"}
                aria-pressed={selectedFilter === filter}
                aria-controls="restaurant-results"
                onClick={() => setSelectedFilter(filter)}
                className={`min-h-11 rounded-pill px-4 py-2 text-xs sm:px-5 sm:text-sm ${selectedFilter === filter ? "bg-dark-ink! text-paper!" : "border! border-ink/15! bg-paper! text-ink!"}`}
              >
                {filter}
              </MagneticFillButton>
            ))}
          </div>
          <p role="status" aria-atomic="true" className="shrink-0 text-xs text-cocoa">
            {visibleRestaurants.length} {visibleRestaurants.length === 1 ? restaurantDirectoryCopy.kitchen : restaurantDirectoryCopy.kitchens}{restaurantDirectoryCopy.toDiscover}</p>
        </div>

        <div id="restaurant-results" className="grid items-stretch gap-5 sm:grid-cols-2 lg:gap-6">
          {visibleRestaurants.map((restaurant, index) => (
            <KitchenCard key={restaurant.name} restaurant={restaurant} index={index} />
          ))}
        </div>
        {/* <p className="mt-5 text-sm leading-relaxed text-cocoa">
          A preview of what&apos;s coming. Menus and ordering will be available when the QuickBite app launches.
        </p> */}

      </Container>
    </section>
  );
}
