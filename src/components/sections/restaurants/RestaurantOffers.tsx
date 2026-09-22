import { ArrowRight, Bell, Sparkles, Tag } from "lucide-react";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import Container from "@/components/ui/Container";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionTag from "@/components/ui/SectionTag";

export default function RestaurantOffers() {
  return (
    <section id="restaurant-offers" aria-labelledby="restaurant-offers-title" data-nav-theme="neutral" className="scroll-mt-28 bg-paper py-14 sm:py-20">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 border-t border-ink/15 pt-12 sm:pt-16 lg:flex-row lg:items-end">
          <div>
            <SectionTag>A little extra to look forward to</SectionTag>
            <SectionHeading warm align="left" className="mt-5" title={<span id="restaurant-offers-title">Special offers.</span>} />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-cocoa">
            We&apos;re getting ready for our first food runs. Launch promotions and kitchen specials will appear here when they&apos;re ready.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="h-full">
            <article className="relative isolate grid h-full overflow-hidden rounded-[2rem] bg-ink-soft text-paper sm:grid-cols-[1.1fr_.9fr] sm:rounded-[2.5rem]">
              <BackgroundGrainTexture />
              <div className="relative flex flex-col items-start p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-3 py-2 text-xs font-semibold text-paper/80">
                  <Sparkles aria-hidden="true" className="size-4 text-brand" />
                  Coming at launch
                </span>
                <p className="mt-7 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/60">Launch offers</p>
                <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.08] tracking-[0.01em]! sm:text-[2.1rem]">Your first taste of QuickBite.</h3>
                <p className="mt-4 text-sm leading-relaxed text-paper/70 sm:text-base">A new way to find your favourites is on the way. Join the waitlist for news of our launch and its offers.</p>
                <div className="mt-auto pt-7">
                  <MagneticFillButton href="/waitlist" variant="brand" className="min-h-12 rounded-pill bg-brand! px-5 py-3 text-sm">
                    Get offer updates <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                  </MagneticFillButton>
                </div>
              </div>
              <div className="relative min-h-64 sm:min-h-0">
                <FoodImage src="/images/food/pinterest/jollof-chicken-plantain.webp" alt="Jollof rice, glazed chicken and plantain" fill sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 42vw, 92vw" className="object-cover" />
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-cream text-ink sm:rounded-[2.5rem]">
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-paper text-brand"><Tag aria-hidden="true" className="size-5" /></span>
                  <span className="text-xs font-semibold text-cocoa">Offers coming soon</span>
                </div>
                <p className="mt-7 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cocoa">From the neighbourhood</p>
                <h3 className="mt-3 max-w-[17ch] font-display text-3xl font-semibold leading-[1.08] tracking-[0.01em]! sm:text-[2.1rem]">Good things from local kitchens.</h3>
                <p className="mt-4 text-sm leading-relaxed text-cocoa sm:text-base">Keep an eye out for specials from the kitchens joining QuickBite. We&apos;ll share what&apos;s included and how to enjoy each offer here.</p>
              </div>
              <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-ink/20 px-6 py-5 sm:px-8">
                <span className="inline-flex items-center gap-2 text-xs text-cocoa"><Bell aria-hidden="true" className="size-4 text-brand" />A little heads-up, straight to you.</span>
                <MagneticFillButton href="/waitlist" variant="cream" className="min-h-11 rounded-pill border! border-ink/15! px-5 py-2 text-sm">
                  Keep me posted <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </MagneticFillButton>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
