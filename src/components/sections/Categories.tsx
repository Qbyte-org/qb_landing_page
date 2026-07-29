"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  Star,
} from "lucide-react";
import { categories, type Category } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import SectionHeading from "../ui/SectionHeading";

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <article
      className="relative w-[34rem] shrink-0 overflow-visible px-5 pt-20 text-[#3a2418] sm:w-[40rem] lg:w-[42rem]"
    >
      <div
        className="absolute inset-x-5 bottom-0 top-[7.15rem] rounded-[3.3rem] bg-[#efecf4] ring-1 ring-[#d9ced5]"
        style={{ backgroundColor: category.tint }}
      />

      <svg
        className="pointer-events-none absolute left-5 right-5 top-[7.15rem] h-32 w-[calc(100%-2.5rem)] text-[#fffaf5]"
        viewBox="0 0 532 148"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H532V89C459 69 424 116 357 108C278 99 260 48 181 70C111 89 82 130 0 101V0Z"
          fill="currentColor"
        />
        <path
          d="M0 101C82 130 111 89 181 70C260 48 278 99 357 108C424 116 459 69 532 89"
          fill="none"
          stroke="#8f6a57"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeOpacity=".62"
          strokeWidth="2.4"
        />
      </svg>

      <Image
        src={category.image}
        alt={`${category.name} cutout`}
        width={410}
        height={310}
        className="absolute -top-3 left-6 z-10 h-52 w-80 rotate-[-5deg] object-contain sm:left-10 sm:h-60 sm:w-[23rem] lg:w-[24.5rem]"
      />

      <div className="absolute right-9 top-24 z-20 grid h-[5.25rem] w-[5.25rem] place-items-center rounded-full bg-white text-center text-[0.62rem] font-black uppercase leading-tight text-[#4a2416] ring-1 ring-[#eaded6]">
        <span>
          <span className="block text-[#7a6357]">Ready</span>
          <span className="block text-lg leading-none text-[#f06400]">{category.time}</span>
        </span>
      </div>

      <div className="relative z-10 mt-40 px-9 sm:px-11">
        <div className="mb-5 flex items-center justify-between text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#6d554a]">
          <span className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 text-[#f06400]" strokeWidth={2.4} />
            {category.meta}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-[#f3a629] text-[#f3a629]" strokeWidth={2.2} />
            {category.rating}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-serif text-xl font-black italic leading-none text-[#7c4f2c]">
              QuickBite
            </p>
            <h3 className="mt-1 font-display text-[2.65rem] font-black leading-none text-[#4a2416] sm:text-[3rem]">
              {category.name}
            </h3>
          </div>
          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            className="mb-1 h-12 shrink-0 rounded-pill border-0 bg-[#f3a629] px-6 text-[0.88rem] font-black uppercase tracking-[0.08em] text-[#3a2418]"
          >
            Order now
          </MagneticFillButton>
        </div>
        <p className="mt-6 min-h-[4.5rem] max-w-[30rem] text-[0.96rem] font-semibold leading-snug text-[#4a3d38]/80">
          {category.description}
        </p>
      </div>
    </article>
  );
}

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
      className="relative overflow-visible bg-[#fffaf5] pb-28 pt-24 sm:pb-48 sm:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(#3a2418_0.65px,transparent_0.65px)] [background-size:18px_18px]"
      />
      <Image
        src="/food/jollof.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute left-[9%] top-44 hidden w-20 -rotate-12 opacity-[0.075] lg:block"
      />
      <Image
        src="/food/drinks.svg"
        alt=""
        width={140}
        height={140}
        className="pointer-events-none absolute right-[13%] top-72 hidden w-18 rotate-12 opacity-[0.08] lg:block"
      />
      <Image
        src="/food/pastries.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute bottom-44 left-[17%] hidden w-20 rotate-6 opacity-[0.07] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 z-10 h-36 overflow-hidden sm:-top-32 sm:h-48"
      >
        <svg
          className="h-full w-full overflow-hidden text-[#fffaf5]"
          viewBox="0 0 1440 210"
          preserveAspectRatio="none"
        >
          <path
            d="M0 42C143 87 244 87 391 54C544 20 625 99 769 125C914 151 984 68 1124 41C1254 16 1328 71 1440 37V210H0V42Z"
            fill="currentColor"
          />
          <path
            data-home-bike-path
            d="M0 42C143 87 244 87 391 54C544 20 625 99 769 125C914 151 984 68 1124 41C1254 16 1328 71 1440 37"
            fill="none"
            stroke="#ead6c4"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M20 69C159 109 262 100 406 76C545 52 629 124 763 147C917 173 997 90 1134 68C1257 48 1322 95 1420 67"
            fill="none"
            stroke="#c9aa96"
            strokeDasharray="8 12"
            strokeLinecap="round"
            strokeOpacity=".58"
            strokeWidth="3"
          />
          <image
            data-home-wave-bike
            href="/quickbite-delivery-bike.svg"
            width="170"
            height="100"
          />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-36 overflow-hidden sm:h-44"
      >
        <svg
          className="h-full w-full overflow-hidden text-[#2a211d]"
          viewBox="0 0 1440 210"
          preserveAspectRatio="none"
        >
          <path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55V210H0V65Z"
            fill="currentColor"
          />
          <path
            data-between-bike-path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55"
            fill="none"
            stroke="#f0d7c2"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M22 93C154 132 266 120 406 96C548 72 628 143 764 166C918 191 998 108 1138 87C1258 69 1322 113 1418 86"
            fill="none"
            stroke="#c9aa96"
            strokeDasharray="8 12"
            strokeLinecap="round"
            strokeOpacity=".72"
            strokeWidth="3"
          />
          <image
            data-between-wave-bike
            href="/quickbite-delivery-bike.svg"
            width="178"
            height="104"
          />
        </svg>
      </div>

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
        className="relative z-10 mt-5 overflow-hidden"
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
          className="flex w-max gap-14 px-4 will-change-transform"
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
