// Central content source for the QuickBite landing page.
// Keeping copy + data here means sections stay presentational and easy to tweak.

import type { LucideIcon } from "lucide-react";
import {
  CookingPot,
  Beef,
  UtensilsCrossed,
  Cookie,
  CupSoda,
  Pizza,
  Soup,
  Croissant,
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

export type Category = { name: string; icon: LucideIcon; tint: string };

export const categories: Category[] = [
  { name: "Jollof Rice", icon: CookingPot, tint: "#fff0e4" },
  { name: "Grills", icon: Beef, tint: "#ffe8e0" },
  { name: "Swallow", icon: UtensilsCrossed, tint: "#fff3e0" },
  { name: "Snacks", icon: Cookie, tint: "#fff7e6" },
  { name: "Drinks", icon: CupSoda, tint: "#e8f5ff" },
  { name: "Pizza", icon: Pizza, tint: "#fff0e4" },
  { name: "Local Soups", icon: Soup, tint: "#ffeede" },
  { name: "Pastries", icon: Croissant, tint: "#fdeaf3" },
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
};

// Unsplash images — hostname allow-listed in next.config.ts.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=75`;

export const restaurants: Restaurant[] = [
  {
    name: "Mama Put Kitchen",
    cuisine: "Nigerian • Jollof & Grills",
    rating: 4.8,
    deliveryFrom: "₦500",
    eta: "25–35 min",
    image: img("photo-1604908176997-125f25cc6f3d"),
  },
  {
    name: "Suya Republic",
    cuisine: "Grills • Suya • Asun",
    rating: 4.7,
    deliveryFrom: "₦600",
    eta: "20–30 min",
    image: img("photo-1529193591184-b1d58069ecdd"),
  },
  {
    name: "The Swallow House",
    cuisine: "Local Soups • Swallow",
    rating: 4.9,
    deliveryFrom: "₦450",
    eta: "30–40 min",
    image: img("photo-1567620905732-2d1ec7ab7445"),
  },
  {
    name: "Naija Bites & Snacks",
    cuisine: "Small Chops • Pastries",
    rating: 4.6,
    deliveryFrom: "₦400",
    eta: "15–25 min",
    image: img("photo-1601050690597-df0568f70950"),
  },
  {
    name: "Ife Pizza Co.",
    cuisine: "Pizza • Fast Food",
    rating: 4.5,
    deliveryFrom: "₦700",
    eta: "30–45 min",
    image: img("photo-1513104890138-7c749659a591"),
  },
  {
    name: "Smoothie & Chill",
    cuisine: "Drinks • Smoothies • Juice",
    rating: 4.8,
    deliveryFrom: "₦350",
    eta: "15–20 min",
    image: img("photo-1505252585461-04db1eb84625"),
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
