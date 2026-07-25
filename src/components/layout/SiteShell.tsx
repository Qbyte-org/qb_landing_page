import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StickyOrderBar from "../ui/StickyOrderBar";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyOrderBar />
    </>
  );
}
