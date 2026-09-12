"use client";

import { useId, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Clock3, MapPin, Plus, Star } from "lucide-react";
import type { PassportRestaurant } from "./passportHub.data";
import FoodImage from "../../ui/FoodImage";
import MagneticFillButton from "../../ui/MagneticFillButton";
import BackgroundGrainTexture from "../../ui/BackgroundGrainTexture";
import LinkArrow from "../../ui/LinkArrow";


export default function RestaurantMembershipCard({
  restaurant,
  accent,
  highlighted,
}: {
  restaurant: PassportRestaurant;
  accent: string;
  highlighted: boolean;
}) {
  const detailsId = useId();
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isOpen = flipped || hovered || highlighted;

  const toggle = () => setFlipped((value) => !value);

  return (
    <motion.article
      data-passport-postcard
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[14.85rem] w-full shrink-0 rounded-[1.35rem] text-ink outline-none focus-visible:outline-2 focus-visible:outline-brand sm:h-[13.15rem]"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[1.35rem] border bg-cream-200 transition-colors duration-300 ${highlighted ? "border-[var(--card-accent)]" : "border-ink/10"
          }`}
      >
        <BackgroundGrainTexture tone="light" />
        <MagneticFillButton
          ariaLabel={`Details for ${restaurant.name}`}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          onClick={toggle}
          variant="light"
          customFillClass="bg-cream-200"
          customHoverTextColor="#2a211d"
          className="absolute! right-3 top-3 z-30 size-11 rounded-full border! border-ink/15 bg-paper! text-ink!"
        >
          <Plus aria-hidden="true" className={`size-4 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} />
        </MagneticFillButton>
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 0.08 : 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-14 top-10 size-36 overflow-hidden rounded-full border-4 border-paper sm:-right-10 sm:top-5 sm:size-48"
        >
          <FoodImage
            src={restaurant.image}
            alt={restaurant.imageAlt ?? restaurant.cuisine}
            fill
            loading="lazy"
            sizes="192px"
            className={restaurant.imageKind === "brand" ? "bg-paper object-contain p-8" : "object-cover p-3"}
          />
        </motion.div>
        <motion.div
          initial={false}
          animate={
            isOpen
              ? { x: "-30%", opacity: 0 }
              : { x: "0%", opacity: 1 }
          }
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          inert={isOpen}
          className="absolute inset-0 z-10 px-5 py-5 will-change-transform sm:px-6 sm:py-6 lg:px-7"
        >
          <div className="relative z-10 flex h-full max-w-[60%] flex-col justify-center">
            <p className="text-[0.68rem] font-semibold tracking-[0.08em] text-[var(--card-accent)]">
              {restaurant.eta} • {restaurant.rating}★
            </p>
            <h3 className="mt-2 line-clamp-2 font-display text-[1.42rem] font-semibold leading-[0.92] tracking-[-0.055em] text-ink sm:mt-3 sm:text-[1.65rem]">
              {restaurant.name}
            </h3>
            <p className="mt-2 line-clamp-1 text-[0.78rem] font-semibold text-cocoa sm:text-[0.82rem]">
              {restaurant.cuisine}
            </p>
            <LinkArrow
              href="/restaurants"
              variant="light"
              ariaLabel={`View ${restaurant.name}`}
              onClick={(event) => event.stopPropagation()}
              className="mt-4 min-h-11 w-full max-w-48 border-ink/20 text-ink [--link-arrow-min-width:7.2rem] sm:mt-5"
            >
              View
            </LinkArrow>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={
            isOpen
              ? { x: "0%", opacity: 1 }
              : { x: "42%", opacity: 0 }
          }
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          id={detailsId}
          inert={!isOpen}
          className="absolute inset-0 z-20 bg-cream-200 px-6 py-5 will-change-transform"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <BackgroundGrainTexture tone="light" />
          <div className="relative z-10 h-full pr-16">
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-display text-[1.55rem] font-semibold leading-[0.92] tracking-[-0.06em] text-ink">
                {restaurant.name}
              </h3>
              <p className="mt-2 line-clamp-2 max-w-[16rem] text-[0.75rem] font-semibold leading-relaxed text-cocoa">
                {restaurant.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.68rem] font-semibold text-ink">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/7 px-2.5 py-1">
                  <Clock3 className="h-3.5 w-3.5" strokeWidth={2.3} />
                  {restaurant.eta}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/7 px-2.5 py-1">
                  <Star className="h-3.5 w-3.5 text-[var(--card-accent)]" strokeWidth={2.3} />
                  {restaurant.rating}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/7 px-2.5 py-1">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2.3} />
                  {restaurant.deliveryFrom}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-[3.5rem] z-10 border-t border-dashed border-ink/20" />
          <div className="absolute inset-x-6 bottom-4 z-10 flex items-center justify-between gap-3">
            <p className="line-clamp-1 text-[0.68rem] font-semibold text-ink">
              {restaurant.avgOrder} avg order
            </p>
            <LinkArrow
              href="/restaurants"
              onClick={(event) => event.stopPropagation()}
              variant="light"
              ariaLabel={`Open ${restaurant.name}`}
              className="min-h-11 border-ink/20 text-ink [--link-arrow-min-width:6.2rem]"
            >
              Open
            </LinkArrow>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
