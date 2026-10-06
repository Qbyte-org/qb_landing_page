export const brand = {
  name: "QuickBite",
  wordmark: ["Quick", "Bite"],
  homeLabel: "QuickBite home",
  homeHref: "/",
  mark: "/logo-mark.svg",
  lightMark: "/logo-mark-light.svg",
};

export const uiCopy = {
  backToTop: "Back to top",
  closeDialog: "Close dish details",
  scrollProgress: "Page scroll position",
  scrollValue: (percent: number) => `${percent}% through the page`,
};

export const defaultPageAction = {
  title: "Hungry right now?",
  detail: "Free delivery on your first order",
  label: "Order now",
  href: "/restaurants",
};

export const pageActions: Record<string, { title: string; detail: string; label: string; href: string }> = {
  "/restaurants": { title: "Be first at the table", detail: "Get QuickBite launch updates", label: "Join waitlist", href: "/waitlist" },
  "/partners": { title: "Your kitchen. More tables.", detail: "Get partner launch updates", label: "Join waitlist", href: "/waitlist" },
  "/riders": { title: "Your next chapter.", detail: "Get rider launch updates", label: "Join waitlist", href: "/waitlist" },
  "/company": { title: "A little local goodness.", detail: "Meet the kitchens around you", label: "Explore food", href: "/restaurants" },
  "/contact": { title: "Let's talk.", detail: "We're here to help", label: "Email us", href: "mailto:quickbiteinfo01@gmail.com" },
};

export const people: { initials: string; color: string }[] = [
  { initials: "AO", color: "var(--color-brand)" },
  { initials: "CN", color: "var(--color-success)" },
  { initials: "TB", color: "var(--color-navy)" },
  { initials: "FE", color: "var(--color-brand-light)" },
];
