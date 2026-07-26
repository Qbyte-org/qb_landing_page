import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ShieldCheck, Clock3 } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import LegalSidebar from "@/components/sections/LegalSidebar";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";

// Only the known slugs are valid; anything else 404s and the route stays static.
export const dynamicParams = false;

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs[slug as LegalSlug];
  if (!doc) return {};
  return {
    title: `${doc.title} — QuickBite`,
    description: doc.description,
  };
}

async function getBody(file: string) {
  const raw = await readFile(
    path.join(process.cwd(), "content", "legal", file),
    "utf8",
  );
  // Drop the leading H1 — the title is rendered in the page header instead.
  return raw.replace(/^#\s.*\r?\n/, "").trimStart();
}

const prose = [
  "prose prose-zinc max-w-none",
  "prose-headings:font-display prose-headings:text-navy prose-headings:tracking-tight",
  "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24",
  "prose-h3:text-lg prose-h3:mt-8",
  "prose-p:text-navy/80 prose-li:text-navy/80 prose-li:my-1",
  "prose-a:text-brand-dark prose-a:font-semibold prose-a:no-underline hover:prose-a:underline",
  "prose-strong:text-navy",
  "prose-blockquote:not-italic prose-blockquote:rounded-r-card prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:bg-cream prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:text-navy/80 prose-blockquote:font-normal",
  "prose-table:text-sm prose-th:text-navy prose-td:text-navy/80",
  "prose-hr:border-border",
].join(" ");

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const typedSlug = slug as LegalSlug;
  const doc = legalDocs[typedSlug];
  if (!doc) notFound();

  const body = await getBody(doc.file);
  const related = legalSlugs.filter((s) => s !== typedSlug);

  return (
    <SiteShell>
      <PageHeader eyebrow="Legal" title={doc.title} subtitle={doc.description}>
        <span className="inline-flex items-center gap-2 rounded-pill bg-white px-4 py-1.5 text-sm font-semibold text-navy">
          <ShieldCheck className="h-4 w-4 text-brand-dark" strokeWidth={2} aria-hidden="true" />
          Nigeria · NDPR &amp; NDPA
        </span>
        <span className="inline-flex items-center gap-2 rounded-pill bg-white px-4 py-1.5 text-sm font-semibold text-navy">
          <Clock3 className="h-4 w-4 text-brand-dark" strokeWidth={2} aria-hidden="true" />
          Last updated: June 2026
        </span>
      </PageHeader>

      <section className="bg-cream py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
            <LegalSidebar current={typedSlug} />

            <Reveal>
              <article className="rounded-[1.25rem] border border-border bg-white p-6 sm:p-10">
                <div className={prose}>
                  <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
                </div>
              </article>

              {/* Related policies */}
              <div className="mt-10">
                <h2 className="font-display text-xl font-bold text-navy">
                  Other policies
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {related.map((s) => {
                    const r = legalDocs[s];
                    return (
                      <Link
                        key={s}
                        href={`/legal/${s}`}
                        className="group flex items-center gap-3 rounded-card border border-border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand"
                      >
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-brand-dark"
                          aria-hidden="true"
                        >
                          <r.icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-bold text-navy group-hover:text-brand-dark">
                          {r.short}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
