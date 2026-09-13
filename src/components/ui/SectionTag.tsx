export default function SectionTag({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">
      <span aria-hidden="true" className="h-px w-8 bg-brand" />
      {children}
    </p>
  );
}
