import {
  coverageAreas,
  expansionCities,
  liveCity,
  liveCityState,
  restaurants as baseRestaurants,
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
    center: [7.482824, 4.5604451] as [number, number],
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

// Source IDs, snapshot and the exact map bounds are recorded in /maps/ile-ife-sources.json.
// Only documented landmarks have map anchors. An area name alone is never geocoded by guesswork.
const areaLandmarks: Record<string, Omit<PassportNode, "name">> = {
  "OAU Campus": { coordinates: [7.5273089, 4.5340693], mapLabel: "Obafemi Awolowo University campus" },
  Mokuro: { coordinates: [7.5, 4.6], mapLabel: "Mokuro" },
  Modakeke: { coordinates: [7.472442, 4.53850615], mapLabel: "Modakeke New Town hall" },
  Ilare: { coordinates: [7.48644025, 4.5600277], mapLabel: "Ilare Street", minZoom: 2 },
};

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

const passportOnlyRestaurants: Restaurant[] = [
  {
    name: "Campus Shawarma",
    cuisine: "Shawarma • Wraps • Chicken",
    rating: 4.7,
    deliveryFrom: "₦500",
    eta: "18–28 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
  {
    name: "Burger House",
    cuisine: "Burgers • Fries • Fast Food",
    rating: 4.6,
    deliveryFrom: "₦650",
    eta: "25–35 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
  {
    name: "Noodle House",
    cuisine: "Noodles • Ramen • Stir Fry",
    rating: 4.5,
    deliveryFrom: "₦450",
    eta: "20–30 min",
    image: "/images/food/pinterest/peppered-fish-noodles.webp",
    imageAlt: "Peppered fish fillets over noodles with eggs",
  },
  {
    name: "Coffee Corner",
    cuisine: "Coffee • Cafe • Pastries",
    rating: 4.8,
    deliveryFrom: "₦350",
    eta: "15–25 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
  {
    name: "Sweet Treats",
    cuisine: "Dessert • Ice Cream • Cakes",
    rating: 4.7,
    deliveryFrom: "₦400",
    eta: "18–26 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
  {
    name: "Breakfast Club",
    cuisine: "Breakfast • Pancakes • Tea",
    rating: 4.6,
    deliveryFrom: "₦500",
    eta: "20–30 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
  {
    name: "Bakery Lane",
    cuisine: "Bakery • Croissant • Bread",
    rating: 4.5,
    deliveryFrom: "₦350",
    eta: "15–25 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
  {
    name: "Taco Stop",
    cuisine: "Tacos • Spiced Beef • Salsa",
    rating: 4.6,
    deliveryFrom: "₦600",
    eta: "25–35 min",
    image: "/quickbite-mark.svg",
    imageAlt: "QuickBite",
    imageKind: "brand",
  },
];

const passportRestaurantPool = [...baseRestaurants, ...passportOnlyRestaurants];

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

function makeNodes(): PassportNode[] {
  return coverageAreas.map((name) => ({ name, ...areaLandmarks[name] }));
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
      nodes: makeNodes(),
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

  return Array.from({ length: passportRestaurantPool.length }, (_, index) => {
    const restaurant =
      passportRestaurantPool[(offset + index) % passportRestaurantPool.length];

    return {
      ...restaurant,
      avgOrder: avgOrders[(offset + index) % avgOrders.length],
      badge: restaurantBadges[index % restaurantBadges.length],
      description:
        restaurantDescriptions[(offset + index) % restaurantDescriptions.length],
      hours: index % 2 === 0 ? "10:00 AM – 10:30 PM" : "11:00 AM – 11:00 PM",
      logo: getInitials(restaurant.name),
    };
  });
}
