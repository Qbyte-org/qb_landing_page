import { MapPin, Search, Bike, CookingPot, CupSoda, type LucideIcon } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import IconChip from "../ui/IconChip";
import { appFeatures } from "@/content/site";

function StoreBadge({
  store,
}: {
  store: "apple" | "google";
}) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 rounded-card bg-white px-5 py-3 text-navy shadow-soft transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-cream hover:shadow-card"
      aria-label={store === "apple" ? "Download on the App Store" : "Get it on Google Play"}
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
    </a>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px]">
      <div className="relative rounded-[2.5rem] border-[10px] border-navy bg-navy shadow-card-hover ring-1 ring-white/20">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-pill bg-navy" />
        {/* screen */}
        <div className="overflow-hidden rounded-[1.8rem] bg-cream">
          {/* app header */}
          <div className="bg-gradient-to-br from-brand to-brand-light px-4 pb-6 pt-8 text-white">
            <p className="text-xs/none opacity-80">Deliver to</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold">
              <MapPin className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              OAU Campus, Ile-Ife
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-pill bg-white/95 px-4 py-2 text-sm text-muted">
              <Search className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              Search jollof, suya…
            </div>
          </div>
          {/* tracking card */}
          <div className="space-y-3 p-4">
            <div className="rounded-card bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy">Order #QB2048</span>
                <span className="rounded-pill bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700">
                  On the way
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {[0, 1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`h-1.5 flex-1 rounded-pill ${
                      s < 3 ? "bg-brand" : "bg-black/10"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                <Bike className="h-3.5 w-3.5 text-brand-dark" strokeWidth={2.25} aria-hidden="true" />
                Emeka is 5 min away
              </p>
            </div>

            {([
              { icon: CookingPot, n: "Smoky Jollof + Chicken", p: "₦3,500" },
              { icon: CupSoda, n: "Chapman (50cl)", p: "₦1,200" },
            ] as { icon: LucideIcon; n: string; p: string }[]).map((item) => (
              <div
                key={item.n}
                className="flex items-center gap-3 rounded-card bg-white p-3 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream-200 text-brand-dark">
                  <item.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="flex-1 text-xs font-semibold text-navy">
                  {item.n}
                </span>
                <span className="text-xs font-bold text-brand-dark">
                  {item.p}
                </span>
              </div>
            ))}

            <div className="rounded-pill bg-brand-dark py-2.5 text-center text-sm font-bold text-white">
              Track order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section id="app" data-nav-theme="dark" className="bg-navy py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 text-white lg:grid-cols-2 lg:gap-8">
          <Reveal direction="left" className="order-2 lg:order-1">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-light">
              The QuickBite app
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl">
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
