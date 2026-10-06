import { steps } from "@/content/site";

const processVisuals = [
  {
    image: "/images/food/pinterest/abacha-african-salad.webp",
    imageAlt: "Abacha African salad with fish, vegetables and garden eggs",
    plate: "/quickbite-delivery-bike.svg",
    accent: "/images/food/pinterest/amala-ewedu-stew.webp",
    companion: "/images/food/pinterest/berry-waffles.webp",
    background: "var(--color-cream)",
  },
  {
    image: "/images/food/pinterest/seafood-okra.webp",
    imageAlt: "Okra soup with fish, seafood and a boiled egg",
    plate: "/quickbite-delivery-bike.svg",
    accent: "/images/food/pinterest/yam-fish-sauce.webp",
    companion: "/images/food/pinterest/glazed-chicken.webp",
    background: "var(--color-cream-200)",
  },
  {
    image: "/images/food/pinterest/meal-prep-packs.webp",
    imageAlt: "Freshly packed Nigerian meals ready for delivery",
    plate: "/quickbite-delivery-bike.svg",
    accent: "/images/food/pinterest/egusi-soup.webp",
    companion: "/images/food/pinterest/nigerian-food-spread.webp",
    background: "var(--color-paper)",
  },
];

export const processSlides = steps.map((step, index) => ({
  ...step,
  ...(processVisuals[index] ?? processVisuals[0]),
}));

export type ProcessSlide = (typeof processSlides)[number];

export const totalSteps = processSlides.length;
