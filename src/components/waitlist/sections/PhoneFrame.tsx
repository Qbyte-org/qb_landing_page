import type { ReactNode } from "react";

/** A plain device frame for real app screenshots. Children fill the screen area. */
export default function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[600/1180] overflow-hidden rounded-[2.6rem] border-[0.55rem] border-ink-deep bg-[#F7F8FA] ${className}`}>
      {children}
    </div>
  );
}
