"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Clock3,
  Compass,
  MapPin,
  Star,
  Store,
  UtensilsCrossed,
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
import type {
  PassportMapCity,
  PassportMapNode,
  PassportMapRestaurant,
} from "./PassportLeafletMap";

const PassportLeafletMap = dynamic(() => import("./PassportLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[18rem] place-items-center rounded-[1.6rem] bg-[#f4e3d0] text-xs font-black uppercase tracking-[0.22em] text-[#8f6a57]">
      Preparing destination map
    </div>
  ),
});

type PassportNode = PassportMapNode;

type PassportRestaurant = Restaurant &
  PassportMapRestaurant & {
    avgOrder: string;
    badge: string;
    description: string;
    hours: string;
    logo: string;
  };

type PassportCity = PassportMapCity & {
  id: string;
  state: string;
  paper: string;
  avgEta: string;
  restaurantCount: number;
  avgRating: number;
  stamp: "DELIVERED" | "BOARDING" | "ROUTED";
  nodes: PassportNode[];
};

const cityMeta = [
  {
    name: liveCity,
    state: liveCityState,
    center: [7.4905, 4.5521] as [number, number],
    radius: 4300,
  },
  {
    name: "Ibadan",
    state: "Oyo State",
    center: [7.3775, 3.947] as [number, number],
    radius: 5600,
  },
  {
    name: "Lagos",
    state: "Lagos State",
    center: [6.5244, 3.3792] as [number, number],
    radius: 6200,
  },
  {
    name: "Abuja",
    state: "FCT",
    center: [9.0765, 7.3986] as [number, number],
    radius: 5800,
  },
  {
    name: "Akure",
    state: "Ondo State",
    center: [7.2571, 5.2058] as [number, number],
    radius: 4700,
  },
  {
    name: "Osogbo",
    state: "Osun State",
    center: [7.7827, 4.5418] as [number, number],
    radius: 4300,
  },
  {
    name: "Abeokuta",
    state: "Ogun State",
    center: [7.1475, 3.3619] as [number, number],
    radius: 4900,
  },
];

const palettes = [
  { accent: "#ef5f00", paper: "#fff4e7" },
  { accent: "#0f7a5a", paper: "#eefbf4" },
  { accent: "#c17817", paper: "#fff6d8" },
  { accent: "#d85a2a", paper: "#fff0e8" },
  { accent: "#5f58c9", paper: "#f1efff" },
  { accent: "#178c83", paper: "#ecfffb" },
  { accent: "#b86024", paper: "#fff0e3" },
];

const coordinateOffsets: [number, number][] = [
  [0.015, -0.017],
  [0.019, 0.011],
  [-0.003, 0.023],
  [-0.02, 0.014],
  [-0.018, -0.016],
  [0.004, -0.028],
  [0.027, -0.004],
];

const restaurantOffsets: [number, number][] = [
  [0.006, 0.006],
  [-0.008, 0.007],
  [0.009, -0.006],
  [-0.007, -0.008],
  [0.014, 0.001],
  [0.001, -0.014],
];

const avgOrders = ["₦3,200", "₦4,100", "₦2,750", "₦3,850", "₦5,200", "₦2,950"];

const restaurantBadges = [
  "Member table",
  "Chef favourite",
  "Stamped pick",
  "Fast seating",
  "Local pass",
  "Route special",
];

const restaurantDescriptions = [
  "A familiar stop for hot plates, dependable portions, and quick rider pickup.",
  "Known for smoky flavours, generous sides, and delivery-friendly packaging.",
  "A comfort-food favourite with steady ratings and warm dinner traffic.",
  "A quick-bite counter built for campus rushes and late afternoon cravings.",
  "A casual kitchen with easy group orders and weekend crowd energy.",
  "Fresh drinks and light meals for soft landings between heavier plates.",
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function KitchenCompassIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9 24.7C13.5 18.7 18.2 21.4 21.4 16.2C23.2 13.3 25.6 10.3 30 8.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.45"
      />
      <path
        d="M23.2 7.6L30.8 6.1L28.2 13.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.45"
      />
      <path
        d="M9.8 13.3H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M11.4 12.9C12.2 9.8 14.9 8.1 17.7 8.9C19.5 9.4 20.9 10.9 21.4 12.9H11.4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.85"
      />
      <circle
        cx="9"
        cy="24.7"
        r="2.55"
        fill="currentColor"
        opacity="0.82"
      />
      <circle
        data-magnetic-accent
        cx="18"
        cy="18"
        r="14.5"
        stroke="currentColor"
        strokeDasharray="1.5 5"
        strokeLinecap="round"
        strokeWidth="1.25"
        opacity="0.38"
      />
    </svg>
  );
}

function makeNodes(center: [number, number], offset: number): PassportNode[] {
  const names = coverageAreas.slice(0, coordinateOffsets.length);

  return coordinateOffsets.map(([latOffset, lngOffset], index) => ({
    name: names[(index + offset) % names.length],
    deliveries: 12 + ((index + 3) * 9 + offset * 6) % 48,
    coordinates: [
      center[0] + latOffset,
      center[1] + lngOffset,
    ] as [number, number],
  }));
}

const passportCities: PassportCity[] = [liveCity, ...expansionCities].map(
  (cityName, index) => {
    const fallback = cityMeta[index] ?? cityMeta[0];
    const city = cityMeta.find((item) => item.name === cityName) ?? fallback;
    const palette = palettes[index % palettes.length];
    const live = cityName === liveCity;

    return {
      id: slugify(city.name),
      name: city.name,
      state: live ? liveCityState : city.state,
      center: city.center,
      radius: city.radius,
      accent: palette.accent,
      paper: palette.paper,
      avgEta: live ? "24m" : `${18 + ((index + 2) * 4) % 17}m`,
      restaurantCount: live ? 48 : 28 + index * 6,
      avgRating: Number((4.6 + (index % 4) * 0.08).toFixed(1)),
      stamp: live ? "DELIVERED" : index % 2 === 0 ? "ROUTED" : "BOARDING",
      nodes: makeNodes(city.center, index),
    };
  },
);

function getCityRestaurants(
  city: PassportCity,
  selectedNode?: PassportNode | null,
): PassportRestaurant[] {
  const cityIndex = passportCities.findIndex((item) => item.id === city.id);
  const nodeIndex = selectedNode
    ? city.nodes.findIndex((node) => node.name === selectedNode.name)
    : 0;
  const offset = Math.max(0, cityIndex + nodeIndex);
  const base = selectedNode?.coordinates ?? city.center;

  return Array.from({ length: restaurants.length }, (_, index) => {
    const restaurant = restaurants[(offset + index) % restaurants.length];
    const [latOffset, lngOffset] = restaurantOffsets[index % restaurantOffsets.length];

    return {
      ...restaurant,
      coordinates: [
        base[0] + latOffset,
        base[1] + lngOffset,
      ] as [number, number],
      avgOrder: avgOrders[(offset + index) % avgOrders.length],
      badge: restaurantBadges[index % restaurantBadges.length],
      description: restaurantDescriptions[(offset + index) % restaurantDescriptions.length],
      hours: index % 2 === 0 ? "10:00 AM – 10:30 PM" : "11:00 AM – 11:00 PM",
      logo: getInitials(restaurant.name),
    };
  });
}

function CityStampSelector({
  cities,
  selectedCity,
  onSelect,
}: {
  cities: PassportCity[];
  selectedCity: PassportCity;
  onSelect: (cityId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex h-12 items-center gap-3 rounded-[1.05rem] bg-[#fffaf3]/86 px-4 text-left text-[#2a211d] ring-1 ring-[#3a2418]/10 backdrop-blur transition-colors hover:bg-white"
      >
        <MapPin className="h-4 w-4 text-[var(--passport-accent)]" strokeWidth={2.35} />
        <span>
          <span className="block text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#9a7a66]">
            Destination
          </span>
          <span className="block text-sm font-black leading-none">
            {selectedCity.name}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-56 overflow-hidden rounded-[1.2rem] bg-[#fffaf3] p-2 text-[#2a211d] ring-1 ring-[#3a2418]/10"
          >
            {cities.map((city) => {
              const active = city.id === selectedCity.id;

              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onSelect(city.id);
                  }}
                  className={`flex w-full items-center justify-between rounded-[0.9rem] px-3 py-2.5 text-sm font-black transition-colors ${active
                      ? "bg-[var(--passport-accent)] text-white"
                      : "text-[#5d4639] hover:bg-[#f5eadc]"
                    }`}
                >
                  {city.name}
                  <span className={active ? "text-white/65" : "text-[#b08f78]"}>
                    {city.state}
                  </span>
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function AnimatedStamp({
  city,
  stampRef,
  inkRef,
}: {
  city: PassportCity;
  stampRef: RefObject<HTMLDivElement | null>;
  inkRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      ref={stampRef}
      whileHover={{ scale: 1.035, rotate: -5 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-max rotate-[-7deg]"
    >
      <div
        ref={inkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-20%] rounded-full bg-[var(--passport-accent)] opacity-0 blur-2xl"
      />
      <div
        className="relative overflow-hidden rounded-[1.05rem] border-[0.18rem] border-dashed border-[var(--passport-accent)] px-5 py-3.5 text-center text-[var(--passport-accent)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(58,36,24,.08) 0 1px, transparent 1.5px), radial-gradient(circle at 78% 42%, rgba(58,36,24,.08) 0 1px, transparent 1.5px)",
          backgroundSize: "12px 12px, 17px 17px",
        }}
      >
        <div className="absolute inset-0 bg-[var(--passport-accent)] opacity-[0.025]" />
        <p className="relative text-[0.7rem] font-black uppercase leading-none tracking-[0.28em]">
          Entry stamp
        </p>
        <p className="relative mt-1 font-serif text-2xl font-black uppercase leading-none tracking-[-0.06em]">
          {city.name}
        </p>
        <p className="relative mt-2 text-xs font-black tracking-[0.3em]">07 / 2026</p>
      </div>
    </motion.div>
  );
}

const qrCells = new Set([
  0, 1, 2, 3, 5, 6, 7, 8, 10, 13, 15, 18, 20, 22, 24, 26, 27, 28, 29, 31,
  33, 35, 36, 38, 41, 42, 44, 46, 48, 49, 51, 53, 55, 57, 59, 60, 62, 64,
  66, 68, 69, 71, 73, 75, 76, 77, 78, 80,
]);

function BurgerLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 230 180"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M27 86C33 35 79 11 132 21C177 29 204 56 209 91"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M33 101H207"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M47 121C66 140 85 101 106 121C126 139 142 103 164 121C181 137 196 116 211 126"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M42 145H206"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="13"
      />
      <path
        d="M65 159C87 173 159 174 187 158"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M88 116L128 145L160 116"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9"
      />
      <circle cx="88" cy="55" r="6" fill="currentColor" />
      <circle cx="126" cy="44" r="6" fill="currentColor" />
      <circle cx="158" cy="66" r="6" fill="currentColor" />
    </svg>
  );
}

function QrCodeMark() {
  return (
    <div className="grid h-[5.75rem] w-[5.75rem] grid-cols-9 gap-[0.15rem] rounded-[0.25rem] bg-[#17100d] p-1.5">
      {Array.from({ length: 81 }).map((_, index) => (
        <span
          key={index}
          className={qrCells.has(index) ? "bg-[#cfa982]" : "bg-[#17100d]"}
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
      className="group relative h-[14.65rem] w-full shrink-0 text-[#17100d] outline-none"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[1.05rem] border border-[#17100d]/16 bg-[#cfa982]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(255,255,255,.18) 0 1px, transparent 1.4px), radial-gradient(circle at 80% 58%, rgba(23,16,13,.11) 0 1px, transparent 1.5px), linear-gradient(105deg, rgba(255,255,255,.18), transparent 42%)",
          backgroundSize: "13px 13px, 17px 17px, 100% 100%",
        }}
      >
        <motion.div
          initial={false}
          animate={
            isOpen
              ? { x: "-38%", opacity: 0 }
              : { x: "0%", opacity: 1 }
          }
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 px-7 py-7 will-change-transform"
        >
          <BurgerLineArt className="absolute -right-12 -top-7 h-[16rem] w-[18rem] text-[#080605]" />
          <div className="relative z-10 flex h-full max-w-[55%] flex-col justify-center">
            <span className="grid h-13 w-13 place-items-center rounded-full bg-[#080605] text-[#f5d4ad]">
              <UtensilsCrossed className="h-6 w-6" strokeWidth={2.35} />
            </span>
            <h3 className="mt-5 line-clamp-2 font-display text-[1.62rem] font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#080605]">
              {restaurant.name}
            </h3>
            <p className="mt-2 line-clamp-1 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#2e211b]">
              {restaurant.cuisine}
            </p>
            <span
              className="mt-4 w-max rounded-full px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.13em] text-white"
              style={{ backgroundColor: accent }}
            >
              {restaurant.badge}
            </span>
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
          className="absolute inset-0 px-6 py-5 will-change-transform"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div className="grid h-full grid-cols-[1fr_auto] gap-5">
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-display text-[1.75rem] font-black leading-[0.92] tracking-[-0.07em] text-[#080605]">
                {restaurant.name}
              </h3>
              <div className="mt-4 grid gap-2 text-[0.75rem] font-black text-[#221713]">
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#080605]" strokeWidth={2.3} />
                  {restaurant.eta} delivery window
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-[#080605] text-[#080605]" strokeWidth={2.3} />
                  {restaurant.rating} rated kitchen
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#080605]" strokeWidth={2.3} />
                  {restaurant.deliveryFrom} delivery fee
                </span>
              </div>
            </div>
            <QrCodeMark />
          </div>

          <div className="absolute inset-x-6 bottom-[3.15rem] h-px bg-[#17100d]/28" />
          <div className="absolute inset-x-6 bottom-4 flex items-center justify-between gap-3">
            <p className="line-clamp-1 text-[0.68rem] font-black text-[#080605]">
              Visit QuickBite: {restaurant.avgOrder} avg order
            </p>
            <Link
              href="/restaurants"
              onClick={(event) => event.stopPropagation()}
              className="rounded-full bg-[#080605] px-4 py-2 text-[0.66rem] font-black uppercase tracking-[0.08em] text-[#f5d4ad] transition-colors hover:bg-[var(--passport-accent)] hover:text-white"
            >
              View
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function QuickBitePassportHub() {
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
    if (nextCityId === selectedCityId || isAnimatingRef.current) return;

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
    const leftCurl = spread.querySelector("[data-page-curl-left]");
    const rightCurl = spread.querySelector("[data-page-curl-right]");
    const thickness = spread.querySelector("[data-page-thickness]");
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
      .to(
        [leftCurl, rightCurl],
        {
          autoAlpha: 1,
          scale: 1.22,
          rotate: (index) => (index === 0 ? -10 : 8),
          duration: 0.5,
        },
        0.08,
      )
      .to(thickness, { autoAlpha: 1, scaleX: 1.8, duration: 0.52 }, 0.12)
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
      const curls = spread.querySelectorAll("[data-page-curl-left],[data-page-curl-right]");
      const thickness = spread.querySelector("[data-page-thickness]");
      const underlay = spread.querySelector("[data-page-underlay]");
      const postcards = spread.querySelectorAll("[data-passport-postcard]");

      gsap.set([leftPage, rightPage], {
        transformPerspective: 1300,
        transformStyle: "preserve-3d",
      });
      gsap.set(curls, { autoAlpha: 0 });
      gsap.set(thickness, { autoAlpha: 0, scaleX: 0.75 });
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

  return (
    <section
      id="restaurants"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#2a211d] py-12 text-[#fffaf3] sm:py-18 lg:py-20"
      style={
        {
          "--passport-accent": activeCity.accent,
          "--passport-paper": activeCity.paper,
        } as CSSProperties
      }
    >
      <span id="cities" className="absolute top-0" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[var(--passport-accent)]/16 blur-3xl"
      />
      <Image
        src="/food/jollof.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute right-[8%] top-14 hidden w-28 rotate-12 opacity-[0.07] lg:block"
      />
      <Image
        src="/food/drinks.svg"
        alt=""
        width={130}
        height={130}
        className="pointer-events-none absolute bottom-12 left-[7%] hidden w-24 -rotate-12 opacity-[0.07] lg:block"
      />

      <Container className="relative z-10">
        <div
          data-section-motion-header
          className="mb-9 mt-32 grid gap-7 lg:grid-cols-[minmax(0,0.98fr)_minmax(22rem,0.62fr)] lg:items-end"
        >
          <div className="max-w-3xl">
            <h2 className="font-display text-[2.85rem] font-black leading-[0.9] tracking-[-0.07em] sm:text-[4rem]">
              Travel Nigeria
              <span className="block">through food.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-relaxed text-[#fffaf3]/68 sm:text-[1.05rem]">
              Every destination unlocks local kitchens, hidden favourites and
              neighbourhood discoveries. Choose where today&apos;s food journey
              begins.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#fffaf3]/8 p-3 ring-1 ring-[#fffaf3]/10 backdrop-blur-sm">
            <p className="mb-3 px-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#fffaf3]/55">
              Open your digital food passport
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CityStampSelector
                cities={passportCities}
                selectedCity={selectedCity}
                onSelect={handleCityChange}
              />
              <MagneticFillButton
                href="/restaurants"
                ariaLabel="Explore kitchens"
                variant="brand"
                customFillClass="bg-[#fffaf3]"
                customHoverTextColor="#2a211d"
                className="h-12 rounded-[1.05rem] bg-[var(--passport-accent)] px-5 text-sm font-black text-white"
              >
                <KitchenCompassIcon className="h-5 w-5" />
                Explore -&gt;
              </MagneticFillButton>
            </div>
          </div>
        </div>

        <div
          ref={spreadRef}
          className="relative rounded-[2.35rem] bg-[#3a2418] p-1.5 [perspective:1400px]"
        >
          <div className="absolute inset-x-8 -bottom-5 h-14 rounded-[100%] bg-[#3a2418]/22 blur-2xl" />
          <div
            aria-hidden="true"
            className="absolute -left-2 bottom-8 top-8 hidden w-5 rounded-l-[1.6rem] bg-[linear-gradient(90deg,#fffaf3,#ead0b7_58%,#c39b7a)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 bottom-8 top-8 hidden w-5 rounded-r-[1.6rem] bg-[linear-gradient(90deg,#c39b7a,#ead0b7_42%,#fffaf3)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-12 -top-2 hidden h-5 rounded-t-[2rem] bg-[repeating-linear-gradient(90deg,#fffaf3_0_1.7rem,#ead0b7_1.7rem_1.82rem)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-12 -bottom-2 hidden h-5 rounded-b-[2rem] bg-[repeating-linear-gradient(90deg,#ead0b7_0_0.12rem,#fffaf3_0.12rem_1.8rem)] lg:block"
          />
          <div
            data-page-underlay
            aria-hidden="true"
            className="absolute inset-3 rounded-[2rem] bg-[#2a211d]"
          />
          <div className="relative grid overflow-hidden rounded-[2rem] bg-[#f8efe3] lg:h-[39rem] lg:grid-cols-2">
            <div
              data-passport-spine
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 top-0 z-30 hidden w-10 -translate-x-1/2 origin-center rounded-full bg-[linear-gradient(90deg,transparent,rgba(58,36,24,.18),rgba(255,255,255,.28),rgba(58,36,24,.12),transparent)] lg:block"
            />
            <div
              data-page-thickness
              aria-hidden="true"
              className="absolute bottom-6 left-1/2 top-6 z-20 hidden w-2 -translate-x-1/2 rounded-full bg-[#c7a98e]/80 lg:block"
            />

            <div
              ref={leftPageRef}
              className="group relative overflow-hidden bg-[var(--passport-paper)] p-5 sm:p-7 lg:h-[39rem] lg:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(#3a2418_0.7px,transparent_0.7px)] [background-size:17px_17px]"
              />
              <div
                data-page-curl-left
                aria-hidden="true"
                className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-[linear-gradient(135deg,rgba(255,255,255,.88),rgba(231,204,180,.58),rgba(58,36,24,.04))] opacity-0"
              />
              <div className="relative z-10 flex h-full min-h-0 flex-col">
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <h3 className="font-serif text-[3.2rem] font-black leading-[0.82] tracking-[-0.09em] text-[#2a211d] sm:text-[4.25rem]">
                    {activeCity.name}
                  </h3>

                  <AnimatedStamp city={activeCity} stampRef={stampRef} inkRef={inkRef} />
                </div>

                <div className="mt-5 min-h-[23rem] flex-1 overflow-hidden rounded-[1.55rem] bg-[#f4e3d0] ring-1 ring-[#3a2418]/10">
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

                  <div className="pointer-events-none absolute inset-x-4 z-30 flex justify-center">
                    <div className="flex max-w-[92%] items-center gap-2 rounded-pill bg-[#fffaf3]/94 px-4 py-2 text-[0.72rem] font-bold text-[#2a211d] ring-1 ring-[#2a211d]/12 backdrop-blur">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--passport-accent)] text-white">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                          <path
                            d="M12 21S5.8 15.9 5.8 10.6A6.2 6.2 0 0 1 12 4.4a6.2 6.2 0 0 1 6.2 6.2C18.2 15.9 12 21 12 21Z"
                            fill="currentColor"
                          />
                          <circle cx="12" cy="10.6" r="2.1" fill="#fffaf3" />
                        </svg>
                      </span>
                      Click a live food stop to filter nearby kitchens
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={rightPageRef}
              className="group relative overflow-hidden bg-[#fffaf3] p-5 sm:p-7 lg:flex lg:h-[39rem] lg:flex-col lg:p-8"
            >
              <div
                data-page-curl-right
                aria-hidden="true"
                className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(239,224,207,.72),rgba(58,36,24,.04))] opacity-0"
              />
              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div className="relative overflow-hidden rounded-[1.55rem] bg-[#2a211d] p-4 text-white sm:p-5">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--passport-accent)]/18"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-4 top-4 h-20 w-20 rounded-full border border-dashed border-white/12"
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--passport-accent)]">
                        Stamped discoveries
                      </p>
                      <h3 className="mt-2 max-w-[22rem] font-display text-[2rem] font-black leading-[0.9] tracking-[-0.065em] text-[#fffaf3] sm:text-[2.55rem]">
                        {activeCity.name} food postcards
                      </h3>
                    </div>

                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-[1rem] bg-[#fffaf3] text-[#2a211d]">
                      <Compass className="h-6 w-6 text-[var(--passport-accent)]" strokeWidth={2.25} />
                    </span>
                  </div>

                  <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-pill bg-[#fffaf3]/10 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#fffaf3]/78">
                      {selectedNode?.name ?? "All food routes"}
                    </span>
                    <span className="rounded-pill bg-[var(--passport-accent)] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white">
                      Live kitchens
                    </span>
                  </div>

                  <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">
                    <span className="rounded-[1rem] bg-[#fffaf3] p-3 text-[#2a211d]">
                      <Clock3 className="h-4 w-4 text-[var(--passport-accent)]" strokeWidth={2.35} />
                      <span className="mt-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#8f6a57]">
                        ETA
                      </span>
                      <strong className="block text-lg leading-none">{activeCity.avgEta}</strong>
                    </span>
                    <span className="rounded-[1rem] bg-[#fffaf3] p-3 text-[#2a211d]">
                      <Store className="h-4 w-4 text-[var(--passport-accent)]" strokeWidth={2.35} />
                      <span className="mt-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#8f6a57]">
                        Spots
                      </span>
                      <strong className="block text-lg leading-none">{activeCity.restaurantCount}</strong>
                    </span>
                    <span className="rounded-[1rem] bg-[#fffaf3] p-3 text-[#2a211d]">
                      <Star className="h-4 w-4 fill-[var(--passport-accent)] text-[var(--passport-accent)]" strokeWidth={2.35} />
                      <span className="mt-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#8f6a57]">
                        Rating
                      </span>
                      <strong className="block text-lg leading-none">{activeCity.avgRating}</strong>
                    </span>
                  </div>
                </div>

                <div className="passport-card-scroll mt-5 min-h-0 flex-1 space-y-4 overflow-y-auto pb-2 pr-3">
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

        <p className="mx-auto mt-5 max-w-xl text-center text-xs font-semibold leading-relaxed text-[#f5eadc]/68">
          Select a destination, pan the map, then tap a neighbourhood marker to
          filter the restaurant membership cards.
        </p>
      </Container>
    </section>
  );
}
