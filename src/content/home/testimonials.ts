import { Bike, Store, UtensilsCrossed } from "lucide-react";
import { testimonials } from "@/content/site";

export const extraTestimonials = [
  {
    quote:
      "Ordering from two restaurants at once used to be stressful. QuickBite makes it feel normal.",
    name: "Aisha Lawal",
    role: "Customer • OAU Campus",
    initials: "AL",
    accent: "var(--color-peach)",
  },
  {
    quote:
      "The rider handoff is clearer now. We know when to pack, who is coming, and when the order leaves.",
    name: "Bola Adeyemi",
    role: "Kitchen Lead • Mayfair",
    initials: "BA",
    accent: "var(--color-brand)",
  },
  {
    quote:
      "The best part is the consistency. I can plan my routes, deliver faster and see my earnings clearly.",
    name: "David Ojo",
    role: "Dispatch Rider • Lagere",
    initials: "DO",
    accent: "var(--color-ink)",
  },
  {
    quote:
      "My hostel address is saved, my usual order is two taps away, and the rider updates make late-night food less stressful.",
    name: "Mariam Yusuf",
    role: "Customer • Moremi Hall",
    initials: "MY",
    accent: "var(--color-linen)",
  },
  {
    quote:
      "QuickBite brings us new customers without making our counter chaotic. The order notes are simple and useful.",
    name: "Kunle Ajayi",
    role: "Restaurant Owner • Sabo",
    initials: "KA",
    accent: "var(--color-success)",
  },
  {
    quote:
      "I can see the pickup point, customer location and payout clearly. It helps me plan routes without guessing.",
    name: "Grace Effiong",
    role: "Rider • Mayfair",
    initials: "GE",
    accent: "var(--color-brand)",
  },
];

export const testimonialCards = [...testimonials, ...extraTestimonials];

export type TestimonialSource = (typeof testimonialCards)[number];

export type StoryCard = {
  kind: "image" | "quote" | "illustration";
  testimonial: TestimonialSource;
  label: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  mediaClassName?: string;
};

export const storyCards: StoryCard[] = [
  {
    kind: "image",
    testimonial: testimonialCards[0],
    label: "Campus favourites",
    title: "A little comfort between lectures.",
    image: "/images/food/pinterest/jollof-chicken-plantain.webp",
    imageAlt: "Jollof rice with glazed chicken and fried plantain",
    mediaClassName: "min-h-[16rem] sm:min-h-[18rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[1],
    label: "From the kitchen",
  },
  {
    kind: "illustration",
    testimonial: testimonialCards[2],
    label: "Life on the road",
    title: "Around Ife, one delivery at a time.",
    image: "/quickbite-delivery-bike.svg",
    imageAlt: "Illustration of a QuickBite delivery bike",
    mediaClassName: "min-h-[14.5rem] sm:min-h-[17rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[3],
    label: "More to the table",
  },
  {
    kind: "image",
    testimonial: testimonialCards[4],
    label: "Behind the counter",
    title: "Good food starts with teamwork.",
    image: "/images/food/pinterest/meal-prep-packs.webp",
    imageAlt: "Prepared portions of rice, chicken and stew in takeaway containers",
    mediaClassName: "min-h-[18rem] sm:min-h-[22rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[5],
    label: "The daily route",
  },
  {
    kind: "image",
    testimonial: testimonialCards[6],
    label: "The usual, please",
    title: "For the cravings that feel like home.",
    image: "/images/food/pinterest/nigerian-food-spread.webp",
    imageAlt: "Serving trays of Nigerian rice dishes, stew and soup",
    mediaClassName: "min-h-[13rem] sm:min-h-[15rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[7],
    label: "Local kitchen, big heart",
  },
  {
    kind: "illustration",
    testimonial: testimonialCards[8],
    label: "Across the neighbourhood",
    title: "Every good meal has a last mile.",
    image: "/quickbite-delivery-bike.svg",
    imageAlt: "Illustration of a QuickBite delivery bike",
    mediaClassName: "min-h-[15rem] sm:min-h-[18.5rem]",
  },
];

export const communityDetails = [
  { title: "Food lovers", detail: "A seat at the table.", icon: UtensilsCrossed },
  { title: "Local kitchens", detail: "The heart of every meal.", icon: Store },
  { title: "Delivery riders", detail: "Bringing it all together.", icon: Bike },
] as const;
