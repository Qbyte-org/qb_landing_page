"use client";

import Image from "next/image";
import { useRef } from "react";
import { Check } from "lucide-react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import Logo from "../../ui/Logo";
import WaitlistEmailForm from "../WaitlistEmailForm";
import PhoneFrame from "./PhoneFrame";

export default function WaitlistHero({ initialEmail }: { initialEmail: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // The one load moment: the greeting rises letter by letter, the plate lands, the phone settles.
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-greeting-char]", { yPercent: 115, duration: 0.9, stagger: 0.028 })
        .from("[data-hero-plate]", { scale: 0.7, rotate: -40, autoAlpha: 0, duration: 1.1 }, 0.15)
        .from("[data-hero-phone]", { y: 48, rotate: 2, autoAlpha: 0, duration: 1 }, 0.35)
        .from("[data-hero-chip]", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.75);

      // While leaving the hero, the greeting drifts and the plate keeps turning.
      gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true } })
        .to("[data-greeting]", { xPercent: -8, ease: "none" }, 0)
        .to("[data-hero-plate]", { rotate: 50, yPercent: 18, ease: "none" }, 0)
        .to("[data-hero-phone]", { yPercent: -10, ease: "none" }, 0);
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} id="join" className="relative isolate overflow-clip bg-dark-ink text-paper">
      <div className="relative mx-auto max-w-[90rem] px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <header className="flex items-center justify-between gap-4">
          <Logo variant="light" width={150} height={29} priority />
          <p className="flex items-center gap-2.5 text-sm text-paper/70">
            <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
            {waitlistPage.location}
          </p>
        </header>

        <div className="relative pt-14 sm:pt-20 lg:pt-16">
          <p data-greeting lang="yo" className="relative z-10 whitespace-nowrap font-display text-[clamp(3.6rem,13.2vw,13rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-paper">
            <span className="sr-only">{waitlistPage.greeting}</span>
            <span aria-hidden="true" className="inline-flex overflow-hidden pb-[0.08em]">
              {Array.from(waitlistPage.greeting).map((char, index) => (
                <span key={`${char}-${index}`} data-greeting-char className="inline-block whitespace-pre">{char}</span>
              ))}
            </span>
          </p>
          <p className="mt-4 font-display text-lg font-semibold tracking-[-0.01em] text-brand sm:text-2xl">{waitlistPage.greetingTranslation}</p>

          <div aria-hidden="true" data-hero-plate className="pointer-events-none absolute -top-2 right-[-14%] w-[52vw] max-w-[34rem] sm:right-[-6%] sm:w-[38vw] lg:-top-10 lg:right-[-3%]">
            <Image src="/images/food/hero-cutouts/jollof.webp" alt="" width={640} height={640} priority sizes="(min-width: 1024px) 34rem, 52vw" className="h-auto w-full" />
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-14 pt-12 pb-24 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-36">
          <div className="flex flex-col gap-7 lg:col-span-6">
            <h1 className="max-w-[16ch] font-display text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{waitlistPage.headline}</h1>
            <p className="max-w-[34ch] text-lg leading-relaxed text-paper/72 sm:text-xl">{waitlistPage.introduction}</p>
            <WaitlistEmailForm idPrefix="hero" initialEmail={initialEmail} className="max-w-[34rem]" />
            <ul aria-label="About the waitlist" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
              {waitlistPage.assurances.map((item) => (
                <li key={item} className="flex items-center gap-2"><Check aria-hidden="true" className="size-4 text-brand-light" strokeWidth={2.4} />{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-8 lg:mt-[-6rem]">
            <div data-hero-phone className="relative mx-auto w-[64%] -rotate-[4deg]">
              <PhoneFrame sizes="(min-width: 1024px) 17rem, 64vw">
                <Image src="/images/app/dish.webp" alt="The QuickBite test build: Ofada Rice and Ofada Stew at ₦3,500 with an Add to cart button" width={600} height={1300} sizes="(min-width: 1024px) 17rem, 64vw" className="h-auto w-full" />
              </PhoneFrame>
            </div>
            <figure data-hero-chip className="absolute right-[-4%] bottom-[8%] w-[62%] rotate-[3deg] rounded-[1.4rem] bg-paper p-2.5 pb-2 text-ink sm:right-[-10%]">
              <Image src="/images/app/track-card.webp" alt="Order tracking in the QuickBite app" width={600} height={500} sizes="16rem" className="h-auto w-full rounded-[0.9rem]" />
              <figcaption className="px-1 pt-2 text-xs font-semibold text-cocoa">Live tracking, from the test build</figcaption>
            </figure>
            <div aria-hidden="true" className="pointer-events-none absolute -left-[12%] top-[6%] w-[30%]">
              <Image src="/images/food/hero-cutouts/puff-puff.webp" alt="" width={640} height={640} sizes="8rem" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
