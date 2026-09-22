import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Store,
} from "lucide-react";
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

const contactEmail = "quickbiteinfo01@gmail.com";

const topics = [
  {
    icon: MessageCircle,
    number: "01",
    eyebrow: "Questions & feedback",
    title: "Just saying hello?",
    description:
      "Ask about the waitlist, share feedback on the website, or tell us what you would love to see from QuickBite.",
    subject: "Hello QuickBite",
    action: "Email the team",
  },
  {
    icon: Store,
    number: "02",
    eyebrow: "Restaurants & kitchens",
    title: "Bring your flavour.",
    description:
      "Tell us about your kitchen, your food and where you are based. Let’s start a conversation about partnering with QuickBite.",
    subject: "Restaurant partnership enquiry",
    action: "Talk partnerships",
  },
  {
    icon: Bike,
    number: "03",
    eyebrow: "Future delivery riders",
    title: "Ride with us.",
    description:
      "Interested in becoming a QuickBite rider? Share your location and any questions about joining us as we prepare to launch.",
    subject: "Rider enquiry",
    action: "Talk about riding",
  },
];

function emailLink(subject: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
}

function ContactPostcard() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[34rem] px-3 pb-20 pt-4 sm:px-6 sm:pb-24">
      <div aria-hidden="true" className="absolute inset-x-8 bottom-10 top-12 rounded-full border border-dashed border-paper/20" />
      <div className="relative -rotate-3 overflow-hidden rounded-[2rem] border border-paper/20 bg-cream-200 p-6 pb-14 text-ink shadow-[0_24px_64px_color-mix(in_srgb,var(--color-dark-ink)_45%,transparent)] sm:rounded-[2.5rem] sm:p-9 sm:pb-18">
        <BackgroundGrainTexture />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <p className="max-w-32 text-[0.65rem] font-semibold uppercase leading-relaxed tracking-[0.17em] text-cocoa sm:max-w-40 sm:text-xs">
              From your table<br />to ours
            </p>
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-dashed border-brand/50 bg-paper text-brand sm:size-17">
              <Mail aria-hidden="true" size={29} strokeWidth={1.4} />
            </span>
          </div>
          <h2 className="mt-8 max-w-[9ch] font-display text-[2.65rem] font-semibold leading-[1.05] tracking-[0.01em]! sm:text-[3.5rem]">
            Hello from QuickBite.
          </h2>
          <p className="mt-5 max-w-72 text-sm leading-relaxed text-cocoa sm:text-base">
            Good food brings people together. So does a good conversation.
          </p>
          <p className="mt-8 border-t border-dashed border-ink/25 pt-4 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cocoa sm:text-xs">
            Questions. Ideas. A little hello.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 aspect-square w-[43%] overflow-hidden rounded-full border-[6px] border-paper shadow-xl sm:border-8">
        <FoodImage
          src="/images/food/pinterest/jollof-chicken-plantain.webp"
          alt="A plate of jollof rice, chicken and plantain, ready for the table"
          fill
          preload
          sizes="(min-width: 1024px) 230px, (min-width: 640px) 220px, 43vw"
          className="object-cover"
        />
      </div>
      <span className="absolute bottom-7 left-3 -rotate-6 rounded-full bg-brand px-4 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-paper sm:bottom-10 sm:left-6 sm:px-5 sm:text-xs">
        A little local goodness
      </span>
    </div>
  );
}

export default function ContactExperience() {
  return (
    <>
      <BrandPageHero
        id="contact-hero"
        eyebrow="Get in touch"
        title={<>Let’s talk.<br /><span className="text-brand">We’re all ears.</span></>}
        description="A question, an idea or a kitchen we should know about? There is always room for a conversation at the QuickBite table."
        primaryAction={{ label: "Say hello", href: emailLink("Hello QuickBite") }}
        secondaryAction={{ label: "Find your topic", href: "#contact-topics" }}
        footer={
          <>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" size={16} className="text-brand" />
              Starting in Ile-Ife, Nigeria.
            </span>
            <span>Food lovers. Local kitchens. Future riders.</span>
          </>
        }
      >
        <ContactPostcard />
      </BrandPageHero>

      <section id="contact-topics" aria-label="Ways to contact QuickBite" data-nav-theme="neutral" className="scroll-mt-28 bg-paper py-16 text-ink sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionTag>A good place to start</SectionTag>
            <SectionHeading
              align="left"
              warm
              className="mt-6"
              title="What brings you here?"
              subtitle="QuickBite is preparing to launch. Choose a topic and send us a note; each one reaches the team."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
            {topics.map(({ subject, action, ...topic }, index) => (
              <Reveal key={subject} delay={index * 0.06} className="h-full">
                <BrandPageCard {...topic}>
                  <MagneticFillButton
                    href={emailLink(subject)}
                    variant="cream"
                    className="min-h-12 rounded-full border! border-ink/15! bg-paper! px-5 py-3 text-sm"
                  >
                    {action}
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                  </MagneticFillButton>
                </BrandPageCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-cocoa">
            Prefer to write directly? {" "}
            <a href={`mailto:${contactEmail}`} className="break-all font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              {contactEmail}
            </a>
          </p>
        </Container>
      </section>

      <section aria-label="Helpful information before you get in touch" data-nav-theme="neutral" className="bg-paper pb-16 text-ink sm:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-10 border-t border-ink/15 pt-12 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <Reveal>
              <SectionTag>A few quick answers</SectionTag>
              <SectionHeading align="left" warm className="mt-6" title={<>Curious about<br />how it works?</>} />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-cocoa sm:text-lg">
                Our FAQs cover launch locations, joining the waitlist and what to expect from QuickBite. Your answer might already be there.
              </p>
              <MagneticFillButton href="/#faq" variant="brand" className="mt-8 min-h-14 rounded-full bg-brand! px-7 py-4 text-base">
                Explore the FAQs
                <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
              </MagneticFillButton>
            </Reveal>

            <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink-soft p-7 text-paper sm:rounded-[2.5rem] sm:p-10">
              <BackgroundGrainTexture />
              <div className="relative">
                <span className="grid size-12 place-items-center rounded-full border border-paper/20 text-brand-light">
                  <HelpCircle aria-hidden="true" size={23} strokeWidth={1.6} />
                </span>
                <h2 className="mt-6 max-w-xs font-display text-3xl font-semibold leading-tight tracking-[0.01em]! sm:text-4xl">A little context goes a long way.</h2>
                <p className="mt-4 text-base leading-relaxed text-paper/70">A few details help us understand your message.</p>
                <ul className="mt-7 divide-y divide-paper/15 border-y border-paper/15 text-sm leading-relaxed sm:text-base">
                  {[
                    "Your name and the city you are writing from.",
                    "What you would like to ask or share.",
                    "Your kitchen name, if you are getting in touch about a partnership.",
                  ].map((detail, index) => (
                    <li key={detail} className="flex gap-4 py-4">
                      <span aria-hidden="true" className="shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-brand-light">0{index + 1}</span>
                      <span className="text-paper/85">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-label="Follow QuickBite" data-nav-theme="neutral" className="bg-paper pb-16 text-ink sm:pb-24">
        <Container>
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-ink/10 bg-cream-200 p-7 sm:rounded-[2.5rem] sm:p-10">
            <BackgroundGrainTexture />
            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
              <div className="max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">More than an inbox</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[0.01em]! sm:text-4xl">Catch us around the table.</h2>
                <p className="mt-4 text-base leading-relaxed text-cocoa">Follow along for launch updates, local food and what we are cooking up next.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticFillButton
                  href="https://www.instagram.com/quickbite.01?stkn=MWNieGR5c2U4NWdycQ%3D%3D"
                  external
                  rel="noopener noreferrer"
                  ariaLabel="QuickBite on Instagram (opens in a new tab)"
                  variant="cream"
                  className="min-h-14 rounded-full bg-paper! px-6 py-4 text-sm"
                >
                  <svg aria-hidden="true" className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </MagneticFillButton>
                <MagneticFillButton
                  href="https://x.com/quickbite01?s=11"
                  external
                  rel="noopener noreferrer"
                  ariaLabel="QuickBite on X (opens in a new tab)"
                  variant="cream"
                  className="min-h-14 rounded-full bg-paper! px-6 py-4 text-sm"
                >
                  Follow on X
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </MagneticFillButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTA
        id="contact-final-cta"
        heading="Stay in the loop"
        supportingCopy="Good things are on the menu. Hear it first."
        actionLabel="Join the waitlist"
        actionHref="/waitlist"
        splitBackground={false}
      />
    </>
  );
}
