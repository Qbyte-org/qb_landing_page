import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Tone = "brand" | "navy" | "light" | "soft" | "tint";

const sizes: Record<Size, string> = {
  sm: "h-10 w-10 rounded-xl [&>svg]:h-[1.15rem] [&>svg]:w-[1.15rem]",
  md: "h-12 w-12 rounded-2xl [&>svg]:h-6 [&>svg]:w-6",
  lg: "h-14 w-14 rounded-2xl [&>svg]:h-7 [&>svg]:w-7",
};

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-dark",
  navy: "bg-navy text-white",
  light: "bg-white/10 text-brand-light ring-1 ring-white/10",
  soft: "bg-cream text-brand-dark",
  // `tint` expects a backgroundColor via the `style` prop; icon stays brand-dark
  tint: "text-brand-dark",
};

/**
 * Consistent icon container used across feature/perk/step/category cards.
 * Replaces the old emoji-in-a-circle treatment with a tinted rounded square
 * holding a lucide glyph at a uniform size and stroke weight.
 */
export default function IconChip({
  icon: Icon,
  size = "md",
  tone = "brand",
  className = "",
  style,
}: {
  icon: LucideIcon;
  size?: Size;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={`inline-flex shrink-0 items-center justify-center ${sizes[size]} ${tones[tone]} ${className}`}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
