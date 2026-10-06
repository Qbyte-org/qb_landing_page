import { ArrowRight, ClipboardList } from "lucide-react";
import { partnersPageContent } from "@/content/partners-page";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";

const content = partnersPageContent.readiness;

export default function PartnerReadiness() {
  return (
    <section
      id="partner-readiness"
      aria-labelledby="partner-readiness-title"
      data-nav-theme="neutral"
      className="bg-paper pt-10 pb-14 text-ink sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-24"
    >
      <Container>
        <Reveal className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-12 lg:gap-24">
          <div>
            <p className="mb-5 text-[.68rem] font-semibold leading-relaxed tracking-[.15em] text-cocoa uppercase sm:text-[.7rem]">
              {content.chapter}
            </p>
            <h2
              id="partner-readiness-title"
              className="font-display text-[clamp(2.3rem,4.4vw,4rem)] font-semibold leading-[1.08] tracking-[-.055em] text-balance"
            >
              {content.title[0]}<br />
              <span className="text-brand">{content.title[1]}</span>
            </h2>
          </div>
          <p className="max-w-md text-[.94rem] leading-[1.8] text-cocoa md:pb-1 lg:text-base">
            {content.description}
          </p>
        </Reveal>

        <div className="mt-9 overflow-hidden border-t border-ink/15 bg-cream-200 sm:mt-12 lg:mt-14">
          {/* <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-ink/15 px-5 py-5 sm:px-8 lg:px-9">
            <h3 id="partner-starter-kit-title" className="flex items-center gap-3 text-sm font-semibold sm:text-base">
              <ClipboardList size={20} className="shrink-0 text-brand" aria-hidden="true" />
              {content.listLabel}
            </h3>
            <p className="text-[.65rem] font-semibold tracking-[.1em] text-cocoa uppercase">
              {content.countLabel}
            </p>
          </div> */}

          <ol aria-labelledby="partner-starter-kit-title" className="grid md:grid-cols-3">
            {content.items.map((item, index) => (
              <li
                key={item.number}
                className="relative min-w-0 border-ink/20 not-first:border-t not-first:border-dashed md:not-first:border-t-0 md:not-first:border-l"
              >
                <Reveal delay={index * 0.07} className="flex h-full flex-col px-5 py-7 sm:px-8 sm:py-9 md:px-6 lg:px-9 lg:py-10">
                  <div className="flex items-start justify-between gap-4">
                    <p className="flex items-center gap-2.5 text-[.62rem] font-semibold tracking-[.08em] text-cocoa uppercase lg:text-[.66rem]">
                      <span className="text-brand tabular-nums" aria-hidden="true">{item.number}</span>
                      {item.label}
                    </p>
                    <item.icon size={25} strokeWidth={1.5} className="shrink-0 text-brand" aria-hidden="true" />
                  </div>
                  <h4 className="mt-5 max-w-[15ch] font-display text-[1.65rem] font-semibold leading-[1.16] tracking-[-.035em] sm:text-[1.85rem] md:min-h-[3.6em] md:text-[1.65rem] lg:min-h-[2.4em] lg:text-[1.9rem]">
                    {item.title}
                  </h4>
                  <p className="mt-4 max-w-sm text-[.85rem] leading-[1.8] text-cocoa lg:text-[.9rem]">
                    {item.description}
                  </p>
                  <p className="mt-auto pt-7 text-[.64rem] leading-relaxed text-cocoa/90 lg:text-[.68rem]">
                    {item.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="flex flex-col gap-5 border-t border-dashed border-ink/20 bg-paper/70 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7 lg:px-9">
            <div>
              <p className="font-display text-xl font-semibold tracking-[-.025em]">{content.actionTitle}</p>
              <p className="mt-1.5 max-w-md text-[.75rem] leading-[1.7] text-cocoa">{content.footnote}</p>
            </div>
            <MagneticFillButton
              href={content.action.href}
              variant="brand"
              className="min-h-13 shrink-0 rounded-full bg-brand! px-6 text-sm sm:min-h-14"
            >
              {content.action.label}
              <ArrowRight size={19} aria-hidden="true" />
            </MagneticFillButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
