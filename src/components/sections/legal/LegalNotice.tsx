import type { ReactNode } from "react";
import { FileWarning } from "lucide-react";
import { legalUi } from "@/content/legal-ui";

/** The policy warning stays intact; this only replaces its quote presentation. */
export default function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <aside aria-label={legalUi.disclaimer} data-legal-notice className="mb-7 overflow-hidden rounded-2xl border border-ink/15 bg-cream-200">
      <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-4 sm:px-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-paper text-brand-dark"><FileWarning className="size-5" strokeWidth={1.6} aria-hidden="true" /></span>
        <p className="m-0! font-display text-base font-semibold text-ink!">{legalUi.disclaimer}</p>
      </div>
      <div className="px-4 py-4 text-[0.825rem] leading-relaxed text-cocoa sm:px-5 sm:py-5 [&_p]:m-0! [&_p]:leading-[1.8]! [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </aside>
  );
}
