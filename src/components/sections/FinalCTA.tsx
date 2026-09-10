"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Navigation,
  Store,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { JollofRiceLineArt } from "../ui/LineArt";

const serviceDetails = [
  { label: "20-45 min delivery", icon: Clock3 },
  { label: "Live order tracking", icon: Navigation },
  { label: "Local kitchens", icon: Store },
] as const;

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (
        !section ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const copy = section.querySelector<HTMLElement>("[data-cta-copy]");
      const media = section.querySelector<HTMLElement>("[data-cta-media]");
      const details = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-cta-detail]"),
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .from(copy, { autoAlpha: 0, y: 24, duration: 0.72 })
        .from(
          media,
          { autoAlpha: 0, x: 26, scale: 0.985, duration: 0.78 },
          "-=0.48",
        )
        .from(
          details,
          { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.055 },
          "-=0.4",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      data-nav-theme="neutral"
      aria-labelledby="final-cta-title"
      className="relative scroll-mt-24 overflow-hidden bg-[#fffaf5] py-14 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="relative isolate overflow-hidden rounded-xl2 border border-[#2a211d]/10 bg-[#2a211d] text-[#fffaf5]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,250,245,.8)_1px,transparent_1px)] [background-size:18px_18px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 left-2 z-0 hidden font-display text-8xl font-extrabold leading-none text-[#fffaf5]/[0.035] lg:block xl:text-[8rem]"
          >
            QUICKBITE
          </span>

          <div className="relative z-10 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
            <div
              data-cta-copy
              className="relative flex min-w-0 flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:min-h-[34rem] lg:px-14 xl:px-16"
            >
              <JollofRiceLineArt className="pointer-events-none absolute -right-12 top-6 h-36 w-44 rotate-12 text-[#f06400]/20 sm:right-3 sm:h-44 sm:w-52 lg:-right-8 lg:top-8" />

              <div className="relative z-10">
                <p className="inline-flex items-center gap-2 rounded-pill border border-[#fffaf5]/15 bg-[#fffaf5]/8 px-3.5 py-2 text-xs font-bold text-[#ffd8bd]">
                  <MapPin
                    className="h-4 w-4 text-[#f06400]"
                    aria-hidden="true"
                  />
                  Delivering across Ile-Ife
                </p>

                <h2
                  id="final-cta-title"
                  className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] text-[#fffaf5] sm:text-5xl lg:text-6xl"
                >
                  Good food is closer than you think.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f0d7c2] sm:text-lg">
                  Find trusted local kitchens, pick what you are craving, and
                  follow every order from the first tap to your door.
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Button
                    href="/restaurants"
                    variant="white"
                    size="lg"
                    className="w-full whitespace-nowrap text-base sm:w-auto sm:text-lg"
                  >
                    Explore restaurants
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    href="/waitlist"
                    variant="dark"
                    size="lg"
                    className="w-full border border-[#fffaf5]/15 sm:w-auto"
                  >
                    Join the waitlist
                  </Button>
                </div>

                <ul className="mt-10 grid gap-3 border-t border-[#fffaf5]/12 pt-5 sm:grid-cols-3">
                  {serviceDetails.map(({ label, icon: Icon }) => (
                    <li
                      key={label}
                      data-cta-detail
                      className="flex items-center gap-2 text-xs font-semibold text-[#f0d7c2]"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#f06400]"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              data-cta-media
              className="group relative min-h-[19rem] overflow-hidden border-t border-[#fffaf5]/12 bg-[#17110f] sm:min-h-[25rem] lg:m-3 lg:ml-0 lg:min-h-0 lg:rounded-card lg:border"
            >
              <Image
                src="/images/food/hero-fast.webp"
                alt="Golden samosas served with peppers and dipping sauces"
                fill
                loading="lazy"
                quality={72}
                sizes="(min-width: 1280px) 470px, (min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.025]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,17,15,.72),transparent_54%)]"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div data-cta-detail className="min-w-0">
                  <p className="text-xs font-bold text-[#ffd8bd]">
                    Picked nearby
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    Packed fresh. Sent fast.
                  </p>
                </div>
                <span
                  data-cta-detail
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f06400] text-white sm:h-12 sm:w-12"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2.3} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
