export const footerCopy = {
  navigationLabel: "Footer navigation",
  legalLabel: "Legal",
  copyright: "© 2026 QuickBite",
  locations: "All locations",
  locationsHref: "/#cities",
  newsletterTitle: "Stay in the loop!",
  newsletterDescription: "Join the waitlist and be among the first to know when QuickBite launches near you.",
  emailHref: "mailto:quickbiteinfo01@gmail.com",
  emailLabel: "Send QuickBite a message",
  emailAction: "Email us",
  socialLabel: "QuickBite social profiles",
  socialLinkLabel: (label: string) => `QuickBite on ${label} (opens in a new tab)`,
  unavailableProfile: (label: string) => `${label} profile unavailable`,
};

export const navigation = [
  {
    title: "Menu",
    links: [
      { label: "Restaurants", href: "/restaurants" },
      { label: "About us", href: "/company" },
      { label: "Get the app", href: "/#app" },
      { label: "How it works", href: "/#how" },
      { label: "Restaurant partners", href: "/partners" },
      { label: "Become a rider", href: "/riders" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Join the waitlist", href: "/waitlist" },
      { label: "FAQs", href: "/#faq" },
      { label: "Contact us", href: "/contact" },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Refunds", href: "/legal/refunds" },
  { label: "Delete account", href: "/delete-account" },
] as const;

export const socialLinks = [
  { label: "X", href: "https://x.com/quickbite01?s=11", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com/quickbite.01?stkn=MWNieGR5c2U4NWdycQ%3D%3D", icon: "instagram" },
] as const;
