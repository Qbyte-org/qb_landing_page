"use client";

import dynamic from "next/dynamic";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock3,
  MapPin,
  Star,
  Store,
} from "lucide-react";
import AnimatedStamp from "./quickbite-passport-hub/AnimatedStamp";
import CityStampSelector from "./quickbite-passport-hub/CityStampSelector";
import {
  keepPassportCardScroll,
  keepPassportCardTouchScroll,
  startPassportCardTouchScroll,
} from "./quickbite-passport-hub/passportScroll";
import {
  getCityRestaurants,
  passportCities,
  type PassportRestaurant,
} from "./quickbite-passport-hub/passportHub.data";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import LinkArrow from "../ui/LinkArrow";
import MagneticFillButton from "../ui/MagneticFillButton";
import {
  BurgerLineArt,
  CoffeeCupLineArt,
  CroissantLineArt,
  DrinksCupLineArt,
  GrilledChickenLineArt,
  IceCreamLineArt,
  JollofRiceLineArt,
  LocalMealBowlLineArt,
  MeatPieLineArt,
  PancakesLineArt,
  PizzaSliceLineArt,
  RamenBowlLineArt,
  SaladBowlLineArt,
  SeafoodLineArt,
  ShawarmaWrapLineArt,
  SushiRollLineArt,
  SuyaSkewerLineArt,
  SwallowSoupLineArt,
  TacoLineArt,
} from "../ui/LineArt";
import { CategoriesToHowWave } from "./categories/CategoryWaveDivider";

const PassportLeafletMap = dynamic(() => import("./PassportLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[18rem] place-items-center rounded-[1.6rem] bg-cream-200 text-xs font-semibold uppercase tracking-[0.22em] text-cocoa">
      Preparing destination map
    </div>
  ),
});

const qrCells = new Set([
  0, 1, 2, 3, 5, 6, 7, 8, 10, 13, 15, 18, 20, 22, 24, 26, 27, 28, 29, 31,
  33, 35, 36, 38, 41, 42, 44, 46, 48, 49, 51, 53, 55, 57, 59, 60, 62, 64,
  66, 68, 69, 71, 73, 75, 76, 77, 78, 80,
]);



type RestaurantLineArtKind =
  | "bakery"
  | "breakfast"
  | "cafe"
  | "dessert"
  | "grilled-chicken"
  | "jollof"
  | "local-meal"
  | "meat-pie"
  | "noodles"
  | "pizza"
  | "salad"
  | "seafood"
  | "shawarma"
  | "swallow"
  | "suya"
  | "sushi"
  | "taco"
  | "drinks"
  | "burger";

function getRestaurantLineArtKind(restaurant: PassportRestaurant): RestaurantLineArtKind {
  const text = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();

  if (text.includes("swallow") || text.includes("soup")) return "swallow";
  if (text.includes("mama put")) return "local-meal";
  if (text.includes("jollof") || text.includes("nigerian")) return "jollof";
  if (text.includes("suya") || text.includes("asun")) return "suya";
  if (text.includes("chicken") || text.includes("wings")) return "grilled-chicken";
  if (text.includes("shawarma") || text.includes("wrap")) return "shawarma";
  if (text.includes("taco")) return "taco";
  if (text.includes("pizza")) return "pizza";
  if (text.includes("sushi")) return "sushi";
  if (text.includes("seafood") || text.includes("fish") || text.includes("shrimp")) return "seafood";
  if (text.includes("salad")) return "salad";
  if (text.includes("burger")) return "burger";
  if (text.includes("noodle") || text.includes("ramen")) return "noodles";
  if (text.includes("coffee") || text.includes("cafe")) return "cafe";
  if (text.includes("dessert") || text.includes("sweet") || text.includes("ice cream")) return "dessert";
  if (text.includes("breakfast") || text.includes("pancake")) return "breakfast";
  if (text.includes("bakery") || text.includes("croissant")) return "bakery";
  if (text.includes("drink") || text.includes("smoothie") || text.includes("juice")) {
    return "drinks";
  }
  if (text.includes("small chop") || text.includes("pastr") || text.includes("snack") || text.includes("bites")) {
    return "meat-pie";
  }
  if (text.includes("grill")) {
    return "suya";
  }

  return "burger";
}

function RestaurantFoodLineArt({
  restaurant,
  className = "",
}: {
  restaurant: PassportRestaurant;
  className?: string;
}) {
  const kind = getRestaurantLineArtKind(restaurant);

  if (kind === "bakery") return <CroissantLineArt className={className} />;
  if (kind === "breakfast") return <PancakesLineArt className={className} />;
  if (kind === "cafe") return <CoffeeCupLineArt className={className} />;
  if (kind === "dessert") return <IceCreamLineArt className={className} />;
  if (kind === "grilled-chicken") return <GrilledChickenLineArt className={className} />;
  if (kind === "jollof") return <JollofRiceLineArt className={className} />;
  if (kind === "local-meal") return <LocalMealBowlLineArt className={className} />;
  if (kind === "meat-pie") return <MeatPieLineArt className={className} />;
  if (kind === "noodles") return <RamenBowlLineArt className={className} />;
  if (kind === "pizza") return <PizzaSliceLineArt className={className} />;
  if (kind === "salad") return <SaladBowlLineArt className={className} />;
  if (kind === "seafood") return <SeafoodLineArt className={className} />;
  if (kind === "shawarma") return <ShawarmaWrapLineArt className={className} />;
  if (kind === "swallow") return <SwallowSoupLineArt className={className} />;
  if (kind === "suya") return <SuyaSkewerLineArt className={className} />;
  if (kind === "sushi") return <SushiRollLineArt className={className} />;
  if (kind === "taco") return <TacoLineArt className={className} />;
  if (kind === "drinks") return <DrinksCupLineArt className={className} />;

  return <BurgerLineArt className={className} />;
}

function QrCodeMark() {
  return (
    <div className="grid h-[5.75rem] w-[5.75rem] grid-cols-9 gap-[0.15rem] rounded-[0.25rem] bg-ink p-1.5">
      {Array.from({ length: 81 }).map((_, index) => (
        <span
          key={index}
          className={qrCells.has(index) ? "bg-cream-200" : "bg-ink"}
        />
      ))}
    </div>
  );
}

function RestaurantMembershipCard({
  restaurant,
  accent,
  highlighted,
}: {
  restaurant: PassportRestaurant;
  accent: string;
  highlighted: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isOpen = flipped || hovered || highlighted;

  const toggle = () => setFlipped((value) => !value);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <motion.article
      data-passport-postcard
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] opacity-10"
        />
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 0.08 : 0.5 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-[6.9rem] top-6 h-[10.4rem] w-[14.2rem] text-ink sm:-right-[4.8rem] sm:top-2 sm:h-[12.4rem] sm:w-[15.5rem] lg:-right-[3.75rem]"
        >
          <RestaurantFoodLineArt
            restaurant={restaurant}
            className="h-full w-full"
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
          className="absolute inset-0 z-10 px-5 py-5 will-change-transform sm:px-6 sm:py-6 lg:px-7"
        >
          <div className="relative z-10 flex h-full max-w-[68%] flex-col justify-center sm:max-w-[60%]">
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
              className="mt-4 [--link-arrow-min-width:7.2rem] border-ink/18 pb-1 text-[0.62rem] font-semibold text-ink sm:mt-5"
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
          className="absolute inset-0 z-20 bg-cream-200 px-6 py-5 will-change-transform"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] opacity-10"
          />
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
            <div className="hidden">
              <QrCodeMark />
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
              className="[--link-arrow-min-width:6.8rem] border-ink/18 pb-1 text-[0.62rem] font-semibold text-ink"
            >
              Open
            </LinkArrow>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function QuickBitePassportHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [activeCityId, setActiveCityId] = useState(passportCities[0].id);
  const [selectedCityId, setSelectedCityId] = useState(passportCities[0].id);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [highlightedRestaurant, setHighlightedRestaurant] = useState<string | null>(null);

  const activeCity =
    passportCities.find((city) => city.id === activeCityId) ?? passportCities[0];
  const selectedCity =
    passportCities.find((city) => city.id === selectedCityId) ?? activeCity;
  const selectedNode =
    activeCity.nodes.find((node) => node.name === selectedArea) ?? null;

  const cityRestaurants = useMemo(
    () => getCityRestaurants(activeCity, selectedNode),
    [activeCity, selectedNode],
  );

  const handleCityChange = (nextCityId: string) => {
    if (
      nextCityId === selectedCityId ||
      isAnimatingRef.current ||
      !passportCities.some((city) => city.id === nextCityId)
    ) {
      return;
    }

    setSelectedCityId(nextCityId);

    const leftPage = leftPageRef.current;
    const rightPage = rightPageRef.current;
    const spread = spreadRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!leftPage || !rightPage || !spread || reducedMotion) {
      setActiveCityId(nextCityId);
      setSelectedArea(null);
      return;
    }

    isAnimatingRef.current = true;
    const postcards = spread.querySelectorAll("[data-passport-postcard]");
    const spine = spread.querySelector("[data-passport-spine]");
    const underlay = spread.querySelector("[data-page-underlay]");
    const stamp = stampRef.current;

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setActiveCityId(nextCityId);
        setSelectedArea(null);
        setHighlightedRestaurant(null);
        isAnimatingRef.current = false;
      },
    });

    timeline
      .to(spine, { scaleX: 0.72, duration: 0.48 }, 0)
      .to(
        leftPage,
        {
          rotateY: -34,
          skewY: 1.2,
          x: -18,
          scaleX: 0.985,
          filter: "drop-shadow(24px 28px 32px rgba(58,36,24,.22))",
          transformOrigin: "right center",
          duration: 0.9,
        },
        0,
      )
      .to(
        rightPage,
        {
          rotateY: 5,
          x: 22,
          y: 6,
          filter: "drop-shadow(-18px 18px 28px rgba(58,36,24,.16))",
          transformOrigin: "left center",
          duration: 0.76,
        },
        0.05,
      )
      .fromTo(
        underlay,
        { x: 34, autoAlpha: 0 },
        { x: 0, autoAlpha: 0.75, duration: 0.7 },
        0.12,
      )
      .to(
        postcards,
        {
          x: 42,
          y: 18,
          scale: 0.98,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.42,
        },
        0,
      );

    if (stamp) {
      timeline.to(
        stamp,
        {
          y: 20,
          rotate: 8,
          scale: 0.9,
          autoAlpha: 0,
          duration: 0.42,
        },
        0.04,
      );
    }
  };

  useGSAP(
    () => {
      const leftPage = leftPageRef.current;
      const rightPage = rightPageRef.current;
      const stamp = stampRef.current;
      const ink = inkRef.current;
      const spread = spreadRef.current;
      if (!leftPage || !rightPage || !spread) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set([leftPage, rightPage, stamp], {
          autoAlpha: 1,
          clearProps: "transform,filter",
        });
        return;
      }

      const spine = spread.querySelector("[data-passport-spine]");
      const underlay = spread.querySelector("[data-page-underlay]");
      const postcards = spread.querySelectorAll("[data-passport-postcard]");

      gsap.set([leftPage, rightPage], {
        transformPerspective: 1300,
        transformStyle: "preserve-3d",
      });
      gsap.set(underlay, { autoAlpha: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          leftPage,
          {
            rotateY: 20,
            skewY: -0.7,
            x: 18,
            autoAlpha: 0.7,
            filter: "drop-shadow(18px 22px 30px rgba(58,36,24,.22))",
          },
          {
            rotateY: 0,
            skewY: 0,
            x: 0,
            autoAlpha: 1,
            filter: "drop-shadow(0 0 0 rgba(58,36,24,0))",
            duration: 0.82,
          },
          0,
        )
        .fromTo(
          rightPage,
          {
            rotateY: -8,
            x: 20,
            y: 4,
            autoAlpha: 0.78,
          },
          {
            rotateY: 0,
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.82,
          },
          0.06,
        )
        .to(spine, { scaleX: 1, duration: 0.62 }, 0.1)
        .fromTo(
          postcards,
          { x: 30, y: 22, scale: 0.98, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.18,
        );

      if (stamp) {
        timeline.fromTo(
          stamp,
          { y: -62, rotate: -20, scale: 1.14, scaleY: 1.08, autoAlpha: 0 },
          {
            keyframes: [
              { y: 6, rotate: -7, scaleY: 0.9, autoAlpha: 1, duration: 0.45 },
              { y: -8, scaleY: 1.04, duration: 0.16 },
              { y: 0, scaleY: 1, duration: 0.22 },
            ],
            ease: "power3.out",
          },
          0.2,
        );
      }

      if (ink) {
        timeline.fromTo(
          ink,
          { scale: 0.2, opacity: 0.24 },
          {
            scale: 1.65,
            opacity: 0,
            duration: 0.95,
            ease: "power2.out",
          },
          0.48,
        );
      }
    },
    { scope: spreadRef, dependencies: [activeCityId, selectedArea] },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const path = section.querySelector<SVGPathElement>(
        "[data-passport-app-bike-path]",
      );
      const bike = section.querySelector<SVGElement>(
        "[data-passport-app-wave-bike]",
      );
      if (!path || !bike) return;

      gsap.set(bike, {
        xPercent: -50,
        yPercent: -62,
        transformOrigin: "50% 66%",
        autoAlpha: 1,
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(bike, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: 0.12,
            end: 0.12,
          },
        });
        return;
      }

      const tween = gsap.to(bike, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.66],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="restaurants"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink pb-[7rem] pt-10 text-paper sm:pb-[9rem] sm:pt-14 lg:pb-[14rem] lg:pt-32"
      style={
        {
          "--passport-accent": activeCity.accent,
          "--passport-paper": activeCity.paper,
        } as CSSProperties
      }
    >
      <CategoriesToHowWave />
      
      <span id="cities" className="absolute top-0" aria-hidden="true" />

      <Container className="relative z-10">
        <div
          data-section-motion-header
          className="mb-10 flex w-full flex-col items-start gap-6 text-left lg:flex-row lg:items-center lg:justify-between"
        >
          <h2 className="section-heading min-w-0">
            <span className="block sm:hidden">
              Food
              <span className="block text-[var(--passport-accent)]">
                by city.
              </span>
            </span>
            <span className="hidden sm:block">
              Discover food
              <span className="block text-[var(--passport-accent)]">
                by destination.
              </span>
            </span>
          </h2>
          <MagneticFillButton
            href="/restaurants"
            ariaLabel="Explore kitchens"
            variant="brand"
            customFillClass="bg-paper"
            customHoverTextColor="#2a211d"
            className="h-12 w-max shrink-0 self-end rounded-pill !bg-[var(--passport-accent)] px-7 text-sm font-semibold !text-white sm:h-14 sm:px-9 lg:self-auto"
          >
            Explore kitchens →
          </MagneticFillButton>
        </div>

      <div
        ref={spreadRef}
        className="relative z-20 mt-8 h-full w-full min-w-0 bg-ink [perspective:1400px] sm:rounded-[2.35rem]"
      >
        <div
          data-page-underlay
          aria-hidden="true"
          className="absolute inset-3 sm:rounded-[2rem] bg-ink"
        />
        <div className="relative grid w-full min-w-0 overflow-hidden bg-paper sm:rounded-[2rem] lg:grid-cols-2">
          <div
            data-passport-spine
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 top-0 z-30 hidden w-10 -translate-x-1/2 origin-center rounded-full bg-[linear-gradient(90deg,transparent,rgba(58,36,24,.18),rgba(255,255,255,.28),rgba(58,36,24,.12),transparent)] lg:block"
          />

          <div
            ref={leftPageRef}
            className="group relative min-w-0 overflow-hidden bg-[var(--passport-paper)] p-4 sm:p-6 lg:h-[40rem] lg:p-7"
          >
            <div className="relative z-10 flex h-full min-h-0 flex-col">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <h3 className="text-[2.7rem] font-semibold leading-[0.82] text-ink sm:text-[3.55rem] lg:text-[3.85rem]">
                  {activeCity.name}
                </h3>

                <AnimatedStamp city={activeCity} stampRef={stampRef} inkRef={inkRef} />
              </div>

              <div className="relative mt-5 h-[22rem] max-h-[30rem] flex-none overflow-hidden rounded-[1.55rem] bg-cream-200 sm:h-[30rem] lg:h-auto lg:flex-1">
                <PassportLeafletMap
                  city={activeCity}
                  neighbourhoods={activeCity.nodes}
                  restaurants={cityRestaurants}
                  selectedNode={selectedNode}
                  onSelectNode={(node) =>
                    setSelectedArea(selectedNode?.name === node.name ? null : node.name)
                  }
                  onHoverRestaurant={setHighlightedRestaurant}
                />
              </div>

              <div className="pointer-events-none mt-4 flex w-full justify-center">
                <div className="flex max-w-[92%] items-center gap-2 rounded-pill border border-ink/10 bg-paper/94 px-4 py-2 text-[0.72rem] font-medium text-ink backdrop-blur">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--passport-accent)] text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                      <path
                        d="M12 21S5.8 15.9 5.8 10.6A6.2 6.2 0 0 1 12 4.4a6.2 6.2 0 0 1 6.2 6.2C18.2 15.9 12 21 12 21Z"
                        fill="currentColor"
                      />
                      <circle cx="12" cy="10.6" r="2.1" fill="var(--color-paper)" />
                    </svg>
                  </span>
                  Click a live food stop to filter nearby kitchens
                </div>
              </div>
            </div>
          </div>

          <div
            ref={rightPageRef}
            className="group relative min-w-0 overflow-hidden bg-paper p-4 sm:p-6 lg:flex lg:h-[40rem] lg:flex-col lg:p-7"
          >
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div className="relative rounded-[1.45rem] bg-paper p-4 text-ink sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-[2.25rem] font-semibold leading-[0.86] tracking-[-0.075em] text-ink sm:text-[2.85rem]">
                      Explore Kitchens
                    </h3>
                  </div>

                  {/* <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper">
                    <MapPin className="h-5 w-5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                  </span> */}
                </div>

                <div className="my-2 border-t border-dashed border-ink/20" />

                <div className="mt-4 flex flex-wrap items-end gap-2 text-[0.76rem] font-semibold text-ink">
                  <div>
                    <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
                      Destinations
                    </p>
                    <CityStampSelector
                      cities={passportCities}
                      selectedCity={selectedCity}
                      onSelect={handleCityChange}
                    />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/6 px-3 py-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                    {activeCity.avgEta}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/6 px-3 py-1.5">
                    <Store className="h-3.5 w-3.5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                    {activeCity.restaurantCount} Restaurants
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/6 px-3 py-1.5">
                    <Star className="h-3.5 w-3.5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                    {activeCity.avgRating}
                  </span>
                </div>
              </div>

              <div
                className="passport-card-scroll mt-4 h-[23rem] min-h-0 space-y-3 overflow-y-auto overscroll-y-auto pb-2 pr-3 sm:h-[25rem] lg:h-auto lg:flex-1"
                data-lenis-prevent
                data-lenis-prevent-wheel
                onTouchMove={keepPassportCardTouchScroll}
                onTouchStart={startPassportCardTouchScroll}
                onWheel={keepPassportCardScroll}
                tabIndex={0}
              >
                <AnimatePresence mode="popLayout">
                  {cityRestaurants.map((restaurant) => (
                    <RestaurantMembershipCard
                      key={`${activeCity.id}-${selectedNode?.name ?? "all"}-${restaurant.name}`}
                      restaurant={restaurant}
                      accent={activeCity.accent}
                      highlighted={highlightedRestaurant === restaurant.name}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="relative z-10 mx-auto mt-5 hidden max-w-xl px-4 text-center text-xs font-semibold leading-relaxed text-paper/65 sm:block">
        Select a destination, pan the map, then tap a neighbourhood marker to
        filter the restaurant membership cards.
      </p>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-0 h-20 overflow-x-clip overflow-y-visible min-[480px]:h-28 sm:h-52 sm:overflow-visible"
      >
        <svg
          className="absolute left-1/2 top-0 h-full w-[178vw] -translate-x-1/2 overflow-visible  text-cream-200 sm:static sm:w-full sm:translate-x-0"
          viewBox="0 0 1440 210"
          preserveAspectRatio="none"
        >
          <path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55V210H0V65Z"
            fill="currentColor"
          />
          <path
            data-passport-app-bike-path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55"
            fill="none"
            stroke="#f0d7c2"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M22 93C154 132 266 120 406 96C548 72 628 143 764 166C918 191 998 108 1138 87C1258 69 1322 113 1418 86"
            fill="none"
            stroke="#c9aa96"
            strokeDasharray="8 12"
            strokeLinecap="round"
            strokeOpacity=".72"
            strokeWidth="3"
          />
          {/* <image
            data-passport-app-wave-bike
            href="/quickbite-delivery-bike.svg"
            width="238"
            height="140"
          /> */}
        </svg>
      </div>
    </section>
  );
}
