import { pageMetadata } from "@/content/pages";
import Link from "next/link";
import { Mail, X } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import { deleteAccountContent as copy } from "@/content/legal-ui";

export const metadata = pageMetadata["delete-account"];

export default function DeleteAccountPage() {
  const sections = [
    {
      id: copy.deleted.id,
      title: copy.deleted.title,
      content: <ul className="space-y-4 text-sm leading-relaxed text-cocoa">{copy.deleted.items.map(item => <li key={item} className="flex items-start gap-3"><X className="mt-1 size-3.5 shrink-0 text-brand" aria-hidden="true" />{item}</li>)}</ul>,
    },
    {
      id: copy.request.id,
      title: copy.request.title,
      content: <div className="space-y-6 text-sm leading-relaxed text-cocoa"><p>{copy.request.introduction} <strong className="font-semibold text-ink">{copy.request.timeframe}</strong>{copy.request.ending}</p><MagneticFillButton id="delete-account-email-btn" href={copy.request.href} variant="brand" className="min-h-12 max-w-full rounded-full px-5 py-3 text-left text-xs font-semibold" contentClassName="flex items-center justify-center gap-2"><Mail className="size-4 shrink-0" aria-hidden="true" />{copy.request.label}</MagneticFillButton></div>,
    },
    {
      id: copy.changedMind.id,
      title: copy.changedMind.title,
      content: <p className="text-sm leading-relaxed text-cocoa"><Link href={copy.changedMind.href} className="font-medium text-brand-dark underline underline-offset-4">{copy.changedMind.label}</Link>{copy.changedMind.ending}</p>,
    },
  ];
  return (
    <SiteShell>
      <LegalDocument current="delete-account" title={copy.title} description={copy.description} introduction={<p className="text-sm leading-relaxed text-cocoa">{copy.introduction}</p>} sections={sections} />
    </SiteShell>
  );
}
