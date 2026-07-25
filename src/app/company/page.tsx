import type { Metadata } from "next";
import { Zap, Handshake, MapPinned } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import PageHeader from "@/components/sections/PageHeader";
import TrustBar from "@/components/sections/TrustBar";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconChip from "@/components/ui/IconChip";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About QuickBite",
  description:
    "QuickBite is building Nigeria's most reliable food delivery platform — connecting customers, restaurants and riders with speed and trust.",
};

const values = [
  {
    icon: Zap,
    title: "Speed",
    body: "We obsess over delivery times so your food arrives fresh and fast.",
  },
  {
    icon: Handshake,
    title: "Trust",
    body: "Verified vendors, secure payments and transparent tracking, every order.",
  },
  {
    icon: MapPinned,
    title: "Built for Nigeria",
    body: "From multi-restaurant orders to non-app riders, we design for real life here.",
  },
];

export default function CompanyPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our story"
        title="Feeding Nigeria, one fast delivery at a time"
        subtitle="Starting in Ile-Ife, QuickBite connects customers with local food sellers while powering a mixed fleet of riders — built for speed, trust and the realities of the Nigerian market."
      >
        <Button href="/restaurants" size="lg">
          Order now
        </Button>
        <Button href="/partners" variant="outline" size="lg">
          Partner with us
        </Button>
      </PageHeader>

      <TrustBar />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="Our values"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-cream p-8 text-center shadow-soft transition-transform duration-200 hover:-translate-y-1"
              >
                <IconChip icon={v.icon} size="lg" tone="brand" className="mx-auto" />
                <h3 className="mt-4 text-xl font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Want to work with us?
          </h2>
          <p className="mt-4 text-lg text-muted">
            We&apos;re always looking for people who love food and great
            products. Reach out and say hello.
          </p>
          <div className="mt-8">
            <Button href="mailto:hello@quickbite.ng" external size="lg">
              hello@quickbite.ng
            </Button>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
