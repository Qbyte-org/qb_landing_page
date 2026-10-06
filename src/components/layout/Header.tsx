"use client";

import { useRef, useState, type CSSProperties } from "react";
import { headerCopy, menuLinks } from "@/content/navigation";
import { brand } from "@/content/ui";
import { AnimatePresence, motion } from "motion/react";
import { ListOrderedIcon, MapPin } from "lucide-react";
import Image from "@/components/ui/SiteImage";
import { usePathname } from "next/navigation";
import { useNavbarTheme } from "@/hooks/use-navbar-theme";
import { useHeroNavbarAlignment } from "@/hooks/use-hero-navbar-alignment";
import { navThemes } from "@/config/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MagneticFillButton from "../ui/MagneticFillButton";
import LinkArrow from "../ui/LinkArrow";
import { lockWaitlistScroll } from "../waitlist/waitlistScrollLock";

const navPill = "bg-[var(--nav-surface)] text-[var(--nav-foreground)]";
const navAction = "bg-[var(--nav-action)] text-[var(--nav-action-text)]";
const navChip = "bg-[var(--nav-chip)] text-[var(--nav-chip-text)]";


const navThemeDefaults = {
  "--nav-surface": navThemes.hero.surface,
  "--nav-foreground": navThemes.hero.foreground,
  "--nav-muted": navThemes.hero.muted,
  "--nav-icon": navThemes.hero.icon,
  "--nav-chip": navThemes.hero.chip,
  "--nav-chip-text": navThemes.hero.chipText,
  "--nav-action": navThemes.hero.action,
  "--nav-action-text": navThemes.hero.actionText,
  "--nav-action-fill": "var(--color-cream-200)",
  "--nav-action-hover-text": "var(--color-ink)",
  "--magnetic-bg": navThemes.hero.chip,
  "--magnetic-text": navThemes.hero.chipText,
  "--magnetic-fill": "var(--color-cream-200)",
  "--magnetic-hover-text": "var(--color-ink)",
  "--nav-menu-fill": "var(--color-dark-ink)",
  "--nav-menu-hover-text": "var(--color-paper)",
} as CSSProperties;

function MenuScrollLock() {
  // AnimatePresence retains this child until the menu has finished closing.
  // Keep the page still throughout that exit without moving its scroll origin.
  useGSAP(() => lockWaitlistScroll({ preserveLayout: true }), []);
  return null;
}

function MenuGlyph({ open }: { open: boolean }) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const closedOpacity = open ? 0 : 1;
  const letterState = {
    width: open ? 0 : "var(--menu-letter-width)",
    opacity: closedOpacity,
    marginLeft: open ? 0 : 4,
  };
  const mState = {
    width: open ? 0 : "var(--menu-m-width)",
    opacity: closedOpacity,
    marginRight: open ? 0 : 4,
  };

  return (
    <div aria-hidden="true" className="flex h-12 items-center justify-center overflow-hidden [--menu-letter-width:14px] [--menu-m-width:17px] lg:[--menu-letter-width:19px] lg:[--menu-m-width:23px] xl:[--menu-letter-width:21px] xl:[--menu-m-width:24px]">
      <motion.svg
        viewBox="0 0 18 14"
        initial={mState}
        animate={mState}
        transition={{ duration: 0.4, ease }}
        className="h-[1.05rem] shrink-0 sm:h-[1.35rem] lg:h-[1.6rem] xl:h-[1.72rem]"
      >
        <path d="M1 13V1H9V13M9 1H17V13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>

      <svg className="h-[0.9rem] w-[0.9rem] shrink-0 overflow-visible sm:h-[1.05rem] sm:w-[1.05rem] lg:h-[1.2rem] lg:w-[1.2rem]" viewBox="0 0 14 14">
        <motion.line x1="1" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="square"
          initial={{ y2: open ? 13 : 1 }}
          animate={{ y2: open ? 13 : 1 }} transition={{ duration: 0.4, ease }} />
        <motion.line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="square"
          initial={{ opacity: closedOpacity, scaleX: closedOpacity }}
          animate={{ opacity: closedOpacity, scaleX: closedOpacity }} transition={{ duration: 0.3, ease }} />
        <motion.line x1="1" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="square"
          initial={{ y2: open ? 1 : 13 }}
          animate={{ y2: open ? 1 : 13 }} transition={{ duration: 0.4, ease }} />
      </svg>

      <motion.svg
        viewBox="0 0 14 14"
        initial={letterState}
        animate={letterState}
        transition={{ duration: 0.4, ease }}
        className="h-[1.05rem] shrink-0 sm:h-[1.35rem] lg:h-[1.6rem] xl:h-[1.72rem]"
      >
        <path d="M1 13V1H13V13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 14 14"
        initial={letterState}
        animate={letterState}
        transition={{ duration: 0.4, ease }}
        className="h-[1.05rem] shrink-0 sm:h-[1.55rem] lg:h-[1.78rem] xl:h-[1.92rem]"
      >
        <path d="M1 1V13H13V1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>
    </div>
  );
}

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLegalPage = pathname.startsWith("/legal/") || pathname === "/delete-account";

  useNavbarTheme(navRef);
  useHeroNavbarAlignment(navRef);

  useGSAP(
    () => {
      const nav = navRef.current;
      const logoShell = nav?.querySelector<HTMLElement>("[data-header-logo]");
      if (!nav || !logoShell) return;

      const media = gsap.matchMedia();
      media.add({ tablet: "(640px < width < 1024px)", any: "all" }, (context) => {
        // Register after GSAP restores the reading position during a media refresh.
        const frame = requestAnimationFrame(() => {
          context.add(() => {
            const reducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            const duration = reducedMotion ? 0 : 0.38;
            const getFloatingGap = () => (window.innerWidth >= 1024 ? 16 : 12);
            const getOffset = () => {
              const top = Number.parseFloat(getComputedStyle(nav).top) || 0;
              return -Math.max(0, top - getFloatingGap());
            };

            if (isLegalPage && context.conditions?.tablet) {
              const shell = nav.closest<HTMLElement>("[data-site-intro]");
              if (!shell) return;
              const bar = nav.querySelector<HTMLElement>("[data-menu-open] [data-intro-nav-content]");
              let hidden = false;
              let disposed = false;
              let previousScroll = window.scrollY;
              let travel = 0;

              const placeHeader = (immediate = false) => {
                if (disposed) return;
                // Focus events also belong to this media context, so an active
                // reveal cannot write a stale offset after crossing a breakpoint.
                context.add(() => {
                  const top = Number.parseFloat(getComputedStyle(nav).top) || 0;
                  const height = bar?.offsetHeight ?? 64;
                  const restingOffset = window.scrollY > 28 ? getOffset() : 0;
                  const tween = { duration: immediate || reducedMotion ? 0 : 0.3, ease: "power3.out", overwrite: "auto" as const };
                  gsap.to(nav, { y: hidden ? -(top + height + 8) : restingOffset, ...tween });
                  // Match the reading heading to the navbar, with a small gap
                  // when visible and the viewport edge when it retreats.
                  gsap.to(shell, { "--legal-header-offset": hidden ? "0px" : `${top + restingOffset + height + 4}px`, ...tween });
                  nav.dataset.legalNavHidden = String(hidden);
                });
              };
              const showHeader = () => {
                hidden = false;
                travel = 0;
                placeHeader();
              };
              const updateVisibility = () => {
                const currentScroll = Math.max(0, window.scrollY);
                const delta = currentScroll - previousScroll;
                previousScroll = currentScroll;
                travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
                const menuExpanded = nav.querySelector('[data-menu-open="true"]');
                const hasFocus = nav.contains(document.activeElement);
                const shouldHide = currentScroll > 96 && !menuExpanded && !hasFocus && (Math.abs(travel) < 8 ? hidden : travel > 0);
                if (shouldHide !== hidden || currentScroll < 36) {
                  hidden = shouldHide;
                  placeHeader();
                }
              };

              placeHeader(true);
              ScrollTrigger.create({
                start: 0,
                end: 999999,
                onUpdate: updateVisibility,
                onRefresh: () => placeHeader(true),
              });
              // A keyboard user can reveal the translated navigation by focusing it.
              nav.addEventListener("focusin", showHeader);
              return () => {
                disposed = true;
                nav.removeEventListener("focusin", showHeader);
                gsap.killTweensOf(nav, "y");
                gsap.killTweensOf(shell, "--legal-header-offset");
                shell.style.removeProperty("--legal-header-offset");
                delete nav.dataset.legalNavHidden;
              };
            }

            let logoHidden = false;

            const showLogo = () => {
              if (!logoHidden) return;
              logoHidden = false;
              gsap.to(logoShell, {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration,
                ease: "power3.out",
                pointerEvents: "auto",
                overwrite: "auto",
              });
            };

            const hideLogo = () => {
              if (logoHidden) return;
              logoHidden = true;
              gsap.to(logoShell, {
                autoAlpha: 0,
                x: -28,
                scale: 0.96,
                duration,
                ease: "power3.out",
                pointerEvents: "none",
                overwrite: "auto",
              });
            };

            ScrollTrigger.create({
              start: 28,
              end: 999999,
              onEnter: () => {
                gsap.to(nav, {
                  y: getOffset,
                  duration,
                  ease: "power3.out",
                  overwrite: "auto",
                });
                hideLogo();
              },
              onLeaveBack: () => {
                gsap.to(nav, {
                  y: 0,
                  duration,
                  ease: "power3.out",
                  overwrite: "auto",
                });
                showLogo();
              },
              onUpdate: (self) => {
                if (self.scroll() < 36 || self.direction < 0) {
                  showLogo();
                } else if (self.direction > 0) {
                  hideLogo();
                }
              },
              onRefresh: (self) => {
                gsap.set(nav, { y: self.isActive ? getOffset() : 0 });
                if (self.scroll() < 36) {
                  showLogo();
                } else {
                  hideLogo();
                }
              },
            });
          });
        });
        return () => cancelAnimationFrame(frame);
      });
      return () => media.revert();
    },
    { scope: navRef, dependencies: [isLegalPage], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!menuOpen) return;
      const closeOnOutsidePointerDown = (event: PointerEvent) => {
        const nav = navRef.current;
        const target = event.target;

        if (!nav || !(target instanceof Node)) return;
        if (!nav.contains(target)) setMenuOpen(false);
      };

      document.addEventListener("pointerdown", closeOnOutsidePointerDown, true);
      return () => {
        document.removeEventListener(
          "pointerdown",
          closeOnOutsidePointerDown,
          true,
        );
      };
    },
    { dependencies: [menuOpen], revertOnUpdate: true },
  );

  const closePanels = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      style={navThemeDefaults}
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] overflow-x-clip px-0 transition-[padding-left,padding-right] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:top-5 sm:pl-[var(--nav-hero-left,max(1.5rem,calc((100vw-80rem)/2)))] sm:pr-[var(--nav-hero-right,max(1.5rem,calc((100vw-80rem)/2)))] lg:pl-[var(--nav-hero-left,max(2rem,calc((100vw-80rem)/2)))] lg:pr-[var(--nav-hero-right,max(2rem,calc((100vw-80rem)/2)))] xl:top-8"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closePanels();
          navRef.current?.querySelector<HTMLButtonElement>('button[aria-controls="site-menu"]')?.focus({ preventScroll: true });
        }
        if (menuOpen && event.key === "Tab") {
          const controls = Array.from(
            navRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? [],
          ).filter((element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
          const first = controls[0];
          const last = controls.at(-1);
          const target = event.shiftKey && document.activeElement === first
            ? last
            : !event.shiftKey && document.activeElement === last
              ? first
              : null;
          if (target) {
            event.preventDefault();
            target.focus({ preventScroll: true });
            if (target.closest("#site-menu")) {
              target.scrollIntoView({ block: "nearest", behavior: "instant" });
            }
          }
        }
      }}
    >
      <div
        data-intro-nav-parent
        className="relative z-10 mx-auto grid w-full grid-cols-1 items-start sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4"
      >
        {/* Logo */}
        <div
          data-header-logo
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto hidden h-12 w-[11.5rem] cursor-pointer items-center justify-center rounded-pill px-3 sm:flex sm:h-16 sm:w-[11rem] sm:px-2 md:w-[14rem] md:px-5 xl:h-[4.9rem] xl:w-[13.25rem]`}
        >
          <div
            data-intro-nav-content
            className="grid h-full w-full place-items-center"
          >
            <LinkArrow
              href={brand.homeHref}
              appearance="plain"
              aria-label={brand.homeLabel}
              className="h-full w-full justify-center gap-2.5 rounded-pill text-[var(--nav-foreground)] sm:gap-3"
            >
              <Image
                src={brand.mark}
                alt={brand.name}
                width={64}
                height={64}
                priority
                className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 xl:h-[2.8rem] xl:w-[2.8rem]"
              />
              <span className="font-display text-lg font-black leading-none tracking-[-0.05em] sm:text-xl xl:text-[1.3rem]">
                <span data-nav-text>{brand.wordmark[0]}</span>
                <span data-nav-icon>{brand.wordmark[1]}</span>
              </span>
            </LinkArrow>
          </div>
        </div>

        {/* Navigation Menu */}
        <motion.div
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto relative flex h-[var(--nav-closed-height)] w-[var(--nav-menu-closed-width)] min-w-0 max-w-full justify-self-stretch overflow-hidden rounded-none sm:justify-self-end sm:rounded-[2rem] xl:rounded-[2.45rem] [--nav-closed-height:4.25rem] [--nav-menu-closed-width:100vw] [--nav-menu-open-width:100vw] sm:[--nav-menu-closed-width:28rem] sm:[--nav-menu-open-width:28rem] sm:[--nav-closed-height:4rem] lg:[--nav-menu-closed-width:30rem] lg:[--nav-menu-open-width:30rem] xl:[--nav-menu-closed-width:32rem] xl:[--nav-menu-open-width:32rem] xl:[--nav-closed-height:4.9rem]`}
          data-menu-open={menuOpen ? "true" : "false"}
          style={{ transformOrigin: "top right" }}
          animate={{
            width: menuOpen
              ? "var(--nav-menu-open-width)"
              : "var(--nav-menu-closed-width)",
            height: menuOpen
              ? "auto"
              : "var(--nav-closed-height)",
          }}
          initial={false}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-full w-full flex-col">
            <div
              data-intro-nav-content
              data-header-actions
              className="flex h-[var(--nav-closed-height)] w-full shrink-0 items-center gap-2 px-2 sm:px-2.5 md:gap-3 md:px-3.5 xl:px-4"
            >
              <LinkArrow
                href={brand.homeHref}
                appearance="plain"
                onClick={closePanels}
                aria-label={brand.homeLabel}
                className="min-w-0 flex-1 gap-2 rounded-pill pl-1 text-[var(--nav-foreground)] sm:hidden!"
              >
                <Image
                  src={brand.mark}
                  alt=""
                  width={56}
                  height={56}
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <span className="truncate font-display text-[1.05rem] font-black leading-none tracking-[-0.05em]">
                  <span data-nav-text>{brand.wordmark[0]}</span>
                  <span data-nav-icon>{brand.wordmark[1]}</span>
                </span>
              </LinkArrow>

              <span className="hidden sm:block">
                <MagneticFillButton
                  href={headerCopy.foodHref}
                  dataNavChip
                  variant="light"
                  className={`${navChip} !bg-[var(--nav-chip)] !text-[var(--nav-chip-text)] h-9 justify-center gap-2 rounded-pill px-4 text-xs font-semibold sm:h-10 sm:px-5 xl:h-12 xl:px-6 xl:text-base`}
                >
                  {headerCopy.findFood}
                  <MapPin data-nav-icon className="h-3.5 w-3.5" strokeWidth={2.3} aria-hidden="true" />
                </MagneticFillButton>
              </span>

              <span className="hidden sm:block">
                <MagneticFillButton
                  href={headerCopy.foodHref}
                  dataNavAction
                  variant="dark"
                  className={`${navAction} !bg-[var(--nav-action)] !text-[var(--nav-action-text)] h-9 justify-center gap-2 rounded-pill px-3 text-xs font-semibold sm:h-10 sm:px-5 xl:h-12 xl:text-base`}
                >
                  {headerCopy.orderNow}
                  <ListOrderedIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.35} aria-hidden="true" />
                </MagneticFillButton>
              </span>

              {/* <motion.button
                type="button"
                aria-label="Theme preview"
                data-nav-chip
                className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-pill bg-white text-dark-ink sm:flex sm:h-10 sm:w-10 xl:h-12 xl:w-12"
              >
                <Sun data-nav-icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </motion.button> */}

              <MagneticFillButton
                type="button"
                onClick={() => {
                  setMenuOpen((value) => !value);
                }}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label={menuOpen ? headerCopy.closeMenu : headerCopy.openMenu}
                themeAware
                menuThemeAware
                className="ml-auto h-9 min-w-[5.15rem] rounded-4xl bg-transparent! px-1.5 text-3xl font-semibold uppercase tracking-[0.08em] [--magnetic-text:var(--nav-foreground)] motion-safe:hover:scale-[1.04] motion-safe:active:scale-[0.96] sm:h-10 sm:min-w-[6.7rem] sm:px-2.5 sm:pr-4 xl:h-12 xl:min-w-[7.4rem]"
              >
                <span className="hidden leading-none text-base sm:inline">
                  {menuOpen ? headerCopy.close : ""}
                </span>
                <MenuGlyph open={menuOpen} />
              </MagneticFillButton>
            </div>

            <AnimatePresence>
              {menuOpen ? (
                <motion.nav
                  id="site-menu"
                  aria-label={headerCopy.expandedMenu}
                  data-lenis-prevent
                  initial={{
                    opacity: 0,
                    y: -16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="scrollbar-none max-h-[calc(100dvh-var(--nav-closed-height)-2rem)] shrink-0 overflow-x-hidden overflow-y-auto overscroll-contain px-7 pb-4 pt-4 text-[var(--nav-foreground)] sm:px-9 xl:pt-6"
                >
                  <MenuScrollLock />
                  {/* Desktop Links */}
                  <ul className="hidden w-full gap-3 sm:grid sm:gap-4">
                    {menuLinks.map((link) => (
                      <li key={`${link.href}-${link.label}`} className="w-full">
                        <LinkArrow
                          href={link.href}
                          onClick={closePanels}
                          imageSrc={link.asset}
                          imageAlt={link.imageAlt ?? ""}
                          className="w-full min-w-0! border-current/20 py-1.5 text-left font-display text-2xl! font-semibold normal-case! leading-none text-[var(--nav-foreground)]! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.04em] [--link-arrow-image-size:2.25rem] sm:text-[2.05rem]!"
                        >
                          {link.label}
                        </LinkArrow>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 grid grid-cols-2 gap-2 sm:hidden">
                    <MagneticFillButton
                      href={headerCopy.foodHref}
                      onClick={closePanels}
                      dataNavChip
                      variant="light"
                      className={`${navChip} !bg-[var(--nav-chip)] !text-[var(--nav-chip-text)] h-11 justify-center gap-2 rounded-pill px-4 text-xs font-semibold`}
                    >
                      {headerCopy.findFood}
                      <MapPin data-nav-icon className="h-3.5 w-3.5" strokeWidth={2.3} aria-hidden="true" />
                    </MagneticFillButton>
                    <MagneticFillButton
                      href={headerCopy.foodHref}
                      onClick={closePanels}
                      dataNavAction
                      variant="dark"
                      className={`${navAction} !bg-[var(--nav-action)] !text-[var(--nav-action-text)] h-11 justify-center gap-2 rounded-pill px-4 text-xs font-semibold`}
                    >
                      {headerCopy.orderNow}
                      <ListOrderedIcon className="h-3.5 w-3.5" strokeWidth={2.35} aria-hidden="true" />
                    </MagneticFillButton>
                  </div>

                  {/* Mobile Links */}
                  <ul className="flex w-full flex-col gap-5 pt-2 sm:hidden">
                    {menuLinks.map((link) => (
                      <li key={`${link.href}-${link.label}-mobile`} className="w-full">
                        <LinkArrow
                          href={link.href}
                          onClick={closePanels}
                          className="w-full min-w-0! border-current/20 py-1 text-left font-display text-[1.55rem]! font-semibold normal-case! leading-none text-[var(--nav-foreground)]! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.04em]"
                        >
                          {link.label}
                        </LinkArrow>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
