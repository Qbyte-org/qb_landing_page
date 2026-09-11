export default function BackgroundGrainTexture({
  tone = "dark",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] bg-size-[128px_128px] opacity-5 ${tone === "light" ? "mix-blend-multiply" : "mix-blend-soft-light"} ${className}`}
    />
  );
}
