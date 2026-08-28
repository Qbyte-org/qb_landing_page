export function HomeToCategoriesWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-[4.6rem] z-10 h-[7.5rem] overflow-x-clip overflow-y-visible sm:-top-32 sm:h-52 sm:overflow-visible"
    >
      <svg
        className="absolute left-1/2 top-0 h-full w-[178vw] -translate-x-1/2 overflow-visible text-[#fffaf5] sm:static sm:w-full sm:translate-x-0"
        viewBox="0 0 1440 210"
        preserveAspectRatio="none"
      >
        <path
          d="M0 42C143 87 244 87 391 54C544 20 625 99 769 125C914 151 984 68 1124 41C1254 16 1328 71 1440 37V210H0V42Z"
          fill="currentColor"
        />
        <path
          data-home-bike-path
          d="M0 42C143 87 244 87 391 54C544 20 625 99 769 125C914 151 984 68 1124 41C1254 16 1328 71 1440 37"
          fill="none"
          stroke="#ead6c4"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M20 69C159 109 262 100 406 76C545 52 629 124 763 147C917 173 997 90 1134 68C1257 48 1322 95 1420 67"
          fill="none"
          stroke="#c9aa96"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeOpacity=".58"
          strokeWidth="3"
        />
        <image
          data-home-wave-bike
          href="/quickbite-delivery-bike.svg"
          width="178"
          height="104"
        />
      </svg>
    </div>
  );
}

export function CategoriesToHowWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-40 overflow-x-clip overflow-y-visible sm:h-48 sm:overflow-visible"
    >
      <svg
        className="absolute left-1/2 top-0 h-full w-[178vw] -translate-x-1/2 overflow-visible text-[#2a211d] sm:static sm:w-full sm:translate-x-0"
        viewBox="0 0 1440 210"
        preserveAspectRatio="none"
      >
        <path
          d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55V210H0V65Z"
          fill="currentColor"
        />
        <path
          data-between-bike-path
          d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55"
          fill="none"
          stroke="#f0d7c2"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M22 93C154 132 266 120 406 96C548 72 628 143 764 166C918 191 998 108 1138 87C1258 69 1322 113 1418 86"
          fill="none"
          stroke="#c9aa96"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeOpacity=".72"
          strokeWidth="3"
        />
        <image
          data-between-wave-bike
          href="/quickbite-delivery-bike.svg"
          width="178"
          height="104"
        />
      </svg>
    </div>
  );
}
