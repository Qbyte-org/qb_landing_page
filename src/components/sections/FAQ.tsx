import { Plus } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { faqs } from "@/content/site";

export default function FAQ() {
  return (
    <section data-nav-theme="neutral" className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.05}>
            <details
              className="group rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand/30 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-navy">
                {faq.question}
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand-50 text-brand-dark transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <Plus className="h-[1.15rem] w-[1.15rem]" strokeWidth={2.2} />
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
