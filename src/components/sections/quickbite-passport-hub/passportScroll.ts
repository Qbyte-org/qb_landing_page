import type { TouchEvent } from "react";
export { keepNestedWheelScroll as keepPassportCardScroll } from "@/lib/nested-scroll";

export function startPassportCardTouchScroll(
  event: TouchEvent<HTMLDivElement>,
) {
  const touch = event.touches[0];
  if (!touch) return;

  event.currentTarget.dataset.passportTouchY = String(touch.clientY);
}

export function keepPassportCardTouchScroll(
  event: TouchEvent<HTMLDivElement>,
) {
  const touch = event.touches[0];
  if (!touch) return;

  const scroller = event.currentTarget;
  const previousY = Number(scroller.dataset.passportTouchY ?? touch.clientY);
  const deltaY = previousY - touch.clientY;

  scroller.dataset.passportTouchY = String(touch.clientY);

  if (Math.abs(deltaY) < 1) return;

  const atTop = scroller.scrollTop <= 0;
  const atBottom =
    Math.ceil(scroller.scrollTop + scroller.clientHeight) >=
    scroller.scrollHeight;
  const scrollingUp = deltaY < 0;
  const scrollingDown = deltaY > 0;

  if ((scrollingUp && !atTop) || (scrollingDown && !atBottom)) {
    event.stopPropagation();
  }
}
