import type { Metadata } from "next";
import Link from "next/link";
import { Mail, X } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import MagneticFillButton from "@/components/ui/MagneticFillButton";

export const metadata: Metadata = {
  title: "Delete Your Account — QuickBite",
  description: "Request the permanent deletion of your QuickBite account and all associated data. Learn what happens when you delete your account.",
  robots: { index: false, follow: false },
};

export default function DeleteAccountPage() {
  const sections = [
    {
      id: "what-is-deleted",
      title: "What will be deleted",
      content: <ul className="space-y-4 text-sm leading-relaxed text-cocoa">{[
        "Your profile information (name, email, phone number)",
        "All order history and receipts",
        "Saved delivery addresses",
        "Payment methods and transaction records",
        "QuickBite Passport membership & rewards",
        "Any active referral codes or credits",
      ].map(item => <li key={item} className="flex items-start gap-3"><X className="mt-1 size-3.5 shrink-0 text-brand" aria-hidden="true" />{item}</li>)}</ul>,
    },
    {
      id: "request-deletion",
      title: "How to request deletion",
      content: <div className="space-y-6 text-sm leading-relaxed text-cocoa"><p>To submit a deletion request, send us an email from the address linked to your QuickBite account. We will process your request within <strong className="font-semibold text-ink">7 business days</strong>.</p><MagneticFillButton id="delete-account-email-btn" href="mailto:quickbiteinfo01@gmail.com?subject=Account%20Deletion%20Request&body=Hi%20QuickBite%20team%2C%0A%0AI%20would%20like%20to%20permanently%20delete%20my%20QuickBite%20account%20and%20all%20associated%20data.%0A%0AEmail%20linked%20to%20account%3A%20%5Byour%20email%5D%0A%0AThank%20you." variant="brand" className="min-h-12 max-w-full rounded-full px-5 py-3 text-left text-xs font-semibold" contentClassName="flex items-center justify-center gap-2"><Mail className="size-4 shrink-0" aria-hidden="true" />Email us to delete my account</MagneticFillButton></div>,
    },
    {
      id: "changed-your-mind",
      title: "Changed your mind?",
      content: <p className="text-sm leading-relaxed text-cocoa"><Link href="/" className="font-medium text-brand-dark underline underline-offset-4">Go back to QuickBite</Link> — we&apos;d love to keep you around.</p>,
    },
  ];
  return (
    <SiteShell>
      <LegalDocument current="delete-account" title="Delete your account" description="Your account, your choice. Here is how to request deletion and what happens to your information." introduction={<p className="text-sm leading-relaxed text-cocoa">We&apos;re sorry to see you go. Once your account is deleted, all your data — including your order history, saved addresses, and payment details — will be permanently removed and cannot be recovered.</p>} sections={sections} />
    </SiteShell>
  );
}
