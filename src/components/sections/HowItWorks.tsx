"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  processSlides,
  totalSteps,
} from "./how-it-works/howItWorks.data";
import ProcessControls from "./how-it-works/ProcessControls";
import ProcessStepCopy from "./how-it-works/ProcessStepCopy";
import ProcessVisualPanel from "./how-it-works/ProcessVisualPanel";
import MagneticFillButton from "../ui/MagneticFillButton";

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = processSlides[activeIndex] ?? processSlides[0];
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
      <div className="relative z-10 px-4 pb-8 pt-14 sm:px-6 sm:pb-10 sm:pt-18 lg:px-8 lg:pb-12 lg:pt-20">
        <div
          data-section-motion-header
          className="mx-auto flex max-w-[60rem] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
        >
          <h2 className="font-display text-[2.85rem] font-black leading-[0.9] tracking-[-0.07em] sm:text-[4rem]">
            How It Works
          </h2>

          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            className="h-12 w-max rounded-pill border-0 bg-[#F15F00] px-7 text-base font-extrabold sm:h-14 sm:px-9"
          >
            Learn more
          </MagneticFillButton>
        </div>
      </div>

      <div className="relative min-h-[25rem] overflow-hidden bg-[#1c120f] lg:min-h-[28rem]">
        <div
          aria-hidden="true"
          className="absolute left-0 bottom-0 hidden h-[44%] w-[17rem] bg-[#2a211d] lg:block"
        />

        <div
          aria-hidden="true"
          className="absolute right-0 top-0 z-30 hidden h-full w-1 bg-[#9d593d] lg:block"
        >
          <motion.span
            className="absolute left-0 top-0 block w-full rounded-b-full bg-[#F15F00]"
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-[54%_46%]">
          <div className="relative min-h-[23rem] px-4 py-8 sm:px-6 lg:min-h-[28rem] lg:px-8 lg:py-10 xl:px-[5vw]">
            <div className="grid gap-6 md:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_1fr]">
              <div className="pt-2 font-display font-black leading-none tracking-[-0.08em] md:pt-6 lg:pt-8">
                <span className="text-[3.25rem] text-white sm:text-[4rem]">
                  {activeIndex + 1}
                </span>
                <span className="ml-2 align-[1.1rem] text-xl text-white/75 sm:text-2xl">
                  /{totalSteps}
                </span>
              </div>

              <div>
                <ProcessStepCopy activeStep={activeStep} />
                <ProcessControls onPrevious={goToPrevious} onNext={goToNext} />
              </div>
            </div>
            {/* <Image
              src={activeStep.plate}
              alt=""
              width={360}
              height={190}
              className="pointer-events-none absolute -bottom-4 left-[-2%] z-0 w-[28rem] object-contain drop-shadow-none lg:bottom-[-1.5rem]"
            /> */}
          </div>

          <ProcessVisualPanel activeStep={activeStep} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
