type ScrollController = NonNullable<Window["quickBiteLenis"]>;

let lockCount = 0;
let restoreScroll: (() => void) | undefined;

export function lockWaitlistScroll() {
  if (lockCount === 0) {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      scrollBehavior: html.style.scrollBehavior,
    };
    const lenis: ScrollController | undefined = window.quickBiteLenis;
    const shouldResumeLenis = Boolean(lenis && !lenis.isStopped);
    lenis?.stop();
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    const fixedHere = previous.position !== "fixed";
    if (fixedHere) {
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    }

    restoreScroll = () => {
      body.style.overflow = previous.overflow;
      html.style.overflow = previous.htmlOverflow;
      if (fixedHere) {
        body.style.position = previous.position;
        body.style.top = previous.top;
        body.style.width = previous.width;
        html.style.scrollBehavior = "auto";
        window.scrollTo({ top: scrollY, behavior: "instant" });
        html.style.scrollBehavior = previous.scrollBehavior;
      }
      if (shouldResumeLenis && window.quickBiteLenis === lenis) lenis?.start();
    };
  }
  lockCount += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount -= 1;
    if (lockCount === 0) {
      restoreScroll?.();
      restoreScroll = undefined;
    }
  };
}
