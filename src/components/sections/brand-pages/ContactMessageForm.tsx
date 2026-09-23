"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticFillButton from "@/components/ui/MagneticFillButton";

const contactEmail = "quickbiteinfo01@gmail.com";
const fieldClass = "mt-2 min-h-12 w-full min-w-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-cocoa/65 focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export default function ContactMessageForm() {
  const [draftLink, setDraftLink] = useState<string | null>(null);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const phone = String(fields.get("phone") ?? "").trim();
    const topic = String(fields.get("topic") ?? "Hello QuickBite");
    const message = String(fields.get("message") ?? "").trim();
    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}`;
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    setDraftLink(href);
    window.location.href = href;
  }

  return (
    <div className="relative self-start rounded-[1.75rem] border border-ink/10 bg-paper p-6 text-ink shadow-[0_24px_70px_color-mix(in_srgb,var(--color-dark-ink)_25%,transparent)] sm:p-9 lg:-my-8 lg:self-center lg:rounded-[2rem] lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">A note to the team</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Let&apos;s start<br />a conversation.</h2>
      <form onSubmit={prepareEmail} className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="contact-name" className="block text-xs font-semibold text-cocoa">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Full name" required maxLength={100} className={fieldClass} /></label>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-cocoa">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} className={fieldClass} /></label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="contact-topic" className="block text-xs font-semibold text-cocoa">What&apos;s on your mind?<select id="contact-topic" name="topic" className={`${fieldClass} cursor-pointer`}><option>Hello QuickBite</option><option>Restaurant partnership</option><option>Joining as a rider</option><option>Waitlist question</option><option>Feedback and ideas</option></select></label>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-cocoa">Phone <span className="font-normal">(optional)</span><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={32} className={fieldClass} /></label>
        </div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-cocoa">Your message<textarea id="contact-message" name="message" rows={3} required maxLength={2000} placeholder="Tell us a little about it…" className={`${fieldClass} resize-y`} /></label>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <p id="contact-email-note" className="max-w-52 text-xs leading-relaxed text-cocoa">Opens your email app. Review your message and send it from there.</p>
          <MagneticFillButton type="submit" variant="brand" aria-describedby="contact-email-note" className="min-h-13 rounded-full bg-brand! px-6 py-3 text-sm">Prepare email<ArrowUpRight aria-hidden="true" size={18} /></MagneticFillButton>
        </div>
        {draftLink ? <p role="status" className="rounded-2xl bg-cream-200 p-4 text-sm leading-relaxed text-cocoa">Your draft is ready. If your email app did not open, <a href={draftLink} className="font-semibold text-ink underline underline-offset-4">open it again</a> or email <a href={`mailto:${contactEmail}`} className="break-all font-semibold text-ink underline underline-offset-4">{contactEmail}</a>.</p> : null}
      </form>
    </div>
  );
}
