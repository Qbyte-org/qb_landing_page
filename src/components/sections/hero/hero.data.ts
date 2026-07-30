import { heroSlides } from "@/content/site";

export type HeroSlide = (typeof heroSlides)[number];

export const rotatingHeadlines = heroSlides.map((slide) => slide.word);

export const floatingFoods = [
  {
    src: "/food/jollof.svg",
    alt: "",
    className:
      "left-[5%] top-[38%] hidden w-14 rotate-[-12deg] opacity-55 sm:block sm:w-20 lg:left-[7%] lg:top-[44%]",
  },
  {
    src: "/food/drinks.svg",
    alt: "",
    className:
      "right-[7%] top-[34%] w-11 rotate-[10deg] opacity-50 sm:w-14 lg:right-[12%]",
  },
  {
    src: "/food/pizza.svg",
    alt: "",
    className:
      "right-[18%] top-[62%] hidden w-16 rotate-[-8deg] opacity-50 md:block xl:w-24",
  },
  {
    src: "/food/pastries.svg",
    alt: "",
    className:
      "left-[24%] top-[68%] hidden w-14 rotate-[12deg] opacity-45 lg:block xl:w-20",
  },
  {
    src: "/food/grills.svg",
    alt: "",
    className:
      "left-[37%] top-[30%] hidden w-12 rotate-[9deg] opacity-30 md:block xl:w-16",
  },
  {
    src: "/food/snacks.svg",
    alt: "",
    className:
      "right-[28%] top-[45%] hidden w-12 rotate-[-14deg] opacity-35 sm:block xl:w-16",
  },
  {
    src: "/food/soup.svg",
    alt: "",
    className: "left-[52%] top-[74%] hidden w-14 rotate-[7deg] opacity-25 xl:block",
  },
] as const;
