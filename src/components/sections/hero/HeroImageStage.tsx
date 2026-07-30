import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { HeroSlide } from "./hero.data";

export default function HeroImageStage({
  activeSlide,
  activeSlideIndex,
}: {
  activeSlide: HeroSlide;
  activeSlideIndex: number;
}) {
  return (
    <div
      data-hero-next-image
      className="relative h-[15rem] w-full overflow-visible bg-[#2a211d] sm:h-[20rem] lg:h-[clamp(19rem,38svh,28rem)] xl:h-[clamp(23rem,40svh,32rem)]"
    >
      <div
        data-hero-image-stage
        className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-tl-[2.25rem] bg-[#2a211d] sm:rounded-tl-[3.25rem] xl:rounded-tl-[4.5rem]"
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
  );
}
