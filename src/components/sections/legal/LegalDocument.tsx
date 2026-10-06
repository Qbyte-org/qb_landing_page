"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";
import { legalUi } from "@/content/legal-ui";
import LegalSidebar from "../LegalSidebar";
import FinalCTA from "../FinalCTA";

export type LegalSection = { id: string; title: string; content: ReactNode };

/** An editorial reading grid; document content is supplied by the server. */
export default function LegalDocument({ current, title, description, introduction, sections }: {
  current: LegalSlug | "delete-account";
  title: string;
  description: string;
  introduction?: ReactNode;
  sections: LegalSection[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const match = gsap.matchMedia();
    match.add("(prefers-reduced-motion: no-preference)", context => {
      // Let GSAP restore the saved scroll position before registering triggers
      // when a visitor changes their motion preference during reading.
      const frame = requestAnimationFrame(() => {
        context.add(() => {
          gsap.utils.toArray<HTMLElement>("[data-legal-number]").forEach(number => {
            gsap.fromTo(number, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: number.closest("article"), start: "top 88%", once: true } });
          });
        });
      });
      return () => cancelAnimationFrame(frame);
    });
    return () => match.revert();
  }, { scope: rootRef });

  return (
    <>
    <section ref={rootRef} data-nav-theme="light" data-legal-document className="bg-paper pt-20 text-ink sm:pt-28 xl:pt-36">
      <div className="w-full border-y border-ink/20 lg:grid lg:grid-cols-[4.75rem_minmax(0,1fr)]">
        <LegalSidebar current={current} />
        <div className="min-w-0">
          <header className="border-b border-ink/20 px-5 pb-8 pt-7 sm:px-9 lg:px-12 lg:pb-10 lg:pt-9">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cocoa">
              <span>{legalUi.documentDesk}</span>
              <a href="#document-sections" className="inline-flex min-h-10 items-center gap-3 hover:text-brand">{legalUi.readDocument} <ArrowDown className="size-3.5" aria-hidden="true" /></a>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <h1 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.055em]">{title}</h1>
              <div className="lg:pt-1">
                <p className="max-w-lg text-sm leading-relaxed text-cocoa sm:text-base">{description}</p>
                <details className="group mt-5 max-w-lg border-t border-ink/20 pt-3 text-sm">
                  <summary className="cursor-pointer py-1 font-medium marker:text-brand">{legalUi.contents} <span className="ml-2 text-cocoa">({sections.length})</span></summary>
                  <ol className="mt-4 grid gap-2 pb-2">
                    {sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="inline-flex gap-3 py-1 text-cocoa underline-offset-4 hover:text-brand hover:underline"><span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}
                  </ol>
                </details>
              </div>
            </div>
          </header>

          {introduction && <div className="border-b border-ink/20 px-5 py-8 sm:px-9 lg:grid lg:grid-cols-[0.72fr_2fr] lg:gap-12 lg:px-12 lg:py-12"><p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cocoa">{legalUi.introduction}</p><div className="min-w-0">{introduction}</div></div>}

          <div id="document-sections" className="scroll-mt-32">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="block scroll-mt-22 border-b border-ink/20 px-5 pt-7 pb-9 last:border-b-0 sm:scroll-mt-28 sm:px-9 sm:pt-10 sm:pb-12 lg:grid lg:scroll-mt-36 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-[clamp(28px,3vw,52px)] lg:px-12 lg:py-16">
                <div data-legal-section-heading className="sticky top-17 z-2 -mx-5 grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center self-start gap-5 border-t-2 border-b border-t-ink border-b-ink/15 bg-paper px-5 py-3.5 sm:top-24 sm:-mx-9 sm:px-9 [@media(640px<width<1024px)]:top-[var(--legal-header-offset,88px)] lg:top-32 lg:mx-0 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:items-start lg:gap-[clamp(20px,2.2vw,36px)] lg:border-b-0 lg:px-0 lg:pb-0">
                  <span className="overflow-visible py-[3px]" aria-hidden="true"><span data-legal-number className="block font-display text-[3.25rem] font-semibold leading-[1.1] tracking-[-.09em] sm:text-[4rem] lg:text-[clamp(4.5rem,8vw,8.5rem)] lg:leading-[.9]">{String(index + 1).padStart(2, "0")}</span></span>
                  <h2 id={`${section.id}-title`} className="min-w-0 font-display text-lg font-semibold leading-[1.25] tracking-[-.025em] sm:text-xl lg:pt-1">{section.title}</h2>
                </div>
                <div className="mt-6 min-w-0 lg:mt-0 lg:border-t-2 lg:border-ink lg:pt-[18px]">{section.content}</div>
              </article>
            ))}
          </div>

          <nav aria-label={legalUi.otherPolicies} className="flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/20 px-5 py-7 sm:px-9 lg:px-12">
            {legalSlugs.filter(slug => slug !== current).map(slug => <Link key={slug} href={`/legal/${slug}`} className="inline-flex min-h-10 items-center gap-2 text-sm text-cocoa hover:text-brand">{legalDocs[slug].short}<ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>)}
            {current !== "delete-account" && <Link href={legalUi.deleteAccount.href} className="inline-flex min-h-10 items-center gap-2 text-sm text-cocoa hover:text-brand">{legalUi.deleteAccount.label}<ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>}
          </nav>
        </div>
      </div>
    </section>
    <FinalCTA
      id="legal-contact"
      {...legalUi.cta}
      splitBackground={false}
    />
    </>
  );
}
