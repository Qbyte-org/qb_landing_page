"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/content/site";
import { useHeroTransition } from "@/hooks/use-hero-transition";
import HeroDecor from "./hero/HeroDecor";
import HeroImageStage from "./hero/HeroImageStage";
import { rotatingHeadlines } from "./hero/hero.data";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import TypewriterText from "../ui/TypewriterText";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = heroSlides[activeSlideIndex] ?? heroSlides[0];

  useHeroTransition(sectionRef);

  const handleWordChange = useCallback((_word: string, index: number) => {
    setActiveSlideIndex(index % heroSlides.length);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="hero"
      className="relative overflow-hidden bg-[#2a211d] text-white"
    >
      <div className="relative pb-12 pt-30 sm:pb-14 sm:pt-38 lg:pb-16 lg:pt-48 xl:pt-52">
        <HeroDecor />

        <Container className="relative z-20 max-w-[103rem]">
          <div
            data-hero-copy
            className="max-w-6xl sm:pl-10 xl:pl-32"
          >
            <h1
              data-hero-title
              aria-label={`Real food, delivered ${activeSlide.word}`}
              className="font-display text-[2.7rem] font-extrabold leading-[1.03] text-white min-[430px]:text-[3.1rem] sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[5.9rem]"
            >
              <span className="block">Real food,</span>
              <span className="block">
                delivered{" "}
                <TypewriterText
                  words={rotatingHeadlines}
                  className="inline-grid text-[#F15F00]"
                  typeSpeed={92}
                  deleteSpeed={58}
                  pause={4200}
                  onWordChange={handleWordChange}
                />
              </span>
            </h1>
          </div>
        </Container>

        <Container className="pointer-events-none absolute inset-x-0 bottom-8 z-[70] max-w-[103rem]">
          <div data-hero-actions className="translate-y-1/2 sm:pl-10 xl:pl-32">
            <MagneticFillButton
              href="/restaurants"
              variant="brand"
              className="pointer-events-auto h-14 cursor-pointer rounded-4xl border-[#F15F00] bg-[#F15F00] px-7 text-base font-extrabold sm:h-[3.75rem] sm:px-8"
            >
              Order now
              <ArrowRight className="h-5 w-5" strokeWidth={2.35} aria-hidden="true" />
            </MagneticFillButton>
          </div>
        </Container>
      </div>

      <HeroImageStage
        activeSlide={activeSlide}
        activeSlideIndex={activeSlideIndex}
      />

    </section>
  );
}
