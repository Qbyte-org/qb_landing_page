import type { ReactNode } from "react";

const fades: Record<string, string> = {
  cream: "from-cream",
  white: "from-white",
  none: "",
};

// Seamless infinite marquee: the track is duplicated and translated -50%,
// so the loop is invisible. Pure CSS (animate-marquee) — no JS, perf-friendly.
// Pauses on hover and respects reduced-motion (handled in globals.css).
export default function Marquee({
  children,
  className = "",
  fade = "white",
}: {
  children: ReactNode;
  className?: string;
  fade?: "cream" | "white" | "none";
}) {
  const fadeClass = fades[fade];
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {fade !== "none" ? (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${fadeClass} to-transparent`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${fadeClass} to-transparent`}
          />
        </>
      ) : null}

      <div className="flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4">{children}</div>
      </div>
    </div>
  );
}
