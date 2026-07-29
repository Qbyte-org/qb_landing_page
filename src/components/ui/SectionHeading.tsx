import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-navy";
  const subColor = tone === "light" ? "text-white/70" : "text-muted";
  const eyebrowColor = tone === "light" ? "text-brand-light" : "text-brand-dark";

  return (
    <Reveal
      className={`max-w-2xl ${alignment} ${className}`}
      data-section-motion-header
    >
      {eyebrow ? (
        <p className={`mb-3 text-xs font-extrabold uppercase tracking-[0.22em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-[2.85rem] font-black leading-[1.1] tracking-[-0.07em] sm:text-[4rem] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg leading-relaxed ${subColor}`}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
