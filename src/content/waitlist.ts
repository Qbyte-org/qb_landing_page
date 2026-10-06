import { BellRing, CircleDollarSign, Timer } from "lucide-react";

export const waitlistPerks = [
  { label: "Launch updates", icon: BellRing },
  { label: "Fast delivery", icon: Timer },
  { label: "No hidden fees", icon: CircleDollarSign },
];

export const waitlistFields = {
  name: { name: "name", label: "Name", type: "text", autoComplete: "name", maxLength: 100 },
  email: { name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 },
  phone: { name: "phone", label: "Nigerian phone number", type: "tel", autoComplete: "tel", maxLength: 32 },
} as const;

export const waitlistCopy = {
  brand: "QuickBite",
  background: ["Coming", "soon!"],
  heading: "Join our waitlist!",
  introduction: "Be first to know when QuickBite starts delivering fast, fresh meals from local favourites near you.",
  location: "Launching in Ile-Ife",
  homeHref: "/",
  homeLabel: "Home",
  homeAriaLabel: "Back to the home page",
  emailHref: "mailto:quickbiteinfo01@gmail.com",
  emailLabel: "Email us",
  emailAriaLabel: "Send QuickBite a message",
  contactHelp: "Enter an email address or a Nigerian mobile number. You can also provide both.",
  submit: "Join Waitlist",
  newsletterSubmit: "Join the waitlist",
  submitting: "Joining...",
  submitAriaLabel: "Join the QuickBite waitlist",
  submittingAriaLabel: "Joining the QuickBite waitlist",
  honeypotLabel: "Website",
  consent: {
    introduction: "I agree to receive QuickBite launch updates and have read the",
    policyLabel: "Privacy Notice",
    policyHref: "/legal/privacy",
    ending: ".",
  },
  result: {
    eyebrow: "The QuickBite waitlist",
    closeAriaLabel: "Close waitlist result",
    referenceLabel: "Request reference:",
    contactLabel: "Contact our team",
    communityHeading: "Join the community of quickbitters.",
    communityLabel: "Join on WhatsApp",
    communityHref: "https://chat.whatsapp.com/H6omHZTPhf8KSm9fLLqmGz?mode=gi_t",
  },
} as const;

export const waitlistResultMessages = {
  success: { title: "You’re on the list!", action: "Lovely, thank you" },
  invalid: { title: "Let’s check those details.", action: "Back to the form" },
  unavailable: { title: "We can’t take signups just yet.", action: "Close" },
  error: { title: "We couldn’t confirm your signup.", action: "Back to the form" },
  "rate-limited": { title: "Give it a moment.", action: "Got it" },
};

export const waitlistRetryMessage = (seconds: number) => `Please wait ${seconds} seconds before trying again.`;
