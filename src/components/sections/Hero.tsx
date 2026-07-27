"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/content/site";
import { useHeroTransition } from "@/hooks/use-hero-transition";
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

  const handleWordChange = useCallback((_word: string, index: number) => {
    setActiveSlideIndex(index % heroSlides.length);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="hero"
      className="relative overflow-hidden bg-[#2a211d] text-white"
    >
      <div className="relative pb-16 pt-36 sm:pb-18 sm:pt-44 lg:pb-20 lg:pt-72 xl:pb-20 xl:pt-[15rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            data-hero-map-detail
            className="absolute inset-x-0 top-0 h-full opacity-55 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:5rem_5rem]"
          />
          <div
            data-hero-map-detail
            className="absolute right-[8%] top-[22%] hidden h-28 w-28 rounded-[2.2rem] md:block"
          >
            <Image
              src="/food/snacks.svg"
              alt=""
              width={130}
              height={108}
              className="absolute -right-5 -top-6 w-24 rotate-12 object-contain opacity-85"
            />
            <span className="absolute bottom-5 left-5 h-3 w-3 rounded-full bg-[#F15F00]" />
          </div>
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

        <Container className="pointer-events-none absolute inset-x-0 bottom-6 z-[70] max-w-[103rem]">
          <div data-hero-actions className="translate-y-1/2 sm:pl-10 xl:pl-32">
            <MagneticFillButton
              href="/restaurants"
              variant="brand"
              className="pointer-events-auto h-16 cursor-pointer rounded-4xl border-[#F15F00] bg-[#F15F00] px-9 text-base font-extrabold"
            >
              Order now
              <ArrowRight className="h-5 w-5" strokeWidth={2.35} aria-hidden="true" />
            </MagneticFillButton>
          </div>
        </Container>
      </div>

      <div
        data-hero-next-image
        className="relative h-[17rem] w-full overflow-visible bg-[#2a211d] sm:h-[23rem] lg:h-[clamp(21rem,46svh,32rem)] xl:h-[clamp(30rem,46svh,40rem)]"
      >
        <div
          data-hero-image-stage
          className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-tl-[2.75rem] bg-[#2a211d] sm:rounded-tl-[4rem] xl:rounded-tl-[5.5rem]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activeSlide.word}
              data-hero-image-media
              className="absolute inset-0 overflow-hidden will-change-transform"
              initial={{
                zIndex: 2,
                clipPath: "inset(0% 0% 0% 18%)",
                x: "6%",
                scale: 1.04,
              }}
              animate={{
                zIndex: 2,
                clipPath: "inset(0% 0% 0% 0%)",
                x: "0%",
                scale: 1,
              }}
              exit={{
                zIndex: 1,
                x: "-3%",
                scale: 1.018,
              }}
              transition={{ duration: 1.08, ease: [0.22, 1, 0.36, 1] }}
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
        </div>
      </div>

    </section>
  );
}
