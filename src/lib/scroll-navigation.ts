import type Lenis from "lenis";

/** Give same-page links one scroll owner, while retaining native keyboard use. */
export function bindScrollNavigation(lenis: Lenis) {
  let anchorFrame = 0;
  let restoreFocusTarget: (() => void) | undefined;

  const cancelMomentum = () => {
    if (lenis.isStopped || lenis.isScrolling !== "smooth") return;
    // Reset without writing the scroll position, so the browser can take over.
    lenis.stop();
    lenis.start();
  };

  const handleAnchor = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;

    let target: HTMLElement | null;
    try {
      target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    } catch {
      return;
    }
    if (!target) return;

    // Capture before Next's link handler and the browser's default hash jump.
    // The frame lets a menu link release its scroll lock before navigation.
    event.preventDefault();
    cancelAnimationFrame(anchorFrame);
    anchorFrame = requestAnimationFrame(() => {
      if (lenis.isStopped || !target.isConnected) return;
      if (window.location.hash !== url.hash) {
        window.history.pushState(window.history.state, "", url);
      }
      lenis.scrollTo(target, {
        // Fractional section positions can leave lerp scrolling just short of
        // completion. A timed anchor scroll reliably hands focus to the section.
        duration: 0.9,
        onComplete: () => {
          restoreFocusTarget?.();
          if (!target.hasAttribute("tabindex")) {
            target.setAttribute("tabindex", "-1");
            const restore = () => {
              target.removeEventListener("blur", restore);
              target.removeAttribute("tabindex");
              restoreFocusTarget = undefined;
            };
            restoreFocusTarget = restore;
            target.addEventListener("blur", restore, { once: true });
          }
          target.focus({ preventScroll: true });
        },
      });
    });
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.defaultPrevented || lenis.isScrolling !== "smooth") return;
    const scrollingKey = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key);
    const editable = event.target instanceof Element && event.target.closest("input, textarea, select, button, [contenteditable]:not([contenteditable='false'])");
    if (event.key === "Tab" || (scrollingKey && !editable)) {
      cancelMomentum();
    }
  };

  const handleHistory = () => {
    cancelAnimationFrame(anchorFrame);
    cancelMomentum();
  };

  document.addEventListener("click", handleAnchor, true);
  document.addEventListener("keydown", handleKeyboard);
  window.addEventListener("popstate", handleHistory);
  return () => {
    cancelAnimationFrame(anchorFrame);
    restoreFocusTarget?.();
    document.removeEventListener("click", handleAnchor, true);
    document.removeEventListener("keydown", handleKeyboard);
    window.removeEventListener("popstate", handleHistory);
  };
}
