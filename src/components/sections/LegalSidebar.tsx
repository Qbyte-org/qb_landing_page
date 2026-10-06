import { Mail, Trash2 } from "lucide-react";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";
import { legalUi } from "@/content/legal-ui";
import MagneticFillButton from "../ui/MagneticFillButton";

const selectorClasses = "min-h-11 rounded-full px-3 text-xs font-semibold lg:size-11 lg:px-0";
const tooltipClasses = "pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-10 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-dark-ink px-3 py-2 text-xs font-medium text-paper opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 lg:block";

export default function LegalSidebar({ current }: { current: LegalSlug | "delete-account" }) {
  return (
    <aside className="relative z-10 border-b border-ink/20 lg:sticky lg:top-28 lg:flex lg:min-h-[calc(100svh-8rem)] lg:flex-col lg:self-start lg:border-b-0 lg:border-r">
      <nav
        aria-label={legalUi.documentsLabel}
        className="flex flex-wrap gap-1 p-2 lg:flex-col lg:gap-3 lg:px-3 lg:py-6"
      >
        <ul className="contents">
          {legalSlugs.map((slug) => {
            const doc = legalDocs[slug];
            const active = slug === current;
            return (
              <li key={slug} className="group relative">
                <MagneticFillButton
                  href={`/legal/${slug}`}
                  ariaLabel={doc.title}
                  aria-current={active ? "page" : undefined}
                  variant={active ? "dark" : "cream"}
                  className={`${selectorClasses} ${active ? "bg-dark-ink! text-paper!" : "bg-paper! text-cocoa"}`}
                >
                  <doc.icon className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  <span className="lg:sr-only">{doc.short}</span>
                </MagneticFillButton>
                <span aria-hidden="true" className={tooltipClasses}>{doc.title}</span>
              </li>
            );
          })}
          <li className="group relative">
            <MagneticFillButton href={legalUi.deleteAccount.href} ariaLabel={legalUi.deleteAccount.ariaLabel} aria-current={current === "delete-account" ? "page" : undefined} variant={current === "delete-account" ? "dark" : "cream"} className={`${selectorClasses} ${current === "delete-account" ? "bg-dark-ink! text-paper!" : "bg-paper! text-cocoa"}`}>
              <Trash2 className="size-4" strokeWidth={1.6} aria-hidden="true" /><span className="lg:sr-only">{legalUi.deleteAccount.label}</span>
            </MagneticFillButton>
            <span aria-hidden="true" className={tooltipClasses}>{legalUi.deleteAccount.ariaLabel}</span>
          </li>
        </ul>
      </nav>
      <span aria-hidden="true" className="mx-auto hidden grow items-center justify-center py-8 text-[0.6rem] uppercase tracking-[0.25em] text-cocoa [writing-mode:vertical-rl] lg:flex">{legalUi.sidebarDesk}</span>
      <div className="mb-6 hidden justify-center lg:flex"><MagneticFillButton href={legalUi.contact.href} ariaLabel={legalUi.contact.ariaLabel} variant="cream" className="size-11 rounded-full border! border-ink/20! bg-paper!"><Mail className="size-4" aria-hidden="true" /></MagneticFillButton></div>
    </aside>
  );
}
