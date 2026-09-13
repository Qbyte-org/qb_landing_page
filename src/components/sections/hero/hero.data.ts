import { heroSlides } from "@/content/site";

export type HeroSlide = (typeof heroSlides)[number];

export const rotatingHeadlines = heroSlides.map((slide) => slide.word);
