import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteShell from "@/components/layout/SiteShell";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { legalDocs, legalSlugs, type LegalSlug } from "@/content/legal";

export const dynamicParams = false;
export function generateStaticParams() { return legalSlugs.map(slug => ({ slug })); }
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs[slug as LegalSlug];
  return doc ? { title: `${doc.title} — QuickBite`, description: doc.description } : {};
}

const prose = [
  "prose prose-sm max-w-none break-words [overflow-wrap:anywhere]",
  "prose-headings:font-display prose-headings:text-ink prose-headings:tracking-tight",
  "prose-h3:text-base prose-h3:mt-7 prose-h3:mb-3",
  "prose-p:leading-[1.85] prose-p:text-cocoa prose-li:text-cocoa prose-li:my-1",
  "prose-a:text-brand-dark prose-a:font-medium prose-a:underline-offset-4",
  "prose-strong:text-ink prose-strong:font-semibold",
  "prose-blockquote:not-italic prose-blockquote:border-brand prose-blockquote:bg-peach/35 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:text-cocoa prose-blockquote:font-normal",
  "prose-table:text-xs prose-th:text-ink prose-td:text-cocoa prose-hr:border-ink/15",
  "[&>:first-child]:mt-0 [&>:last-child]:mb-0 [&_table]:block [&_table]:overflow-x-auto",
].join(" ");

function DocumentBody({ body }: { body: string }) {
  return <div className={prose}><Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown></div>;
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const typedSlug = slug as LegalSlug;
  const doc = legalDocs[typedSlug];
  if (!doc) notFound();
  const raw = await readFile(path.join(process.cwd(), "content", "legal", doc.file), "utf8");
  const body = raw.replace(/^#\s.*\r?\n/, "").trimStart();
  // Split only second-level headings. Every original paragraph, list, table,
  // disclaimer and subheading is still rendered in its original order.
  const chunks = body.split(/^##\s+(.+)\r?$/m);
  const sections = [];
  for (let index = 1; index < chunks.length; index += 2) {
    sections.push({
      id: `policy-section-${(index + 1) / 2}`,
      title: chunks[index].trim().replace(/^\d+\.\s*/, ""),
      content: <DocumentBody body={chunks[index + 1] ?? ""} />,
    });
  }
  return (
    <SiteShell>
      <LegalDocument current={typedSlug} title={doc.title} description={doc.description} introduction={chunks[0].trim() ? <DocumentBody body={chunks[0]} /> : undefined} sections={sections} />
    </SiteShell>
  );
}
