"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import FoodImage from "../../ui/FoodImage";
import MagneticFillButton from "../../ui/MagneticFillButton";
import { ctaFoodSlides } from "./foodSlides";

const slideInterval = 4500;
const imageSizes = "(min-width: 2000px) 240px, (min-width: 1067px) 12vw, (min-width: 640px) 128px, 90vw";

export default function CtaFoodSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const preparedImage = useRef<string | null>(null);
  const inView = useInView(containerRef, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeSlide = ctaFoodSlides[activeIndex];
  const nextSlide = ctaFoodSlides[(activeIndex + 1) % ctaFoodSlides.length];
  const canRotate = inView && reducedMotion === false && !paused;

  useEffect(() => {
    if (!canRotate) return;
    let timer: ReturnType<typeof setInterval> | undefined;

    function syncPlayback() {
      clearInterval(timer);
      if (document.hidden) return;
      timer = setInterval(() => {
        // Keep the current photo visible until its replacement is ready.
        if (preparedImage.current === nextSlide.src) {
          setActiveIndex((index) => (index + 1) % ctaFoodSlides.length);
        }
      }, slideInterval);
    }

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [canRotate, nextSlide.src]);

  return (
    <div
      ref={containerRef}
      data-cta-media
      className="group relative min-h-40 overflow-hidden rounded-4xl bg-ink-soft sm:min-h-0"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={activeSlide.src}
          data-cta-slide
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeInOut" }}
        >
          <FoodImage
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            loading="lazy"
            sizes={imageSizes}
            className="object-cover object-center transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {canRotate && (
        <FoodImage
          key={nextSlide.src}
          src={nextSlide.src}
          alt=""
          aria-hidden="true"
          fill
          loading="eager"
          sizes={imageSizes}
          onLoad={() => { preparedImage.current = nextSlide.src; }}
          className="pointer-events-none object-cover opacity-0"
        />
      )}

      {inView && reducedMotion === false && (
        <MagneticFillButton
          variant="dark"
          onClick={() => setPaused((value) => !value)}
          ariaLabel={paused ? "Resume food slideshow" : "Pause food slideshow"}
          className="absolute! bottom-2 right-2 z-20 size-9 rounded-full border! border-paper/25 bg-dark-ink/80! text-paper! backdrop-blur-sm"
        >
          {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </MagneticFillButton>
      )}
    </div>
  );
}
