import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import ForPartners from "@/components/sections/ForPartners";
import PageHeader from "@/components/sections/PageHeader";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Become a Partner — QuickBite",
  description:
    "List your restaurant or home kitchen on QuickBite. Reach more customers, get fast Paystack payouts and onboard with simple NIN/BVN verification.",
};

const onboardingSteps = [
  {
    n: 1,
    title: "Sign up",
    body: "Tell us about your business — name, address, phone and food category.",
  },
  {
    n: 2,
    title: "Verify (KYC)",
    body: "Submit your NIN and BVN. We verify with Smile Identity and Flutterwave.",
  },
  {
    n: 3,
    title: "Add your menu",
    body: "Once approved, publish dishes with photos and prices — instantly live.",
  },
  {
    n: 4,
    title: "Start earning",
    body: "Accept orders and receive reliable payouts to your bank via Paystack.",
  },
];

export default function PartnersPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="For restaurants & vendors"
        title="Partner with QuickBite"
        subtitle="Turn your kitchen into a growing delivery business. Onboarding is quick, and you keep doing what you do best — cooking great food."
      >
        <Button href="#partners" size="lg">
          Apply to join
        </Button>
        <Button href="/" variant="outline" size="lg">
          Back home
        </Button>
      </PageHeader>

      <ForPartners />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Onboarding"
            title="Live in four simple steps"
            subtitle="From sign-up to your first order, most partners are selling within a day of verification."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {onboardingSteps.map((step) => (
              <div
                key={step.n}
                className="rounded-card border border-border bg-cream p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-brand-dark text-lg font-bold text-white">
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-muted">
              Partner applications open with launch — join the waitlist to get
              early access.
            </p>
            <div className="mt-5">
              <Button href="#app" size="lg">
                Join the partner waitlist
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
