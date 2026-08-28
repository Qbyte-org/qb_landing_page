"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import { gsap, useGSAP } from "@/lib/gsap";
import { CategoriesToHowWave, HomeToCategoriesWave } from "./categories/CategoryWaveDivider";
import CategoriesDecor from "./categories/CategoriesDecor";

function AppStoreIcon() {
  return (
    <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.3s-2.1-.8-2.1-3.3ZM14.2 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 0 2-.6 2.5-1.2Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.6 2.3 13 11.7 3.6 21.1c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Zm10.8 8.4 2.9-2.9 3.3 1.9c.8.5.8 1.6 0 2.1l-3.3 1.9-2.9-3Zm-1 1 2.9 2.9-9.4 5.4 6.5-8.3Zm0-2L6.9 1.7l9.4 5.4-2.9 2.9Z" />
    </svg>
  );
}

function PhoneBadgeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      <rect x="7" y="2.75" width="10" height="18.5" rx="2.5" />
      <path d="M10.5 18.25h3" />
    </svg>
  );
}

function StoreButton({
  store,
  icon,
}: {
  store: "App Store" | "Google Play";
  icon: ReactNode;
}) {
  return (
    <MagneticFillButton
      href="#"
      variant="dark"
      customFillClass={store === "App Store" ? "bg-[#2a211d]" : "bg-[#f06400]"}
      customHoverTextColor="#fffaf5"
      ariaLabel={store === "App Store" ? "Download on the App Store" : "Get it on Google Play"}
      className={`h-11 min-w-[8.8rem] rounded-[0.65rem] px-3 text-[#fffaf5] before:pointer-events-none before:absolute before:inset-y-0 before:-left-14 before:z-[1] before:w-8 before:rotate-12 before:bg-[#fffaf5]/35 before:blur-sm before:transition-transform before:duration-700 hover:before:translate-x-[15rem] sm:h-12 sm:min-w-[9.75rem] sm:px-4 ${store === "App Store" ? "bg-[#f06400]" : "bg-[#2a211d]"
        }`}
    >
      <span className="shrink-0 text-[#fffaf5]">{icon}</span>
      <span className="text-left leading-none">
        <span className="block text-[0.52rem] font-bold uppercase tracking-[0.07em] text-[#fffaf5]/75">
          {store === "App Store" ? "Download on the" : "Get it on"}
        </span>
        <span className="mt-1 block text-[0.82rem] font-black tracking-[-0.03em] text-[#fffaf5] sm:text-sm">
          {store}
        </span>
      </span>
    </MagneticFillButton>
  );
}

export default function AppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const banner = section.querySelector<HTMLElement>("[data-app-banner]");
      const copy = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-app-copy]"),
      );

      if (reducedMotion) {
        gsap.set([banner, ...copy], { clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
        },
      });

      tl.from(banner, {
        y: 28,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          copy,
          {
            y: 18,
            duration: 0.48,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="app"
      data-nav-theme="light"
      className="relative isolate overflow-hidden bg-[#fffaf5] py-10 text-[#241813] sm:py-14 lg:py-16"
    >
      {/* <CategoriesDecor /> */}
      {/* <HomeToCategoriesWave /> */}
      {/* <CategoriesToHowWave /> */}
      <Container>
        <div
          data-app-banner
          className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[1.8rem] bg-[#fffaf5] px-5 py-7 ring-1 ring-[#2a211d]/8 sm:rounded-[2.25rem] sm:px-8 sm:py-8 lg:min-h-[19.5rem] lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-8 lg:px-12"
        >
          <div className="relative z-10 min-h-[15rem] sm:min-h-[18rem] lg:min-h-[19.5rem]">
            <div
              data-app-phone
              className="absolute -left-12 bottom-[-9.5rem] z-20 w-[20rem] rotate-[-14deg] sm:-left-14 sm:bottom-[-12rem] sm:w-[25.5rem] lg:-left-16 lg:bottom-[-13.75rem] lg:w-[29rem]"
            >
              <Image
                src="/images/phone.png"
                alt="QuickBite mobile app preview"
                width={433}
                height={577}
                sizes="(min-width: 1024px) 392px, 74vw"
                priority
                className="pointer-events-none h-auto w-full select-none object-contain"
              />
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-start justify-center pb-2 lg:pb-0">
            <span
              data-app-copy
              className="inline-flex items-center gap-2 rounded-full bg-[#ffe7d7] px-3.5 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#f06400]"
            >
              <PhoneBadgeIcon />
              Get the App
            </span>

            <h2
              data-app-copy
              className="mt-4 max-w-md font-display text-[2.1rem] font-black leading-[0.96] tracking-[-0.06em] text-[#241813] sm:text-4xl lg:text-[2.75rem]"
            >
              Download our
              <br />
              <span className="text-[#f06400]">mobile app</span>
            </h2>

            <p
              data-app-copy
              className="mt-4 max-w-md text-sm font-semibold leading-relaxed text-[#745f54] sm:text-base"
            >
              Enjoy faster ordering, exclusive offers and real-time tracking.
            </p>

            <div data-app-copy className="mt-5 flex flex-wrap items-center gap-3">
              <StoreButton store="App Store" icon={<AppStoreIcon />} />
              <StoreButton store="Google Play" icon={<GooglePlayIcon />} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
