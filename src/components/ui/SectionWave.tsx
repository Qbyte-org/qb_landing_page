type SectionWaveProps = {
  to: "ink" | "paper";
  placement?: "flow" | "bottom";
};

export default function SectionWave({ to, placement = "flow" }: SectionWaveProps) {
  return (
    <div
      aria-hidden="true"
      data-section-wave={to}
      className={`pointer-events-none h-20 overflow-hidden sm:h-28 lg:h-36 ${to === "ink" ? "bg-paper text-ink" : "bg-ink text-paper"} ${placement === "bottom" ? "absolute inset-x-0 -bottom-px z-0" : "relative"}`}
    >
      <svg
        className="absolute left-1/2 top-0 h-full w-[178%] -translate-x-1/2 sm:w-full"
        viewBox="0 0 1440 210"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55V210H0V65Z"
          fill="currentColor"
        />
        <path
          data-section-wave-path
          d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55"
          fill="none"
          stroke="#ead6c4"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M22 93C154 132 266 120 406 96C548 72 628 143 764 166C918 191 998 108 1138 87C1258 69 1322 113 1418 86"
          fill="none"
          stroke="#c9aa96"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeOpacity=".65"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}
