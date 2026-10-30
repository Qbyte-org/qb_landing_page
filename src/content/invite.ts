/** Copy for the /invite page, which referral links from the app point to. */
export const inviteCopy = {
  homeHref: "/",
  homeLabel: "Home",
  location: "Ile-Ife, Osun State",
  invited: {
    greeting: "You're invited",
    heading: "A friend wants you on QuickBite.",
    codeLabel: "Your invite code",
    instruction: "Enter this code when you sign up on QuickBite. You both earn points on your first delivered order.",
  },
  general: {
    heading: "Get QuickBite.",
    introduction: "Order from kitchens around Ile-Ife, pay your way, and follow your rider to your door.",
  },
  copy: { label: "Copy", copied: "Copied", ariaLabel: (code: string) => `Copy invite code ${code}`, copiedStatus: "Invite code copied" },
  playStore: { label: "Get it on Google Play", ariaLabel: "Get QuickBite on Google Play (opens in a new tab)" },
  footer: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ],
  copyright: "© 2026 QuickBite",
};
