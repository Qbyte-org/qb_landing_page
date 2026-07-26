"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides, steps } from "@/content/site";
import MagneticFillButton from "../ui/MagneticFillButton";

const processVisuals = [
  {
    image: heroSlides[0].src,
    imageAlt: heroSlides[0].alt,
    plate: "/food/jollof.svg",
    accent: "/food/drinks.svg",
    background: "#fff7f0",
  },
  {
    image: heroSlides[1].src,
    imageAlt: heroSlides[1].alt,
    plate: "/food/snacks.svg",
    accent: "/food/pastries.svg",
    background: "#fff2df",
  },
  {
    image: heroSlides[2].src,
    imageAlt: heroSlides[2].alt,
    plate: "/quickbite-delivery-bike.svg",
    accent: "/food/grills.svg",
    background: "#fff9ed",
  },
];

const processSlides = steps.map((step, index) => ({
  ...step,
  ...(processVisuals[index] ?? processVisuals[0]),
}));

const totalSteps = processSlides.length;

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = processSlides[activeIndex] ?? processSlides[0];
  const ActiveIcon = activeStep.icon;
  const progress = ((activeIndex + 1) / totalSteps) * 100;

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + totalSteps) % totalSteps);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % totalSteps);
  };

  return (
    <section
      id="how"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#2a211d] text-white"
    >
      <div className="relative z-10 border-b border-white/[0.04] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[66rem] items-center gap-8 md:grid-cols-[1fr_auto]">
          <h2 className="font-display text-[3.4rem] font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">
            How It
            <br />
            Works
          </h2>

          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            className="h-14 w-max rounded-pill border-0 bg-[#ff4f1f] px-8 text-sm font-extrabold sm:h-16 sm:px-10 sm:text-base md:-translate-x-40 md:translate-y-14 lg:-translate-x-48 xl:-translate-x-56"
          >
            Learn more
          </MagneticFillButton>
        </div>
      </div>

      <div className="relative min-h-[42rem] overflow-hidden bg-[#1c120f]">
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 hidden h-[47%] w-[20.5rem] bg-[#2f241f] lg:block"
        />

        <div
          aria-hidden="true"
          className="absolute right-0 top-0 z-30 hidden h-full w-1 bg-[#3b251e] lg:block"
        >
          <motion.span
            className="absolute left-0 top-0 block w-full rounded-b-full bg-[#ff4f1f]"
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-[44%_56%]">
          <div className="relative min-h-[35rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 xl:px-[8.2vw]">
            <div className="grid gap-10 md:grid-cols-[14rem_1fr] lg:gap-16">
              <div className="font-display font-black leading-none tracking-[-0.08em]">
                <span className="text-[5.2rem] text-white sm:text-[6rem]">
                  {activeIndex + 1}
                </span>
                <span className="ml-2 align-[1.8rem] text-3xl text-white/75">
                  /{totalSteps}
                </span>
              </div>

              <div className="max-w-md pt-2">
                <p className="font-display text-xs font-black uppercase tracking-[0.16em] text-[#22c55e]">
                  Our process
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStep.title}
                    initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="mt-16 grid h-14 w-14 place-items-center rounded-full bg-[#ff4f1f] text-white sm:mt-20">
                      <ActiveIcon className="h-6 w-6" strokeWidth={2.35} aria-hidden="true" />
                    </span>

                    <h3 className="mt-8 font-display text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">
                      {activeStep.title}
                    </h3>
                    <p className="mt-10 text-lg font-extrabold leading-relaxed text-white/92">
                      {activeStep.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-20 flex items-center gap-4">
                  <button
                    type="button"
                    aria-label="Previous process step"
                    onClick={goToPrevious}
                    className="grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-white text-[#ff4f1f] transition-colors duration-300 hover:bg-[#ffefe7]"
                  >
                    <ArrowLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next process step"
                    onClick={goToNext}
                    className="grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-white text-[#ff4f1f] transition-colors duration-300 hover:bg-[#ffefe7]"
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[32rem] overflow-hidden lg:min-h-[42rem]">
            <div
              aria-hidden="true"
              className="absolute -left-36 -top-36 z-30 h-80 w-80 rounded-[55%_45%_48%_52%/45%_48%_52%_55%] bg-[#40b84f]"
            />
            <div
              aria-hidden="true"
              className="absolute -left-20 top-28 z-30 h-72 w-72 rounded-[48%_52%_52%_48%/58%_45%_55%_42%] bg-[#ff4f1f]"
            />
            <div
              aria-hidden="true"
              className="absolute left-[-3.4rem] top-20 z-30 h-40 w-48 rotate-12 bg-[#ff8717] [clip-path:polygon(0_78%,58%_0,100%_100%)]"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep.title}
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ backgroundColor: activeStep.background }}
                initial={{ opacity: 0, x: 44, scale: 1.025 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -34, scale: 0.985 }}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeStep.image}
                  alt={activeStep.imageAlt}
                  fill
                  priority={activeIndex === 0}
                  unoptimized
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover object-center opacity-70"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,18,15,0.08),rgba(255,247,240,0.16)_38%,rgba(255,247,240,0.52))]"
                />
                <Image
                  src={activeStep.plate}
                  alt=""
                  width={760}
                  height={590}
                  className="absolute -bottom-8 right-[-4%] w-[34rem] object-contain drop-shadow-none sm:w-[46rem] lg:-bottom-10 xl:w-[56rem]"
                />
                <Image
                  src={activeStep.accent}
                  alt=""
                  width={260}
                  height={210}
                  className="absolute bottom-[10%] left-[7%] hidden w-44 -rotate-12 object-contain opacity-90 sm:block lg:left-[10%] lg:w-56"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
