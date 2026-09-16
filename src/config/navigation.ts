const paperSurface = {
  surfaceTone: "light",
  surface: "var(--color-paper)",
  foreground: "var(--color-ink)",
  muted: "var(--color-cocoa)",
  icon: "var(--color-brand-dark)",
  action: "var(--color-dark-ink)",
  actionText: "var(--color-white)",
  underline: "var(--color-brand)",
  chip: "var(--color-cream-200)",
  chipText: "var(--color-ink)",
  pageBackground: "var(--color-ink)",
  pageForeground: "var(--color-paper)",
  logo: "color",
} as const;

const inkSurface = {
  surfaceTone: "dark",
  surface: "var(--color-ink)",
  foreground: "var(--color-paper)",
  muted: "var(--color-peach)",
  icon: "var(--color-brand)",
  action: "var(--color-brand)",
  actionText: "var(--color-white)",
  underline: "var(--color-brand)",
  chip: "var(--color-paper)",
  chipText: "var(--color-ink)",
  pageBackground: "var(--color-paper)",
  pageForeground: "var(--color-ink)",
  logo: "light",
} as const;

export const navThemes = {
  hero: paperSurface,
  light: inkSurface,
  dark: paperSurface,
  accent: { ...inkSurface, pageBackground: "var(--color-cream-200)" },
  neutral: { ...inkSurface, pageBackground: "var(--color-cream-200)" },
} as const;

export type NavTheme = keyof typeof navThemes;
