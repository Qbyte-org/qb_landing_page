import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { ProcessSlide } from "./howItWorks.data";

export default function ProcessVisualPanel({
  activeStep,
  activeIndex,
}: {
  activeStep: ProcessSlide;
  activeIndex: number;
}) {
  return (
    <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[23rem] lg:min-h-[28rem]">
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
            priority={activeIndex === 0}
            unoptimized
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center opacity-70"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
