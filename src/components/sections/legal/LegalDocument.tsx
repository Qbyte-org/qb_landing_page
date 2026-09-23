"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";
import LegalSidebar from "../LegalSidebar";
import MagneticFillButton from "../../ui/MagneticFillButton";

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
            gsap.fromTo(number, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: number.parentElement, start: "top 88%", once: true } });
          });
        });
      });
      return () => cancelAnimationFrame(frame);
    });
    return () => match.revert();
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="bg-paper px-4 pb-5 pt-32 text-ink sm:px-6 sm:pt-36 lg:px-8">
      <div className="mx-auto max-w-[100rem] border border-ink/20 lg:grid lg:grid-cols-[4.75rem_minmax(0,1fr)]">
        <LegalSidebar current={current} />
        <div className="min-w-0">
          <header className="border-b border-ink/20 px-5 pb-8 pt-7 sm:px-9 lg:px-12 lg:pb-10 lg:pt-9">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cocoa">
              <span>QuickBite / Legal desk</span>
              <a href="#document-sections" className="inline-flex min-h-10 items-center gap-3 hover:text-brand">Read the document <ArrowDown className="size-3.5" aria-hidden="true" /></a>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <h1 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.055em]">{title}</h1>
              <div className="lg:pt-1">
                <p className="max-w-lg text-sm leading-relaxed text-cocoa sm:text-base">{description}</p>
                <details className="group mt-5 max-w-lg border-t border-ink/20 pt-3 text-sm">
                  <summary className="cursor-pointer py-1 font-medium marker:text-brand">In this document <span className="ml-2 text-cocoa">({sections.length})</span></summary>
                  <ol className="mt-4 grid gap-2 pb-2">
                    {sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="inline-flex gap-3 py-1 text-cocoa underline-offset-4 hover:text-brand hover:underline"><span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}
                  </ol>
                </details>
              </div>
            </div>
          </header>

          {introduction && <div className="border-b border-ink/20 px-5 py-8 sm:px-9 lg:grid lg:grid-cols-[0.72fr_2fr] lg:gap-12 lg:px-12 lg:py-12"><p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cocoa">Before you begin</p><div className="min-w-0">{introduction}</div></div>}

          <div id="document-sections" className="scroll-mt-32">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="grid scroll-mt-32 gap-5 border-b border-ink/20 px-5 py-9 last:border-b-0 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-7 sm:px-9 sm:py-12 lg:grid-cols-[0.72fr_2fr] lg:gap-12 lg:px-12 lg:py-16">
                <div className="overflow-hidden lg:self-start"><span data-legal-number className="block font-display text-[clamp(3.75rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.09em]">{String(index + 1).padStart(2, "0")}</span></div>
                <div className="min-w-0 border-t-2 border-ink pt-4 lg:grid lg:grid-cols-[0.82fr_1.4fr] lg:gap-7 xl:gap-10">
                  <h2 className="mb-5 font-display text-lg font-semibold leading-tight tracking-tight sm:text-xl lg:sticky lg:top-32 lg:self-start">{section.title}</h2>
                  <div className="min-w-0">{section.content}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="bg-ink px-5 py-12 text-paper sm:px-9 lg:px-12 lg:py-16">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">A little clarity.<br />Whenever you need it.</h2>
              <div className="max-w-md lg:justify-self-end"><p className="mb-6 text-sm leading-relaxed text-paper/70">Have a question about a policy or your account? Our team is here to help you find your way.</p><MagneticFillButton href="mailto:quickbiteinfo01@gmail.com" variant="cream" className="min-h-12 rounded-full px-6 text-sm font-semibold">Contact our team <ArrowUpRight className="size-4" aria-hidden="true" /></MagneticFillButton></div>
            </div>
            <nav aria-label="Other policies" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-paper/20 pt-5">
              {legalSlugs.filter(slug => slug !== current).map(slug => <Link key={slug} href={`/legal/${slug}`} className="inline-flex min-h-10 items-center gap-2 text-sm text-paper/80 hover:text-paper">{legalDocs[slug].short}<ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>)}
              {current !== "delete-account" && <Link href="/delete-account" className="inline-flex min-h-10 items-center gap-2 text-sm text-paper/80 hover:text-paper">Delete account<ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
