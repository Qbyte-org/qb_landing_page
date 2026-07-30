import Image from "next/image";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import IconChip from "../ui/IconChip";
import MagneticFillButton from "../ui/MagneticFillButton";
import { appFeatures } from "@/content/site";

function StoreBadge({
  store,
}: {
  store: "apple" | "google";
}) {
  return (
    <MagneticFillButton
      href="#"
      variant="white"
      className="rounded-card px-5 py-3"
      ariaLabel={store === "apple" ? "Download on the App Store" : "Get it on Google Play"}
    >
      <span aria-hidden="true">
        {store === "apple" ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.3s-2.1-.8-2.1-3.3ZM14.2 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 0 2-.6 2.5-1.2Z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.6 2.3 13 11.7 3.6 21.1c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Zm10.8 8.4 2.9-2.9 3.3 1.9c.8.5.8 1.6 0 2.1l-3.3 1.9-2.9-3Zm-1 1 2.9 2.9-9.4 5.4 6.5-8.3Zm0-2L6.9 1.7l9.4 5.4-2.9 2.9Z" />
          </svg>
        )}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-muted">
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="block text-sm font-bold">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </MagneticFillButton>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[min(78vw,20rem)] sm:w-[23rem] lg:w-[24rem]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f06400]/20 blur-3xl sm:h-80 sm:w-80"
      />
      <Image
        src="/images/phone.png"
        alt="QuickBite mobile app preview"
        width={433}
        height={577}
        sizes="(min-width: 1024px) 384px, 78vw"
        className="pointer-events-none relative z-10 h-auto w-full select-none object-contain"
      />
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section id="app" data-nav-theme="dark" className="overflow-x-clip bg-[#fffaf5] py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 text-white lg:grid-cols-2 lg:gap-8">
          <Reveal direction="left" className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl">
              Order on the go, track every bite
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Everything you love about QuickBite, in your pocket. Order from
              multiple restaurants, pay in a tap, and follow your rider in real
              time.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {appFeatures.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <IconChip icon={f.icon} size="sm" tone="light" />
                  <div>
                    <h3 className="text-base font-bold">{f.title}</h3>
                    <p className="mt-0.5 text-sm text-white/60">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <StoreBadge store="apple" />
              <StoreBadge store="google" />
            </div>
          </Reveal>

          <Reveal direction="right" className="order-1 lg:order-2">
            <PhoneMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
