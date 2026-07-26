import type { Metadata } from "next";
import { Clock, Wallet, Route } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import ForRiders from "@/components/sections/ForRiders";
import PageHeader from "@/components/sections/PageHeader";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconChip from "@/components/ui/IconChip";

export const metadata: Metadata = {
  title: "Ride with QuickBite — Earn on your schedule",
  description:
    "Earn delivering with QuickBite. App riders accept orders directly; dispatch partners manage fleets of non-app riders. Flexible hours, reliable payouts.",
};

const perks = [
  { icon: Clock, title: "Flexible hours", body: "Go online whenever it suits you — full-time or for extra cash." },
  { icon: Wallet, title: "Reliable payouts", body: "Track earnings daily and get paid weekly, straight to your bank." },
  { icon: Route, title: "Smart dispatch", body: "Get matched to nearby orders so you spend less time waiting." },
];

export default function RidersPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Earn with QuickBite"
        title="Deliver. Earn. Repeat."
        subtitle="Whether or not you own a smartphone, there's a way to earn with QuickBite. Pick the path that fits you."
      >
        <Button href="#riders" size="lg">
          Apply to ride
        </Button>
        <Button href="/" variant="outline" size="lg">
          Back home
        </Button>
      </PageHeader>

      <ForRiders />

      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-white p-7 text-center transition-transform duration-200 hover:-translate-y-1"
              >
                <IconChip icon={p.icon} size="lg" tone="brand" className="mx-auto" />
                <h3 className="mt-4 text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-muted">
              Rider sign-ups open with launch — join the waitlist to ride from
              day one.
            </p>
            <div className="mt-5">
              <Button href="#app" size="lg">
                Join the rider waitlist
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
