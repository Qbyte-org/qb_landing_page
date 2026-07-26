"use client";

import Image from "next/image";
import { useRef } from "react";
import { Clock, Star } from "lucide-react";
import { categories, heroSlides, type Category } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import SectionHeading from "../ui/SectionHeading";

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <article
      className="relative h-[27rem] w-[22rem] shrink-0 overflow-visible rounded-[2.7rem] bg-[#efecf4] px-7 pb-7 pt-36 text-[#3a2418] ring-1 ring-[#ddd6dc] sm:w-[24rem] lg:w-[25.5rem]"
      style={{ backgroundColor: category.tint }}
    >
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-44 w-full"
        viewBox="0 0 408 188"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H408V116C357 102 334 138 289 134C233 130 216 83 157 101C100 119 82 160 0 134V0Z"
          fill="#fffaf5"
        />
        <path
          d="M20 119C89 151 108 103 165 93C218 83 236 129 289 134C334 138 359 101 389 116"
          fill="none"
          stroke="#3a2418"
          strokeDasharray="7 10"
          strokeLinecap="round"
          strokeOpacity=".2"
          strokeWidth="2"
        />
      </svg>

      <Image
        src={category.image}
        alt={`${category.name} cutout`}
        width={270}
        height={218}
        className="absolute -top-12 left-6 h-44 w-56 object-contain sm:left-7 sm:h-52 sm:w-64"
      />

      <div className="absolute right-6 top-[5.25rem] grid gap-1.5 rounded-[1.35rem] bg-white/90 px-3.5 py-2.5 text-[0.66rem] font-black uppercase tracking-[0.08em] text-[#5b4033] ring-1 ring-[#eaded6] backdrop-blur-sm">
        <span className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-[#f06400]" strokeWidth={2.4} />
          {category.meta}
        </span>
        <span className="flex items-center gap-3 text-[#7a6357]">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-[#f3a629] text-[#f3a629]" strokeWidth={2.2} />
            {category.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#f06400]" strokeWidth={2.2} />
            {category.time}
          </span>
        </span>
      </div>

      <p className="font-serif text-lg font-black italic leading-none text-[#7c4f2c]">
        QuickBite
      </p>
      <h3 className="mt-1 font-display text-[2.45rem] font-black leading-none tracking-[-0.06em] text-[#4a2416]">
        {category.name}
      </h3>
      <p className="mt-5 min-h-[4.5rem] max-w-[18.75rem] text-[0.87rem] font-semibold leading-snug text-[#4a3d38]/80">
        {category.description}
      </p>

      <div className="mt-5">
        <MagneticFillButton
          href="/restaurants"
          variant="brand"
          className="h-8 rounded-pill border-0 bg-[#f3a629] px-5 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#3a2418]"
        >
          Order now
        </MagneticFillButton>
      </div>
    </article>
  );
}

export default function Categories() {
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
        duration: 58,
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

  const carouselItems = [...categories, ...categories];
  const focusImage = heroSlides[0];

  return (
    <section
      id="categories"
      data-nav-theme="neutral"
      className="relative isolate overflow-hidden bg-[#fffaf5] py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(#3a2418_0.65px,transparent_0.65px)] [background-size:18px_18px]"
      />
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 w-full text-white sm:h-28"
        viewBox="0 0 1440 144"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H1440V69C1336 103 1227 32 1106 52C961 76 904 144 758 119C611 94 548 27 404 57C256 88 169 151 0 97V0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 w-full rotate-180 text-white sm:h-28"
        viewBox="0 0 1440 144"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H1440V82C1297 42 1236 110 1093 91C951 72 878 25 735 56C597 86 531 139 382 109C231 78 151 24 0 74V0Z"
          fill="currentColor"
        />
      </svg>

      <Container className="relative z-10">
        <div
          data-hero-image-target
          className="relative z-20 mx-auto mb-12 h-40 w-full max-w-[44rem] overflow-hidden rounded-[2.15rem] border border-[#2a211d]/15 bg-[#160d08] p-2 sm:h-52"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] border border-white/25">
            <Image
              src={focusImage.src}
              alt={focusImage.alt}
              fill
              sizes="704px"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,13,8,0.22),rgba(22,13,8,0.06)_42%,rgba(22,13,8,0.52))]"
            />
            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between text-[0.68rem] font-black uppercase tracking-[0.16em] text-white sm:inset-x-6 sm:top-5">
              <span className="rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm">
                Next bite
              </span>
              <span className="rounded-full bg-white/88 px-3 py-2 text-[#4a2416] backdrop-blur-sm">
                Fresh focus
              </span>
            </div>
            <p className="pointer-events-none absolute bottom-4 left-4 max-w-[15rem] font-display text-2xl font-black leading-none tracking-[-0.05em] text-white sm:bottom-5 sm:left-6 sm:text-4xl">
              The image stays in the story
            </p>
          </div>
        </div>

        <SectionHeading
          title="What are you in the mood for?"
          subtitle="From smoky jollof to late-night small chops, pick a category and dig in."
        />
      </Container>

      <div
        ref={carouselRef}
        data-categories-carousel
        className="relative z-10 mt-16 overflow-hidden"
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
          className="flex w-max gap-8 px-4 will-change-transform"
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
