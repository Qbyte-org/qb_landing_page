"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { useSiteIntro } from "@/hooks/use-site-intro";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import BackToTopButton from "../ui/BackToTopButton";
import StickyOrderBar from "../ui/StickyOrderBar";
import QuickBiteBentoLoader from "../loader/QuickBiteBentoLoader";
import { useHasNavigated } from "./PageTransitions";

type IntroPhase = "loading" | "revealing" | "ready";

export default function SiteShell({ children, heroIntro = false }: { children: ReactNode; heroIntro?: boolean }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useHasNavigated();
  const [phase, setPhase] = useState<IntroPhase>(heroIntro && !hasNavigated ? "loading" : "ready");
  const startReveal = useCallback(() => setPhase(current => current === "loading" ? "revealing" : current), []);
  const finishIntro = useCallback(() => setPhase("ready"), []);

  // Both the full intro and its exit must finish before the hero can enter.
  useSiteIntro(shellRef, heroIntro, phase === "ready");

  return (
    <>
      {heroIntro && phase !== "ready" && (
        <QuickBiteBentoLoader onReady={startReveal} onComplete={finishIntro} exiting={phase === "revealing"} />
      )}
      <div
        ref={shellRef}
        data-site-intro={phase}
        inert={phase !== "ready"}
        className={`flex min-h-full flex-col ${phase === "ready" ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <SmoothScroll enabled={phase === "ready"} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTopButton />
        <StickyOrderBar />
      </div>
    </>
  );
}
