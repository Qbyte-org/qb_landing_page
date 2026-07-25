import { UtensilsCrossed } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-navy/20 blur-3xl"
          />
          <Reveal className="relative" direction="up">
            <span
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur"
              aria-hidden="true"
            >
              <UtensilsCrossed className="h-8 w-8" strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
              Hungry? Fast. Fresh. Delivered.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Order your next meal in minutes or join thousands of partners and
              riders growing with QuickBite.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/restaurants" variant="white" size="lg">
                Order now
              </Button>
              <Button href="#app" variant="dark" size="lg">
                Get the app
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
