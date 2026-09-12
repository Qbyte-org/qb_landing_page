"use client";

import dynamic from "next/dynamic";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence } from "motion/react";
import {
  Clock3,
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
} from "./quickbite-passport-hub/passportHub.data";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import SectionWave from "../ui/SectionWave";
import LinkArrow from "../ui/LinkArrow";
import RestaurantMembershipCard from "./quickbite-passport-hub/RestaurantMembershipCard";

const PassportLeafletMap = dynamic(() => import("./PassportLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[18rem] place-items-center rounded-[1.6rem] bg-cream-200 text-xs font-semibold uppercase tracking-[0.22em] text-cocoa">
      Preparing destination map
    </div>
  ),
});


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
        "[data-section-wave-path]",
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
      className="relative overflow-hidden bg-[#1c120f] pb-[7rem] pt-10 text-paper sm:pb-[9rem] sm:pt-14 lg:pb-[14rem] lg:pt-32"
      style={
        {
          "--passport-accent": activeCity.accent,
          "--passport-paper": activeCity.paper,
        } as CSSProperties
      }
    >
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
          <LinkArrow
            href="/restaurants"
            ariaLabel="Explore kitchens"
            variant="dark"
            className="min-h-14 w-max shrink-0 self-end text-lg! normal-case! [--link-arrow-spacing:0em] sm:min-h-16 sm:text-xl! lg:self-auto"
          >
            Explore kitchens
          </LinkArrow>
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
                    Choose an area to explore local kitchens
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
                        highlighted={false}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 mx-auto mt-5 hidden max-w-xl px-4 text-center text-xs font-semibold leading-relaxed text-paper/65 sm:block">
          Choose your area, explore the map, and find your next kitchen.
        </p>
      </Container>

      <SectionWave to="paper" placement="bottom" />
    </section>
  );
}
