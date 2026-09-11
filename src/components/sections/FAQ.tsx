import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import Container from "../ui/Container";
import { faqs } from "@/content/site";

export default function FAQ() {
  return (
    <section
      id="faq"
      data-nav-theme="neutral"
      aria-labelledby="faq-title"
      className="scroll-mt-24 bg-[#fffaf5] py-16 text-[#2a211d] sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-16 xl:gap-24">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6d5c52]">
              <span aria-hidden="true" className="h-px w-8 bg-[#f06400]" />
              FAQ
            </p>
            <h2
              id="faq-title"
              className="section-heading mt-5 max-w-lg"
            >
              Good questions.
              <br />
              <span className="text-[#6d5c52]">Clear answers.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#6d5c52] sm:text-lg">
              From your first order to your next opportunity, here&apos;s what
              you need to know about QuickBite.
            </p>

            <div className="mt-8 flex max-w-sm items-start gap-4 border-t border-dashed border-[#2a211d]/20 pt-6 lg:mt-12">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ffe7d7]">
                <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-sm text-[#6d5c52]">Still have something on your mind?</p>
                <a
                  href="mailto:support@quickbite.ng"
                  className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm"
                >
                  Talk to our team
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-[#f06400] transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0 border-t border-[#2a211d]/20">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                name="quickbite-faq"
                open={i === 0}
                className="group border-b border-[#2a211d]/20 transition-colors duration-200 open:bg-cream-200 motion-reduce:transition-none [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  className="grid min-h-24 cursor-pointer list-none grid-cols-[1.25rem_minmax(0,1fr)_2rem] items-center gap-3 px-2 py-6 hover:bg-cream-200/60 focus-visible:outline-offset-[-3px] sm:grid-cols-[1.5rem_minmax(0,1fr)_2.5rem] sm:gap-5 sm:px-5"
                >
                  <span aria-hidden="true" className="self-start pt-1 text-xs font-medium tabular-nums text-[#6d5c52]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">
                    {faq.question}
                  </h3>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2a211d]/20 transition-colors duration-200 group-open:border-[#2a211d] group-open:bg-[#2a211d] group-open:text-[#fffaf5] motion-reduce:transition-none sm:size-10"
                    aria-hidden="true"
                  >
                    <Plus className="size-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none sm:size-5" strokeWidth={1.7} />
                  </span>
                </summary>
                <div className="pb-7 pl-10 pr-4 sm:pl-16 sm:pr-20">
                  <p className="max-w-xl text-sm leading-7 text-[#6d5c52] sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
