import { MapPin, CircleCheck, Clock3 } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import {
  liveCity,
  liveCityState,
  coverageAreas,
  expansionCities,
} from "@/content/site";

export default function CityCoverage() {
  return (
    <section id="cities" data-nav-theme="accent" className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Where we deliver"
          title={
            <>
              Now live in {liveCity} —{" "}
              <span className="text-brand-dark">Nigeria next</span>
            </>
          }
          subtitle="We started in Ile-Ife and we're just getting going. Don't see your city yet? It's probably next on the map."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5">
          {/* Live city — the hero card */}
          <Reveal className="lg:col-span-3">
            <div className="relative h-full overflow-hidden rounded-2xl border border-brand/20 bg-white p-7 shadow-card sm:p-8">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-8px_rgb(255_107_0/0.5)]">
                    <MapPin className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-navy">
                      {liveCity}
                    </h3>
                    <p className="text-sm text-muted">{liveCityState}, Nigeria</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-success/10 px-3 py-1 text-xs font-bold text-success ring-1 ring-success/20">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-pill bg-success" />
                  </span>
                  Live now
                </span>
              </div>

              <p className="relative mt-6 text-sm font-semibold uppercase tracking-wider text-muted">
                Neighbourhoods we cover
              </p>
              <div className="relative mt-3 flex flex-wrap gap-2">
                {coverageAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-cream px-3 py-1.5 text-sm font-semibold text-navy"
                  >
                    <CircleCheck className="h-3.5 w-3.5 text-success" strokeWidth={2.25} aria-hidden="true" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Coming soon — expansion roadmap */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-navy p-7 text-white shadow-card sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-white/10 px-3 py-1 text-xs font-bold text-brand-light ring-1 ring-white/10">
                <Clock3 className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                Coming soon
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">
                Rolling out across Nigeria
              </h3>
              <p className="mt-1 text-sm text-white/60">
                These cities are next on the QuickBite map.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {expansionCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 rounded-pill bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/70 ring-1 ring-white/10"
                  >
                    <MapPin className="h-3.5 w-3.5 text-white/40" strokeWidth={2} aria-hidden="true" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
