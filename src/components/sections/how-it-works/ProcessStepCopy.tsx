import { AnimatePresence, motion } from "motion/react";
import type { ProcessSlide } from "./howItWorks.data";

export default function ProcessStepCopy({ activeStep }: { activeStep: ProcessSlide }) {
  const ActiveIcon = activeStep.icon;

  return (
    <div className="max-w-md pt-2 md:pt-6 lg:pt-8">
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
          <span className="mt-6 grid h-11 w-11 place-items-center rounded-full bg-[#F15F00] text-white sm:h-12 sm:w-12">
            <ActiveIcon
              className="h-5 w-5"
              strokeWidth={2.35}
              aria-hidden="true"
            />
          </span>

          <h3 className="mt-5 font-display text-3xl font-black leading-tight tracking-[-0.05em] sm:text-[2.2rem]">
            {activeStep.title}
          </h3>
          <p className="mt-4 text-[0.95rem] font-extrabold leading-relaxed text-white/90 sm:text-base">
            {activeStep.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
