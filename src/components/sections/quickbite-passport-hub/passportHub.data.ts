import {
  coverageAreas,
  expansionCities,
  liveCity,
  liveCityState,
  restaurants,
  type Restaurant,
} from "@/content/site";
import type {
  PassportMapCity,
  PassportMapNode,
  PassportMapRestaurant,
} from "../PassportLeafletMap";

export type PassportNode = PassportMapNode;

export type PassportRestaurant = Restaurant &
  PassportMapRestaurant & {
    avgOrder: string;
    badge: string;
    description: string;
    hours: string;
    logo: string;
  };

export type PassportCity = PassportMapCity & {
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
  // {
  //   name: "Ibadan",
  //   state: "Oyo State",
  //   center: [7.3775, 3.947] as [number, number],
  //   radius: 5600,
  // },
  // {
  //   name: "Lagos",
  //   state: "Lagos State",
  //   center: [6.5244, 3.3792] as [number, number],
  //   radius: 6200,
  // },
  // {
  //   name: "Abuja",
  //   state: "FCT",
  //   center: [9.0765, 7.3986] as [number, number],
  //   radius: 5800,
  // },
  // {
  //   name: "Akure",
  //   state: "Ondo State",
  //   center: [7.2571, 5.2058] as [number, number],
  //   radius: 4700,
  // },
  // {
  //   name: "Osogbo",
  //   state: "Osun State",
  //   center: [7.7827, 4.5418] as [number, number],
  //   radius: 4300,
  // },
  // {
  //   name: "Abeokuta",
  //   state: "Ogun State",
  //   center: [7.1475, 3.3619] as [number, number],
  //   radius: 4900,
  // },
];

const palettes = [
  { accent: "#ef5f00", paper: "#fff4e7" },
  { accent: "#ef5f00", paper: "#fff6ec" },
  { accent: "#ef5f00", paper: "#fff2e3" },
  { accent: "#ef5f00", paper: "#fff7ef" },
  { accent: "#ef5f00", paper: "#fff5ea" },
  { accent: "#ef5f00", paper: "#fff3e6" },
  { accent: "#ef5f00", paper: "#fff6ed" },
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

const avgOrders = [
  "₦3,200",
  "₦4,100",
  "₦2,750",
  "₦3,850",
  "₦5,200",
  "₦2,950",
];

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
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

function makeNodes(center: [number, number], offset: number): PassportNode[] {
  const names = coverageAreas.slice(0, coordinateOffsets.length);

  return coordinateOffsets.map(([latOffset, lngOffset], index) => ({
    name: names[(index + offset) % names.length],
    deliveries: 12 + (((index + 3) * 9 + offset * 6) % 48),
    coordinates: [
      center[0] + latOffset,
      center[1] + lngOffset,
    ] as [number, number],
  }));
}

const enabledCityMeta = cityMeta.filter(
  (city) => city.name === liveCity || expansionCities.includes(city.name),
);

export const passportCities: PassportCity[] = enabledCityMeta.map(
  (city, index) => {
    const palette = palettes[index % palettes.length];
    const isLiveCity = city.name === liveCity;

    return {
      id: slugify(city.name),
      name: city.name,
      state: isLiveCity ? liveCityState : city.state,
      center: city.center,
      radius: city.radius,
      accent: palette.accent,
      paper: palette.paper,
      avgEta: isLiveCity ? "24m" : `${18 + (((index + 2) * 4) % 17)}m`,
      restaurantCount: isLiveCity ? 48 : 28 + index * 6,
      avgRating: Number((4.6 + (index % 4) * 0.08).toFixed(1)),
      stamp: isLiveCity
        ? "DELIVERED"
        : index % 2 === 0
          ? "ROUTED"
          : "BOARDING",
      nodes: makeNodes(city.center, index),
    };
  },
);

export function getCityRestaurants(
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
    const [latOffset, lngOffset] =
      restaurantOffsets[index % restaurantOffsets.length];

    return {
      ...restaurant,
      coordinates: [
        base[0] + latOffset,
        base[1] + lngOffset,
      ] as [number, number],
      avgOrder: avgOrders[(offset + index) % avgOrders.length],
      badge: restaurantBadges[index % restaurantBadges.length],
      description:
        restaurantDescriptions[(offset + index) % restaurantDescriptions.length],
      hours: index % 2 === 0 ? "10:00 AM – 10:30 PM" : "11:00 AM – 11:00 PM",
      logo: getInitials(restaurant.name),
    };
  });
}
