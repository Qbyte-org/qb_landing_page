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
  const eyebrowColor =
    tone === "light"
      ? "bg-white/10 text-brand-light ring-1 ring-white/15"
      : "bg-brand-50 text-brand-dark ring-1 ring-brand/10";

  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${eyebrowColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-pill bg-brand" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
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
