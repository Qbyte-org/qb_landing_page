"use client";

import { useRef } from "react";
import { categories } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import CategoriesDecor from "./categories/CategoriesDecor";
import CategoryCard from "./categories/CategoryCard";
import {
  CategoriesToHowWave,
  HomeToCategoriesWave,
} from "./categories/CategoryWaveDivider";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const carousel = carouselRef.current;
      if (!track) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(track, { xPercent: 0 });
        return;
      }

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 68,
        ease: "none",
        repeat: -1,
      });
      tweenRef.current = tween;

      const pause = () => tween.pause();
      const resume = () => tween.resume();

      carousel?.addEventListener("mouseenter", pause);
      carousel?.addEventListener("mouseleave", resume);
      carousel?.addEventListener("focusin", pause);
      carousel?.addEventListener("focusout", resume);

      return () => {
        carousel?.removeEventListener("mouseenter", pause);
        carousel?.removeEventListener("mouseleave", resume);
        carousel?.removeEventListener("focusin", pause);
        carousel?.removeEventListener("focusout", resume);
        tween.kill();
        tweenRef.current = null;
      };
    },
    { scope: carouselRef },
  );

  useGSAP(
    () => {
      const waveBikes = [
        {
          pathSelector: "[data-home-bike-path]",
          bikeSelector: "[data-home-wave-bike]",
          duration: 22,
          reducedStart: 0.34,
        },
        {
          pathSelector: "[data-between-bike-path]",
          bikeSelector: "[data-between-wave-bike]",
          duration: 24,
          reducedStart: 0.64,
        },
      ];
      const tweens: gsap.core.Tween[] = [];
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      waveBikes.forEach(({ pathSelector, bikeSelector, duration, reducedStart }) => {
        const path = sectionRef.current?.querySelector<SVGPathElement>(
          pathSelector,
        );
        const bike = sectionRef.current?.querySelector<SVGElement>(
          bikeSelector,
        );
        if (!path || !bike) return;

        gsap.set(bike, {
          xPercent: -50,
          yPercent: -66,
          transformOrigin: "50% 66%",
          autoAlpha: 1,
        });

        if (reducedMotion) {
          gsap.set(bike, {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.66],
              autoRotate: true,
              start: reducedStart,
              end: reducedStart,
            },
          });
          return;
        }

        const tween = gsap.to(bike, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          duration,
          ease: "none",
          repeat: -1,
        });
        tweens.push(tween);
      });

      return () => {
        tweens.forEach((tween) => tween.kill());
      };
    },
    { scope: sectionRef },
  );

  const carouselItems = [...categories, ...categories];

  return (
    <section
      ref={sectionRef}
      id="categories"
      data-nav-theme="neutral"
      className="relative overflow-visible bg-[#fffaf5] pb-[5.5rem] pt-[4.5rem] sm:pb-[8.5rem] sm:pt-24 lg:pb-40"
    >
      <CategoriesDecor />
      <HomeToCategoriesWave />
      <CategoriesToHowWave />

      <Container className="relative">
        {/* <div className="relative mx-auto mb-16 flex w-full justify-center">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[48%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b00]/10 blur-3xl sm:h-72 sm:w-72"
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
          title="What are you in the mood for?"
          subtitle="From smoky jollof to late-night small chops, pick a category and dig in."
        />
      </Container>

      <div
        ref={carouselRef}
        data-categories-carousel
        className="relative z-10 mt-4 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffaf5] to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fffaf5] to-transparent sm:w-28"
        />

        <div
          ref={trackRef}
          data-categories-track
          className="flex w-max gap-6 px-4 will-change-transform sm:gap-9 lg:gap-12"
        >
          {carouselItems.map((category, index) => (
            <CategoryCard
              key={`${category.name}-${index}`}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
