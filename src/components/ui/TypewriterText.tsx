"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface TypewriterTextProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  onWordChange?: (word: string, index: number) => void;
}

export default function TypewriterText({
  words,
  className = "",
  typeSpeed = 78,
  deleteSpeed = 44,
  pause = 1850,
  onWordChange,
}: TypewriterTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const firstWord = words[0] ?? "";

  useGSAP(
    () => {
      const text = textRef.current;
      if (!text || words.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        text.textContent = firstWord;
        return;
      }

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.35 });
      words.forEach((word, index) => {
        const writer = { length: 0 };
        timeline
          .call(() => {
            writer.length = 0;
            text.textContent = "";
            onWordChange?.(word, index);
          })
          .to(writer, {
            length: word.length,
            duration: Math.max(0.2, (word.length * typeSpeed) / 1000),
            ease: "none",
            onUpdate: () => {
              text.textContent = word.slice(0, Math.round(writer.length));
            },
          })
          .to({}, { duration: pause / 1000 })
          .to(writer, {
            length: 0,
            duration: Math.max(0.16, (word.length * deleteSpeed) / 1000),
            ease: "none",
            onUpdate: () => {
              text.textContent = word.slice(0, Math.round(writer.length));
            },
          });
      });
    },
    {
      scope: rootRef,
      dependencies: [deleteSpeed, firstWord, onWordChange, pause, typeSpeed, words],
      revertOnUpdate: true,
    },
  );

  return (
    <span ref={rootRef} aria-hidden="true" className={`inline-grid max-w-full ${className}`}>
      {words.map((word) => (
        <span
          key={word}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
        </span>
      ))}
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        <span ref={textRef} data-typewriter-current>
          {firstWord}
        </span>
      </span>
    </span>
  );
}
