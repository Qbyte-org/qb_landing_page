import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <section
      aria-labelledby="footer-newsletter-title"
      className="relative min-w-0 overflow-hidden bg-[#ffe7d7] p-6 text-[#2a211d] sm:p-8 lg:min-h-[26rem] lg:p-6 xl:p-8 min-[1800px]:min-h-[31rem] rounded-4xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] bg-size-[128px_128px] opacity-25 mix-blend-multiply"
      />

      <div className="relative">
        <h2
          id="footer-newsletter-title"
          className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-3xl xl:text-4xl min-[1800px]:text-[2.5rem]"
        >
          Stay in the loop!
        </h2>

        <p className="mt-5 max-w-md text-base leading-relaxed sm:text-lg lg:text-base xl:text-lg min-[1800px]:text-xl">
          Join the waitlist for launch updates, new kitchens, local offers, and
          the latest from QuickBite.
        </p>

        <form action="/waitlist" method="get" className="mt-6 max-w-md sm:mt-7">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="flex items-center gap-3 border-b border-[#2a211d]/60 pb-3 transition-colors focus-within:border-[#2a211d]">
            <input
              id="footer-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-[#2a211d] placeholder:text-[#2a211d] focus-visible:outline-[#2a211d]! autofill:[-webkit-box-shadow:0_0_0_9999px_#ffe7d7_inset]! autofill:[-webkit-text-fill-color:#2a211d]! sm:px-4 sm:text-lg min-[1800px]:text-xl rounded-4xl"
            />
            <button
              type="submit"
              aria-label="Continue to the QuickBite waitlist"
              title="Continue to the waitlist"
              className="group grid h-11 w-11 shrink-0 place-items-center bg-transparent text-[#2a211d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a211d]!"
            >
              <ArrowRight
                className="h-6 w-6 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
