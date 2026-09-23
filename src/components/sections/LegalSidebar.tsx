import Link from "next/link";
import { Mail, Trash2 } from "lucide-react";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";

export default function LegalSidebar({ current }: { current: LegalSlug | "delete-account" }) {
  return (
    <aside className="border-b border-ink/20 lg:sticky lg:top-28 lg:flex lg:min-h-[calc(100svh-8rem)] lg:flex-col lg:self-start lg:border-b-0 lg:border-r">
      <nav
        aria-label="Legal documents"
        className="flex flex-wrap gap-1 p-2 lg:flex-col lg:gap-3 lg:px-3 lg:py-6"
      >
        <ul className="contents">
          {legalSlugs.map((slug) => {
            const doc = legalDocs[slug];
            const active = slug === current;
            return (
              <li key={slug}>
                <Link
                  href={`/legal/${slug}`}
                  title={doc.title}
                  aria-current={active ? "page" : undefined}
                  className={`group flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:size-11 lg:px-0 ${
                    active
                      ? "bg-ink text-paper"
                      : "text-cocoa hover:bg-brand/10 hover:text-brand"
                  }`}
                >
                  <doc.icon className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  <span className="lg:sr-only">{doc.short}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/delete-account" aria-current={current === "delete-account" ? "page" : undefined} title="Delete your account" className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors lg:size-11 lg:px-0 ${current === "delete-account" ? "bg-ink text-paper" : "text-cocoa hover:bg-brand/10 hover:text-brand"}`}>
          <Trash2 className="size-4" strokeWidth={1.6} aria-hidden="true" /><span className="lg:sr-only">Delete account</span>
        </Link>
      </nav>
      <span aria-hidden="true" className="mx-auto hidden grow items-center justify-center py-8 text-[0.6rem] uppercase tracking-[0.25em] text-cocoa [writing-mode:vertical-rl] lg:flex">The QuickBite legal desk</span>
      <a href="mailto:quickbiteinfo01@gmail.com" aria-label="Email QuickBite about our policies" title="Contact our team" className="mx-auto mb-6 hidden size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-paper lg:flex"><Mail className="size-4" aria-hidden="true" /></a>
    </aside>
  );
}
