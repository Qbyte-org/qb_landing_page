import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
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

  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      <h2
        className={`font-display text-[1.95rem] font-extrabold leading-[1.08] sm:text-4xl lg:text-[2.6rem] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg leading-relaxed ${subColor}`}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
