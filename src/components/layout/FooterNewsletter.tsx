import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <section
      aria-labelledby="footer-newsletter-title"
      className="relative overflow-hidden rounded-xl2 bg-[#fff0e4] p-8 text-[#1a1a2e] sm:p-10 lg:p-12 lg:min-h-[26rem] flex flex-col"
    >
      {/* Textured dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(rgba(42,33,29,.25)_1px,transparent_1px)] [background-size:16px_16px]"
      />
      
      <div className="relative z-10 flex h-full flex-col">
        <h2
          id="footer-newsletter-title"
          className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
        >
          Stay in the loop!
        </h2>
        
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#1a1a2e]/75 sm:text-base">
          Get first access to exclusive local offers, updates on new kitchens, and the latest QuickBite features.
        </p>

        <form action="/waitlist" method="get" className="mt-10 lg:mt-auto relative max-w-md">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="flex items-end gap-3 border-b border-[#1a1a2e]/20 pb-2 focus-within:border-[#f06400] transition-colors">
            <div className="flex-1">
              <span className="block text-xs font-bold text-[#1a1a2e]/70 mb-1">Email address</span>
              <input
                id="footer-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={254}
                className="w-full bg-transparent py-1 text-base text-[#1a1a2e] outline-none placeholder:text-[#1a1a2e]/30"
              />
            </div>
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              title="Subscribe"
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-transparent text-[#1a1a2e] transition-transform duration-300 hover:scale-[1.05] focus-visible:outline-none active:scale-[0.97]"
            >
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
