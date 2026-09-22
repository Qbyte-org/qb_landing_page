import Image from "../../ui/FoodImage";
import { AnimatePresence, motion } from "motion/react";
import type { HeroSlide } from "./hero.data";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";

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
      className="relative h-[15rem] w-full overflow-visible bg-dark-ink sm:h-[20rem] lg:h-[clamp(19rem,38svh,28rem)] xl:h-[clamp(23rem,40svh,32rem)]"
    >
      <div
        data-hero-image-stage
        className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-tl-[2.25rem] bg-dark-ink sm:rounded-tl-[3.25rem] xl:rounded-tl-[4.5rem]"
      >
        <BackgroundGrainTexture className="opacity-32" />

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
          className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-ink)_8%,transparent),transparent_42%)]"
        />
      </div>
    </div>
  );
}
