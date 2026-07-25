// Maps URL slugs to the markdown files in /legal and their display metadata.
import type { LucideIcon } from "lucide-react";
import { FileText, Lock, Cookie, ReceiptText } from "lucide-react";

type LegalDoc = {
  file: string;
  title: string;
  short: string;
  icon: LucideIcon;
  description: string;
};

export const legalDocs = {
  terms: {
    file: "terms-and-conditions.md",
    title: "Terms & Conditions",
    short: "Terms",
    icon: FileText,
    description:
      "The terms that govern your use of QuickBite as a customer, vendor or rider.",
  },
  privacy: {
    file: "privacy-policy.md",
    title: "Privacy Policy",
    short: "Privacy",
    icon: Lock,
    description:
      "How QuickBite collects, uses and protects your personal data under the NDPR and NDPA.",
  },
  cookies: {
    file: "cookie-policy.md",
    title: "Cookie Policy",
    short: "Cookies",
    icon: Cookie,
    description:
      "How QuickBite uses cookies and similar technologies, and how to manage them.",
  },
  refunds: {
    file: "refund-policy.md",
    title: "Refund & Cancellation Policy",
    short: "Refunds",
    icon: ReceiptText,
    description:
      "When and how cancellations and refunds are handled on QuickBite.",
  },
} satisfies Record<string, LegalDoc>;

export type LegalSlug = keyof typeof legalDocs;

export const legalSlugs = Object.keys(legalDocs) as LegalSlug[];
