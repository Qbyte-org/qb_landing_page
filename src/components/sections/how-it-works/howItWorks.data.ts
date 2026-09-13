import { heroSlides, steps } from "@/content/site";

const processVisuals = [
  {
    image: heroSlides[0].src,
    imageAlt: heroSlides[0].alt,
    plate: "/quickbite-delivery-bike.svg",
    accent: "/images/food/pinterest/akara-bean-cakes.webp",
    background: "#fff7f0",
  },
  {
    image: heroSlides[1].src,
    imageAlt: heroSlides[1].alt,
    plate: "/quickbite-delivery-bike.svg",
    accent: "/images/food/pinterest/puff-puff.webp",
    background: "#fff2df",
  },
  {
    image: heroSlides[2].src,
    imageAlt: heroSlides[2].alt,
    plate: "/quickbite-delivery-bike.svg",
    accent: "/images/food/pinterest/jollof-takeaway.webp",
    background: "#fff9ed",
  },
];

export const processSlides = steps.map((step, index) => ({
  ...step,
  ...(processVisuals[index] ?? processVisuals[0]),
}));

export type ProcessSlide = (typeof processSlides)[number];

export const totalSteps = processSlides.length;
