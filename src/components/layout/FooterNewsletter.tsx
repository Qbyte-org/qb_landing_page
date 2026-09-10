import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <section
      aria-labelledby="footer-newsletter-title"
      className="relative overflow-hidden rounded-card bg-[#fffaf5] p-6 text-[#241813] sm:p-8 lg:min-h-[21rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(42,33,29,.38)_0.8px,transparent_0.8px)] [background-size:13px_13px]"
      />
      <div className="relative flex h-full flex-col">
        <p className="text-xs font-bold text-[#f06400]">QuickBite updates</p>
        <h2
          id="footer-newsletter-title"
          className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
          Stay in the loop.
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6d5c52] sm:text-base">
          Get first word on new kitchens, launch access, local offers, and the
          latest ways to order with QuickBite.
        </p>

        <form action="/waitlist" method="get" className="mt-8 lg:mt-auto">
          <label htmlFor="footer-email" className="text-sm font-bold">
            Email address
          </label>
          <div className="mt-2 flex items-center gap-3 border-b border-[#2a211d]/35 pb-2 focus-within:border-[#f06400]">
            <input
              id="footer-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-[#241813] outline-none placeholder:text-[#8a6b5a]"
            />
            <button
              type="submit"
              aria-label="Continue to the QuickBite waitlist"
              title="Continue to waitlist"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2a211d] text-[#fffaf5] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f06400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf5] active:scale-[0.97]"
            >
              <ArrowRight
                className="h-5 w-5"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
