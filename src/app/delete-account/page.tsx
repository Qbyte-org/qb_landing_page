import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Delete Your Account — QuickBite",
  description:
    "Request the permanent deletion of your QuickBite account and all associated data. Learn what happens when you delete your account.",
  robots: { index: false, follow: false },
};

export default function DeleteAccountPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl px-5 py-20 sm:py-28">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Delete Your Account
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          We&apos;re sorry to see you go. Once your account is deleted, all
          your data — including your order history, saved addresses, and payment
          details — will be permanently removed and cannot be recovered.
        </p>

        {/* Divider */}
        <hr className="my-8 border-border" />

        {/* What gets deleted */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            What will be deleted
          </h2>
          <ul className="space-y-2 text-sm text-foreground">
            {[
              "Your profile information (name, email, phone number)",
              "All order history and receipts",
              "Saved delivery addresses",
              "Payment methods and transaction records",
              "QuickBite Passport membership & rewards",
              "Any active referral codes or credits",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* How to request */}
        <div className="rounded-xl border border-border bg-cream p-6">
          <h2 className="mb-1 text-base font-semibold text-navy">
            How to request deletion
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted">
            To submit a deletion request, send us an email from the address
            linked to your QuickBite account. We will process your request
            within&nbsp;<strong className="text-foreground">7 business days</strong>.
          </p>
          <a
            id="delete-account-email-btn"
            href="mailto:support@quickbiteltd.org?subject=Account%20Deletion%20Request&body=Hi%20QuickBite%20team%2C%0A%0AI%20would%20like%20to%20permanently%20delete%20my%20QuickBite%20account%20and%20all%20associated%20data.%0A%0AEmail%20linked%20to%20account%3A%20%5Byour%20email%5D%0A%0AThank%20you."
            className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email us to delete my account
          </a>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Changed your mind?{" "}
          <a
            href="/"
            className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
          >
            Go back to QuickBite
          </a>{" "}
          — we&apos;d love to keep you around.
        </p>
      </section>
    </SiteShell>
  );
}
