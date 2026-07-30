export default function BiteRouteIcon({
  direction = "right",
  className = "",
}: {
  direction?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        transform={
          direction === "left" ? "translate(32 0) scale(-1 1)" : undefined
        }
      >
        <path
          d="M5.5 20.5C9.8 15.1 14.1 22.6 18.3 17.8C20.4 15.4 22.1 12.8 25.8 12.8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.35"
        />
        <path
          d="M22.5 8.9L26.8 12.8L22.5 16.7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.35"
        />
        <circle cx="6" cy="20.5" r="2.1" fill="currentColor" opacity="0.72" />
        <path
          d="M11.2 10.7H18.7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.9"
          opacity="0.72"
        />
        <path
          d="M13.2 10.4C13.8 7.8 16.2 6.2 18.6 6.9C20.4 7.5 21.7 8.9 22.1 10.7H13.2Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.7"
          opacity="0.72"
        />
      </g>
    </svg>
  );
}
