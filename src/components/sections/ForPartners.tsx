import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import IconChip from "../ui/IconChip";
import { partnerPerks } from "@/content/site";

export default function ForPartners() {
  return (
    <section id="partners" data-nav-theme="neutral" className="overflow-x-clip bg-cream py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal direction="right" mode="image" className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
                alt="A restaurant kitchen preparing fresh food"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal direction="left" className="order-1 lg:order-2">
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
