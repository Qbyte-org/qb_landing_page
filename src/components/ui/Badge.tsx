import type { ReactNode } from "react";

type Tone = "brand" | "success" | "neutral" | "light";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-dark",
  success: "bg-green-50 text-green-700",
  neutral: "bg-black/5 text-navy",
  light: "bg-white/15 text-white",
};

export default function Badge({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-sm font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
