"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { heroImage } from "@/content/site";
import { useHeroTransition } from "@/hooks/use-hero-transition";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import TypewriterText from "../ui/TypewriterText";

const rotatingHeadlines = ["Growth.", "Taste.", "Orders.", "Joy."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeroTransition(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative z-20 isolate overflow-visible bg-[#2a211d] text-white"
    >
      <div className="relative pb-16 pt-36 sm:pb-18 sm:pt-44 lg:pb-20 lg:pt-72 xl:pb-20 xl:pt-[15rem]">
        <Container className="relative z-20 max-w-[103rem]">
          <div
            data-hero-copy
            className="max-w-6xl sm:pl-10 xl:pl-32"
          >
            <h1
              data-hero-title
              aria-label="Food For All, Powering Growth."
              className="font-display text-[2.85rem] font-extrabold leading-[1.05] text-white min-[430px]:text-[3.35rem] sm:text-6xl lg:text-7xl xl:text-[6.5rem]"
            >
              <span className="block">Food For All,</span>
              <span className="block">
                Powering{" "}
                <TypewriterText
                  words={rotatingHeadlines}
                  className="inline-grid text-[#ff4f1f]"
                  typeSpeed={92}
                  deleteSpeed={58}
                  pause={4200}
                />
              </span>
            </h1>
          </div>
        </Container>

        <Container className="pointer-events-none absolute inset-x-0 bottom-0 z-30 max-w-[103rem]">
          <div data-hero-actions className="translate-y-1/2 sm:pl-10 xl:pl-32">
            <MagneticFillButton
              href="/restaurants"
              variant="brand"
              className="pointer-events-auto h-16 cursor-pointer rounded-4xl border-[#ff4f1f] bg-[#ff4f1f] px-9 text-base font-extrabold"
            >
              Order now
              <ArrowRight className="h-5 w-5" strokeWidth={2.35} aria-hidden="true" />
            </MagneticFillButton>
          </div>
        </Container>
      </div>

      <div
        data-hero-image-target
        data-hero-next-image
        className="relative h-[17rem] w-full overflow-hidden rounded-tr-[4rem] bg-cream sm:h-[23rem] sm:rounded-tr-[6rem] lg:h-[clamp(21rem,46svh,32rem)] xl:h-[clamp(22rem,46svh,34rem)]"
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,33,29,0.08),rgba(42,33,29,0)_42%)]"
        />
        <div className="absolute bottom-5 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-pill border border-white/70 bg-white/90 px-4 py-3 text-sm font-bold text-[#24180f] backdrop-blur-md sm:left-8 sm:max-w-none">
          <MapPin
            className="h-4 w-4 shrink-0 text-brand-dark"
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <span className="truncate">Delivered fresh across Ile-Ife</span>
          <span className="hidden h-1 w-1 rounded-pill bg-[#d7c0aa] sm:block" />
          <span className="hidden items-center gap-1.5 text-muted sm:flex">
            <Clock3 className="h-3.5 w-3.5 text-brand-dark" aria-hidden="true" />
            25 min average
          </span>
        </div>
      </div>

    </section>
  );
}
