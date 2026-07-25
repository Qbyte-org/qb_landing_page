import Link from "next/link";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Marquee from "../ui/Marquee";
import { categories } from "@/content/site";

export default function Categories() {
  return (
    <section id="categories" data-nav-theme="neutral" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Cravings sorted"
          title="What are you in the mood for?"
          subtitle="From a plate of smoky jollof to late-night small chops, pick a category and dig in."
        />
      </Container>

      {/* Cuisine marquee ribbon */}
      <div className="mt-10">
        <Marquee fade="white" className="py-2">
          {categories.map((cat) => (
            <span
              key={`marquee-${cat.name}`}
              className="inline-flex items-center gap-2.5 rounded-pill border border-border bg-cream px-5 py-2.5 text-base font-semibold text-navy"
            >
              <cat.icon className="h-[1.15rem] w-[1.15rem] text-brand-dark" strokeWidth={1.75} aria-hidden="true" />
              {cat.name}
            </span>
          ))}
        </Marquee>
      </div>

      <Container>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={(i % 4) * 0.06}>
              <Link
                href="/restaurants"
                className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-brand-dark transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: cat.tint }}
                  aria-hidden="true"
                >
                  <cat.icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <span className="text-base font-semibold text-navy">
                  {cat.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
