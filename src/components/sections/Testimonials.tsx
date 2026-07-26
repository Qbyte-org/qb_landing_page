import { Star, Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { testimonials } from "@/content/site";

export default function Testimonials() {
  return (
    <section data-nav-theme="light" className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          title="Customers, vendors & riders agree"
          subtitle="Real stories from the QuickBite community."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
            <figure
              className="relative flex h-full flex-col rounded-2xl border border-border bg-cream p-7"
            >
              <Quote
                className="absolute right-6 top-6 h-9 w-9 text-brand/15"
                aria-hidden="true"
              />
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-navy/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-pill text-sm font-bold text-white"
                  style={{ backgroundColor: t.accent }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
