import { Bike, ChefHat, Home, PackageCheck } from "lucide-react";

export const journeyStages = [
  {
    key: "kitchen",
    title: "Kitchen",
    eyebrow: "Order accepted",
    stamp: "Prep cleared",
    time: "03 min",
    description:
      "Partners receive clean incoming orders with customer notes, prep time and payment status already attached.",
    icon: ChefHat,
  },
  {
    key: "packaging",
    title: "Packaging",
    eyebrow: "Packed fresh",
    stamp: "Bag sealed",
    time: "05 min",
    description:
      "Meals are grouped, labelled and checked so riders pick up the right bags without slowing the kitchen down.",
    icon: PackageCheck,
  },
  {
    key: "dispatch",
    title: "Dispatch",
    eyebrow: "Rider assigned",
    stamp: "Route live",
    time: "08 min",
    description:
      "QuickBite routes the nearest rider, updates the customer and keeps every handoff visible.",
    icon: Bike,
  },
  {
    key: "customer",
    title: "Customer",
    eyebrow: "Delivered hot",
    stamp: "Delivered",
    time: "24 min",
    description:
      "Customers track the ride, receive the meal and leave ratings that help your kitchen grow.",
    icon: Home,
  },
] as const;
