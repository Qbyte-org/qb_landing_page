import type { ReactNode } from "react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
      />
      <Container className="relative text-center">
        <Reveal>
          {eyebrow ? (
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
        {children ? (
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
