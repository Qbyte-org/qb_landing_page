import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  warm = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  warm?: boolean;
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "light" ? (warm ? "text-paper" : "text-white") : (warm ? "text-ink" : "text-navy");
  const subColor = tone === "light" ? (warm ? "text-paper/70" : "text-white/70") : (warm ? "text-cocoa" : "text-muted");
  const eyebrowColor = tone === "light" ? "text-brand-light" : "text-brand-dark";

  return (
    <div
      className={`max-w-2xl ${alignment} ${className}`}
      data-section-motion-header
    >
      {eyebrow ? (
        <p className={`mb-3 text-xs font-extrabold uppercase tracking-[0.22em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`section-heading ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg leading-relaxed ${subColor}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
