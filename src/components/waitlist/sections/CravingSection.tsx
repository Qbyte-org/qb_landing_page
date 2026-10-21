"use client";

import { useRef } from "react";
import { waitlistPage } from "@/content/waitlist";
import { gsap, useGSAP } from "@/lib/gsap";

const { lines, answer } = waitlistPage.craving;

export default function CravingSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // The sentence is read at the pace of the scroll: each word brightens as it is reached.
      gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "+=140%", pin: true, scrub: 0.6 },
      })
        .fromTo("[data-craving-word]", { opacity: 0.16 }, { opacity: 1, stagger: 0.12, ease: "none" })
        .fromTo("[data-craving-answer]", { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 }, ">-0.1");
    });
  }, { scope: rootRef });

  return (
    <section ref={rootRef} aria-label="Why QuickBite" className="relative isolate flex min-h-svh items-center overflow-clip bg-dark-ink text-paper">
      <div className="relative mx-auto w-full max-w-[90rem] px-5 py-24 sm:px-8 lg:px-12">
        <p className="max-w-[22ch] font-display text-[clamp(2.1rem,5.2vw,5rem)] font-semibold leading-[1.06] tracking-[-0.04em]">
          {lines.map((line) => (
            <span key={line} className="block [&+&]:mt-[0.3em]">
              {line.split(" ").map((word, index) => (
                <span key={`${word}-${index}`} data-craving-word className="inline-block whitespace-pre">{`${word} `}</span>
              ))}
            </span>
          ))}
        </p>
        <p data-craving-answer className="mt-10 max-w-[22ch] font-display text-[clamp(2.1rem,5.2vw,5rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-brand-light sm:mt-14">{answer}</p>
      </div>
    </section>
  );
}
