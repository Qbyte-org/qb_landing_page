import type { WheelEvent } from "react";

export function keepPassportCardScroll(event: WheelEvent<HTMLDivElement>) {
  const scroller = event.currentTarget;
  const atTop = scroller.scrollTop <= 0;
  const atBottom =
    Math.ceil(scroller.scrollTop + scroller.clientHeight) >=
    scroller.scrollHeight;
  const scrollingUp = event.deltaY < 0;
  const scrollingDown = event.deltaY > 0;

  if ((scrollingUp && !atTop) || (scrollingDown && !atBottom)) {
    event.stopPropagation();
  }
}
