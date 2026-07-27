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
      className="relative -mt-px overflow-hidden bg-[#2a211d] text-white"
    >
      <div className="relative z-10 px-4 pb-12 pt-18 sm:px-6 sm:pb-14 sm:pt-22 lg:px-8 lg:pb-14 lg:pt-24">
        <div className="mx-auto flex max-w-[60rem] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-[2.85rem] font-black leading-[0.9] tracking-[-0.07em] sm:text-[4rem]">
            How It Works
          </h2>

          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            className="h-12 w-max rounded-pill border-0 bg-[#F15F00] px-7 text-sm font-extrabold sm:h-14 sm:px-9"
          >
            Learn more
          </MagneticFillButton>
        </div>
      </div>

      <div className="relative min-h-[30rem] overflow-hidden bg-[#1c120f] lg:min-h-[34rem]">
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 hidden h-[44%] w-[17rem] bg-[#2f241f] lg:block"
        />

        <div
          aria-hidden="true"
          className="absolute right-0 top-0 z-30 hidden h-full w-1 bg-[#3b251e] lg:block"
        >
          <motion.span
            className="absolute left-0 top-0 block w-full rounded-b-full bg-[#F15F00]"
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-[45%_55%]">
          <div className="relative min-h-[27rem] px-4 py-10 sm:px-6 lg:min-h-[34rem] lg:px-8 lg:py-12 xl:px-[5vw]">
            <div className="grid gap-6 md:grid-cols-[8.5rem_1fr] lg:gap-8">
              <div className="font-display font-black leading-none tracking-[-0.08em]">
                <span className="text-[4rem] text-white sm:text-[4.8rem]">
                  {activeIndex + 1}
                </span>
                <span className="ml-2 align-[1.45rem] text-2xl text-white/75">
                  /{totalSteps}
                </span>
              </div>

              <div className="max-w-md pt-1">
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
                    <span className="mt-8 grid h-12 w-12 place-items-center rounded-full bg-[#F15F00] text-white sm:mt-10">
                      <ActiveIcon className="h-5 w-5" strokeWidth={2.35} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 font-display text-3xl font-black leading-tight tracking-[-0.05em] sm:text-[2.35rem]">
                      {activeStep.title}
                    </h3>
                    <p className="mt-5 text-base font-extrabold leading-relaxed text-white/90">
                      {activeStep.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-4">
                  <MagneticFillButton
                    type="button"
                    ariaLabel="Previous process step"
                    onClick={goToPrevious}
                    variant="ghost"
                    customFillClass="bg-[#F15F00]"
                    customHoverTextColor="#ffffff"
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#F15F00]"
                  >
                    <ArrowLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  </MagneticFillButton>
                  <MagneticFillButton
                    type="button"
                    ariaLabel="Next process step"
                    onClick={goToNext}
                    variant="ghost"
                    customFillClass="bg-[#F15F00]"
                    customHoverTextColor="#ffffff"
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#F15F00]"
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  </MagneticFillButton>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[27rem] overflow-hidden lg:min-h-[34rem]">
            <div
              aria-hidden="true"
              className="absolute -left-28 -top-28 z-30 h-60 w-60 rounded-[55%_45%_48%_52%/45%_48%_52%_55%] bg-[#40b84f]"
            />
            <div
              aria-hidden="true"
              className="absolute -left-16 top-20 z-30 h-56 w-56 rounded-[48%_52%_52%_48%/58%_45%_55%_42%] bg-[#F15F00]"
            />
            <div
              aria-hidden="true"
              className="absolute left-[-2.6rem] top-14 z-30 h-28 w-36 rotate-12 bg-[#ff8717] [clip-path:polygon(0_78%,58%_0,100%_100%)]"
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
                  className="absolute -bottom-4 right-[-2%] w-[28rem] object-contain drop-shadow-none sm:w-[35rem] lg:bottom-[-1.5rem] lg:w-[38rem] xl:w-[44rem]"
                />
                <Image
                  src={activeStep.accent}
                  alt=""
                  width={260}
                  height={210}
                  className="absolute bottom-[12%] left-[7%] hidden w-32 -rotate-12 object-contain opacity-90 sm:block lg:left-[10%] lg:w-44"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
