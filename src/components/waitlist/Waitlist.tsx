"use client";

import { useRef } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { waitlistCopy, waitlistPerks } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";
import LinkArrow from "../ui/LinkArrow";
import Logo from "../ui/Logo";
import MagneticFillButton from "../ui/MagneticFillButton";
import AnimatedBackground from "./AnimatedBackground";
import WaitlistForm from "./WaitlistForm";

export default function Waitlist({ initialEmail = "" }: { initialEmail?: string }) {
  const pageRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("[data-waitlist-enter]", { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out",
      clearProps: "opacity,transform",
    });
  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="qb-waitlist relative isolate min-h-screen overflow-x-clip bg-ink text-paper">
      <AnimatedBackground />
      <div className="relative">
        <section id="waitlist-hero" data-scroll-hero className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 py-6 sm:px-6 lg:pt-18 lg:pb-4">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <p data-scroll-hero-media className="outline-display text-center text-[20vw] font-bold leading-none tracking-wider text-transparent">
              {waitlistCopy.background[0]}<br />{waitlistCopy.background[1]}
            </p>
          </div>

          <div data-waitlist-enter className="relative z-10 mx-auto mb-5 flex w-full max-w-xl items-center justify-between gap-3 lg:absolute lg:inset-x-8 lg:top-5 lg:m-0 lg:w-auto lg:max-w-none">
            <Logo variant="light" width={145} height={28} />
            <MagneticFillButton
              href={waitlistCopy.homeHref}
              ariaLabel={waitlistCopy.homeAriaLabel}
              variant="dark"
              className="min-h-11 rounded-full border! border-paper/20! bg-dark-ink/50! px-3 py-2 text-xs sm:px-4 sm:text-sm"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {waitlistCopy.homeLabel}
            </MagneticFillButton>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div data-waitlist-enter className="hero-panel relative overflow-hidden rounded-t-[1.75rem] bg-paper/[0.07] p-5 py-8 backdrop-blur-[14px] transition-colors duration-300 hover:bg-paper/[0.1] sm:rounded-t-[2rem] sm:px-8 sm:py-16">
              <div className="relative flex items-center justify-center">
                <h1 className="font-display mb-3 inline-block text-center text-3xl font-bold sm:text-5xl">
                  <span className="bg-gradient-to-b from-paper to-tan bg-clip-text text-transparent">{waitlistCopy.heading}</span>
                </h1>
              </div>
              <p className="relative mx-auto mb-5 max-w-xl text-center text-sm leading-relaxed text-apricot">
                {waitlistCopy.introduction}
              </p>
              <WaitlistForm initialEmail={initialEmail} />

              <div data-waitlist-enter className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <div className="relative flex w-auto max-w-full min-w-0 shrink-0 items-center gap-2 rounded-xl border border-paper/[0.102] bg-paper/[0.14] p-1 backdrop-blur-xl sm:gap-3">
                  <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border border-brand-light/[0.28] bg-paper/[0.16]">
                    <MapPin className="size-4 text-white sm:size-5" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 min-w-0 whitespace-normal pr-2 text-[11px] font-semibold text-white sm:pr-4 sm:text-sm">{waitlistCopy.location}</span>
                </div>
                <div className="relative flex w-auto max-w-full min-w-0 shrink-0 items-center gap-1 rounded-xl border border-paper/[0.102] bg-paper/[0.14] p-1 px-5 backdrop-blur-xl">
                  {/* <span role="img" aria-label="QuickBite social updates coming soon" title="QuickBite social updates coming soon" className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border border-brand-light/[0.28] bg-paper/[0.16] sm:size-12">
                    <MessageCircle className="size-4 text-white/60 sm:size-5" aria-hidden="true" />
                  </span> */}
                  <LinkArrow href={waitlistCopy.emailHref} variant="dark" ariaLabel={waitlistCopy.emailAriaLabel} className="relative z-10 min-h-10 w-32 gap-2! text-[11px]! font-semibold tracking-[0.08em] sm:w-40 sm:text-xs! [--link-arrow-min-width:0px] [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.1em]">
                    {waitlistCopy.emailLabel}
                  </LinkArrow>
                </div>
              </div>
            </div>
          </div>

          <div data-waitlist-enter className="relative z-10 mx-auto mt-2 flex w-full max-w-xl flex-wrap items-center justify-center gap-2 sm:gap-3">
            {waitlistPerks.map(({ label, icon: Icon }) => (
              <div key={label} className="relative flex w-auto max-w-full min-w-0 shrink-0 items-center gap-2 rounded-b-xl border border-paper/[0.102] bg-paper/[0.14] p-2 pr-3 backdrop-blur-xl sm:gap-3 sm:p-1 sm:pr-4">
                <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-b-xl border border-brand-light/[0.28] bg-paper/[0.16] sm:size-9">
                  <Icon className="size-3 text-white sm:size-5" aria-hidden="true" />
                </span>
                <span className="relative z-10 min-w-0 whitespace-normal text-xs font-semibold text-white sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

