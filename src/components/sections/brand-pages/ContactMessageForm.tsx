"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import { contactContent } from "@/content/brand-pages";

const contactEmail = contactContent.email;
const content = contactContent.form;
const fieldClass = "mt-2 min-h-12 w-full min-w-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-cocoa/65 focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export default function ContactMessageForm() {
  const [draftLink, setDraftLink] = useState<string | null>(null);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const phone = String(fields.get("phone") ?? "").trim();
    const topic = String(fields.get("topic") ?? content.fields.topic.options[0]);
    const message = String(fields.get("message") ?? "").trim();
    const body = `${message}\n\n${content.emailBodyLabels.name}: ${name}\n${content.emailBodyLabels.email}: ${email}${phone ? `\n${content.emailBodyLabels.phone}: ${phone}` : ""}`;
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    setDraftLink(href);
    window.location.href = href;
  }

  return (
    <div className="relative self-start rounded-[1.75rem] border border-ink/10 bg-paper p-6 text-ink shadow-[0_24px_70px_color-mix(in_srgb,var(--color-dark-ink)_25%,transparent)] sm:p-9 lg:-my-8 lg:self-center lg:rounded-[2rem] lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">{content.eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">{content.title[0]}<br />{content.title[1]}</h2>
      <form onSubmit={prepareEmail} className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="contact-name" className="block text-xs font-semibold text-cocoa">{content.fields.name.label}<input id="contact-name" name="name" autoComplete="name" placeholder={content.fields.name.placeholder} required maxLength={100} className={fieldClass} /></label>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-cocoa">{content.fields.email.label}<input id="contact-email" name="email" type="email" autoComplete="email" placeholder={content.fields.email.placeholder} required maxLength={254} className={fieldClass} /></label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="contact-topic" className="block text-xs font-semibold text-cocoa">{content.fields.topic.label}<select id="contact-topic" name="topic" className={`${fieldClass} cursor-pointer`}>{content.fields.topic.options.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-cocoa">{content.fields.phone.label} <span className="font-normal">{content.fields.phone.optional}</span><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder={content.fields.phone.placeholder} maxLength={32} className={fieldClass} /></label>
        </div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-cocoa">{content.fields.message.label}<textarea id="contact-message" name="message" rows={3} required maxLength={2000} placeholder={content.fields.message.placeholder} className={`${fieldClass} resize-y`} /></label>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <p id="contact-email-note" className="max-w-52 text-xs leading-relaxed text-cocoa">{content.emailNote}</p>
          <MagneticFillButton type="submit" variant="brand" aria-describedby="contact-email-note" className="min-h-13 rounded-full bg-brand! px-6 py-3 text-sm">{content.submitLabel}<ArrowUpRight aria-hidden="true" size={18} /></MagneticFillButton>
        </div>
        {draftLink ? <p role="status" className="rounded-2xl bg-cream-200 p-4 text-sm leading-relaxed text-cocoa">{content.draftReady} <a href={draftLink} className="font-semibold text-ink underline underline-offset-4">{content.reopenLabel}</a> {content.emailAlternative} <a href={`mailto:${contactEmail}`} className="break-all font-semibold text-ink underline underline-offset-4">{contactEmail}</a>.</p> : null}
      </form>
    </div>
  );
}
