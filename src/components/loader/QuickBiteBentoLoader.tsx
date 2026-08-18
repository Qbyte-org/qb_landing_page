"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { animation } from "@/lib/animation";
import { getGridLayout, calculateEntranceData } from "./loaderLayout";
import BentoTile from "./BentoTile";


interface QuickBiteBentoLoaderProps {
  onComplete: () => void;
}

export default function QuickBiteBentoLoader({
  onComplete,
}: QuickBiteBentoLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [layout, setLayout] = useState<ReturnType<typeof getGridLayout> | null>(
    null
  );

  // Layout calculation
  useEffect(() => {
    const handleResize = () => {
      setLayout(getGridLayout(window.innerWidth, window.innerHeight));
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!layout || !containerRef.current || !gridRef.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Ensure body cannot scroll while loader is active
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      // 1. Initial State: Fade in background subtly
      tl.fromTo(
        containerRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" }
      );

      // Collect entrance data for each tile
      const tileAnimations = layout.tiles.map((tile) => {
        const el = tileRefs.current.get(tile.id);
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        const calc = calculateEntranceData(rect, viewportWidth, viewportHeight);

        return { tile, el, calc };
      }).filter(Boolean);

      // 2. Bento Grid Assembly
      tileAnimations.forEach((anim) => {
        if (!anim) return;
        const { tile, el, calc } = anim;

        // Base entrance vector depending on direction from center
        const distanceMultiplier = 120 + calc.normalizedDistance * 200;
        const startX = Math.cos(calc.angle) * distanceMultiplier;
        const startY = Math.sin(calc.angle) * distanceMultiplier;

        // Custom timings based on priority
        const delayOffset = tile.data.priority * 0.08;

        const innerImage = el.querySelector("[data-bento-image-wrapper] img");
        const brandWordmark = el.querySelector("[data-brand-wordmark]");
        const brandMark = el.querySelector("[data-brand-mark] svg");
        const routeLine = el.querySelector("[data-bento-route]");

        // Base Tile Entrance
        tl.fromTo(
          el,
          {
            autoAlpha: 0,
            x: startX,
            y: startY,
            scale: 0.85,
            rotation: calc.normalizedDistance * 10 * (Math.random() > 0.5 ? 1 : -1),
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: animation.ease.premium,
          },
          0.1 + delayOffset
        );

        // Image Cinematic Zoom
        if (innerImage) {
          tl.fromTo(
            innerImage,
            { scale: 1.2 },
            { scale: 1, duration: 1.6, ease: animation.ease.premium },
            0.1 + delayOffset
          );
        }

        // Brand Text Reveal
        if (brandWordmark && brandMark) {
          tl.fromTo(
            brandWordmark,
            { width: 0, opacity: 0 },
            { width: "auto", opacity: 1, duration: 0.8, ease: "power3.out" },
            0.1 + delayOffset + 0.5 // Start revealing text as tile settles
          );
        }

        if (routeLine) {
           tl.fromTo(
            routeLine,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
            0.1 + delayOffset + 0.4
          );
        }
      });

      // 3. Subtle Idle State
      tileAnimations.forEach((anim) => {
        if (!anim) return;
        const { el, calc } = anim;
        const innerImage = el.querySelector("[data-bento-image-wrapper] img");
        
        // Minor floating
        tl.to(
          el,
          {
            y: `+=${Math.sin(calc.angle) * 4}`,
            x: `+=${Math.cos(calc.angle) * 4}`,
            duration: 2,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          1.8
        );

        if (innerImage) {
           tl.to(
             innerImage,
             {
               scale: 1.05,
               objectPosition: "52% 50%",
               duration: 4,
               ease: "sine.inOut",
             },
             1.8
           );
        }
      });

      // 4. Outro Transition — fire hero intro at the START of the outro so
      //    the page reveal overlaps the tiles flying out (zero perceived gap).
      const outroStart = 2.8;

      tl.call(
        () => {
          onComplete();
        },
        [],
        outroStart
      );

      tileAnimations.forEach((anim) => {
        if (!anim) return;
        const { el, calc } = anim;

        const distanceMultiplier = 300 + calc.normalizedDistance * 500;
        const exitX = Math.cos(calc.angle) * distanceMultiplier;
        const exitY = Math.sin(calc.angle) * distanceMultiplier;

        tl.to(
          el,
          {
            x: exitX,
            y: exitY,
            autoAlpha: 0,
            scale: 1.2,
            duration: 0.8,
            ease: "power4.in", // Accelerate out
          },
          outroStart + calc.normalizedDistance * 0.1
        );
      });

      tl.to(
        containerRef.current,
        {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        outroStart + 0.4
      );

    },
    { scope: containerRef, dependencies: [layout] }
  );

  if (!layout) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#2a211d] p-4 sm:p-8"
      style={{ visibility: "hidden" }} // Handled by GSAP
    >
      <div
        ref={gridRef}
        className="grid w-full h-full max-w-[1400px] max-h-[1000px]"
        style={{
          gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`,
          gap: `${layout.gap}px`,
        }}
      >
        {layout.tiles.map((tile) => (
          <BentoTile
            key={tile.id}
            data={tile.data}
            ref={(el) => {
              if (el) tileRefs.current.set(tile.id, el);
            }}
            style={{
              gridColumn: `span ${tile.colSpan}`,
              gridRow: `span ${tile.rowSpan}`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
         <span className="text-sm font-medium text-white/50 animate-pulse">
           Preparing your QuickBite experience...
         </span>
      </div>
    </div>
  );
}
