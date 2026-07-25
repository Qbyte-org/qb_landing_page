import type { Transition } from "motion/react";

export const animation = {
  duration: {
    fast: 0.25,
    base: 0.5,
    slow: 0.8,
  },
  ease: {
    premium: "power3.out",
    smooth: "power2.inOut",
  },
  revealOffset: 28,
} as const;

export const premiumTransition: Transition = {
  duration: animation.duration.base,
  ease: [0.22, 1, 0.36, 1],
};

export const tactileSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 30,
  mass: 0.6,
};

export const tactileMotion = {
  whileHover: { y: -3, scale: 1.015 },
  whileTap: { scale: 0.97 },
  transition: tactileSpring,
};
