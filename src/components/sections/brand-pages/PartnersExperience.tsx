"use client";

import { ArrowRight, ChefHat, ClipboardList, House, PackageCheck, Store } from "lucide-react";
import Container from "@/components/ui/Container";
import FoodImage from "@/components/ui/FoodImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionTag from "@/components/ui/SectionTag";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import FinalCTA from "@/components/sections/FinalCTA";
import BrandPageHero from "./BrandPageHero";
import BrandPageCard from "./BrandPageCard";

const partnerBenefits = [
  {
    eyebrow: "Your menu, discovered",
    title: "Make room for new regulars.",
    description:
      "Give nearby food lovers a new favourite. From a signature plate to the daily special, your menu is where the connection starts.",
    image: {
      src: "/images/food/pinterest/jollof-chicken-plantain.webp",
      alt: "Jollof rice with glazed chicken and fried plantain",
    },
  },
  {
    eyebrow: "Small kitchens welcome",
    title: "Big flavour. Your own kitchen.",
    description:
      "A neighbourhood restaurant or a home kitchen with a much-loved recipe: there is a place for both in the QuickBite community.",
    image: {
      src: "/images/food/pinterest/akara-bean-cakes.webp",
      alt: "Freshly fried golden akara bean cakes",
    },
  },
  {
    eyebrow: "Made for the food run",
    title: "From your counter to their table.",
    description:
      "Our aim is to bring kitchens, customers and delivery riders together, making the handoff a natural part of your food business.",
    image: {
      src: "/images/food/pinterest/jollof-takeaway.webp",
      alt: "A takeaway serving of jollof rice ready for a food run",
    },
  },
];

const onboardingSteps = [
  {
    title: "Tell us about your kitchen",
    description:
      "When applications open, share your business name, location and the kind of food you make.",
    icon: Store,
  },
  {
    title: "Complete verification",
    description:
      "We will guide you through the business and identity details needed to become a partner.",
    icon: ClipboardList,
  },
  {
    title: "Build your menu",
    description:
      "Bring your dishes to life with clear photos, descriptions and prices. Set the menu your customers will discover.",
    icon: ChefHat,
  },
  {
    title: "Get ready for your first order",
    description:
      "Once approved and live, prepare orders for collection and help us turn a first taste into a new favourite.",
    icon: PackageCheck,
  },
];

function PartnerKitchenArtwork() {
  return (
    <div className="relative mx-auto w-full max-w-[35rem] pb-20 pl-4 sm:pl-8">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-paper/15 bg-ink-soft p-3 sm:rounded-[3.5rem] sm:p-4">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.8rem] sm:rounded-[2.6rem]">
          <FoodImage
            src="/images/food/pinterest/meal-prep-packs.webp"
            alt="Prepared meals portioned into takeaway packs, ready for collection"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, (min-width: 640px) 520px, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-5 sm:px-4 sm:pb-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/60">Made with care</p>
            <p className="mt-1 font-display text-lg font-semibold text-paper sm:text-xl">Packed with possibility.</p>
          </div>
          <PackageCheck className="size-7 shrink-0 text-brand" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute -left-1 bottom-0 flex max-w-[85%] items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink shadow-lg sm:px-5 sm:py-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <ChefHat className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-cocoa">Your kitchen. Your craft.</p>
          <p className="mt-0.5 text-sm font-semibold sm:text-base">Our next great food story.</p>
        </div>
      </div>
    </div>
  );
}

export default function PartnersExperience() {
  return (
    <>
      <BrandPageHero
        id="partners-hero"
        eyebrow="For restaurants & home kitchens"
        title={<>You bring<br />the flavour.<br /><span className="text-brand">Let’s grow.</span></>}
        description="You put care into every plate. Bring your kitchen to QuickBite and be part of a community built around good food, close to home."
        primaryAction={{ label: "Join the partner waitlist", href: "/waitlist" }}
        secondaryAction={{ label: "How partnership works", href: "#partner-process" }}
        footer={
          <>
            <span className="inline-flex items-center gap-2"><Store className="size-4 text-brand" aria-hidden="true" />Neighbourhood restaurants</span>
            <span className="inline-flex items-center gap-2"><House className="size-4 text-brand" aria-hidden="true" />Independent home kitchens</span>
            <span>Partner applications open with launch.</span>
          </>
        }
      >
        <PartnerKitchenArtwork />
      </BrandPageHero>

      <section id="partner-benefits" aria-labelledby="partner-benefits-title" data-nav-theme="neutral" className="bg-paper py-14 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionTag>A place for your kitchen</SectionTag>
            <SectionHeading
              align="left"
              warm
              className="mt-5 max-w-3xl"
              title={<span id="partner-benefits-title">Good food deserves<br />a bigger table.</span>}
              subtitle="Keep doing what you do best. We are building a simpler way for your food to find the people who will love it."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {partnerBenefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.06} className="h-full">
                <BrandPageCard {...benefit} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="partner-process" aria-labelledby="partner-process-title" data-nav-theme="neutral" className="scroll-mt-24 bg-paper pb-12 sm:pb-20">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-soft px-5 py-10 text-paper sm:rounded-[3rem] sm:p-10 lg:p-14">
            <BackgroundGrainTexture />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <Reveal>
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60"><span aria-hidden="true" className="h-px w-8 bg-brand" />The next chapter</p>
                <SectionHeading
                  align="left"
                  warm
                  tone="light"
                  className="mt-5"
                  title={<span id="partner-process-title">Your kitchen.<br />Four steps closer.</span>}
                  subtitle="Here is what getting started will look like when partner applications open. Join the waitlist and we will keep you in the loop."
                />
                <MagneticFillButton href="/waitlist" variant="brand" className="mt-8 min-h-14 rounded-pill bg-brand! px-6 text-sm font-semibold sm:text-base">
                  Keep me updated <ArrowRight className="size-5" aria-hidden="true" />
                </MagneticFillButton>
                <div className="mt-10 flex items-start gap-3 border-t border-paper/15 pt-6 text-sm leading-relaxed text-paper/65">
                  <ClipboardList className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <p>A useful head start: your kitchen details, a current menu and a few clear photos of your dishes.</p>
                </div>
              </Reveal>
              <ol className="divide-y divide-paper/15 border-y border-paper/15">
                {onboardingSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-5 sm:py-7">
                    <span className="font-display text-3xl font-semibold leading-none text-brand sm:text-4xl" aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h3 className="flex items-start justify-between gap-3 font-display text-xl font-semibold leading-snug sm:text-2xl">
                        {step.title}
                        <step.icon className="mt-1 hidden size-5 shrink-0 text-paper/50 sm:block" aria-hidden="true" />
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/65 sm:text-base">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA
        id="partner-cta"
        heading="Grow with us."
        supportingCopy="Let’s make your next chapter a delicious one."
        actionLabel="Join the partner waitlist"
        actionHref="/waitlist"
        splitBackground={false}
      />
    </>
  );
}
