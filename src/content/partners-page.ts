import { Camera, ChefHat, ClipboardCheck, MapPin, PackageCheck, Store, UtensilsCrossed } from "lucide-react";

export const partnersPageContent = {
  benefits: {
    chapter: "01 / A place for your kitchen",
    title: ["Local kitchens.", "Bigger possibilities."],
    description: "You bring the recipes, the familiar flavours and the care. We are building a simpler way for your food to find the people who will love it.",
    imageCaption: "Good food starts with you.",
    note: { eyebrow: "The local connection", title: ["Made here.", "Loved nearby."], footer: "Kitchens · Neighbours · QuickBite" },
    kitchenTypes: [
      { icon: Store, title: "Neighbourhood restaurants", description: "A new home for your signature dishes." },
      { icon: ChefHat, title: "Independent home kitchens", description: "Small kitchens. A whole lot of flavour." },
    ],
    items: [
      { number: "01", title: "Make room for new regulars.", description: "Give nearby food lovers a new favourite. Your signature plate, daily special and kitchen story are where the connection starts.", detail: "Your food, discovered locally" },
      { number: "02", title: "Keep your flavour. Tell your story.", description: "From a neighbourhood restaurant to a home kitchen with a much-loved recipe, there is a place for your kind of cooking.", detail: "A place for independent kitchens" },
      { number: "03", title: "Bring the food run together.", description: "Our aim is to connect kitchens, customers and delivery riders, making the handoff a natural part of your food business.", detail: "From your counter to their table" },
    ],
  },
  journey: {
    chapter: "02 / How partnership works",
    title: ["Your next chapter,", "one step at a time."],
    description: "Here is what getting started will look like when partner applications open. We will share the details as launch gets closer.",
    status: "Partner applications open with launch",
    steps: [
      { number: "01", icon: Store, title: "Introduce your kitchen", description: "Share your business name, location and the kind of food you make." },
      { number: "02", icon: ClipboardCheck, title: "Complete verification", description: "We will guide you through the business and identity details needed to become a partner." },
      { number: "03", icon: UtensilsCrossed, title: "Make your menu yours", description: "Bring clear photos, descriptions and prices. Build the menu your customers will discover." },
      { number: "04", icon: PackageCheck, title: "Get ready for the food run", description: "Once approved and live, prepare orders for collection and welcome your first QuickBite customers." },
    ],
  },
  readiness: {
    chapter: "03 / A useful head start",
    title: ["A little prep.", "A good beginning."],
    description: "Your next chapter starts with what you already know best: your kitchen and your food. Gather these three essentials at your own pace.",
    listLabel: "Your kitchen starter kit",
    countLabel: "3 simple essentials",
    items: [
      { number: "01", label: "The introduction", icon: MapPin, title: "Tell us about your kitchen.", description: "The name behind the flavour, where you cook and how we can reach you.", detail: "Kitchen name / Location / Contact" },
      { number: "02", label: "The menu", icon: UtensilsCrossed, title: "Bring your favourites.", description: "Start with the dishes you love making, a short description and your current prices.", detail: "Signature dishes / Descriptions / Prices" },
      { number: "03", label: "The first impression", icon: Camera, title: "Let your food do the talking.", description: "A few clear photos of your own dishes help introduce what makes your kitchen special.", detail: "Your dishes / Clear light / Real flavour" },
    ],
    actionTitle: "Ready when you are.",
    action: { label: "Keep me updated", href: "/waitlist" },
    footnote: "Launch updates first. Application details when they are ready.",
  },
} as const;
