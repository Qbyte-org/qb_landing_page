import type Lenis from "lenis";

/** Give same-page links one scroll owner, while retaining native keyboard use. */
export function bindScrollNavigation(lenis: Lenis) {
  let anchorFrame = 0;
  let anchorRequest = 0;
  let disposed = false;
  let restoreFocusTarget: (() => void) | undefined;

  const cancelAnchor = () => {
    cancelAnimationFrame(anchorFrame);
    anchorFrame = 0;
    anchorRequest += 1;
  };

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
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) {
      cancelAnchor();
      return;
    }
    if (!url.hash) return;

    let target: HTMLElement | null;
    try {
      target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    } catch {
      return;
    }
    if (!target) return;

    // Capture before Next's link handler and the browser's default hash jump.
    // The menu retains its scroll lock through its exit animation. Wait for
    // that lock rather than dropping the click on the first stopped frame.
    event.preventDefault();
    cancelAnchor();
    const request = anchorRequest;
    const deadline = performance.now() + 2000;
    const isCurrent = () => !disposed && request === anchorRequest && target.isConnected &&
      window.location.pathname === url.pathname && window.location.search === url.search;
    const navigateWhenUnlocked = () => {
      anchorFrame = 0;
      if (!isCurrent()) return;
      if (lenis.isStopped) {
        // An unrelated or stuck overlay must not be unlocked by an anchor.
        // Cancel this request after a bounded wait; a later click can retry.
        if (performance.now() < deadline) anchorFrame = requestAnimationFrame(navigateWhenUnlocked);
        return;
      }
      if (window.location.hash !== url.hash) {
        window.history.pushState(window.history.state, "", url);
      }
      lenis.scrollTo(target, {
        // Fractional section positions can leave lerp scrolling just short of
        // completion. A timed anchor scroll reliably hands focus to the section.
        duration: 0.9,
        onComplete: () => {
          if (!isCurrent()) return;
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
    };
    anchorFrame = requestAnimationFrame(navigateWhenUnlocked);
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
    cancelAnchor();
    cancelMomentum();
  };

  document.addEventListener("click", handleAnchor, true);
  document.addEventListener("keydown", handleKeyboard);
  window.addEventListener("popstate", handleHistory);
  return () => {
    disposed = true;
    cancelAnchor();
    restoreFocusTarget?.();
    document.removeEventListener("click", handleAnchor, true);
    document.removeEventListener("keydown", handleKeyboard);
    window.removeEventListener("popstate", handleHistory);
  };
}
