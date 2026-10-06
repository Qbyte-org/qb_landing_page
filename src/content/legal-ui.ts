export const legalUi = {
  documentDesk: "QuickBite / Legal desk",
  readDocument: "Read the document",
  contents: "In this document",
  introduction: "Before you begin",
  otherPolicies: "Other policies",
  documentsLabel: "Legal documents",
  sidebarDesk: "The QuickBite legal desk",
  disclaimer: "Template disclaimer",
  deleteAccount: { href: "/delete-account", label: "Delete account", ariaLabel: "Delete your account" },
  contact: { href: "mailto:quickbiteinfo01@gmail.com", ariaLabel: "Email QuickBite about our policies" },
  cta: {
    heading: "Here to help",
    supportingCopy: "Questions about your rights or our policies?",
    actionLabel: "Contact our team",
    actionHref: "mailto:quickbiteinfo01@gmail.com",
  },
} as const;

export const deleteAccountContent = {
  title: "Delete your account",
  description: "Your account, your choice. Here is how to request deletion and what happens to your information.",
  introduction: "We're sorry to see you go. Once your account is deleted, all your data — including your order history, saved addresses, and payment details — will be permanently removed and cannot be recovered.",
  deleted: {
    id: "what-is-deleted",
    title: "What will be deleted",
    items: [
      "Your profile information (name, email, phone number)",
      "All order history and receipts",
      "Saved delivery addresses",
      "Payment methods and transaction records",
      "QuickBite Passport membership & rewards",
      "Any active referral codes or credits",
    ],
  },
  request: {
    id: "request-deletion",
    title: "How to request deletion",
    introduction: "To submit a deletion request, send us an email from the address linked to your QuickBite account. We will process your request within",
    timeframe: "7 business days",
    ending: ".",
    label: "Email us to delete my account",
    href: "mailto:quickbiteinfo01@gmail.com?subject=Account%20Deletion%20Request&body=Hi%20QuickBite%20team%2C%0A%0AI%20would%20like%20to%20permanently%20delete%20my%20QuickBite%20account%20and%20all%20associated%20data.%0A%0AEmail%20linked%20to%20account%3A%20%5Byour%20email%5D%0A%0AThank%20you.",
  },
  changedMind: {
    id: "changed-your-mind",
    title: "Changed your mind?",
    href: "/",
    label: "Go back to QuickBite",
    ending: " — we'd love to keep you around.",
  },
} as const;
