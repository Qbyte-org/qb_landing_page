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
  CloudSun,
  Navigation,
  Radio,
  Signal,
  Star,
  Timer,
  UtensilsCrossed,
  Zap,
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

type HubNode = {
  name: string;
  x: number;
  y: number;
  deliveries: number;
};

type HubCity = {
  id: string;
  name: string;
  state: string;
  copy: string;
  status: string;
  accent: string;
  soft: string;
  eta: number;
  activeRestaurants: number;
  ridersOnline: number;
  temperature: number;
  route: string;
  secondaryRoute: string;
  nodes: HubNode[];
  buildings: { x: number; y: number; w: number; h: number; tone: string }[];
};

const nodeLayouts: Pick<HubNode, "x" | "y">[] = [
  { x: 176, y: 168 },
  { x: 358, y: 118 },
  { x: 552, y: 180 },
  { x: 742, y: 132 },
  { x: 688, y: 346 },
  { x: 448, y: 402 },
  { x: 248, y: 338 },
];

const accents = [
  { accent: "#f15f00", soft: "#fff0e4" },
  { accent: "#0f7a5a", soft: "#e8fff6" },
  { accent: "#f4a51c", soft: "#fff6d8" },
  { accent: "#ff4f1f", soft: "#ffeade" },
  { accent: "#6a5cff", soft: "#eeecff" },
  { accent: "#169b89", soft: "#e9fffb" },
  { accent: "#d86420", soft: "#fff0e8" },
];

const routes = [
  {
    route:
      "M94 318C172 214 252 246 327 176C410 98 520 114 585 203C642 280 723 222 807 151",
    secondary:
      "M138 406C252 302 330 348 430 266C532 181 620 304 782 266",
  },
  {
    route:
      "M96 212C178 122 302 163 394 258C485 352 607 370 812 220",
    secondary:
      "M172 386C288 316 334 142 486 157C628 171 682 318 790 360",
  },
  {
    route:
      "M102 350C216 254 300 331 397 230C507 116 635 130 806 310",
    secondary:
      "M156 170C286 214 342 130 470 174C588 215 650 186 770 126",
  },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeNodes(offset: number) {
  const names = coverageAreas.slice(0, nodeLayouts.length);

  return nodeLayouts.map((position, index) => ({
    ...position,
    name: names[(index + offset) % names.length],
    deliveries: 18 + ((index + 1) * 7 + offset * 5) % 42,
  }));
}

const hubCities: HubCity[] = [liveCity, ...expansionCities].map((city, index) => {
  const palette = accents[index % accents.length];
  const routeSet = routes[index % routes.length];
  const isLive = city === liveCity;

  return {
    id: slugify(city),
    name: city,
    state: isLive ? liveCityState : "Nigeria rollout",
    copy: isLive
      ? "Campus kitchens, neighbourhood staples, and late-night favourites connected into one live delivery grid."
      : "A launch simulation of the next QuickBite delivery cluster, tuned for restaurants, riders, and city-wide demand.",
    status: isLive ? "Live and healthy" : "Opening soon",
    accent: palette.accent,
    soft: palette.soft,
    eta: isLive ? 24 : 18 + ((index + 2) * 3) % 16,
    activeRestaurants: isLive ? restaurants.length * 8 : 22 + index * 9,
    ridersOnline: isLive ? 38 : 18 + index * 6,
    temperature: 27 + (index % 5),
    route: routeSet.route,
    secondaryRoute: routeSet.secondary,
    nodes: makeNodes(index),
    buildings: [
      { x: 102, y: 238, w: 74, h: 96, tone: palette.soft },
      { x: 226, y: 130, w: 82, h: 128, tone: "#fff7f0" },
      { x: 446, y: 126, w: 96, h: 92, tone: palette.soft },
      { x: 614, y: 245, w: 92, h: 118, tone: "#fff7f0" },
      { x: 758, y: 186, w: 72, h: 102, tone: palette.soft },
    ],
  };
});

const restaurantBadges = [
  "Most ordered",
  "Popular",
  "Fast lane",
  "Campus pick",
  "Dinner rush",
  "Fresh drop",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function AnimatedNumber({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = valueRef.current;
      if (!element) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        element.textContent = `${value.toLocaleString()}${suffix}`;
        return;
      }

      const proxy = { value: 0 };
      const tween = gsap.to(proxy, {
        value,
        duration: 0.9,
        ease: "power3.out",
        onUpdate: () => {
          element.textContent = `${Math.round(proxy.value).toLocaleString()}${suffix}`;
        },
      });

      return () => tween.kill();
    },
    { scope: valueRef, dependencies: [value, suffix] },
  );

  return (
    <span ref={valueRef} className={className}>
      {value.toLocaleString()}{suffix}
    </span>
  );
}

function AnimatedMetric({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 text-white ring-1 ring-white/10">
      <p className="font-display text-2xl font-black leading-none tracking-[-0.04em]">
        <AnimatedNumber value={value} suffix={suffix} />
      </p>
      <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
    </div>
  );
}

function RestaurantDiscoveryCard({
  restaurant,
  index,
  accent,
}: {
  restaurant: Restaurant;
  index: number;
  accent: string;
}) {
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, x: 28, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
    >
      <div className="pointer-events-none absolute -inset-1 rounded-[1.6rem] bg-[#2a211d]/30 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-50" />
      <Link
        href="/restaurants"
        className="relative flex min-h-[8.25rem] overflow-hidden rounded-[1.45rem] bg-white/92 p-4 text-[#24180f] ring-1 ring-black/5 backdrop-blur"
      >
        <motion.div
          className="absolute -right-5 -top-5 h-28 w-32 overflow-hidden rounded-[2rem] bg-[#fff7ef]"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={restaurant.image}
            alt={`Food from ${restaurant.name}`}
            fill
            sizes="128px"
            className="object-cover"
          />
        </motion.div>

        <div className="relative z-10 flex max-w-[72%] flex-col">
          <div className="flex items-center gap-2">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-black text-white"
              style={{ backgroundColor: accent }}
            >
              {getInitials(restaurant.name)}
            </span>
            <span className="rounded-pill bg-[#fff0e4] px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#f15f00]">
              {restaurantBadges[index % restaurantBadges.length]}
            </span>
          </div>

          <h3 className="mt-3 font-display text-base font-black leading-tight">
            {restaurant.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-semibold text-[#6d554a]">
            {restaurant.cuisine}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[0.72rem] font-black text-[#3a2418]">
            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5 text-[#f15f00]" strokeWidth={2.3} />
              {restaurant.eta}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#f3a629] text-[#f3a629]" strokeWidth={2.3} />
              {restaurant.rating}
            </span>
            <span>{restaurant.deliveryFrom}</span>
          </div>
        </div>

        <span className="absolute bottom-4 right-4 flex h-3 w-3" aria-hidden="true">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-55"
            style={{ backgroundColor: accent }}
          />
          <span
            className="relative inline-flex h-3 w-3 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </span>
      </Link>
    </motion.article>
  );
}

export default function QuickBiteDeliveryHub() {
  const hubRef = useRef<HTMLElement>(null);
  const [activeCityId, setActiveCityId] = useState(hubCities[0].id);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const activeCity =
    hubCities.find((city) => city.id === activeCityId) ?? hubCities[0];
  const selectedNode =
    activeCity.nodes.find((node) => node.name === selectedArea) ?? null;

  const featuredRestaurants = useMemo(() => {
    const cityIndex = hubCities.findIndex((city) => city.id === activeCity.id);
    const nodeIndex = selectedNode
      ? activeCity.nodes.findIndex((node) => node.name === selectedNode.name)
      : 0;
    const offset = Math.max(0, cityIndex * 2 + nodeIndex);

    return Array.from({ length: Math.min(5, restaurants.length) }, (_, index) => {
      return restaurants[(offset + index) % restaurants.length];
    });
  }, [activeCity, selectedNode]);

  const nodePoints = activeCity.nodes
    .map((node) => `${node.x},${node.y}`)
    .join(" ");

  useGSAP(
    () => {
      const root = hubRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const drawPaths = gsap.utils.toArray<SVGGeometryElement>(
        root.querySelectorAll("[data-hub-draw]"),
      );

      drawPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: 0,
            duration: reducedMotion ? 0 : 1.1,
            ease: "power3.inOut",
          },
        );
      });

      gsap.fromTo(
        root.querySelectorAll("[data-hub-building]"),
        { autoAlpha: 0, y: 18, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0 : 0.72,
          stagger: 0.045,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        root.querySelectorAll("[data-hub-pin]"),
        { autoAlpha: 0, y: 22, scale: 0.78 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0 : 0.62,
          stagger: 0.055,
          ease: "back.out(1.35)",
        },
      );

      gsap.fromTo(
        root.querySelectorAll("[data-hub-bg-orb]"),
        { x: -18, y: 14, scale: 0.94 },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0 : 1.05,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    },
    { scope: hubRef, dependencies: [activeCityId, selectedArea] },
  );

  useGSAP(
    () => {
      const root = hubRef.current;
      const path = root?.querySelector<SVGPathElement>("[data-hub-bike-path]");
      const rider = root?.querySelector<SVGImageElement>("[data-hub-rider]");
      const glow = root?.querySelector<SVGPathElement>("[data-hub-route-glow]");
      if (!root || !path || !rider) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(rider, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -66,
        transformOrigin: "50% 66%",
      });

      if (reducedMotion) {
        gsap.set(rider, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: 0.18,
            end: 0.18,
          },
        });
        return;
      }

      const routeGlow = glow
        ? gsap.to(glow, {
            strokeDashoffset: -780,
            duration: 4.8,
            ease: "none",
            repeat: -1,
          })
        : null;

      const timeline = gsap.timeline({ repeat: -1 });
      const segments = [
        { start: 0, end: 0.2, duration: 2.25, ease: "power1.inOut" },
        { start: 0.2, end: 0.255, duration: 0.72, ease: "power2.inOut" },
        { start: 0.255, end: 0.48, duration: 2.1, ease: "power1.in" },
        { start: 0.48, end: 0.54, duration: 0.76, ease: "power2.inOut" },
        { start: 0.54, end: 0.76, duration: 2.05, ease: "power1.out" },
        { start: 0.76, end: 0.82, duration: 0.68, ease: "power2.inOut" },
        { start: 0.82, end: 1, duration: 1.7, ease: "power1.inOut" },
      ];

      segments.forEach((segment, index) => {
        timeline.to(rider, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: segment.start,
            end: segment.end,
          },
          duration: segment.duration,
          ease: segment.ease,
        });

        if (index < segments.length - 1) {
          timeline.to(
            rider,
            {
              rotate: index % 2 === 0 ? "+=4" : "-=4",
              duration: 0.18,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            },
            ">-0.2",
          );
        }
      });

      return () => {
        timeline.kill();
        routeGlow?.kill();
      };
    },
    { scope: hubRef, dependencies: [activeCityId] },
  );

  return (
    <section
      ref={hubRef}
      id="restaurants"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#20140f] py-16 text-white sm:py-24"
      style={
        {
          "--hub-accent": activeCity.accent,
          "--hub-soft": activeCity.soft,
        } as CSSProperties
      }
    >
      <span id="cities" className="absolute top-0" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        data-hub-bg-orb
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--hub-accent)]/25 blur-3xl"
      />
      <div
        data-hub-bg-orb
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />
      <Image
        src="/food/pizza.svg"
        alt=""
        width={130}
        height={130}
        className="pointer-events-none absolute right-[8%] top-16 hidden w-24 rotate-12 opacity-10 lg:block"
        aria-hidden="true"
      />
      <Image
        src="/food/drinks.svg"
        alt=""
        width={120}
        height={120}
        className="pointer-events-none absolute bottom-20 left-[6%] hidden w-20 -rotate-12 opacity-10 lg:block"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--hub-accent)]">
              QuickBite Delivery Hub
            </p>
            <h2 className="mt-4 font-display text-[2.5rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-5xl lg:text-[4.65rem]">
              A live view of the food network around you.
            </h2>
          </div>
          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            customFillClass="bg-white"
            customHoverTextColor="#24180f"
            className="h-14 w-max rounded-pill border-0 bg-[var(--hub-accent)] px-7 text-sm font-black sm:px-9"
          >
            Explore restaurants
            <Navigation className="h-4 w-4" strokeWidth={2.35} />
          </MagneticFillButton>
        </div>

        <div className="relative overflow-hidden rounded-[2.4rem] bg-[#120d0b]/82 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,var(--hub-accent),transparent)] opacity-20" />

          <div className="grid min-h-[45rem] lg:grid-cols-[0.82fr_1.55fr] xl:grid-cols-[0.8fr_1.65fr_0.95fr]">
            <aside className="relative z-20 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r xl:p-9">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/45">
                <Radio className="h-4 w-4 text-[var(--hub-accent)]" strokeWidth={2.3} />
                Active city
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCity.id}
                  initial={{ y: -22, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: 18, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="mt-6 font-display text-[3.3rem] font-black leading-[0.9] tracking-[-0.08em] sm:text-[4rem] lg:text-[3.7rem]">
                    {activeCity.name}
                  </h3>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--hub-accent)]">
                    {activeCity.state}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-white/62">
                    {activeCity.copy}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <AnimatedMetric value={activeCity.eta} suffix="m" label="Avg delivery" />
                <AnimatedMetric value={activeCity.activeRestaurants} label="Restaurants" />
                <AnimatedMetric value={activeCity.ridersOnline} label="Riders online" />
                <div className="rounded-[1.2rem] bg-white/8 px-4 py-3 text-white ring-1 ring-white/10">
                  <p className="flex items-center gap-2 font-display text-2xl font-black leading-none tracking-[-0.04em]">
                    <CloudSun className="h-6 w-6 text-[var(--hub-accent)]" strokeWidth={2.2} />
                    <AnimatedNumber value={activeCity.temperature} suffix="°" />
                  </p>
                  <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/45">
                    Weather
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-[1.35rem] bg-white/8 px-4 py-4 ring-1 ring-white/10">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">
                    Service status
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeCity.status}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="mt-1 text-sm font-black text-white"
                    >
                      {activeCity.status}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--hub-accent)] opacity-55" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-[var(--hub-accent)]" />
                </span>
              </div>

              <div className="mt-7">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-white/45">
                  Switch city
                </p>
                <div className="flex flex-wrap gap-2">
                  {hubCities.map((city) => {
                    const active = city.id === activeCity.id;
                    return (
                      <motion.button
                        key={city.id}
                        type="button"
                        onClick={() => {
                          setActiveCityId(city.id);
                          setSelectedArea(null);
                        }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`rounded-pill px-3.5 py-2 text-xs font-black transition-colors ${
                          active
                            ? "bg-[var(--hub-accent)] text-white"
                            : "bg-white/8 text-white/58 hover:bg-white/12 hover:text-white"
                        }`}
                      >
                        {city.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="relative min-h-[38rem] overflow-hidden p-5 sm:p-8 lg:p-7 xl:p-9">
              <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--hub-soft)] opacity-[0.08] blur-2xl" />

              <svg
                className="relative z-10 h-full min-h-[35rem] w-full overflow-visible"
                viewBox="0 0 920 520"
                fill="none"
                aria-label={`Stylised QuickBite delivery network in ${activeCity.name}`}
              >
                <defs>
                  <filter id="hubRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="hubSkyline" x1="95" y1="80" x2="850" y2="430" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--hub-soft)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
                  </linearGradient>
                </defs>

                <path
                  d="M34 394C118 316 174 349 262 284C362 209 456 252 534 171C615 87 738 90 890 160V520H34V394Z"
                  fill="url(#hubSkyline)"
                  opacity="0.38"
                />
                <path
                  d="M36 118C156 78 246 102 326 72C438 30 512 94 632 76C735 61 792 30 888 62"
                  stroke="white"
                  strokeOpacity="0.08"
                  strokeWidth="30"
                  strokeLinecap="round"
                />

                {activeCity.buildings.map((building, index) => (
                  <g data-hub-building key={`${activeCity.id}-building-${index}`}>
                    <rect
                      x={building.x}
                      y={building.y}
                      width={building.w}
                      height={building.h}
                      rx="18"
                      fill={building.tone}
                      opacity="0.16"
                    />
                    <rect
                      x={building.x + 18}
                      y={building.y + 22}
                      width={building.w - 36}
                      height="10"
                      rx="5"
                      fill="white"
                      opacity="0.18"
                    />
                    <rect
                      x={building.x + 18}
                      y={building.y + 48}
                      width={building.w - 44}
                      height="10"
                      rx="5"
                      fill="white"
                      opacity="0.12"
                    />
                  </g>
                ))}

                <path
                  data-hub-draw
                  d={activeCity.secondaryRoute}
                  stroke="white"
                  strokeOpacity="0.13"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <path
                  data-hub-draw
                  data-hub-route="draw"
                  d={activeCity.route}
                  stroke="white"
                  strokeOpacity="0.18"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                <path
                  d={activeCity.route}
                  stroke="var(--hub-accent)"
                  strokeWidth="4"
                  strokeDasharray="12 16"
                  strokeLinecap="round"
                  opacity="0.78"
                />
                <path
                  data-hub-route-glow
                  d={activeCity.route}
                  stroke="var(--hub-accent)"
                  strokeWidth="10"
                  strokeDasharray="42 760"
                  strokeLinecap="round"
                  opacity="0.62"
                  filter="url(#hubRouteGlow)"
                />
                <polyline
                  data-hub-draw
                  points={nodePoints}
                  stroke="white"
                  strokeOpacity="0.18"
                  strokeWidth="2.5"
                  strokeDasharray="8 12"
                  fill="none"
                />
                <path
                  data-hub-bike-path
                  d={activeCity.route}
                  stroke="transparent"
                  strokeWidth="1"
                />
                <image
                  data-hub-rider
                  href="/quickbite-delivery-bike.svg"
                  width="138"
                  height="82"
                />
              </svg>

              <div className="pointer-events-none absolute inset-0 z-20">
                {activeCity.nodes.map((node) => {
                  const active = selectedNode?.name === node.name;
                  return (
                    <motion.button
                      key={`${activeCity.id}-${node.name}`}
                      data-hub-pin
                      type="button"
                      onClick={() => setSelectedArea(active ? null : node.name)}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 text-left"
                      style={{
                        left: `${(node.x / 920) * 100}%`,
                        top: `${(node.y / 520) * 100}%`,
                      }}
                    >
                      <span
                        className={`flex items-center gap-2 rounded-pill px-3 py-2 text-xs font-black ring-1 backdrop-blur transition ${
                          active
                            ? "bg-[var(--hub-accent)] text-white ring-white/25"
                            : "bg-[#120d0b]/78 text-white/82 ring-white/12 hover:text-white"
                        }`}
                      >
                        <span className="relative grid h-3 w-3 place-items-center">
                          <span className="absolute h-3 w-3 animate-ping rounded-full bg-[var(--hub-accent)] opacity-45" />
                          <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--hub-accent)]" />
                        </span>
                        {node.name}
                        <span className="text-white/48">{node.deliveries}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3 rounded-pill bg-[#2a211d]/34 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/70 ring-1 ring-white/10 backdrop-blur">
                <Signal className="h-4 w-4 text-[var(--hub-accent)]" strokeWidth={2.4} />
                {selectedNode ? `${selectedNode.name} route selected` : "Live delivery routes"}
              </div>
            </div>

            <aside className="relative z-20 border-t border-white/10 p-6 sm:p-8 xl:border-l xl:border-t-0 xl:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--hub-accent)]">
                    Discover
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-black leading-none">
                    {selectedNode ? selectedNode.name : activeCity.name} kitchens
                  </h3>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8 text-[var(--hub-accent)] ring-1 ring-white/10">
                  <UtensilsCrossed className="h-5 w-5" strokeWidth={2.25} />
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCity.id}-${selectedNode?.name ?? "all"}`}
                  initial={{ x: 46, opacity: 0, filter: "blur(10px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ x: -34, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {featuredRestaurants.map((restaurant, index) => (
                    <RestaurantDiscoveryCard
                      key={`${activeCity.id}-${selectedNode?.name ?? "all"}-${restaurant.name}`}
                      restaurant={restaurant}
                      index={index}
                      accent={activeCity.accent}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 rounded-[1.35rem] bg-white/8 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--hub-accent)] text-white">
                    <Zap className="h-5 w-5" strokeWidth={2.35} />
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">
                      Smart routing active
                    </p>
                    <p className="text-xs font-semibold text-white/48">
                      Restaurants update as routes and neighbourhood demand shift.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
