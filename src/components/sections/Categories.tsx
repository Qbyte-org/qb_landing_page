"use client";

import { categoriesCopy } from "@/content/home/sections";

import { useRef, useSyncExternalStore } from "react";
import { categories } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import CategoriesDecor from "./categories/CategoriesDecor";
import CategoryCard from "./categories/CategoryCard";
import {
  HomeToCategoriesWave,
} from "./categories/CategoryWaveDivider";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const desktopQuery = "(min-width: 768px)";
const mobileCategories = categories.filter(category => categoriesCopy.mobileCategoryNames.includes(category.name));
const carouselItems = [...categories, ...categories];
const subscribeToDesktop = (listener: () => void) => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
const getDesktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const getServerSnapshot = () => false;

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getDesktopSnapshot, getServerSnapshot);

  useGSAP(
    () => {
      if (!isDesktop) return;
      const track = trackRef.current;
      const carousel = carouselRef.current;
      if (!track || !carousel) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 68,
          ease: "none",
          repeat: -1,
          paused: true,
        });
        tweenRef.current = tween;

        let visible = false;
        let hovered = false;
        let focused = carousel.contains(document.activeElement);
        const updatePlayback = () => {
          tween.paused(!visible || document.hidden || hovered || focused);
        };
        const enter = () => { hovered = true; updatePlayback(); };
        const leave = () => { hovered = false; updatePlayback(); };
        const focus = () => { focused = true; updatePlayback(); };
        const blur = (event: FocusEvent) => {
          focused = event.relatedTarget instanceof Node && carousel.contains(event.relatedTarget);
          updatePlayback();
        };
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          updatePlayback();
        });
        observer.observe(carousel);

        carousel.addEventListener("mouseenter", enter);
        carousel.addEventListener("mouseleave", leave);
        carousel.addEventListener("focusin", focus);
        carousel.addEventListener("focusout", blur);
        document.addEventListener("visibilitychange", updatePlayback);

        return () => {
          observer.disconnect();
          carousel.removeEventListener("mouseenter", enter);
          carousel.removeEventListener("mouseleave", leave);
          carousel.removeEventListener("focusin", focus);
          carousel.removeEventListener("focusout", blur);
          document.removeEventListener("visibilitychange", updatePlayback);
          tween.kill();
          tweenRef.current = null;
        };
      });
      return () => media.revert();
    },
    { scope: carouselRef, dependencies: [isDesktop], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="categories"
      data-nav-theme="neutral"
      className="relative overflow-visible bg-paper pb-[9.5rem] pt-[7.5rem] text-ink sm:pb-[8.5rem] sm:pt-44 lg:pb-52"
    >
      <CategoriesDecor />
      <HomeToCategoriesWave />

      <Container className="relative">
        {/* <div className="relative mx-auto mb-16 flex w-full justify-center">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[48%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl sm:h-72 sm:w-72"
          />
          <Image
            src="/images/phone.png"
            alt="QuickBite mobile app preview"
            width={433}
            height={577}
            priority
            sizes="(min-width: 1024px) 360px, 78vw"
            className="relative z-10 h-auto w-[min(78vw,21rem)] select-none object-contain sm:w-[23rem] lg:w-[24rem]"
          />
        </div> */}

        <SectionHeading
          warm
          title={categoriesCopy.titleWhatAreYouCraving}
          subtitle={categoriesCopy.subtitleFromSmokyJollofToLateNight}
        />
      </Container>

      {isDesktop ? <div
        ref={carouselRef}
        data-categories-carousel
        className="relative z-10 mt-12 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-28"
        />

        <div
          ref={trackRef}
          data-categories-track
          className="flex w-max gap-6 px-4 will-change-transform sm:gap-9"
        >
          {carouselItems.map((category, index) => (
            <CategoryCard
              key={`${category.name}-${index}`}
              category={category}
              duplicate={index >= categories.length}
            />
          ))}
        </div>
      </div> : <Container className="relative z-10 mt-10 grid gap-5">
        {mobileCategories.map(category => (
          <CategoryCard key={category.name} category={category} layout="grid" actionAriaLabel={categoriesCopy.actionAriaLabelBrowseFormat(category.name.toLowerCase())} />
        ))}
      </Container>}
    </section>
  );
}
