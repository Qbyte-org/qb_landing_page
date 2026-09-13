import Image from "../../ui/FoodImage";
import { AnimatePresence, motion } from "motion/react";
import type { ProcessSlide } from "./howItWorks.data";

export default function ProcessVisualPanel({
  activeStep,
}: {
  activeStep: ProcessSlide;
  activeIndex: number;
}) {
  return (
    <div className="relative min-h-[20rem] overflow-hidden bg-[#1c120f] sm:min-h-[23rem] lg:min-h-[28rem]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeStep.title}
          className="absolute inset-0 z-10 overflow-hidden"
          initial={{ opacity: 0, x: 44, scale: 1.025 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -34, scale: 0.985 }}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={activeStep.image}
            alt={activeStep.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-[#1c120f]/80 via-[#1c120f]/15 to-transparent"
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${activeStep.title}-accent`}
          className="absolute bottom-5 right-5 z-20 h-24 w-24 overflow-hidden rounded-[1.35rem] border border-paper/55 bg-paper/15 p-1.5 shadow-[0_12px_28px_rgba(28,18,15,0.35)] sm:bottom-7 sm:right-7 sm:h-32 sm:w-32 sm:rounded-[1.7rem]"
          initial={{ opacity: 0, y: 18, scale: 0.88, rotate: 4 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 12, scale: 0.9, rotate: -3 }}
          transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1rem] sm:rounded-[1.3rem]">
            <Image
              src={activeStep.accent}
              alt=""
              fill
              loading="lazy"
              sizes="(min-width: 640px) 8rem, 6rem"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
