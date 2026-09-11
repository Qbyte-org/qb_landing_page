import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";
import FooterSocials from "./FooterSocials";
import NewsletterSignupForm from "../waitlist/NewsletterSignupForm";

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

        <NewsletterSignupForm />
        <div className="mt-auto pt-7 sm:pt-8">
          <FooterSocials />
        </div>
      </div>
    </section>
  );
}
