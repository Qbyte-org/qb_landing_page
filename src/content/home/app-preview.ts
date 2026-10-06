import { House, MapPin } from "lucide-react";

export const appDemoCopy = {
  preview: "A taste of the app",
  sample: "App preview",
  delivery: "A good meal is on its way.",
  deliveryStatus: "From their kitchen to your corner.",
  kitchen: "Your kitchen",
  doorstep: "Your doorstep",
  cart: "Your favourites, together.",
  cartDetail: "Different kitchens. One happy cart.",
  places: "Your places, remembered.",
  phoneEyebrow: "The QuickBite app",
  phoneTitle: "Good food.\nOne app.",
  phoneDetail: "Choose a meal. Make it yours.",
  phoneSrc: "/images/phone2.png",
  phoneAlt: "QuickBite app on a phone, showing food categories and a previous order",
} as const;

export const demoMeals = [
  { title: "Jollof & chicken", kitchen: "Your go-to kitchen", label: "The main event", image: "/images/food/pinterest/jollof-takeaway.webp", imageAlt: "Jollof rice with chicken and plantain" },
  { title: "A little extra", kitchen: "Another local favourite", label: "Something on the side", image: "/images/food/pinterest/puff-puff.webp", imageAlt: "Golden puff-puff pastries" },
] as const;

export const demoPlaces = [
  { title: "Home", detail: "Your everyday corner", icon: House },
  { title: "Campus", detail: "For the study-day cravings", icon: MapPin },
] as const;

export const appFeatureSummaries = [
  "Follow your rider, from kitchen to doorstep.",
  "Your favourite kitchens, together in one cart.",
  "Keep your favourite delivery spots close.",
  "Top up once. Make your next checkout easier.",
] as const;
