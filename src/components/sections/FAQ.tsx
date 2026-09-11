import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
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
              className="section-heading mt-5 max-w-lg leading-[1.08]!"
            >
              <span className="block">Good questions.</span>
              <span className="mt-3 block text-[#6d5c52]">Clear answers.</span>
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
                <MagneticFillButton
                  href="mailto:support@quickbite.ng"
                  variant="white"
                  customFillClass="bg-brand"
                  customHoverTextColor="#ffffff"
                  className="group mt-3 min-h-11 rounded-pill border! border-ink/15! bg-paper! px-4 py-2 text-base font-semibold text-ink!"
                >
                  Talk to our team
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-[#f06400] transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </MagneticFillButton>
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
                <MagneticFillButton
                  as="summary"
                  variant="white"
                  ariaLabel={faq.question}
                  customFillClass="bg-cream-200"
                  customHoverTextColor="#2a211d"
                  className="block! min-h-24 w-full list-none bg-transparent! px-2 py-6 text-left text-ink! focus-visible:outline-2! focus-visible:outline-ink! focus-visible:outline-offset-[-3px] sm:px-5"
                  contentClassName="grid! w-full grid-cols-[1.25rem_minmax(0,1fr)_2rem] items-center gap-3! sm:grid-cols-[1.5rem_minmax(0,1fr)_2.5rem] sm:gap-5!"
                >
                  <span aria-hidden="true" className="self-start pt-1 text-xs font-medium tabular-nums text-[#6d5c52]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold leading-snug sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2a211d]/20 transition-colors duration-200 group-open:border-[#2a211d] group-open:bg-peach motion-reduce:transition-none sm:size-10"
                    aria-hidden="true"
                  >
                    <Plus className="size-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none sm:size-5" strokeWidth={1.7} />
                  </span>
                </MagneticFillButton>
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
