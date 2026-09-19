"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

/** Rotate only the small previews; the featured plate keeps its fixed layout. */
export function useDishOrbitSteps(dishCount: number) {
  const [targetStep, setTargetStep] = useState(0);
  const position = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const selectedIndex = ((targetStep % dishCount) + dishCount) % dishCount;

  useEffect(() => {
    if (reducedMotion) {
      position.jump(targetStep);
      return;
    }
    const animation = animate(position, targetStep, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => animation.stop();
  }, [position, reducedMotion, targetStep]);

  function selectDish(index: number) {
    const current = position.get();
    const visibleSlot = ((index - current) % dishCount + dishCount) % dishCount;
    // A clicked preview takes the upper arc to its selected position, keeping
    // it visible (and keyboard focus intact) throughout a direct selection.
    const target = current + visibleSlot;
    setTargetStep(Math.round(visibleSlot > dishCount - 1 ? target - dishCount : target));
  }

  function stepDish(direction: -1 | 1) {
    // Preserve direction at the last/first dish and through queued clicks.
    setTargetStep((step) => step + direction);
  }

  return { selectedIndex, position, reducedMotion, selectDish, stepDish };
}
