"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import MagneticFillButton from "../ui/MagneticFillButton";

export type PassportMapNode = {
  name: string;
  deliveries?: number;
  coordinates?: [number, number];
  mapLabel?: string;
  minZoom?: number;
};

export type PassportMapRestaurant = {
  name: string;
  cuisine: string;
  eta: string;
  coordinates?: [number, number];
};

export type PassportMapCity = {
  name: string;
  center: [number, number];
  accent: string;
  radius: number;
};

const districtColors = [
  "#F15F00",
  "#c86b2b",
  "#8f6a57",
  "#f3a629",
  "#0f7a5a",
  "#b86024",
  "#d9b38c",
];

const orangeMarkerColors = new Set([
  "#f15f00", "#ef5f00", "#ff6b00", "#c86b2b", "#f3a629", "#b86024",
]);

const districtSlots = [
  { x: 10, y: 12 },
  { x: 26, y: 28 },
  { x: 53, y: 18 },
  { x: 82, y: 13 },
  { x: 81, y: 44 },
  { x: 57, y: 76 },
  { x: 23, y: 78 },
  { x: 43, y: 49 },
];

const restaurantSlots = [
  { x: 16, y: 50 },
  { x: 30, y: 84 },
  { x: 48, y: 36 },
  { x: 70, y: 67 },
  { x: 62, y: 86 },
  { x: 87, y: 76 },
];

function getColor(index: number, active: boolean, accent: string) {
  return active ? accent : districtColors[index % districtColors.length];
}

function truncateLabel(label: string) {
  return label.length > 12 ? `${label.slice(0, 11)}…` : label;
}

export default function PassportLeafletMap({
  city,
  neighbourhoods,
  restaurants,
  selectedNode,
  onSelectNode,
  onHoverRestaurant,
}: {
  city: PassportMapCity;
  neighbourhoods: PassportMapNode[];
  restaurants: PassportMapRestaurant[];
  selectedNode?: PassportMapNode | null;
  onSelectNode: (node: PassportMapNode) => void;
  onHoverRestaurant?: (name: string | null) => void;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] border-[0.18rem] border-[#2a211d] bg-[#f7eadb]">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 560"
        preserveAspectRatio="none"
      >
        <rect width="800" height="560" fill="#f7eadb" />
        <path d="M0 0H84L28 78V318L0 354Z" fill="#f0c9a8" />
        <path d="M800 0V70L732 54L678 0Z" fill="#f0c9a8" />
        <path d="M800 560H704L722 458L800 421Z" fill="#f0c9a8" />
        <path
          d="M-30 110H283L368 211L472 185L748 107L835 145"
          fill="none"
          stroke="#f3a629"
          strokeLinecap="round"
          strokeWidth="9"
        />
        <path
          d="M74 -38C112 78 86 171 84 258C82 362 89 432 111 594"
          fill="none"
          stroke="#f3a629"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          d="M274 -42C282 102 248 221 241 326C234 436 246 495 258 600"
          fill="none"
          stroke="#b79c8c"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          d="M507 -45C510 96 548 156 520 271C497 367 472 448 486 611"
          fill="none"
          stroke="#f3a629"
          strokeLinecap="round"
          strokeWidth="9"
        />
        <path
          d="M646 -50C684 110 665 228 720 326C757 391 790 460 845 512"
          fill="none"
          stroke="#f3a629"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <path
          d="M-38 244H258L341 301L621 292L846 220"
          fill="none"
          stroke="#b79c8c"
          strokeLinecap="round"
          strokeWidth="9"
        />
        <path
          d="M-31 497C72 513 138 503 223 454C308 405 370 359 475 354C598 348 679 391 839 319"
          fill="none"
          stroke="#f3a629"
          strokeLinecap="round"
          strokeWidth="9"
        />
        <path
          d="M26 61L92 29L159 57L229 18M29 214L95 176L173 209L231 158M338 40L390 74V157L449 191M333 392L407 360L501 405L591 387M530 95L591 62L650 92L714 67M595 233L657 218L732 261L780 244M204 517L283 487L348 524L432 493M480 258L562 239L625 262"
          fill="none"
          stroke="#fff8ef"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          opacity="0.82"
        />
        <path
          d="M128 0L116 90M388 0L385 112M752 115L698 171M40 399L110 355M636 500L707 463"
          fill="none"
          stroke="#fff8ef"
          strokeLinecap="round"
          strokeWidth="3"
          opacity="0.72"
        />
      </svg>

      <div className="absolute inset-0">
        {neighbourhoods.map((node, index) => {
          const active = selectedNode?.name === node.name;
          const slot = districtSlots[index % districtSlots.length];
          const color = getColor(index, active, city.accent);
          const isOrange = orangeMarkerColors.has(color.toLowerCase());

          return (
            <motion.div
              key={`${city.name}-${node.name}`}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{ scale: active ? 1.08 : 1 }}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center outline-none"
              style={
                {
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  "--marker-color": color,
                } as CSSProperties
              }
            >
              <MagneticFillButton
                ariaLabel={node.name}
                aria-pressed={active}
                onClick={() => onSelectNode(node)}
                variant="light"
                customFillClass="bg-ink"
                customHoverTextColor="#fffaf5"
                contentClassName="flex min-w-0 items-center gap-1.5"
                className={`min-h-11 max-w-[8.8rem] rounded-xl border-2! border-ink bg-[var(--marker-color)]! px-2.5 py-1 text-sm font-bold leading-none sm:text-base ${isOrange ? "text-white!" : "text-[#4f372d]!"}`}
              >
                <span className="h-2 w-2 shrink-0 rounded-full border-2 border-[#2a211d] bg-[#fffaf3]" />
                <span className="truncate">{truncateLabel(node.name)}</span>
              </MagneticFillButton>
              <span aria-hidden="true" className="pointer-events-none relative mt-2 block h-8 w-8 rounded-full border-[0.32rem] border-[var(--marker-color)] bg-[#fffaf3]">
                <span className="absolute left-1/2 top-[1.05rem] h-4 w-4 -translate-x-1/2 rotate-45 rounded-br-[0.32rem] bg-[var(--marker-color)]" />
              </span>
            </motion.div>
          );
        })}

        {restaurants.slice(0, restaurantSlots.length).map((restaurant, index) => {
          const slot = restaurantSlots[index % restaurantSlots.length];

          return (
            <motion.div
              key={`${city.name}-${restaurant.name}`}
              whileHover={{ y: -3, scale: 1.1 }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            >
              <MagneticFillButton
                ariaLabel={`${restaurant.name}, ${restaurant.eta}`}
                onMouseEnter={() => onHoverRestaurant?.(restaurant.name)}
                onMouseLeave={() => onHoverRestaurant?.(null)}
                onFocus={() => onHoverRestaurant?.(restaurant.name)}
                onBlur={() => onHoverRestaurant?.(null)}
                onClick={() => onHoverRestaurant?.(restaurant.name)}
                variant="light"
                customFillClass="bg-brand"
                customHoverTextColor="#ffffff"
                className="size-11 rounded-full border-2! border-ink bg-paper! text-xs font-bold text-brand-dark!"
              >
                QB
              </MagneticFillButton>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
