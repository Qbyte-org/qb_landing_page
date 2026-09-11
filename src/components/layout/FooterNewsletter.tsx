import { ArrowRight } from "lucide-react";
import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";
import MagneticFillButton from "../ui/MagneticFillButton";
import FooterSocials from "./FooterSocials";

export default function FooterNewsletter() {
  return (
    <section
      aria-labelledby="footer-newsletter-title"
      className="relative flex min-w-0 flex-col overflow-hidden bg-[#382c26] p-6 text-paper sm:p-8 lg:min-h-[26rem] lg:p-6 xl:p-8 min-[1800px]:min-h-[31rem] rounded-4xl"
    >
      <BackgroundGrainTexture />

      <div className="relative flex flex-1 flex-col">
        <h2
          id="footer-newsletter-title"
          className="font-display text-3xl font-semibold leading-tight tracking-[0.01em]! sm:text-4xl lg:text-3xl xl:text-4xl min-[1800px]:text-[2.5rem]"
        >
          Stay in the loop!
        </h2>

        <p className="mt-5 max-w-md text-base leading-relaxed text-peach/85 sm:text-lg lg:text-base xl:text-lg min-[1800px]:text-xl">
          Join the waitlist for launch updates, new kitchens, local offers, and
          the latest from QuickBite.
        </p>

        <form action="/waitlist" method="get" className="mt-6 max-w-md sm:mt-7">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="flex items-center gap-3 border-b border-paper/40 pb-3 transition-colors focus-within:border-paper">
            <input
              id="footer-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-paper placeholder:text-peach/75 focus-visible:outline-paper! autofill:[-webkit-box-shadow:0_0_0_9999px_#382c26_inset]! autofill:[-webkit-text-fill-color:#fffaf5]! sm:px-4 sm:text-lg min-[1800px]:text-xl rounded-4xl"
            />
            <MagneticFillButton
              type="submit"
              ariaLabel="Continue to the QuickBite waitlist"
              title="Continue to the waitlist"
              variant="dark"
              customFillClass="bg-brand"
              customHoverTextColor="#ffffff"
              className="group h-11 w-11 shrink-0 rounded-full bg-transparent! text-paper! focus-visible:outline-2! focus-visible:outline-offset-2 focus-visible:outline-paper!"
            >
              <ArrowRight
                className="h-6 w-6 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </MagneticFillButton>
          </div>
        </form>
        <div className="mt-auto pt-7 sm:pt-8">
          <FooterSocials />
        </div>
      </div>
    </section>
  );
}
