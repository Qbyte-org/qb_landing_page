import {
  ArrowRight,
  Bike,
  Check,
  MapPin,
  Route,
  Smartphone,
  UsersRound,
} from "lucide-react";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionTag from "@/components/ui/SectionTag";
import FinalCTA from "../FinalCTA";
import BrandPageCard from "./BrandPageCard";
import RiderShowcase from "./RiderShowcase";

const pathways = [
  {
    eyebrow: "For independent riders",
    title: "You, your phone. Your next delivery.",
    description:
      "The app rider path is for riders who want to receive delivery requests and manage their own food runs through the QuickBite rider app.",
    icon: Smartphone,
    number: "01",
    points: [
      "Accept delivery requests directly",
      "Follow pickup and drop-off details",
      "Keep delivery updates in one place",
    ],
    action: "Join the rider waitlist",
    href: "/waitlist",
  },
  {
    eyebrow: "For dispatch partners",
    title: "Your riders. One connected team.",
    description:
      "Bring your delivery team to the table. The dispatch partner path is designed for coordinating a fleet, including riders who do not use a smartphone.",
    icon: UsersRound,
    number: "02",
    points: [
      "Assign requests across your riders",
      "Coordinate pickups from a partner workspace",
      "Stay on top of your team's deliveries",
    ],
    action: "Talk about your fleet",
    href: "mailto:quickbiteinfo01@gmail.com?subject=QuickBite%20dispatch%20partnership",
  },
];

const steps = [
  {
    title: "Choose your path",
    description:
      "Ride independently with the app, or bring a delivery team as a dispatch partner.",
  },
  {
    title: "Let us know you're interested",
    description:
      "Join the waitlist for launch updates. If you manage a fleet, email us to start a conversation.",
  },
  {
    title: "Get ready for launch",
    description:
      "We'll share rider onboarding details and next steps as QuickBite gets ready to launch in Ile-Ife.",
  },
];

const benefits = [
  {
    icon: MapPin,
    title: "Keep it local.",
    description:
      "Be part of the connection between familiar kitchens, campus cravings and people around town.",
  },
  {
    icon: Route,
    title: "A clearer food run.",
    description:
      "Our rider experience is built around the essentials: the pickup, the destination and delivery updates.",
  },
  {
    icon: UsersRound,
    title: "Room for your team.",
    description:
      "Independent riders and dispatch teams each have a place in the QuickBite delivery community.",
  },
];

export default function RidersExperience() {
  return (
    <div className="overflow-hidden bg-paper text-ink">
      <RiderShowcase />

      <section id="rider-paths" data-nav-theme="neutral" className="scroll-mt-28 bg-paper py-14 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionTag>Find your path</SectionTag>
            <SectionHeading
              title={<>Two ways to<br />move with us.</>}
              subtitle="One rider or a whole team. Choose the way of working that fits you."
              align="left"
              warm
              className="mt-5"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-7">
            {pathways.map((pathway, index) => (
              <Reveal key={pathway.number} delay={index * 0.06} className="h-full">
                <BrandPageCard
                  eyebrow={pathway.eyebrow}
                  title={pathway.title}
                  description={pathway.description}
                  icon={pathway.icon}
                  number={pathway.number}
                >
                  <ul className="space-y-3 border-t border-ink/10 pt-6">
                    {pathway.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink sm:text-base">
                        <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <MagneticFillButton href={pathway.href} variant="brand" className="min-h-14 rounded-full bg-brand! px-6 py-4 text-sm sm:px-7 sm:text-base">
                      {pathway.action}
                      <ArrowRight aria-hidden="true" className="ml-2 size-5" />
                    </MagneticFillButton>
                  </div>
                </BrandPageCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section data-nav-theme="neutral" className="bg-paper py-4 sm:py-8">
        <Container>
          <div className="relative isolate overflow-hidden rounded-4xl bg-ink p-6 text-paper sm:p-10 lg:p-14">
            <BackgroundGrainTexture />
            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
                  <span aria-hidden="true" className="h-px w-8 bg-brand" />
                  Getting started
                </p>
                <SectionHeading title={<>Your next chapter<br />starts here.</>} subtitle="We're building the rider community ahead of launch. Here's how to get involved." align="left" tone="light" warm className="mt-5" />
                <div aria-hidden="true" className="mt-10 hidden size-20 items-center justify-center rounded-full border border-paper/20 text-brand lg:flex">
                  <Bike className="size-10" strokeWidth={1.4} />
                </div>
              </Reveal>
              <ol className="divide-y divide-paper/15">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4 py-6 first:pt-0 last:pb-0 sm:gap-6">
                    <span className="font-display text-3xl font-semibold leading-none text-brand sm:text-4xl">0{index + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{step.title}</h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-paper/70">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section data-nav-theme="neutral" className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionTag>More than a delivery</SectionTag>
            <SectionHeading title="Bring it all together." align="left" warm className="mt-5" />
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.06} className="border-t border-ink/15 pt-7">
                <benefit.icon aria-hidden="true" className="size-7 text-brand" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{benefit.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-cocoa">{benefit.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA
        id="rider-cta"
        heading="Your next food run."
        supportingCopy="Be part of the journey. Get rider launch updates."
        actionLabel="Join the rider waitlist"
        actionHref="/waitlist"
        splitBackground={false}
      />
    </div>
  );
}
