"use client";

import Image from "@/components/ui/SiteImage";
import { loaderCopy, photographs } from "@/content/loader";
import { brand } from "@/content/ui";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import FoodImage from "../ui/FoodImage";
import MagneticFillButton from "../ui/MagneticFillButton";

const initialGrid = {
  "--tile-left": "46%",
  "--tile-right": "54%",
  "--tile-top": "44%",
  "--tile-bottom": "56%",
} as CSSProperties;


/** An opening story, not a simulated network loading indicator. */
export default function QuickBiteBentoLoader({
  onReady,
  onComplete,
  exiting,
}: {
  onReady: () => void;
  onComplete: () => void;
  exiting: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const callbacksRef = useRef({ onReady, onComplete });
  const requestedRef = useRef(false);
  const completedRef = useRef(false);

  // Updating shell callbacks must not recreate or fast-forward the intro.
  useEffect(() => {
    callbacksRef.current = { onReady, onComplete };
  }, [onReady, onComplete]);

  useGSAP(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // The page beneath is inert. Start keyboard users on the intro's one action.
    container.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });

    let disposed = false;
    requestedRef.current = false;
    completedRef.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function ready(reason: "completed" | "skipped") {
      if (requestedRef.current || disposed) return;
      requestedRef.current = true;
      sequence.pause();
      container!.dataset.introPlayback = reason;
      callbacksRef.current.onReady();
    }
    const sequence = gsap.timeline({ paused: true, onComplete: () => ready("completed") });
    skipRef.current = () => ready("skipped");

    const framing = { x: .5, y: .5, width: .08, height: .12, focus: 0, sourceX: .5, sourceY: .5, regionWidth: .3, regionHeight: .3, photoIndex: 0 };
    const wideFrame = { x: .5, y: .5, width: .84, height: .56, focus: 0 };
    const sceneDuration = 10;
    const closingStart = 2.6 + photographs.length * sceneDuration + .4;
    let viewportWidth = container.clientWidth;
    let viewportHeight = container.clientHeight;
    const copies = Array.from(stage.querySelectorAll<HTMLElement>("[data-loader-copy]"));
    const mediaLayers = photographs.map((photo, index) => ({
      photo,
      layers: Array.from(stage.querySelectorAll<HTMLElement>(`[data-loader-media="${index}"]`)),
    }));
    const renderFrame = () => {
      const overscan = 32;
      const chromeInset = viewportHeight < 600 ? 60 : 88;
      const padding = Math.max(8, Math.min(16, viewportWidth * .01));
      const maxSquare = Math.min(viewportWidth * .8, viewportHeight - chromeInset * 2);
      const coverScaleFor = (photo: typeof photographs[number]) => Math.max(
        (viewportWidth + overscan * 2) / photo.width,
        (viewportHeight + overscan * 2) / photo.height,
      );
      const detailExtentFor = (photo: typeof photographs[number]) => Math.max(
        photo.width * framing.regionWidth, photo.height * framing.regionHeight,
      );
      const detailScaleFor = (photo: typeof photographs[number]) => {
        const coverScale = coverScaleFor(photo);
        // A gentle camera push, limited by the space needed for the whole item.
        return Math.max(coverScale, Math.min(coverScale * 1.08, (maxSquare - padding * 2) / detailExtentFor(photo)));
      };
      const activePhoto = photographs[framing.photoIndex];
      // Size the square from the actual ingredient bounds, with breathing room.
      // Small peppers get a smaller window than an egg or a piece of meat.
      const square = Math.min(maxSquare, Math.max(128, detailExtentFor(activePhoto) * detailScaleFor(activePhoto) + padding * 2));
      const width = framing.width * viewportWidth * (1 - framing.focus) + square * framing.focus;
      const height = framing.height * viewportHeight * (1 - framing.focus) + square * framing.focus;
      const sourceX = .5 + (framing.sourceX - .5) * framing.focus;
      const sourceY = .5 + (framing.sourceY - .5) * framing.focus;
      const cameras = mediaLayers.map(({ photo, layers }) => {
        // Both views use one full-screen projection. The extra pixels keep
        // the blur supplied with image content at every viewport edge.
        const coverScale = coverScaleFor(photo);
        const detailScale = detailScaleFor(photo);
        const scale = coverScale + (detailScale - coverScale) * framing.focus;
        const imageWidth = photo.width * scale;
        const imageHeight = photo.height * scale;
        const desiredLeft = framing.x * viewportWidth - sourceX * imageWidth;
        const desiredTop = framing.y * viewportHeight - sourceY * imageHeight;
        const imageLeft = Math.max(viewportWidth - imageWidth + overscan, Math.min(-overscan, desiredLeft));
        const imageTop = Math.max(viewportHeight - imageHeight + overscan, Math.min(-overscan, desiredTop));
        const transform = `translate3d(${imageLeft}px, ${imageTop}px, 0) scale(${scale})`;
        for (const layer of layers) layer.style.transform = transform;
        return { x: imageLeft + sourceX * imageWidth, y: imageTop + sourceY * imageHeight };
      });
      // Follow the actual food position after the camera reaches an image edge.
      // This keeps the sharp square registered with the blurred photograph.
      const target = cameras[framing.photoIndex];
      const left = Math.max(12, Math.min(viewportWidth - width - 12, target.x - width / 2));
      const top = Math.max(chromeInset, Math.min(viewportHeight - height - chromeInset, target.y - height / 2));
      stage.style.setProperty("--tile-left", `${left}px`);
      stage.style.setProperty("--tile-right", `${left + width}px`);
      stage.style.setProperty("--tile-top", `${top}px`);
      stage.style.setProperty("--tile-bottom", `${top + height}px`);
      stage.dataset.focused = String(framing.focus > .999);
      stage.dataset.compactTop = String(top < 168);
      stage.dataset.compactBottom = String(viewportHeight - top - height < 188);
      for (const copy of copies) copy.dataset.copySide = left + width / 2 > viewportWidth / 2 ? "left" : "right";
    };
    const resizeFrame = () => {
      viewportWidth = container.clientWidth;
      viewportHeight = container.clientHeight;
      renderFrame();
    };
    window.addEventListener("resize", resizeFrame);
    sequence.eventCallback("onUpdate", renderFrame);
    if (reduced) Object.assign(framing, wideFrame, { focus: 1 });
    renderFrame();
    sequence
      .set(container, { attr: { "data-intro-frame": "brand" } }, 0)
      .fromTo(stage, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
      .from("[data-loader-brand]", { opacity: 0, ...(reduced ? {} : { scale: 0.7 }), duration: 0.5, ease: "power3.out" }, 0.08)
      .to("[data-loader-brand]", { opacity: 0, duration: 0.5 }, 2.6)
      .set(container, { attr: { "data-intro-immersive": "true" } }, 2.6);

    photographs.forEach((photograph, index) => {
      const start = 2.6 + index * sceneDuration;
      const scene = `[data-loader-scene="${index}"]`;
      const copy = `[data-loader-copy="${index}"]`;
      const firstDetail = photograph.details[0];
      const secondDetail = photograph.details[1];
      const detailFrame = (detail: typeof firstDetail, x: number) => ({
        x, y: .5, focus: 1,
        sourceX: detail.x, sourceY: detail.y,
        regionWidth: detail.width, regionHeight: detail.height,
      });
      sequence
        .set(framing, { photoIndex: index }, start)
        .set(container, { attr: { "data-intro-frame": photograph.frame } }, start)
        .to(scene, { opacity: 1, duration: reduced ? 0.6 : 0.8, ease: "power2.inOut" }, start)
        .fromTo(copy, { opacity: 0 }, {
          opacity: 1, duration: 0.65, ease: "power3.out",
        }, start + 0.35);

      if (index > 0) {
        sequence
          .to(`[data-loader-copy="${index - 1}"]`, { opacity: 0, duration: 0.3 }, start)
          .to(`[data-loader-scene="${index - 1}"]`, { opacity: 0, duration: 0.8 }, start);
      }
      if (reduced) {
        sequence.set(framing, { ...wideFrame, ...detailFrame(firstDetail, .3) }, start);
      } else {
        sequence
          .to(framing, { ...wideFrame, duration: 1.2, ease: "power2.inOut" }, start)
          .to(framing, { ...detailFrame(firstDetail, .3), duration: 1.6, ease: "power2.inOut" }, start + 1.2)
          .set(stage, { attr: { "data-focus-item": firstDetail.name, "data-focus-hold": "true" } }, start + 2.8)
          .set(stage, { attr: { "data-focus-hold": "false" } }, start + 4.8)
          .to(framing, { ...detailFrame(secondDetail, .7), duration: 1.6, ease: "power2.inOut" }, start + 4.8)
          .set(stage, { attr: { "data-focus-item": secondDetail.name, "data-focus-hold": "true" } }, start + 6.4)
          .set(stage, { attr: { "data-focus-hold": "false" } }, start + 8.4)
          .to(framing, { ...wideFrame, duration: 1.2, ease: "power2.inOut" }, start + 8.4);
      }
    });

    // Retrace the opening only after the last image and its copy have played.
    // Neither network readiness nor a rerender can reveal the hero early.
    sequence
      .set(container, { attr: { "data-intro-frame": "closing" } }, closingStart)
      .to("[data-loader-copy]", { opacity: 0, duration: 0.6 }, closingStart)
      .to("[data-loader-backdrop]", { opacity: 0, duration: 1 }, closingStart)
      .set(container, { attr: { "data-intro-immersive": "false" } }, closingStart + .7)
      .to("[data-loader-scene]", { opacity: 0, duration: 0.75 }, closingStart + 1.4)
      .to("[data-loader-brand]", { opacity: 1, duration: 0.6 }, closingStart + 1.6)
      .to({}, { duration: 0.6 }, closingStart + 3.8);

    if (!reduced) {
      sequence
        .to(framing, { width: .32, height: .3, duration: 1.3, ease: "power3.inOut" }, 0)
        .to(framing, { x: .5, y: .5, width: .32, height: .3, focus: 0, duration: 1.5, ease: "power3.inOut" }, closingStart)
        .to(framing, { width: .08, height: .12, duration: 2, ease: "power3.inOut" }, closingStart + 1.8);
    }

    const syncVisibility = () => {
      if (requestedRef.current || disposed) return;
      sequence.paused(document.hidden);
      container.dataset.introPlayback = document.hidden ? "paused" : "playing";
    };
    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();

    return () => {
      disposed = true;
      sequence.kill();
      window.removeEventListener("resize", resizeFrame);
      document.removeEventListener("visibilitychange", syncVisibility);
      skipRef.current = () => {};
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    if (!exiting || !requestedRef.current) return;
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The hero remains hidden until this exit has also finished.
    const exit = gsap.to(containerRef.current, {
      autoAlpha: 0,
      paused: true,
      duration: reduced ? 0.15 : 0.28,
      ease: "power2.out",
      onComplete: () => {
        if (disposed || completedRef.current) return;
        completedRef.current = true;
        callbacksRef.current.onComplete();
      },
    });
    const syncVisibility = () => exit.paused(document.hidden);
    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();
    return () => {
      disposed = true;
      exit.kill();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, { scope: containerRef, dependencies: [exiting], revertOnUpdate: true });

  return (
    <div
      ref={containerRef}
      data-quickbite-loader
      data-intro-frame="brand"
      data-intro-playback="pending"
      data-intro-immersive="false"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={loaderCopy.welcome}
      className="fixed inset-0 z-[9999] overflow-hidden bg-paper text-ink [--loader-caption:var(--color-cocoa)] [--loader-headline:var(--color-brand)] data-[intro-immersive=true]:[--loader-caption:var(--color-paper)] data-[intro-immersive=true]:[--loader-headline:var(--color-paper)]"
    >
      <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-5 py-5 text-[var(--loader-caption)] transition-colors duration-500 ease-[ease] motion-reduce:transition-none sm:px-10 sm:py-8">
        <span className="flex items-center gap-2.5 font-display text-base font-semibold sm:text-lg">
          <Image src={brand.mark} alt="" width={34} height={34} priority className="size-8" />
          {brand.name}
        </span>
        <span className="max-w-32 text-right text-xs sm:max-w-none sm:text-sm">{loaderCopy.tagline}</span>
      </div>

      <div ref={stageRef} style={initialGrid} aria-hidden="true" className="group/loader-stage absolute inset-0 [--window-top:var(--tile-top)] [--window-bottom:var(--tile-bottom)]">
        <div data-loader-brand data-loader-window className="absolute left-[var(--tile-left)] top-[var(--window-top)] flex h-[calc(var(--window-bottom)-var(--window-top))] w-[calc(var(--tile-right)-var(--tile-left))] items-center justify-center overflow-hidden bg-brand">
            <Image src={brand.lightMark} alt="" width={100} height={100} priority className="size-[clamp(2.5rem,9vw,7rem)]" />
        </div>
        {photographs.map((photograph, index) => (
          <div key={photograph.src} data-loader-scene={index} className="absolute inset-0 opacity-0">
            <div data-loader-backdrop={index} className="absolute inset-0">
              <div className="absolute inset-0 blur-[16px]">
                <div data-loader-media={index} className="absolute left-0 top-0 origin-top-left will-change-transform" style={{ width: photograph.width, height: photograph.height }}>
                  <FoodImage src={photograph.src} alt="" fill priority unoptimized className="object-cover" />
                </div>
              </div>
              <div className="absolute inset-0 bg-dark-ink/65" />
            </div>
            <div data-loader-photo={index} className="absolute inset-0 overflow-hidden [clip-path:inset(var(--window-top)_calc(100%_-_var(--tile-right))_calc(100%_-_var(--window-bottom))_var(--tile-left))]">
              <div data-loader-media={index} className="absolute left-0 top-0 origin-top-left will-change-transform" style={{ width: photograph.width, height: photograph.height }}>
                <FoodImage src={photograph.src} alt={photograph.alt} fill priority unoptimized className="object-cover" />
              </div>
            </div>
          </div>
        ))}

        <div className="absolute inset-y-0 left-[var(--tile-left)] z-20 w-px bg-brand/65" />
        <div className="absolute inset-y-0 left-[var(--tile-right)] z-20 w-px bg-brand/65" />
        <div className="absolute inset-x-0 top-[var(--window-top)] z-20 h-px bg-brand/65" />
        <div className="absolute inset-x-0 top-[var(--window-bottom)] z-20 h-px bg-brand/65" />

        {photographs.map((photograph, index) => (
          <div key={photograph.frame} data-loader-copy={index} data-copy-side={photograph.copySide} className="group/loader-copy pointer-events-none absolute inset-0 z-30 grid grid-cols-[var(--tile-left)_calc(var(--tile-right)_-_var(--tile-left))_calc(100%_-_var(--tile-right))] grid-rows-[var(--window-top)_calc(var(--window-bottom)_-_var(--window-top))_calc(100%_-_var(--window-bottom))] opacity-0">
            <div data-loader-copy-cell="top" className="col-start-2 row-start-1 flex min-h-0 min-w-0 flex-col justify-end gap-2.5 overflow-clip px-2 pt-[min(72px,max(0px,calc(var(--window-top)-32px)))] pb-3 [container-type:size] md:gap-3 md:px-[clamp(10px,1.4vw,24px)] md:pt-[min(96px,max(0px,calc(var(--window-top)-40px)))] md:pb-4 [@media(max-height:600px)]:pt-[min(72px,max(0px,calc(var(--window-top)-32px)))] [@media(max-height:600px)]:pb-2">
              <span className="block max-w-full shrink-0 text-[clamp(0.55rem,3.8cqi,0.7rem)] leading-[1.4] font-medium tracking-[0.04em] text-[var(--loader-caption)] uppercase wrap-anywhere transition-colors duration-500 ease-[ease] group-data-[compact-top=true]/loader-stage:hidden motion-reduce:transition-none md:hidden [@media(max-height:600px)]:hidden">{photograph.introduction}</span>
              <span className="block max-w-full shrink-0 font-display text-[clamp(1rem,min(12cqi,80cqb),8rem)] leading-[0.98] font-bold tracking-[-0.065em] whitespace-nowrap text-[var(--loader-headline)] transition-colors duration-500 ease-[ease] motion-reduce:transition-none [@media(max-height:600px)]:text-[min(12cqi,10vh)]">{photograph.headline[0]}</span>
            </div>
            <div data-loader-copy-cell="bottom" className="col-start-2 row-start-3 flex min-h-0 min-w-0 flex-col items-end gap-2.5 overflow-clip px-2 pt-3 pb-[min(76px,max(0px,calc(100vh-var(--window-bottom)-32px)))] text-right [container-type:size] md:gap-3 md:px-[clamp(10px,1.4vw,24px)] md:pt-4 md:pb-[min(96px,max(0px,calc(100vh-var(--window-bottom)-40px)))] [@media(max-height:600px)]:pt-2 [@media(max-height:600px)]:pb-[min(72px,max(0px,calc(100vh-var(--window-bottom)-32px)))]">
              <span className="block max-w-full shrink-0 font-display text-[clamp(1rem,min(12cqi,80cqb),8rem)] leading-[0.98] font-bold tracking-[-0.065em] whitespace-nowrap text-[var(--loader-headline)] transition-colors duration-500 ease-[ease] motion-reduce:transition-none [@media(max-height:600px)]:text-[min(12cqi,10vh)]">{photograph.headline[1]}</span>
              <span className="block max-w-full shrink-0 text-[clamp(0.55rem,3.8cqi,0.7rem)] leading-[1.4] font-medium tracking-[0.04em] text-[var(--loader-caption)] uppercase wrap-anywhere opacity-80 transition-colors duration-500 ease-[ease] group-data-[compact-bottom=true]/loader-stage:hidden motion-reduce:transition-none md:hidden [@media(max-height:600px)]:hidden">{photograph.detail}</span>
            </div>
            <div data-loader-copy-cell="side" className="row-start-2 hidden min-h-0 min-w-0 flex-col justify-center gap-7 overflow-clip p-[clamp(12px,2vw,36px)] [container-type:inline-size] group-data-[copy-side=left]/loader-copy:col-start-1 group-data-[copy-side=left]/loader-copy:text-right group-data-[copy-side=right]/loader-copy:col-start-3 group-data-[copy-side=right]/loader-copy:text-left md:flex">
              <span className="block max-w-full text-[clamp(0.65rem,4.6cqi,0.9rem)] leading-[1.5] font-medium tracking-[0.06em] text-[var(--loader-caption)] uppercase wrap-anywhere transition-colors duration-500 ease-[ease] motion-reduce:transition-none">{photograph.introduction}</span>
              <span className="block max-w-full text-[clamp(0.65rem,4.6cqi,0.9rem)] leading-[1.5] font-medium tracking-[0.06em] text-[var(--loader-caption)] uppercase wrap-anywhere opacity-80 transition-colors duration-500 ease-[ease] motion-reduce:transition-none">{photograph.detail}</span>
            </div>
          </div>
        ))}

        {["top", "bottom"].flatMap((vertical) => ["left", "right"].map((horizontal) => (
          <span key={`${vertical}-${horizontal}`} className="absolute z-30 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" style={{ left: `var(--tile-${horizontal})`, top: `var(--window-${vertical})` }} />
        )))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 px-5 py-5 text-[var(--loader-caption)] transition-colors duration-500 ease-[ease] motion-reduce:transition-none sm:px-10 sm:py-8">
        <p role="status" className="text-xs sm:text-sm">{loaderCopy.welcomeStatus}</p>
        <MagneticFillButton
          type="button"
          variant="light"
          onClick={() => skipRef.current()}
          className="group min-h-11 rounded-full border! border-ink/20 bg-paper! px-4 text-xs font-medium text-ink! sm:text-sm"
        >
          {loaderCopy.skip}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
        </MagneticFillButton>
      </div>
    </div>
  );
}
