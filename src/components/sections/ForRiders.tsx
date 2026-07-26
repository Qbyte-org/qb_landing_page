import { Check } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { riderTiers } from "@/content/site";

export default function ForRiders() {
  return (
    <section id="riders" data-nav-theme="light" className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          title="Ride with us — smartphone or not"
          subtitle="Our two-tier rider model means everyone can earn. Sign up directly, or run a fleet of riders through our dispatcher portal."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {riderTiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.12}
              className="flex flex-col rounded-card border border-border bg-cream p-8"
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-dark ring-1 ring-border"
                  aria-hidden="true"
                >
                  <tier.icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{tier.name}</h3>
                  <p className="text-sm text-muted">{tier.tagline}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {tier.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-navy/80">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-success text-white"
                      aria-hidden="true"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/riders" size="lg">
            Start riding
          </Button>
        </div>
      </Container>
    </section>
  );
}
