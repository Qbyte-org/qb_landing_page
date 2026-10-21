import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { legalLinks } from "@/content/footer";
import { waitlistPage } from "@/content/waitlist";
import BackgroundGrainTexture from "../../ui/BackgroundGrainTexture";
import WaitlistEmailForm from "../WaitlistEmailForm";
import PlatedDish from "./PlatedDish";

const { founder, faq, final, partners, riders } = waitlistPage;

export function FounderNote() {
  return (
    <section aria-label="Why we're building QuickBite" className="bg-cream text-ink">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-8 px-5 pb-24 sm:px-8 sm:pb-32 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <figure className="flex flex-col gap-8 lg:col-span-10 lg:col-start-2">
          <blockquote className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            <p>“{founder.quote}”</p>
          </blockquote>
          <figcaption className="flex items-center gap-4">
            <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-sand text-[0.6rem] text-cocoa">[Photo]</span>
            <span className="text-base leading-snug"><strong className="font-semibold">{founder.name}</strong><br /><span className="text-cocoa">{founder.role}</span></span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function WaitlistFaq() {
  return (
    <section aria-labelledby="faq-title" className="bg-cream text-ink">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-5 pb-24 sm:px-8 sm:pb-32 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <h2 id="faq-title" className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em] lg:col-span-4">{faq.heading}</h2>
        <div className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, index) => (
            <details key={item.question} open={index === 0} className="group border-b border-ink/15">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-semibold tracking-[-0.015em] sm:text-xl [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                {item.question}
                <Plus aria-hidden="true" className="size-5 shrink-0 text-brand-dark transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <p className="max-w-[56ch] pb-6 text-base leading-relaxed text-cocoa">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalJoin() {
  return (
    <section aria-labelledby="final-title" className="bg-cream px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="relative isolate mx-auto max-w-[110rem] overflow-hidden rounded-[2rem] bg-dark-ink px-5 pt-28 pb-[clamp(5.5rem,24vw,6.5rem)] text-center text-paper sm:rounded-[3rem] sm:px-8 sm:pt-24 sm:pb-[clamp(4.5rem,10vw,9rem)]">
        <BackgroundGrainTexture />
        {/* SVG text is fitted to the panel width, so the wordmark is never clipped. */}
        <svg aria-hidden="true" viewBox="0 0 1000 175" className="pointer-events-none absolute inset-x-[3%] bottom-[2%] w-[94%] text-paper/7">
          <text x="500" y="150" textAnchor="middle" textLength="1000" lengthAdjust="spacing" fill="currentColor" className="font-display" fontSize="190" fontWeight="800" letterSpacing="-8">QuickBite</text>
        </svg>
        {/* Two dishes set at the table's edge, partly off the panel: quiet framing, not decoration. */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-10 -left-10 w-32 -rotate-[8deg] sm:-top-16 sm:-left-12 sm:w-60 lg:-top-20 lg:-left-10 lg:w-80">
          <div className="relative aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a3d36_0,#1c1411_55%,#0d0907_100%)] p-[6%] ring-1 ring-paper/10 [filter:drop-shadow(0_24px_28px_rgba(0,0,0,0.45))]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image src="/images/food/plate/jollof-bowl.webp" alt="" fill sizes="(min-width: 1024px) 20rem, 15rem" className="object-cover" />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-6 -right-8 w-28 rotate-[10deg] sm:-top-10 sm:-right-10 sm:w-52 lg:-top-12 lg:-right-6 lg:w-64">
          <PlatedDish src="/images/food/modern-cutouts/burger.webp" alt="" vessel="plate" sizes="(min-width: 1024px) 16rem, 13rem" className="[filter:drop-shadow(0_24px_28px_rgba(0,0,0,0.45))]!" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-[38rem] flex-col items-center gap-4">
          <h2 id="final-title" className="font-display text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.045em]">{final.heading}</h2>
          <p className="text-lg leading-relaxed text-paper/72">{final.description}</p>
          <WaitlistEmailForm idPrefix="final" className="mt-3" />
        </div>
      </div>
    </section>
  );
}

export function WaitlistFooter() {
  return (
    <footer className="bg-cream text-ink">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-5 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="flex flex-col gap-2 text-base sm:flex-row sm:gap-8">
          <span>{partners.prompt} <Link href={partners.href} className="font-semibold text-brand-dark underline-offset-4 hover:underline">{partners.label}</Link></span>
          <span>{riders.prompt} <Link href={riders.href} className="font-semibold text-brand-dark underline-offset-4 hover:underline">{riders.label}</Link></span>
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cocoa">
          {legalLinks.slice(0, 3).map((link) => <Link key={link.href} href={link.href} className="hover:text-ink">{link.label}</Link>)}
          <span>© 2026 QuickBite</span>
        </p>
      </div>
    </footer>
  );
}
