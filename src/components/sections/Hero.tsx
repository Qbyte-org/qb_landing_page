"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/content/site";
import { useHeroTransition } from "@/hooks/use-hero-transition";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import TypewriterText from "../ui/TypewriterText";

const rotatingHeadlines = heroSlides.map((slide) => slide.word);

const floatingFoods = [
  {
    src: "/food/jollof.svg",
    alt: "",
    className: "left-[5%] top-[38%] hidden w-16 rotate-[-12deg] opacity-60 sm:block sm:w-24 lg:left-[7%] lg:top-[44%]",
  },
  {
    src: "/food/drinks.svg",
    alt: "",
    className: "right-[7%] top-[34%] w-12 rotate-[10deg] opacity-55 sm:w-16 lg:right-[12%]",
  },
  {
    src: "/food/pizza.svg",
    alt: "",
    className: "right-[18%] top-[62%] hidden w-20 rotate-[-8deg] opacity-55 md:block xl:w-28",
  },
  {
    src: "/food/pastries.svg",
    alt: "",
    className: "left-[24%] top-[68%] hidden w-16 rotate-[12deg] opacity-50 lg:block xl:w-24",
  },
  {
    src: "/food/grills.svg",
    alt: "",
    className: "left-[37%] top-[30%] hidden w-14 rotate-[9deg] opacity-35 md:block xl:w-20",
  },
  {
    src: "/food/snacks.svg",
    alt: "",
    className: "right-[28%] top-[45%] hidden w-14 rotate-[-14deg] opacity-40 sm:block xl:w-20",
  },
  {
    src: "/food/soup.svg",
    alt: "",
    className: "left-[52%] top-[74%] hidden w-16 rotate-[7deg] opacity-30 xl:block",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = heroSlides[activeSlideIndex] ?? heroSlides[0];

  useHeroTransition(sectionRef);

  useGSAP(
    () => {
      const bike = sectionRef.current?.querySelector<HTMLElement>(
        "[data-hero-bike]",
      );
      if (!bike) return;

      gsap.set(bike, {
        left: "7%",
        top: "0%",
        xPercent: -50,
        yPercent: -50,
        rotate: 0,
        transformOrigin: "50% 65%",
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.to(bike, {
        keyframes: [
          { left: "90%", top: "0%", rotate: 0 },
          { left: "98%", top: "13%", rotate: 72 },
          { left: "98%", top: "78%", rotate: 90 },
          { left: "88%", top: "100%", rotate: 170 },
          { left: "13%", top: "100%", rotate: 180 },
          { left: "2%", top: "76%", rotate: 265 },
          { left: "2%", top: "18%", rotate: 270 },
          { left: "7%", top: "0%", rotate: 360 },
        ],
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: sectionRef },
  );

  const handleWordChange = useCallback((_word: string, index: number) => {
    setActiveSlideIndex(index % heroSlides.length);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="hero"
      className="relative z-20 isolate overflow-visible bg-[#2a211d] text-white"
    >
      <div className="relative pb-16 pt-36 sm:pb-18 sm:pt-44 lg:pb-20 lg:pt-72 xl:pb-20 xl:pt-[15rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {floatingFoods.map((food, index) => (
            <Image
              key={food.src}
              data-hero-float
              src={food.src}
              alt={food.alt}
              width={150}
              height={122}
              className={`absolute select-none animate-float ${food.className}`}
              style={{ animationDelay: `${index * 0.85}s` }}
            />
          ))}
        </div>

        <Container className="relative z-20 max-w-[103rem]">
          <div
            data-hero-copy
            className="max-w-6xl sm:pl-10 xl:pl-32"
          >
            <h1
              data-hero-title
              aria-label={`Real food, delivered ${activeSlide.word}`}
              className="font-display text-[2.85rem] font-extrabold leading-[1.05] text-white min-[430px]:text-[3.35rem] sm:text-6xl lg:text-7xl xl:text-[6.5rem]"
            >
              <span className="block">Real food,</span>
              <span className="block">
                delivered{" "}
                <TypewriterText
                  words={rotatingHeadlines}
                  className="inline-grid text-[#ff4f1f]"
                  typeSpeed={92}
                  deleteSpeed={58}
                  pause={4200}
                  onWordChange={handleWordChange}
                />
              </span>
            </h1>
          </div>
        </Container>

        <Container className="pointer-events-none absolute inset-x-0 bottom-6 z-[70] max-w-[103rem]">
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
        data-hero-next-image
        data-hero-image-stage
        className="relative h-[17rem] w-full overflow-hidden rounded-tr-[4rem] bg-[#2a211d] sm:h-[23rem] sm:rounded-tr-[6rem] lg:h-[clamp(21rem,46svh,32rem)] xl:h-[clamp(30rem,46svh,40rem)]"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide.word}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.018 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority={activeSlideIndex === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,33,29,0.08),rgba(42,33,29,0)_42%)]"
        />
        <div
          data-hero-bike
          aria-hidden="true"
          className="pointer-events-none absolute z-40 h-14 w-24 sm:h-16 sm:w-28"
        >
          <Image
            src="/quickbite-delivery-bike.svg"
            alt=""
            fill
            sizes="112px"
            className="object-contain"
          />
        </div>
      </div>

    </section>
  );
}
