"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bike,
  Building2,
  Clock3,
  Compass,
  MapPinned,
  Navigation,
  Search,
  Star,
  Trees,
  Waves,
} from "lucide-react";
import {
  coverageAreas,
  expansionCities,
  liveCity,
  liveCityState,
  restaurants,
  type Restaurant,
} from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";

type DistrictNode = {
  name: string;
  x: number;
  y: number;
  eta: number;
  deliveries: number;
  camera: { x: number; y: number; scale: number };
  route: string;
};

type ExplorerCity = {
  id: string;
  name: string;
  state: string;
  accent: string;
  dark: string;
  soft: string;
  water: string;
  summary: string;
  nodes: DistrictNode[];
  roads: string[];
};

type RestaurantDiscovery = Restaurant & {
  badge: string;
  position: { x: number; y: number };
  route: string;
};

const palettes = [
  { accent: "#f15f00", dark: "#24180f", soft: "#fff0e4", water: "#9bd7ff" },
  { accent: "#0f7a5a", dark: "#10231c", soft: "#e8fff6", water: "#8bd8cc" },
  { accent: "#d88b15", dark: "#2c1c0b", soft: "#fff5d6", water: "#a9d6ff" },
  { accent: "#ff4f1f", dark: "#2a140d", soft: "#ffe8dd", water: "#98dff0" },
  { accent: "#6757df", dark: "#17152e", soft: "#eeebff", water: "#adc8ff" },
  { accent: "#178c83", dark: "#0e2422", soft: "#ebfffb", water: "#8ddfe8" },
  { accent: "#c96b25", dark: "#2c180d", soft: "#fff0e3", water: "#add8ff" },
];

const nodeCoords = [
  { x: 176, y: 156, camera: { x: 38, y: 22, scale: 1.08 } },
  { x: 338, y: 108, camera: { x: -34, y: 34, scale: 1.12 } },
  { x: 530, y: 168, camera: { x: -84, y: -8, scale: 1.1 } },
  { x: 720, y: 124, camera: { x: -130, y: 34, scale: 1.14 } },
  { x: 684, y: 346, camera: { x: -124, y: -74, scale: 1.12 } },
  { x: 442, y: 408, camera: { x: -24, y: -96, scale: 1.1 } },
  { x: 236, y: 338, camera: { x: 42, y: -68, scale: 1.12 } },
];

const districtRoutes = [
  "M86 324C158 220 250 260 326 174C416 72 534 106 594 218C644 313 732 236 830 142",
  "M94 178C178 82 300 128 394 230C490 335 612 366 826 206",
  "M82 378C204 278 286 356 396 244C510 127 650 134 828 316",
  "M104 250C198 194 256 90 392 132C510 168 612 116 796 104",
];

const restaurantPositions = [
  { x: 7, y: 17 },
  { x: 68, y: 11 },
  { x: 76, y: 56 },
  { x: 12, y: 61 },
  { x: 43, y: 76 },
  { x: 44, y: 7 },
];

const restaurantBadges = [
  "District favourite",
  "Fast route",
  "Lunch rush",
  "Night bite",
  "Popular stop",
  "Fresh find",
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeNodes(offset: number): DistrictNode[] {
  const names = coverageAreas.slice(0, nodeCoords.length);

  return nodeCoords.map((point, index) => ({
    name: names[(index + offset) % names.length],
    x: point.x,
    y: point.y,
    camera: point.camera,
    eta: 14 + ((index + 2) * 3 + offset * 2) % 18,
    deliveries: 22 + ((index + 1) * 11 + offset * 7) % 72,
    route: districtRoutes[(index + offset) % districtRoutes.length],
  }));
}

const explorerCities: ExplorerCity[] = [liveCity, ...expansionCities].map(
  (city, index) => {
    const palette = palettes[index % palettes.length];
    const live = city === liveCity;

    return {
      id: slugify(city),
      name: city,
      state: live ? liveCityState : "Nigeria rollout",
      accent: palette.accent,
      dark: palette.dark,
      soft: palette.soft,
      water: palette.water,
      summary: live
        ? "Explore Ile-Ife as connected food districts: campus cravings, neighbourhood kitchens, fast rider corridors, and late-night bite stops."
        : "Preview the next QuickBite food district with launch corridors, restaurant clusters, and rider-ready neighbourhood routes.",
      nodes: makeNodes(index),
      roads: [
        districtRoutes[index % districtRoutes.length],
        districtRoutes[(index + 1) % districtRoutes.length],
        districtRoutes[(index + 2) % districtRoutes.length],
      ],
    };
  },
);

function makeRestaurantDiscoveries(
  city: ExplorerCity,
  node: DistrictNode,
  query: string,
): RestaurantDiscovery[] {
  const cityIndex = explorerCities.findIndex((item) => item.id === city.id);
  const nodeIndex = city.nodes.findIndex((item) => item.name === node.name);
  const offset = Math.max(0, cityIndex * 2 + nodeIndex);
  const arranged = Array.from(
    { length: Math.min(6, restaurants.length) },
    (_, index) => {
      const restaurant = restaurants[(offset + index) % restaurants.length];
      const position = restaurantPositions[index % restaurantPositions.length];
      const route = `M${node.x} ${node.y}C${node.x + (position.x - 45) * 3.4} ${
        node.y - 80 + index * 12
      } ${180 + position.x * 7} ${90 + position.y * 3} ${120 + position.x * 8} ${
        80 + position.y * 4
      }`;

      return {
        ...restaurant,
        badge: restaurantBadges[index % restaurantBadges.length],
        position,
        route,
      };
    },
  );

  const normalized = query.trim().toLowerCase();
  if (!normalized) return arranged;

  const filtered = arranged.filter((restaurant) => {
    return `${restaurant.name} ${restaurant.cuisine}`
      .toLowerCase()
      .includes(normalized);
  });

  return filtered.length ? filtered : arranged;
}

function FloatingRestaurant({
  restaurant,
  index,
  hovered,
  accent,
  onHover,
}: {
  restaurant: RestaurantDiscovery;
  index: number;
  hovered: boolean;
  accent: string;
  onHover: (value: string | null) => void;
}) {
  return (
    <motion.article
      data-district-restaurant-card
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: hovered ? 1.06 : 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.92 }}
      transition={{ delay: index * 0.045, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(restaurant.name)}
      onMouseLeave={() => onHover(null)}
      className="absolute z-30 w-[13.25rem] -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${restaurant.position.x}%`,
        top: `${restaurant.position.y}%`,
      }}
    >
      <Link
        href="/restaurants"
        className="group relative block rounded-[1.45rem] bg-white/90 p-3 text-[#24180f] ring-1 ring-black/5 backdrop-blur-xl transition-transform duration-300"
      >
        <div className="absolute -inset-1 rounded-[1.65rem] bg-[#2a211d]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />
        <div className="relative">
          <motion.div
            animate={{
              rotate: hovered ? (index % 2 === 0 ? 4 : -4) : 0,
              scale: hovered ? 1.14 : 1,
            }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-24 overflow-hidden rounded-[1.1rem] bg-[#fff7f0]"
          >
            <Image
              src={restaurant.image}
              alt={`Food from ${restaurant.name}`}
              fill
              sizes="212px"
              className="object-cover"
            />
          </motion.div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-[var(--district-accent)]">
                {restaurant.badge}
              </p>
              <h3 className="mt-1 line-clamp-1 font-display text-sm font-black">
                {restaurant.name}
              </h3>
            </div>
            <motion.span
              animate={{ y: hovered ? -5 : 0 }}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white"
              style={{ backgroundColor: accent }}
            >
              <MapPinned className="h-4 w-4" strokeWidth={2.3} />
            </motion.span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.68rem] font-black text-[#4a3d38]">
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5 text-[var(--district-accent)]" strokeWidth={2.3} />
              {restaurant.eta}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#f3a629] text-[#f3a629]" strokeWidth={2.3} />
              {restaurant.rating}
            </span>
            <span>{restaurant.deliveryFrom}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function DiscoveryStripCard({
  restaurant,
  accent,
}: {
  restaurant: RestaurantDiscovery;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-[18rem] flex-1 rounded-[1.5rem] bg-white/86 p-3 text-[#24180f] ring-1 ring-black/5 backdrop-blur"
    >
      <div className="flex gap-3">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[1.1rem] bg-[#fff0e4]">
          <Image
            src={restaurant.image}
            alt={`Food from ${restaurant.name}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="w-max rounded-pill px-2.5 py-1 text-[0.58rem] font-black uppercase tracking-[0.12em] text-white"
            style={{ backgroundColor: accent }}
          >
            {restaurant.badge}
          </p>
          <h3 className="mt-2 line-clamp-1 font-display text-base font-black">
            {restaurant.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-semibold text-[#7c6253]">
            {restaurant.cuisine}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function QuickBiteDistrictExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCityId, setActiveCityId] = useState(explorerCities[0].id);
  const [activeDistrictName, setActiveDistrictName] = useState(
    explorerCities[0].nodes[0].name,
  );
  const [query, setQuery] = useState("");
  const [hoveredRestaurant, setHoveredRestaurant] = useState<string | null>(null);

  const activeCity =
    explorerCities.find((city) => city.id === activeCityId) ?? explorerCities[0];
  const activeDistrict =
    activeCity.nodes.find((node) => node.name === activeDistrictName) ??
    activeCity.nodes[0];
  const districtRestaurants = useMemo(
    () => makeRestaurantDiscoveries(activeCity, activeDistrict, query),
    [activeCity, activeDistrict, query],
  );
  const routePoints = activeCity.nodes.map((node) => `${node.x},${node.y}`).join(" ");

  const handleCityChange = (cityId: string) => {
    const nextCity = explorerCities.find((city) => city.id === cityId);
    if (!nextCity) return;

    setActiveCityId(cityId);
    setActiveDistrictName(nextCity.nodes[0].name);
    setHoveredRestaurant(null);
  };

  const handleDistrictChange = (node: DistrictNode) => {
    setActiveDistrictName(node.name);
    setHoveredRestaurant(null);
  };

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const world = root.querySelector<SVGGElement>("[data-district-world]");
      const roads = gsap.utils.toArray<SVGPathElement>(
        root.querySelectorAll("[data-district-road]"),
      );
      const pins = root.querySelectorAll("[data-district-pin]");
      const restaurantsLayer = root.querySelector("[data-floating-restaurants]");

      if (world) {
        gsap.to(world, {
          x: activeDistrict.camera.x,
          y: activeDistrict.camera.y,
          scale: activeDistrict.camera.scale,
          transformOrigin: `${activeDistrict.x}px ${activeDistrict.y}px`,
          duration: reducedMotion ? 0 : 0.84,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      }

      roads.forEach((road) => {
        const length = road.getTotalLength();
        gsap.fromTo(
          road,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: 0,
            duration: reducedMotion ? 0 : 1,
            ease: "power3.inOut",
          },
        );
      });

      gsap.fromTo(
        pins,
        { y: 18, scale: 0.82, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          stagger: 0.045,
          duration: reducedMotion ? 0 : 0.5,
          ease: "back.out(1.4)",
        },
      );

      if (restaurantsLayer) {
        gsap.fromTo(
          restaurantsLayer,
          { y: 22, autoAlpha: 0, filter: "blur(10px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: reducedMotion ? 0 : 0.58,
            ease: "power3.out",
          },
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [activeCityId, activeDistrictName],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      const root = sectionRef.current;
      const path = root?.querySelector<SVGPathElement>("[data-active-bike-path]");
      const bike = root?.querySelector<SVGImageElement>("[data-district-bike]");
      const glow = root?.querySelector<SVGPathElement>("[data-active-route-glow]");
      const ripple = root?.querySelector<HTMLElement>("[data-delivery-ripple]");
      const notification = root?.querySelector<HTMLElement>("[data-delivery-note]");
      if (!path || !bike) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(bike, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -66,
        transformOrigin: "50% 66%",
      });

      if (reducedMotion) {
        gsap.set(bike, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: 0.24,
            end: 0.24,
          },
        });
        return;
      }

      const glowTween = glow
        ? gsap.to(glow, {
            strokeDashoffset: -540,
            duration: 3.6,
            repeat: -1,
            ease: "none",
          })
        : null;

      const timeline = gsap.timeline({ repeat: -1 });
      const stops = [
        { start: 0, end: 0.22, duration: 1.85 },
        { start: 0.22, end: 0.28, duration: 0.72 },
        { start: 0.28, end: 0.54, duration: 2.05 },
        { start: 0.54, end: 0.61, duration: 0.76 },
        { start: 0.61, end: 0.82, duration: 1.82 },
        { start: 0.82, end: 1, duration: 1.48 },
      ];

      stops.forEach((stop, index) => {
        timeline.to(bike, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: stop.start,
            end: stop.end,
          },
          duration: stop.duration,
          ease: index % 2 === 0 ? "power1.inOut" : "power2.inOut",
        });

        if (index === 1 || index === 3) {
          timeline
            .to(bike, { scale: 0.94, duration: 0.18, ease: "power2.out" })
            .to(bike, { scale: 1, duration: 0.22, ease: "power2.in" });

          if (ripple) {
            timeline.fromTo(
              ripple,
              { scale: 0.3, autoAlpha: 0.42 },
              {
                scale: 2.8,
                autoAlpha: 0,
                duration: 0.72,
                ease: "power2.out",
              },
              ">-0.2",
            );
          }

          if (notification) {
            timeline
              .fromTo(
                notification,
                { y: 14, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.28,
                  ease: "power3.out",
                },
                "<",
              )
              .to(notification, {
                y: -12,
                autoAlpha: 0,
                duration: 0.38,
                ease: "power2.in",
              });
          }
        }
      });

      return () => {
        timeline.kill();
        glowTween?.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [activeCityId, activeDistrictName],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const routes = root.querySelectorAll<SVGPathElement>(
        "[data-restaurant-route]",
      );

      routes.forEach((route) => {
        const active = route.dataset.restaurantName === hoveredRestaurant;
        gsap.to(route, {
          strokeWidth: active ? 5 : 2,
          opacity: active ? 0.9 : 0.22,
          duration: 0.28,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    },
    { scope: sectionRef, dependencies: [hoveredRestaurant] },
  );

  return (
    <section
      ref={sectionRef}
      id="restaurants"
      data-nav-theme="neutral"
      className="relative overflow-hidden bg-[#fff8ef] py-16 text-[#24180f] sm:py-24"
      style={
        {
          "--district-accent": activeCity.accent,
          "--district-dark": activeCity.dark,
          "--district-soft": activeCity.soft,
          "--district-water": activeCity.water,
        } as CSSProperties
      }
    >
      <span id="cities" className="absolute top-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:radial-gradient(#3a2418_0.7px,transparent_0.7px)] [background-size:18px_18px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-[var(--district-accent)]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-[var(--district-water)]/25 blur-3xl"
      />
      <Image
        src="/food/snacks.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute right-[7%] top-16 hidden w-24 rotate-12 opacity-[0.08] lg:block"
      />
      <Image
        src="/food/pizza.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute bottom-16 left-[6%] hidden w-28 -rotate-12 opacity-[0.08] lg:block"
      />

      <Container className="relative z-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--district-accent)]">
              <MapPinned className="h-4 w-4" strokeWidth={2.4} />
              Food District Explorer
            </p>
            <h2 className="mt-4 font-display text-[2.45rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-5xl lg:text-[4.55rem]">
              Browse the city by food districts, not by lists.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#745c50]">
              {activeCity.summary}
            </p>
          </div>

          <div className="w-full max-w-xl space-y-3">
            <div className="flex flex-wrap gap-2">
              {explorerCities.map((city) => {
                const active = city.id === activeCity.id;

                return (
                  <motion.button
                    key={city.id}
                    type="button"
                    onClick={() => handleCityChange(city.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-pill px-4 py-2 text-xs font-black transition-colors ${
                      active
                        ? "bg-[var(--district-accent)] text-white"
                        : "bg-white/78 text-[#6d554a] ring-1 ring-[#3a2418]/10 hover:bg-white hover:text-[#24180f]"
                    }`}
                  >
                    {city.name}
                  </motion.button>
                );
              })}
            </div>

            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--district-accent)]" strokeWidth={2.35} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search restaurants, cuisine, or district mood"
                className="h-14 w-full rounded-pill bg-white/86 px-11 text-sm font-bold text-[#24180f] ring-1 ring-[#3a2418]/10 outline-none transition focus:ring-[var(--district-accent)]"
              />
            </label>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2.5rem] bg-[#1e1510] p-3 text-white ring-1 ring-black/10">
          <div className="relative min-h-[43rem] overflow-hidden rounded-[2rem] bg-[#f8efe3]">
            <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(58,36,24,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(58,36,24,.18)_1px,transparent_1px)] [background-size:58px_58px]" />
            <div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--district-soft)] opacity-75 blur-3xl" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 920 560"
              fill="none"
              aria-label={`${activeCity.name} illustrated food district map`}
            >
              <defs>
                <filter id="districtGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g data-district-world>
                <path
                  d="M-30 410C78 334 172 384 276 286C390 179 492 242 596 136C708 22 810 88 962 188V604H-30V410Z"
                  fill="#ffffff"
                  opacity="0.58"
                />
                <path
                  d="M-20 140C88 103 158 138 248 82C352 18 470 88 572 58C690 24 802 30 940 78"
                  stroke="var(--district-water)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                <path
                  d="M76 398C120 356 176 367 226 328C286 281 334 307 394 258C462 202 534 216 594 172C670 116 760 122 850 158"
                  fill="none"
                  stroke="#8ecf8f"
                  strokeWidth="54"
                  strokeLinecap="round"
                  opacity="0.2"
                />
                <path
                  d="M655 384C704 345 772 344 832 394C790 464 700 482 626 440C620 420 628 398 655 384Z"
                  fill="#6fcf80"
                  opacity="0.22"
                />
                <path
                  d="M92 102L236 72L314 174L196 230L68 184Z"
                  fill="var(--district-soft)"
                  opacity="0.86"
                />
                <path
                  d="M404 82L574 108L636 250L482 310L354 206Z"
                  fill="#fff7f0"
                  opacity="0.82"
                />
                <path
                  d="M592 286L806 244L882 390L728 490L574 424Z"
                  fill="var(--district-soft)"
                  opacity="0.72"
                />

                {[140, 260, 456, 612, 742].map((x, index) => (
                  <g key={`${activeCity.id}-landmark-${index}`}>
                    <rect
                      x={x}
                      y={232 - index * 18}
                      width={70 + (index % 2) * 18}
                      height={92 + (index % 3) * 16}
                      rx="16"
                      fill="#24180f"
                      opacity="0.09"
                    />
                    <rect
                      x={x + 17}
                      y={256 - index * 18}
                      width="34"
                      height="8"
                      rx="4"
                      fill="var(--district-accent)"
                      opacity="0.6"
                    />
                  </g>
                ))}

                {activeCity.roads.map((road, index) => (
                  <path
                    key={`${activeCity.id}-road-${index}`}
                    data-district-road
                    d={road}
                    stroke="#24180f"
                    strokeOpacity="0.14"
                    strokeWidth={index === 0 ? 30 : 19}
                    strokeLinecap="round"
                  />
                ))}
                <path
                  data-district-road
                  d={activeDistrict.route}
                  stroke="var(--district-accent)"
                  strokeWidth="5"
                  strokeDasharray="12 15"
                  strokeLinecap="round"
                  opacity="0.78"
                />
                <path
                  data-active-route-glow
                  d={activeDistrict.route}
                  stroke="var(--district-accent)"
                  strokeWidth="12"
                  strokeDasharray="34 540"
                  strokeLinecap="round"
                  opacity="0.48"
                  filter="url(#districtGlow)"
                />
                <polyline
                  points={routePoints}
                  stroke="#24180f"
                  strokeOpacity="0.18"
                  strokeWidth="2.4"
                  strokeDasharray="7 12"
                  fill="none"
                />
                {districtRestaurants.map((restaurant) => (
                  <path
                    key={`${restaurant.name}-route`}
                    data-restaurant-route
                    data-restaurant-name={restaurant.name}
                    d={restaurant.route}
                    stroke="var(--district-accent)"
                    strokeLinecap="round"
                    strokeWidth="2"
                    opacity={hoveredRestaurant === restaurant.name ? 0.9 : 0.22}
                    fill="none"
                  />
                ))}
                <path
                  data-active-bike-path
                  d={activeDistrict.route}
                  stroke="transparent"
                  strokeWidth="1"
                />
                <image
                  data-district-bike
                  href="/quickbite-delivery-bike.svg"
                  width="142"
                  height="84"
                />
              </g>
            </svg>

            <div className="pointer-events-none absolute inset-0">
              {activeCity.nodes.map((node) => {
                const active = node.name === activeDistrict.name;

                return (
                  <motion.button
                    key={`${activeCity.id}-${node.name}`}
                    data-district-pin
                    type="button"
                    onClick={() => handleDistrictChange(node)}
                    whileHover={{ y: -6, scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="pointer-events-auto absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(node.x / 920) * 100}%`,
                      top: `${(node.y / 560) * 100}%`,
                    }}
                  >
                    <span
                      className={`flex items-center gap-2 rounded-pill px-3.5 py-2 text-xs font-black ring-1 backdrop-blur-xl transition-colors ${
                        active
                          ? "bg-[var(--district-accent)] text-white ring-white/30"
                          : "bg-white/82 text-[#24180f] ring-[#24180f]/10"
                      }`}
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--district-accent)] opacity-35" />
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[var(--district-accent)]" />
                      </span>
                      {node.name}
                      <span className={active ? "text-white/65" : "text-[#8f6a57]"}>
                        {node.eta}m
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div data-floating-restaurants className="absolute inset-0">
              <AnimatePresence mode="popLayout">
                {districtRestaurants.map((restaurant, index) => (
                  <FloatingRestaurant
                    key={`${activeCity.id}-${activeDistrict.name}-${restaurant.name}`}
                    restaurant={restaurant}
                    index={index}
                    accent={activeCity.accent}
                    hovered={hoveredRestaurant === restaurant.name}
                    onHover={setHoveredRestaurant}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div
              data-delivery-ripple
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--district-accent)] opacity-0"
            />
            <div
              data-delivery-note
              className="pointer-events-none absolute left-1/2 top-[58%] z-40 -translate-x-1/2 rounded-pill bg-[#24180f] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white opacity-0"
            >
              Delivery completed
            </div>

            <div className="absolute left-5 top-5 z-40 flex max-w-[calc(100%-2.5rem)] flex-wrap items-center gap-3">
              <div className="rounded-[1.35rem] bg-[#24180f]/88 px-4 py-3 text-white ring-1 ring-white/10 backdrop-blur-xl">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/45">
                  Active district
                </p>
                <p className="mt-1 flex items-center gap-2 font-display text-xl font-black">
                  <Compass className="h-5 w-5 text-[var(--district-accent)]" strokeWidth={2.3} />
                  {activeDistrict.name}
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-white/86 px-4 py-3 text-[#24180f] ring-1 ring-black/5 backdrop-blur-xl">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#8f6a57]">
                  Delivery time
                </p>
                <p className="mt-1 font-display text-xl font-black text-[var(--district-accent)]">
                  {activeDistrict.eta} min
                </p>
              </div>
              <div className="rounded-[1.35rem] bg-white/86 px-4 py-3 text-[#24180f] ring-1 ring-black/5 backdrop-blur-xl">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#8f6a57]">
                  Orders today
                </p>
                <p className="mt-1 font-display text-xl font-black">
                  {activeDistrict.deliveries}
                </p>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 z-40 hidden items-center gap-3 rounded-pill bg-[#24180f]/88 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/70 ring-1 ring-white/10 backdrop-blur-xl sm:flex">
              <Bike className="h-4 w-4 text-[var(--district-accent)]" strokeWidth={2.4} />
              Rider reroutes when you choose a district
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#1e1510] p-4 sm:p-5">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--district-accent)]">
                  Restaurant discovery strip
                </p>
                <h3 className="mt-1 font-display text-2xl font-black text-white">
                  Floating finds near {activeDistrict.name}
                </h3>
              </div>
              <MagneticFillButton
                href="/restaurants"
                variant="brand"
                customFillClass="bg-white"
                customHoverTextColor="#24180f"
                className="h-12 w-max rounded-pill border-0 bg-[var(--district-accent)] px-6 text-sm font-black"
              >
                Explore all
                <Navigation className="h-4 w-4" strokeWidth={2.35} />
              </MagneticFillButton>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {districtRestaurants.map((restaurant) => (
                <DiscoveryStripCard
                  key={`${activeDistrict.name}-strip-${restaurant.name}`}
                  restaurant={restaurant}
                  accent={activeCity.accent}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Building2,
              label: "District landmarks",
              copy: "Simplified buildings and food corridors show where demand clusters.",
            },
            {
              icon: Trees,
              label: "Parks and boundaries",
              copy: "Soft map zones help the explorer feel custom rather than like a plain map.",
            },
            {
              icon: Waves,
              label: "Route texture",
              copy: "Water, roads, pins and rider motion create a living city layer.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] bg-white/74 p-5 ring-1 ring-[#3a2418]/10"
            >
              <item.icon className="h-5 w-5 text-[var(--district-accent)]" strokeWidth={2.3} />
              <p className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-[#24180f]">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#745c50]">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
