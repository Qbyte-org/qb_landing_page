"use client";

import { useRef } from "react";
import { CircleDollarSign, Crown, MapPin, MessageCircle, Timer } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import LinkArrow from "../ui/LinkArrow";
import AnimatedBackground from "./AnimatedBackground";
import WaitlistForm from "./WaitlistForm";

const perks = [
  { label: "Early bird perks", icon: Crown },
  { label: "Fast delivery", icon: Timer },
  { label: "No hidden fees", icon: CircleDollarSign },
];

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
    <main ref={pageRef} className="qb-waitlist relative isolate min-h-screen overflow-x-clip bg-[#2a211d] text-[#fffaf5]">
      <AnimatedBackground />
      <div className="relative">
        <section id="waitlist-hero" className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-0">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <p className="outline-display text-center text-[20vw] font-bold leading-none tracking-wider text-transparent">
              Coming<br />soon!
            </p>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div data-waitlist-enter className="hero-panel relative overflow-hidden rounded-t-[32px] bg-[#fffaf5]/[0.07] p-4 py-6 backdrop-blur-[14px] transition-colors duration-300 hover:bg-[#fffaf5]/[0.1] sm:p-8 sm:py-10">
              <div className="relative flex items-center justify-center max-sm:mt-10">
                <h1 className="font-display mb-4 inline-block text-center text-3xl font-bold sm:text-5xl">
                  <span className="bg-gradient-to-b from-[#fffaf5] to-[#c9aa96] bg-clip-text text-transparent">Join our waitlist!</span>
                </h1>
              </div>
              <p className="relative mb-4 px-2 text-center text-sm leading-relaxed text-[#f0d7c2] sm:mb-6 sm:px-0">
                Be first to know when QuickBite starts delivering fast, fresh meals from local favourites near you.
              </p>
              <WaitlistForm initialEmail={initialEmail} />

              <div data-waitlist-enter className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <div className="relative flex w-auto max-w-full min-w-0 shrink-0 items-center gap-2 rounded-xl border border-[#fffaf51a] bg-[#fffaf5]/[0.14] p-1 backdrop-blur-xl sm:gap-3">
                  <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16] sm:size-12">
                    <MapPin className="size-4 text-white sm:size-5" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 min-w-0 whitespace-normal pr-2 text-[11px] font-semibold text-white sm:pr-4 sm:text-sm">Launching in Ile-Ife</span>
                </div>
                <div className="relative flex w-auto max-w-full min-w-0 shrink-0 items-center gap-1 rounded-xl border border-[#fffaf51a] bg-[#fffaf5]/[0.14] p-1 backdrop-blur-xl">
                  <span className="relative z-10 mr-1 min-w-0 whitespace-normal pl-2 text-[11px] font-semibold text-white sm:mr-2 sm:pl-3 sm:text-sm">Stay in touch</span>
                  <span role="img" aria-label="QuickBite social updates coming soon" title="QuickBite social updates coming soon" className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16] sm:size-12">
                    <MessageCircle className="size-4 text-white/60 sm:size-5" aria-hidden="true" />
                  </span>
                  <LinkArrow href="mailto:support@quickbite.ng" variant="dark" ariaLabel="Send QuickBite a message" className="relative z-10 min-h-9 w-28 min-w-0! gap-3! border-paper/25! px-2 text-[10px]! [--link-arrow-min-width:0px] [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.1em] sm:min-h-12">
                    Email us
                  </LinkArrow>
                </div>
              </div>
            </div>
          </div>

          <div data-waitlist-enter className="relative z-10 mx-auto mt-2 flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4.5">
            {perks.map(({ label, icon: Icon }) => (
              <div key={label} className="relative flex w-auto max-w-full min-w-0 shrink-0 items-center gap-2 rounded-b-xl border border-[#fffaf51a] bg-[#fffaf5]/[0.14] p-2 pr-3 backdrop-blur-xl sm:gap-3 sm:p-1 sm:pr-4">
                <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-b-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16] sm:size-12">
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

