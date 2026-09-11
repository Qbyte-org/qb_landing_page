// Central content source for the QuickBite landing page.
// Keeping copy + data here means sections stay presentational and easy to tweak.

import type { LucideIcon } from "lucide-react";
import {
  CookingPot,
  Beef,
  UtensilsCrossed,
  Cookie,
  Soup,
  CreditCard,
  MapPin,
  Navigation,
  ShoppingBasket,
  House,
  Wallet,
  TrendingUp,
  Banknote,
  BadgeCheck,
  LayoutDashboard,
  Smartphone,
  Compass,
} from "lucide-react";

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "For Partners", href: "/partners" },
  { label: "Riders", href: "/riders" },
  { label: "Company", href: "/company" },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "500K+", label: "Orders delivered" },
  { value: "2,000+", label: "Restaurants & vendors" },
  { value: "5,000+", label: "Active riders" },
  { value: "12", label: "Cities and counting" },
];

export type Category = {
  name: string;
  icon: LucideIcon;
  tint: string;
  description: string;
  image: string;
  imageAlt: string;
  meta: string;
  rating: string;
  time: string;
};

export const categories: Category[] = [
  {
    name: "Jollof Rice",
    icon: CookingPot,
    tint: "#fff0e4",
    description: "Smoky party rice, tender chicken, plantain and pepper sauce.",
    image: "/images/food/pinterest/jollof-chicken-plantain.webp",
    imageAlt: "Jollof rice with glazed chicken and fried plantain on a black plate",
    meta: "Most ordered",
    rating: "4.9",
    time: "25 min",
  },
  {
    name: "Grills",
    icon: Beef,
    tint: "#ffe8e0",
    description: "Suya, wings and asun with punchy spice and quick dispatch.",
    image: "/images/food/pinterest/jollof-takeaway.webp",
    imageAlt: "A chicken portion with jollof rice and plantain in a takeaway tray",
    meta: "Fire-grilled",
    rating: "4.8",
    time: "30 min",
  },
  {
    name: "Swallow",
    icon: UtensilsCrossed,
    tint: "#fff3e0",
    description: "Hot amala, eba or pounded yam paired with rich soups.",
    image: "/images/food/pinterest/amala-ewedu-stew.webp",
    imageAlt: "Amala with ewedu, red stew and assorted meat on a white plate",
    meta: "Local classic",
    rating: "4.7",
    time: "28 min",
  },
  {
    name: "Snacks",
    icon: Cookie,
    tint: "#fff7e6",
    description: "Puff-puff and crispy local bites for any hour.",
    image: "/images/food/pinterest/puff-puff.webp",
    imageAlt: "A basket filled with golden puff-puff",
    meta: "Quick bites",
    rating: "4.8",
    time: "20 min",
  },
  {
    name: "Akara",
    icon: Cookie,
    tint: "#e8f5ff",
    description: "Golden bean cakes with crisp edges for breakfast or a quick snack.",
    image: "/images/food/pinterest/akara-bean-cakes.webp",
    imageAlt: "Golden akara bean cakes on a white plate",
    meta: "Freshly fried",
    rating: "4.6",
    time: "15 min",
  },
  {
    name: "Rice bowls",
    icon: CookingPot,
    tint: "#fff0e4",
    description: "Rice, beans and rich stew for a comforting meal any day.",
    image: "/images/food/pinterest/rice-beans-stew.webp",
    imageAlt: "White rice and beans served with red stew",
    meta: "Shareable",
    rating: "4.7",
    time: "35 min",
  },
  {
    name: "Local Soups",
    icon: Soup,
    tint: "#ffeede",
    description: "Egusi, efo riro and pepper soup from trusted kitchens.",
    image: "/images/food/pinterest/egusi-soup.webp",
    imageAlt: "Egusi soup with leafy greens and assorted meat",
    meta: "Soup house",
    rating: "4.9",
    time: "32 min",
  },
  {
    name: "Puff-puff",
    icon: Cookie,
    tint: "#fdeaf3",
    description: "Soft, golden puff-puff fried fresh for a sweet little treat.",
    image: "/images/food/pinterest/puff-puff.webp",
    imageAlt: "A basket filled with golden puff-puff",
    meta: "Sweet bites",
    rating: "4.6",
    time: "18 min",
  },
];

export type Step = { title: string; description: string; icon: LucideIcon };

export const steps: Step[] = [
  {
    title: "Pick your meal",
    description:
      "Browse verified restaurants near you and add dishes from one or many spots to a single cart.",
    icon: UtensilsCrossed,
  },
  {
    title: "Pay with Paystack",
    description:
      "Checkout securely with your card, bank transfer, USSD or QuickBite wallet — in seconds.",
    icon: CreditCard,
  },
  {
    title: "Track to your door",
    description:
      "Follow every order live, from kitchen to your doorstep, with real-time rider updates.",
    icon: MapPin,
  },
];

export type Restaurant = {
  name: string;
  cuisine: string;
  rating: number;
  deliveryFrom: string;
  eta: string;
  image: string;
  imageAlt: string;
};

export const heroSlides = [
  {
    word: "Fresh.",
    src: "/images/food/pinterest/jollof-chicken-plantain.webp",
    alt: "Jollof rice with glazed chicken and fried plantain on a black plate",
  },
  {
    word: "Fast.",
    src: "/images/food/pinterest/meal-prep-packs.webp",
    alt: "Prepared rice, stew and chicken portions in takeaway containers",
  },
  {
    word: "Local.",
    src: "/images/food/pinterest/nigerian-food-spread.webp",
    alt: "A selection of Nigerian rice, stews, soups and vegetables in serving trays",
  },
  {
    word: "Hot.",
    src: "/images/food/pinterest/jollof-takeaway.webp",
    alt: "Jollof rice, a chicken portion and plantain in a takeaway tray",
  },
] as const;

export const heroImage = heroSlides[0];

export const restaurants: Restaurant[] = [
  {
    name: "Mama Put Kitchen",
    cuisine: "Nigerian • Jollof & Grills",
    rating: 4.8,
    deliveryFrom: "₦500",
    eta: "25–35 min",
    image: "/images/food/pinterest/jollof-chicken-plantain.webp",
    imageAlt: "Jollof rice with glazed chicken and fried plantain on a black plate",
  },
  {
    name: "Suya Republic",
    cuisine: "Grills • Suya • Asun",
    rating: 4.7,
    deliveryFrom: "₦600",
    eta: "20–30 min",
    image: "/images/food/pinterest/assorted-meat-stew.webp",
    imageAlt: "Assorted meat and tripe in a rich red stew",
  },
  {
    name: "The Swallow House",
    cuisine: "Local Soups • Swallow",
    rating: 4.9,
    deliveryFrom: "₦450",
    eta: "30–40 min",
    image: "/images/food/pinterest/pounded-yam-greens.webp",
    imageAlt: "Pounded yam with leafy vegetable soup and fish",
  },
  {
    name: "Naija Bites & Snacks",
    cuisine: "Small Chops • Pastries",
    rating: 4.6,
    deliveryFrom: "₦400",
    eta: "15–25 min",
    image: "/images/food/pinterest/puff-puff.webp",
    imageAlt: "A basket filled with golden puff-puff",
  },
  {
    name: "Ife Pizza Co.",
    cuisine: "Pizza • Fast Food",
    rating: 4.5,
    deliveryFrom: "₦700",
    eta: "30–45 min",
    image: "/images/food/pinterest/meal-prep-packs.webp",
    imageAlt: "Prepared rice, stew and chicken portions in takeaway containers",
  },
  {
    name: "Smoothie & Chill",
    cuisine: "Drinks • Smoothies • Juice",
    rating: 4.8,
    deliveryFrom: "₦350",
    eta: "15–20 min",
    image: "/images/food/pinterest/akara-bean-cakes.webp",
    imageAlt: "Golden akara bean cakes on a white plate",
  },
];

export type Feature = { title: string; description: string; icon: LucideIcon };

export const appFeatures: Feature[] = [
  {
    title: "Live order tracking",
    description: "Watch your rider move toward you in real time.",
    icon: Navigation,
  },
  {
    title: "Multi-restaurant cart",
    description: "Order from several spots at once — we split and deliver each.",
    icon: ShoppingBasket,
  },
  {
    title: "Saved addresses",
    description: "Home, hostel, or anywhere — reorder in two taps.",
    icon: House,
  },
  {
    title: "Paystack wallet",
    description: "Top up once and check out faster every time.",
    icon: Wallet,
  },
];

export const partnerPerks: Feature[] = [
  {
    title: "Reach more customers",
    description:
      "Get discovered by hungry customers across Ile-Ife from day one.",
    icon: TrendingUp,
  },
  {
    title: "Fast Paystack payouts",
    description:
      "Settle earnings reliably with scheduled payouts straight to your bank.",
    icon: Banknote,
  },
  {
    title: "Simple KYC onboarding",
    description:
      "Verify with your NIN and BVN and start selling once approved.",
    icon: BadgeCheck,
  },
  {
    title: "A dashboard that works",
    description:
      "Manage your menu, stock and incoming sub-orders from one place.",
    icon: LayoutDashboard,
  },
];

export type RiderTier = {
  name: string;
  tagline: string;
  points: string[];
  icon: LucideIcon;
};

export const riderTiers: RiderTier[] = [
  {
    name: "App Riders",
    tagline: "Own a smartphone? Ride solo.",
    points: [
      "Accept delivery requests directly in the rider app",
      "Update order status from pickup to drop-off",
      "Track your daily and weekly earnings",
    ],
    icon: Smartphone,
  },
  {
    name: "Dispatch Partners",
    tagline: "Run a fleet of non-app riders.",
    points: [
      "Manage riders without smartphones from one web portal",
      "Assign orders and update status on riders' behalf",
      "Coordinate via SMS so every delivery stays on track",
    ],
    icon: Compass,
  },
];

// QuickBite is live in Ile-Ife today, with national expansion next.
export const liveCity = "Ile-Ife";
export const liveCityState = "Osun State";

// Neighbourhoods and landmarks currently served within Ile-Ife.
export const coverageAreas: string[] = [
  "OAU Campus",
  "Lagere",
  "Mayfair",
  "Mokuro",
  "Sabo",
  "Ilare",
  "Modakeke",
  "Damico",
  "Parakin",
  "Iremo",
];

// Cities on the expansion roadmap (shown as "coming soon").
export const expansionCities: string[] = [
  "Ibadan",
  "Lagos",
  "Abuja",
  "Akure",
  "Osogbo",
  "Abeokuta",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "QuickBite is my go-to for lunch on campus. The jollof gets here hot and the tracking is spot on.",
    name: "Chidinma Okeke",
    role: "Customer • Ile-Ife",
    initials: "CO",
    accent: "#ff6b00",
  },
  {
    quote:
      "Since joining as a vendor, my orders have doubled. Payouts hit my account like clockwork.",
    name: "Tunde Bakare",
    role: "Vendor • Ile-Ife",
    initials: "TB",
    accent: "#22c55e",
  },
  {
    quote:
      "I ride full-time on QuickBite around Ife. The app is simple and I always know where my next drop is.",
    name: "Emeka Nwosu",
    role: "Rider • Ile-Ife",
    initials: "EN",
    accent: "#1a1a2e",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How fast is delivery?",
    answer:
      "Most orders arrive in 20–45 minutes depending on the restaurant and your distance. You'll see a live ETA before you pay and can track your rider the whole way.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "We're live across Ile-Ife — including OAU campus, Lagere, Mayfair, Mokuro and surrounding areas — with more Nigerian cities going live soon. Enter your address to see restaurants near you.",
  },
  {
    question: "How do I pay?",
    answer:
      "Pay securely through Paystack with your debit card, bank transfer, USSD (*966#) or your QuickBite wallet balance.",
  },
  {
    question: "Can I order from more than one restaurant at once?",
    answer:
      "Yes. Add items from several restaurants to a single cart — QuickBite automatically splits it into sub-orders and delivers each one.",
  },
  {
    question: "How do I list my restaurant?",
    answer:
      "Sign up as a partner, complete a quick KYC with your NIN and BVN, and once verified you can publish your menu and start receiving orders.",
  },
  {
    question: "How can I become a rider?",
    answer:
      "Whether you have a smartphone or not, you can earn with QuickBite. App riders accept orders directly, while non-app riders are managed by dispatch partners. Apply on the Riders page.",
  },
];
