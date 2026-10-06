import { Bike, ChefHat, ClipboardList, MapPin, PackageCheck, Route, Smartphone, Store, UsersRound } from "lucide-react";

export const partnerBenefits = [
  {
    eyebrow: "Your menu, discovered",
    title: "Make room for new regulars.",
    description:
      "Give nearby food lovers a new favourite. From a signature plate to the daily special, your menu is where the connection starts.",
    image: {
      src: "/images/food/pinterest/jollof-chicken-plantain.webp",
      alt: "Jollof rice with glazed chicken and fried plantain",
    },
  },
  {
    eyebrow: "Small kitchens welcome",
    title: "Big flavour. Your own kitchen.",
    description:
      "A neighbourhood restaurant or a home kitchen with a much-loved recipe: there is a place for both in the QuickBite community.",
    image: {
      src: "/images/food/pinterest/akara-bean-cakes.webp",
      alt: "Freshly fried golden akara bean cakes",
    },
  },
  {
    eyebrow: "Made for the food run",
    title: "From your counter to their table.",
    description:
      "Our aim is to bring kitchens, customers and delivery riders together, making the handoff a natural part of your food business.",
    image: {
      src: "/images/food/pinterest/jollof-takeaway.webp",
      alt: "A takeaway serving of jollof rice ready for a food run",
    },
  },
];

export const partnerOnboardingSteps = [
  {
    title: "Tell us about your kitchen",
    description:
      "When applications open, share your business name, location and the kind of food you make.",
    icon: Store,
  },
  {
    title: "Complete verification",
    description:
      "We will guide you through the business and identity details needed to become a partner.",
    icon: ClipboardList,
  },
  {
    title: "Build your menu",
    description:
      "Bring your dishes to life with clear photos, descriptions and prices. Set the menu your customers will discover.",
    icon: ChefHat,
  },
  {
    title: "Get ready for your first order",
    description:
      "Once approved and live, prepare orders for collection and help us turn a first taste into a new favourite.",
    icon: PackageCheck,
  },
];

export const kitchenStories = [
  { title: "Neighbourhood kitchens", category: "Your signature plate", description: "Give nearby food lovers a new favourite.", image: "/images/food/pinterest/jollof-chicken-plantain.webp", alt: "A signature plate of jollof rice, chicken and plantain" },
  { title: "Independent home cooks", category: "Big flavour. Your kitchen.", description: "Make your much-loved recipe part of the story.", image: "/images/food/pinterest/akara-bean-cakes.webp", alt: "Fresh golden akara made in a local kitchen" },
  { title: "Ready for the food run", category: "From counter to table", description: "Bring kitchens, customers and riders together.", image: "/images/food/pinterest/jollof-takeaway.webp", alt: "A takeaway serving of jollof rice ready for collection" },
];

export const riderPathways = [
  {
    eyebrow: "For independent riders",
    title: "You, your phone. Your next delivery.",
    description:
      "The app rider path is for riders who want to receive delivery requests and manage their own food runs through the QuickBite rider app.",
    icon: Smartphone,
    number: "01",
    points: [
      "Accept delivery requests directly",
      "Follow pickup and drop-off details",
      "Keep delivery updates in one place",
    ],
    action: "Join the rider waitlist",
    href: "/waitlist",
  },
  {
    eyebrow: "For dispatch partners",
    title: "Your riders. One connected team.",
    description:
      "Bring your delivery team to the table. The dispatch partner path is designed for coordinating a fleet, including riders who do not use a smartphone.",
    icon: UsersRound,
    number: "02",
    points: [
      "Assign requests across your riders",
      "Coordinate pickups from a partner workspace",
      "Stay on top of your team's deliveries",
    ],
    action: "Talk about your fleet",
    href: "mailto:quickbiteinfo01@gmail.com?subject=QuickBite%20dispatch%20partnership",
  },
];

export const riderSteps = [
  {
    title: "Choose your path",
    description:
      "Ride independently with the app, or bring a delivery team as a dispatch partner.",
  },
  {
    title: "Let us know you're interested",
    description:
      "Join the waitlist for launch updates. If you manage a fleet, email us to start a conversation.",
  },
  {
    title: "Get ready for launch",
    description:
      "We'll share rider onboarding details and next steps as QuickBite gets ready to launch in Ile-Ife.",
  },
];

export const riderBenefits = [
  {
    icon: MapPin,
    title: "Keep it local.",
    description:
      "Be part of the connection between familiar kitchens, campus cravings and people around town.",
  },
  {
    icon: Route,
    title: "A clearer food run.",
    description:
      "Our rider experience is built around the essentials: the pickup, the destination and delivery updates.",
  },
  {
    icon: UsersRound,
    title: "Room for your team.",
    description:
      "Independent riders and dispatch teams each have a place in the QuickBite delivery community.",
  },
];

export const riderPaths = [
  {
    label: "Independent riders",
    short: "Ride your way.",
    description: "Your phone, your next pickup, your local food run. Join the QuickBite rider community.",
    icon: Smartphone,
    action: "Join the rider waitlist",
    href: "/waitlist",
  },
  {
    label: "Dispatch teams",
    short: "Bring your team.",
    description: "Connect your delivery team with local kitchens. Let's talk about your dispatch partnership.",
    icon: UsersRound,
    action: "Talk about your fleet",
    href: "mailto:quickbiteinfo01@gmail.com?subject=QuickBite%20dispatch%20partnership",
  },
];

export const partnerContent = {
  hero: {
    eyebrow: "For restaurants & home kitchens",
    title: ["You bring", "the ", "flavour.", "Let's grow."],
    description: "You put care into every plate. Bring your kitchen to a community built around good food, close to home.",
    action: { label: "Join the partner waitlist", href: "/waitlist" },
    secondaryAction: { label: "How partnership works", href: "#partner-process" },
    craftTitle: ["Your kitchen. Your craft.", "Our next great food story."],
    craftCaption: "Made for local flavour",
    storiesLabel: "Explore partner kitchen stories",
    previousLabel: "Previous kitchen story",
    nextLabel: "Next kitchen story",
    locationNote: "Starting locally. Growing together.",
    launchNote: "Partner applications open with launch.",
  },
  benefits: {
    tag: "A place for your kitchen",
    title: ["Good food deserves", "a bigger table."],
    subtitle: "Keep doing what you do best. We are building a simpler way for your food to find the people who will love it.",
  },
  process: {
    tag: "The next chapter",
    title: ["Your kitchen.", "Four steps closer."],
    subtitle: "Here is what getting started will look like when partner applications open. Join the waitlist and we will keep you in the loop.",
    action: { label: "Keep me updated", href: "/waitlist" },
    preparationNote: "A useful head start: your kitchen details, a current menu and a few clear photos of your dishes.",
  },
  cta: {
    heading: "Grow with us.",
    supportingCopy: "Let’s make your next chapter a delicious one.",
    actionLabel: "Join the partner waitlist",
    actionHref: "/waitlist",
  },
} as const;

export const riderContent = {
  hero: {
    title: ["Good food.", "Great ", "journeys."],
    locationIntro: "First stop:",
    location: "Ile-Ife, Nigeria.",
    launchNote: "Preparing for launch.",
    image: { src: "/images/riders/quickbite-delivery-scooter-wordmark.webp", alt: "White delivery scooter facing right, with the orange QuickBite mark and dark and orange wordmark printed directly on its delivery box" },
    chapterLabel: "Your next chapter",
    pathsTitle: "Two ways to move with us",
    pathsLabel: "Choose your rider path",
    explore: { label: "Explore the rider experience", href: "#rider-paths" },
  },
  paths: {
    tag: "Find your path",
    title: ["Two ways to", "move with us."],
    subtitle: "One rider or a whole team. Choose the way of working that fits you.",
  },
  process: {
    tag: "Getting started",
    title: ["Your next chapter", "starts here."],
    subtitle: "We're building the rider community ahead of launch. Here's how to get involved.",
  },
  benefits: { tag: "More than a delivery", title: "Bring it all together." },
  cta: {
    heading: "Your next food run.",
    supportingCopy: "Be part of the journey. Get rider launch updates.",
    actionLabel: "Join the rider waitlist",
    actionHref: "/waitlist",
  },
} as const;

export const contactContent = {
  email: "quickbiteinfo01@gmail.com",
  hero: {
    location: "Starting in Ile-Ife, Nigeria",
    title: ["Contact us.", "Pull up a chair."],
    description: "Questions, ideas or a little hello. There is always room for a conversation at the QuickBite table.",
    emailLabel: "Write to us",
    mapSource: "/maps/ile-ife-osm.svg",
    mapAttribution: { prefix: "Map data ©", label: "OpenStreetMap contributors", href: "https://www.openstreetmap.org/copyright", suffix: ". Ile-Ife city map." },
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/quickbite.01?stkn=MWNieGR5c2U4NWdycQ%3D%3D", ariaLabel: "QuickBite on Instagram (opens in a new tab)" },
    { label: "Follow on X", href: "https://x.com/quickbite01?s=11", ariaLabel: "QuickBite on X (opens in a new tab)" },
  ],
  connectionsLabel: "Connect with QuickBite",
  connections: [
    { icon: Store, title: "A kitchen with something good?", text: "Find out how to bring your food to the QuickBite table.", href: "/partners", action: "Explore partnerships" },
    { icon: Bike, title: "Ready for your next ride?", text: "Discover what we are building for future delivery riders.", href: "/riders", action: "Meet the rider community" },
  ],
  cta: {
    heading: "Stay in the loop",
    supportingCopy: "Good things are on the menu. Hear it first.",
    actionLabel: "Join the waitlist",
    actionHref: "/waitlist",
  },
  form: {
    eyebrow: "A note to the team",
    title: ["Let's start", "a conversation."],
    fields: {
      name: { label: "Your name", placeholder: "Full name" },
      email: { label: "Email address", placeholder: "you@example.com" },
      topic: { label: "What's on your mind?", options: ["Hello QuickBite", "Restaurant partnership", "Joining as a rider", "Waitlist question", "Feedback and ideas"] },
      phone: { label: "Phone", optional: "(optional)", placeholder: "Your phone number" },
      message: { label: "Your message", placeholder: "Tell us a little about it…" },
    },
    emailBodyLabels: { name: "From", email: "Email", phone: "Phone" },
    emailNote: "Opens your email app. Review your message and send it from there.",
    submitLabel: "Prepare email",
    draftReady: "Your draft is ready. If your email app did not open,",
    reopenLabel: "open it again",
    emailAlternative: "or email",
  },
} as const;
