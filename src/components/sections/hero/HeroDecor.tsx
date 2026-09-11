export default function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        data-hero-map-detail
        className="absolute inset-x-0 top-0 h-full opacity-50 [background-image:linear-gradient(rgba(255,250,245,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,250,245,0.035)_1px,transparent_1px)] [background-size:4.25rem_4.25rem] sm:[background-size:5rem_5rem]"
      />
    </div>
  );
}
