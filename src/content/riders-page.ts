import { Bike, MapPin, Navigation, Smartphone, Store, UsersRound } from "lucide-react";
import { riderPathways } from "./brand-pages";

export const ridersPage = {
  paths: {
    tag: "01 / Find your rhythm",
    title: ["Ride your way.", "Move good food."],
    description: "Ride independently or bring your team. Find the route that fits you.",
    selectorLabel: "Choose your rider path",
    boardLabel: "Built around the food run",
    previewLabel: "The experience we're building",
    pathways: riderPathways.map((pathway, index) => ({
      ...pathway,
      label: index === 0 ? "Independent riders" : "Dispatch teams",
      subtitle: index === 0 ? "You, your phone and the road." : "Your riders, moving together.",
      title: index === 0 ? "Your next food run, in view." : "A clear view of your team.",
      description: index === 0
        ? "See the pickup, the destination and delivery updates together in the rider app."
        : "Coordinate food runs from one workspace, including riders without a smartphone.",
      points: index === 0
        ? ["Requests sent to your app", "Pickup-to-doorstep updates"]
        : ["Assign runs across your fleet", "Keep every rider connected"],
      route: index === 0
        ? { title: "A little closer with every turn.", start: "Local kitchen", end: "Their doorstep", caption: "Your app. One clear route." }
        : { title: "Different riders. One direction.", start: "Your workspace", end: "Your delivery team", caption: "Connected from pickup to handoff." },
    })),
    app: {
      label: "App riders",
      title: "Your next food run",
      pickup: "Local kitchen",
      pickupLabel: "Pick up",
      destination: "A nearby food lover",
      destinationLabel: "Drop off",
      detail: "The details, before the journey.",
      caption: "A clear pickup. A clear destination.",
    },
    dispatch: {
      label: "Dispatch partners",
      title: "Bring your riders together",
      source: "Partner workspace",
      assignment: "Coordinate your team",
      riders: ["Rider 01", "Rider 02", "Rider 03"],
      caption: "One connected view of the food run.",
    },
  },
  journey: {
    tag: "02 / The road ahead",
    title: ["A good journey", "starts with hello."],
    description: "We're preparing for launch in Ile-Ife. Here's the route from showing your interest to hearing about the next steps.",
    location: "Starting in Ile-Ife",
    note: "Onboarding details will be shared ahead of launch.",
    steps: [
      { number: "01", icon: Navigation, label: "Your direction", title: "Choose how you ride.", description: "Go with the app rider path, or explore a dispatch partnership for your delivery team." },
      { number: "02", icon: UsersRound, label: "The first connection", title: "Get in touch.", description: "Join the rider waitlist for updates. If you manage a fleet, email us to start a conversation." },
      { number: "03", icon: Bike, label: "What comes next", title: "Get ready together.", description: "We'll share availability, onboarding information and the next steps as launch gets closer." },
    ],
  },
  essentials: {
    tag: "03 / Made for the local food run",
    title: ["Familiar streets.", "New connections."],
    description: "Between a kitchen and someone's next meal, there's a rider who makes the connection. We're building around that everyday journey.",
    location: "Ile-Ife, Nigeria",
    locationCaption: "Our first community",
    items: [
      { icon: Store, title: "Close to the kitchens.", description: "Connect with neighbourhood restaurants, home kitchens and the food that makes this place feel like home." },
      { icon: Smartphone, title: "The essentials in view.", description: "Pickup details, a destination and delivery updates. Our planned rider experience puts the food run at the centre." },
      { icon: MapPin, title: "A place for your experience.", description: "Whether you ride independently or coordinate a team, we'd love to hear how you move around your community." },
    ],
    action: { label: "Join the rider waitlist", href: "/waitlist" },
    secondaryAction: { label: "Let's talk about your fleet", href: "mailto:quickbiteinfo01@gmail.com?subject=QuickBite%20dispatch%20partnership" },
    footnote: "Launch updates first. Rider details when they're ready.",
  },
} as const;
