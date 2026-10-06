import type { WheelEvent } from "react";

/** Keep wheel input inside a list only while it can move in that direction. */
export function keepNestedWheelScroll(event: WheelEvent<HTMLDivElement>) {
  const scroller = event.currentTarget;
  const atTop = scroller.scrollTop <= 0;
  const atBottom = Math.ceil(scroller.scrollTop + scroller.clientHeight) >= scroller.scrollHeight;
  const canScroll = (event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom);

  if (canScroll) {
    // The browser moves the list. Stop old page momentum without cancelling
    // the native gesture; at either edge, bubble to the page scroll owner.
    const lenis = window.quickBiteLenis;
    if (lenis?.isScrolling === "smooth") {
      lenis.scrollTo(window.scrollY, { immediate: true });
    }
    event.stopPropagation();
  }
}
