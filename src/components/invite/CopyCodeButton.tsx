"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { inviteCopy } from "@/content/invite";

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard access can be refused; selecting the code lets the person copy it themselves.
      const target = document.getElementById("invite-code");
      if (target) window.getSelection()?.selectAllChildren(target);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={inviteCopy.copy.ariaLabel(code)}
        className="inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-paper/25 px-5 text-base font-semibold text-paper transition-colors hover:border-paper/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper motion-reduce:transition-none"
      >
        {copied ? <Check aria-hidden="true" className="size-4 text-brand-light" /> : <Copy aria-hidden="true" className="size-4" />}
        {copied ? inviteCopy.copy.copied : inviteCopy.copy.label}
      </button>
      <span role="status" className="sr-only">{copied ? inviteCopy.copy.copiedStatus : ""}</span>
    </>
  );
}
