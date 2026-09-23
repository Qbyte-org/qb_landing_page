import { ArrowUpRight, Bike, Mail, MapPin, Store } from "lucide-react";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import SectionWave from "@/components/ui/SectionWave";
import ContactMessageForm from "./ContactMessageForm";

const contactEmail = "quickbiteinfo01@gmail.com";

export default function ContactExperience() {
  return (
    <>
      <section id="contact-hero" aria-labelledby="contact-title" data-nav-theme="hero" data-scroll-hero className="overflow-hidden bg-dark-ink pb-18 pt-36 text-paper sm:pb-22 sm:pt-44 lg:pb-28 lg:pt-52">
        <Container className="max-w-[1440px]!">
          <div className="relative isolate rounded-[2rem] border border-paper/15 bg-ink-soft sm:rounded-[3rem]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
              <svg viewBox="0 0 1000 936" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-paper/15">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><use href="/maps/ile-ife-osm.svg#minor" strokeWidth="1" /><use href="/maps/ile-ife-osm.svg#major" strokeWidth="2.5" /></g>
              </svg>
              <div className="absolute inset-0 bg-linear-to-t from-dark-ink via-dark-ink/35 to-transparent" />
            </div>
            <div className="grid gap-8 p-5 sm:gap-10 sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12 xl:gap-18 xl:p-16">
              <div data-scroll-hero-copy className="flex min-w-0 flex-col justify-between py-4 sm:py-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/65"><MapPin size={16} className="text-brand" aria-hidden="true" />Starting in Ile-Ife, Nigeria</div>
                <div className="py-12 sm:py-14 lg:py-20">
                  <span aria-hidden="true" className="mb-6 flex size-12 items-center justify-center rounded-full bg-brand text-paper"><Mail size={24} strokeWidth={1.6} /></span>
                  <h1 id="contact-title" className="font-display text-[2.7rem] font-semibold leading-[1.03] tracking-[0.01em]! sm:text-6xl lg:text-[4.5rem] xl:text-[5.4rem]">Contact us.<br /><span className="text-brand">Pull up a chair.</span></h1>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-paper/70 sm:text-lg">Questions, ideas or a little hello. There is always room for a conversation at the QuickBite table.</p>
                </div>
                <div className="border-t border-paper/20 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">Write to us</p>
                  <a href={`mailto:${contactEmail}`} className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-base font-semibold underline decoration-paper/25 underline-offset-8 hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:text-lg">{contactEmail}<ArrowUpRight size={17} className="shrink-0" aria-hidden="true" /></a>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <MagneticFillButton href="https://www.instagram.com/quickbite.01?stkn=MWNieGR5c2U4NWdycQ%3D%3D" external rel="noopener noreferrer" ariaLabel="QuickBite on Instagram (opens in a new tab)" variant="dark" className="min-h-11 rounded-full border! border-paper/20! bg-dark-ink! px-4 py-2 text-xs">Instagram<ArrowUpRight size={14} aria-hidden="true" /></MagneticFillButton>
                    <MagneticFillButton href="https://x.com/quickbite01?s=11" external rel="noopener noreferrer" ariaLabel="QuickBite on X (opens in a new tab)" variant="dark" className="min-h-11 rounded-full border! border-paper/20! bg-dark-ink! px-4 py-2 text-xs">Follow on X<ArrowUpRight size={14} aria-hidden="true" /></MagneticFillButton>
                  </div>
                </div>
              </div>
              <ContactMessageForm />
            </div>
          </div>
          <p className="mt-5 text-right text-[0.65rem] text-paper/40">Map data © <a href="https://www.openstreetmap.org/copyright" className="underline underline-offset-2">OpenStreetMap contributors</a>. Ile-Ife city map.</p>
        </Container>
      </section>
      <SectionWave to="paper" />

      <section data-nav-theme="neutral" aria-label="Connect with QuickBite" className="bg-paper py-12 text-ink sm:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {[
              { icon: Store, title: "A kitchen with something good?", text: "Find out how to bring your food to the QuickBite table.", href: "/partners", action: "Explore partnerships" },
              { icon: Bike, title: "Ready for your next ride?", text: "Discover what we are building for future delivery riders.", href: "/riders", action: "Meet the rider community" },
            ].map((item) => (
              <Reveal key={item.href} className="flex gap-4 border-t border-ink/15 pt-7 sm:gap-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream-200 text-brand"><item.icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
                <div className="min-w-0"><h2 className="font-display text-xl font-semibold sm:text-2xl">{item.title}</h2><p className="mt-3 text-sm leading-relaxed text-cocoa sm:text-base">{item.text}</p><a href={item.href} className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-semibold underline decoration-ink/25 underline-offset-8 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{item.action}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /></a></div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <FAQ />
      <FinalCTA id="contact-final-cta" heading="Stay in the loop" supportingCopy="Good things are on the menu. Hear it first." actionLabel="Join the waitlist" actionHref="/waitlist" splitBackground={false} />
    </>
  );
}
