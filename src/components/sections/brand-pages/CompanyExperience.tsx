import { Bike, Handshake, MapPin, MapPinned, Store, UtensilsCrossed, Zap } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import Container from "@/components/ui/Container";
import FoodImage from "@/components/ui/FoodImage";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionTag from "@/components/ui/SectionTag";
import BrandPageCard from "./BrandPageCard";
import BrandPageHero from "./BrandPageHero";

const values = [
  {
    number: "01",
    icon: Zap,
    eyebrow: "Make the everyday easier",
    title: "Speed, with care.",
    description:
      "A busy day should still have room for a good meal. We are building a simpler journey from deciding what to eat to getting it to your door.",
  },
  {
    number: "02",
    icon: Handshake,
    eyebrow: "Keep people at the centre",
    title: "Trust, every step.",
    description:
      "Food lovers, kitchens and riders all deserve clarity. Our approach puts clear information, useful updates and thoughtful support at the heart of each order.",
  },
  {
    number: "03",
    icon: MapPinned,
    eyebrow: "Start with real life here",
    title: "Built for Nigeria.",
    description:
      "The places we eat, the routes we take and the way we order shape what we build. We start locally, listening to the communities we want to serve.",
  },
];

const community = [
  {
    icon: UtensilsCrossed,
    title: "Food lovers",
    description: "Familiar favourites. Something new to try. A meal that fits your day.",
  },
  {
    icon: Store,
    title: "Local kitchens",
    description: "The people and recipes that give every neighbourhood its flavour.",
  },
  {
    icon: Bike,
    title: "Delivery riders",
    description: "The connection between a kitchen counter and your doorstep.",
  },
];

function CompanyHeroPhotos() {
  return (
    <div className="relative isolate mx-auto aspect-square w-full max-w-[38rem]">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-dashed border-paper/20" />
      <div aria-hidden="true" className="absolute inset-[19%] rounded-full bg-brand/15" />

      <div className="absolute left-[12%] top-[8%] aspect-square w-[72%] overflow-hidden rounded-full border-[6px] border-cream-200 shadow-[0_24px_64px_color-mix(in_srgb,var(--color-dark-ink)_45%,transparent)] sm:border-8">
        <FoodImage
          src="/images/food/pinterest/jollof-chicken-plantain.webp"
          alt="A plate of jollof rice, grilled chicken and golden plantain"
          fill
          preload
          sizes="(min-width: 1024px) 36vw, 72vw"
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-[5%] left-0 aspect-square w-[37%] -rotate-12 overflow-hidden rounded-[2rem] border-4 border-cream-200 shadow-xl sm:rounded-[2.5rem]">
        <FoodImage
          src="/images/food/pinterest/puff-puff.webp"
          alt="Golden puff-puff, ready to share"
          fill
          sizes="(min-width: 1024px) 18vw, 37vw"
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-[12%] right-0 aspect-square w-[32%] rotate-12 overflow-hidden rounded-full border-4 border-cream-200 shadow-xl">
        <FoodImage
          src="/images/food/pinterest/nigerian-food-spread.webp"
          alt="A colourful spread of Nigerian dishes"
          fill
          sizes="(min-width: 1024px) 16vw, 32vw"
          className="object-cover"
        />
      </div>

      <span className="absolute right-0 top-[3%] -rotate-6 rounded-full bg-brand px-4 py-3 text-xs font-bold uppercase tracking-wider text-paper sm:px-6 sm:text-sm">
        A little local goodness
      </span>
      <p className="absolute bottom-0 left-[41%] text-xs font-semibold uppercase leading-relaxed tracking-[0.16em] text-paper/65 sm:text-sm">
        Good food.<br />Shared stories.
      </p>
    </div>
  );
}

export default function CompanyExperience() {
  return (
    <>
      <BrandPageHero
        id="company-hero"
        eyebrow="Around the QuickBite table"
        title={<>Good food.<br /><span className="text-brand">Great company.</span></>}
        description="We are bringing food lovers, local kitchens and delivery riders closer together. Because behind every good meal, there is a whole community."
        primaryAction={{ label: "Explore restaurants", href: "/restaurants" }}
        secondaryAction={{ label: "Meet our story", href: "#our-story" }}
        footer={
          <span className="inline-flex items-center gap-2 text-sm text-paper/65">
            <MapPin size={16} className="text-brand" aria-hidden="true" />
            Starting in Ile-Ife. Made for everyday life.
          </span>
        }
      >
        <CompanyHeroPhotos />
      </BrandPageHero>

      <section id="our-story" data-nav-theme="neutral" className="scroll-mt-28 bg-paper py-16 text-ink sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <Reveal>
              <SectionTag>Our story</SectionTag>
              <SectionHeading
                align="left"
                warm
                className="mt-6"
                title={<>A local beginning.<br />A bigger table.</>}
              />
              <div className="mt-6 max-w-xl space-y-5 text-base leading-relaxed text-cocoa sm:text-lg">
                <p>
                  From a quick bite between lectures to something comforting after a long day,
                  good food is part of everyday life. Finding it should feel just as familiar.
                </p>
                <p>
                  QuickBite starts in Ile-Ife, with the local kitchens, food lovers and riders
                  who make each food run possible. We are building around their real routines,
                  one neighbourhood at a time.
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-cream-200 px-5 py-3 text-sm font-semibold">
                <MapPin size={18} className="shrink-0 text-brand" aria-hidden="true" />
                Our first chapter: Ile-Ife, Nigeria
              </div>
            </Reveal>

            <Reveal mode="image" className="relative overflow-hidden rounded-[2rem] bg-cream-200 sm:rounded-[3rem]">
              <div className="relative aspect-[1.2]">
                <FoodImage
                  src="/images/food/pinterest/nigerian-food-spread.webp"
                  alt="Nigerian favourites brought together for a shared meal"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative px-7 pb-7 pt-5 sm:px-9 sm:pb-9">
                <svg aria-hidden="true" className="absolute inset-x-0 -top-6 h-7 w-full text-cream-200" viewBox="0 0 600 36" preserveAspectRatio="none">
                  <path fill="currentColor" d="M0 14Q75 36 150 14T300 14T450 14T600 14V36H0Z" />
                </svg>
                <p className="font-display text-2xl font-semibold leading-tight sm:text-3xl">There is a story in every meal.</p>
                <p className="mt-2 text-sm leading-relaxed text-cocoa sm:text-base">We are here to bring more of them to your table.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section data-nav-theme="neutral" className="bg-paper pb-16 text-ink sm:pb-24 lg:pb-28">
        <Container>
          <Reveal className="border-t border-ink/15 pt-12 sm:pt-16">
            <SectionTag>What we stand for</SectionTag>
            <SectionHeading align="left" warm className="mt-6" title="Good food. Solid foundations." subtitle="Three ideas guide the way we build QuickBite." />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06} className="h-full">
                <BrandPageCard {...value} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section data-nav-theme="neutral" className="bg-paper pb-16 text-ink sm:pb-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-soft p-7 text-paper sm:rounded-[3rem] sm:p-10 lg:p-14">
            <BackgroundGrainTexture />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">One community. Many good stories.</p>
                <SectionHeading align="left" warm tone="light" className="mt-6" title={<>There is room<br />at the table.</>} />
                <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70 sm:text-lg">
                  Building something useful takes people who care. If you love food,
                  local communities or thoughtful products, we would love to hear from you.
                </p>
                <MagneticFillButton href="mailto:quickbiteinfo01@gmail.com" variant="brand" className="mt-8 min-h-14 rounded-full bg-brand! px-7 py-4 text-base sm:min-h-16 sm:px-9 sm:text-lg">
                  Work with us
                </MagneticFillButton>
                <p className="mt-4 break-all text-sm text-paper/65">quickbiteinfo01@gmail.com</p>
              </Reveal>

              <div className="divide-y divide-paper/15 border-y border-paper/15">
                {community.map((group, index) => (
                  <Reveal key={group.title} delay={index * 0.06} className="flex gap-4 py-6 sm:gap-5 sm:py-7">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-paper/15 bg-paper/5 text-brand-light sm:size-14">
                      <group.icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold sm:text-2xl">{group.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/65 sm:text-base">{group.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA
        id="company-final-cta"
        heading="A bigger table"
        supportingCopy="Pull up a chair. Find your next favourite."
        actionLabel="Explore restaurants"
        actionHref="/restaurants"
        splitBackground={false}
      />
    </>
  );
}
