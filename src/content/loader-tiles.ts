export type TileType =
  | "brand"
  | "food"
  | "app"
  | "restaurant"
  | "rider"
  | "order"
  | "map"
  | "text";

export interface BentoTileData {
  id: string;
  type: TileType;
  priority: number; // For stagger sequencing
  content: {
    imageSrc?: string;
    text?: string;
    subtitle?: string;
  };
  backgroundColor?: string;
  textColor?: string;
}

export const bentoTiles: BentoTileData[] = [
  {
    id: "brand",
    type: "brand",
    priority: 1,
    content: {},
    backgroundColor: "var(--color-brand)", // Brand orange
    textColor: "var(--color-white)",
  },
  {
    id: "food-1",
    type: "food",
    priority: 2,
    content: {
      imageSrc: "/images/food/hero-fresh.webp",
    },
    backgroundColor: "var(--color-paper)",
  },
  {
    id: "restaurant",
    type: "restaurant",
    priority: 3,
    content: {
      imageSrc: "/images/food/hero-local.webp", // Using local food as restaurant proxy if no specific restaurant image exists
    },
    backgroundColor: "var(--color-ink)",
  },
  {
    id: "app",
    type: "app",
    priority: 4,
    content: {
      imageSrc: "/images/phone.png",
    },
    backgroundColor: "var(--color-paper)",
  },
  {
    id: "rider",
    type: "rider",
    priority: 5,
    content: {
      imageSrc: "/images/food/hero-fast.webp", // Using fast food proxy
    },
    backgroundColor: "var(--color-oatmeal)", // Subtle neutral
  },
  {
    id: "order",
    type: "order",
    priority: 6,
    content: {
      text: "ORDER #QB2048",
    },
    backgroundColor: "var(--color-paper)",
    textColor: "var(--color-ink)",
  },
  {
    id: "food-2",
    type: "food",
    priority: 7,
    content: {
      imageSrc: "/images/food/hero-hot.webp",
    },
    backgroundColor: "var(--color-ink)",
  },
  {
    id: "text-1",
    type: "text",
    priority: 8,
    content: {
      text: "ORDER NOW",
    },
    backgroundColor: "var(--color-ink)",
    textColor: "var(--color-white)",
  },
  {
    id: "map",
    type: "map",
    priority: 9,
    content: {},
    backgroundColor: "var(--color-paper)",
  },
];
