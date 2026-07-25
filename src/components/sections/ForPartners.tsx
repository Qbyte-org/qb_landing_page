import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import IconChip from "../ui/IconChip";
import { partnerPerks } from "@/content/site";

export default function ForPartners() {
  return (
    <section id="partners" className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal direction="right" className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
                alt="A restaurant kitchen preparing fresh food"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-card bg-white p-4 shadow-card sm:-right-6">
              <p className="text-2xl font-extrabold text-brand-dark">2x</p>
              <p className="text-xs text-muted">more orders on average</p>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal direction="left" className="order-1 lg:order-2">
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
              For restaurants & vendors
            </span>
            <h2 className="mt-1 font-display text-3xl font-extrabold leading-[1.1] text-navy sm:text-4xl">
              Grow your food business with QuickBite
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Whether you run a busy restaurant or cook from home, reach more
              hungry customers and get paid reliably.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {partnerPerks.map((perk) => (
                <div key={perk.title} className="flex gap-3">
                  <IconChip icon={perk.icon} size="sm" tone="brand" />
                  <div>
                    <h3 className="text-base font-bold text-navy">
                      {perk.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {perk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <Button href="/partners" size="lg">
                Become a partner
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
