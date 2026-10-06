import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";
import { footerCopy } from "@/content/footer";
import FooterSocials from "./FooterSocials";
import NewsletterSignupForm from "../waitlist/NewsletterSignupForm";
import LinkArrow from "../ui/LinkArrow";

export default function FooterNewsletter() {
  return (
    <section
      aria-labelledby="footer-newsletter-title"
      className="relative mx-auto flex w-full min-w-0 max-w-md flex-col overflow-hidden rounded-4xl bg-ink-soft p-5 text-paper sm:p-7 lg:p-6 xl:p-8"
    >
      <BackgroundGrainTexture />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <h2
          id="footer-newsletter-title"
          className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-tight text-paper"
        >
          {footerCopy.newsletterTitle}
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-peach/85 sm:text-base xl:text-lg">
          {footerCopy.newsletterDescription}
        </p>
        <NewsletterSignupForm />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-paper/15 pt-5 sm:mt-7">
          <LinkArrow href={footerCopy.emailHref} variant="dark" ariaLabel={footerCopy.emailLabel} className="relative z-10 min-h-11 min-w-0! w-28 gap-2! text-sm! normal-case! text-peach/85! [--link-arrow-min-width:0px] [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.04em]">
            {footerCopy.emailAction}
          </LinkArrow>
          <FooterSocials />
        </div>
      </div>
    </section>
  );
}
