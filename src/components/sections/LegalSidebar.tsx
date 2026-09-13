import LinkArrow from "../ui/LinkArrow";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";

export default function LegalSidebar({ current }: { current: LegalSlug }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav
        aria-label="Legal documents"
        className="rounded-card border border-border bg-white p-3"
      >
        <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-muted">
          Legal Center
        </p>
        <ul className="space-y-1">
          {legalSlugs.map((slug) => {
            const doc = legalDocs[slug];
            const active = slug === current;
            return (
              <li key={slug}>
                <LinkArrow
                  href={`/legal/${slug}`}
                  appearance="plain"
                  aria-current={active ? "page" : undefined}
                  className={`flex! items-center gap-3 rounded-pill px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-brand-50 text-brand-dark"
                      : "text-navy/70 hover:bg-cream hover:text-navy"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      active ? "bg-white text-brand-dark" : "bg-cream text-navy/60"
                    }`}
                    aria-hidden="true"
                  >
                    <doc.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  {doc.short}
                </LinkArrow>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-4 rounded-card border border-border bg-navy p-5 text-white">
        <p className="text-sm font-bold">Questions about our policies?</p>
        <p className="mt-1 text-sm text-white/70">
          Our team is happy to help clarify anything.
        </p>
        <LinkArrow
          href="mailto:support@quickbite.ng"
          variant="dark"
          className="mt-3 w-full min-w-0! text-sm! font-semibold normal-case! text-brand-light! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.04em]"
        >
          Contact support
        </LinkArrow>
      </div>
    </aside>
  );
}
