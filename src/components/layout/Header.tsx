"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Sun } from "lucide-react";
import { useNavbarTheme } from "@/hooks/use-navbar-theme";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import LinkArrow from "../ui/LinkArrow";
import Logo from "../ui/Logo";
import MagneticFillButton from "../ui/MagneticFillButton";

const navPill = "bg-black text-white";

const menuLinks = [
  { label: "Home", href: "/", asset: "/menu/delivery-bag.svg" },
  { label: "Restaurants", href: "/restaurants", asset: "/food/jollof.svg" },
  { label: "For Partners", href: "/partners", asset: "/menu/company-card.svg" },
  { label: "Riders", href: "/riders", asset: "/menu/rider-bike.svg" },
  { label: "Company", href: "/company", asset: "/menu/company-card.svg" },
  { label: "Cities", href: "/#cities", asset: "/menu/city-pin.svg" },
  { label: "Get the app", href: "/#app", asset: "/menu/app-phone.svg" },
  { label: "Contact Us", href: "/company", asset: "/menu/contact-bubble.svg" },
];

const navThemeDefaults = {
  "--nav-foreground": "#ffffff",
  "--nav-muted": "#ffd8bd",
  "--nav-icon": "#f06400",
  "--nav-chip": "#ffffff",
  "--nav-chip-text": "#24180f",
  "--nav-action": "#f15f00",
  "--nav-action-text": "#ffffff",
} as CSSProperties;

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex h-8 w-8 items-center justify-center"
      aria-hidden="true"
    >
      <motion.span
        className="absolute h-[2px] rounded-pill bg-current"
        animate={{ rotate: open ? 45 : 0, y: open ? 0 : -7, width: open ? 30 : 25 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute h-[2px] rounded-pill bg-current"
        animate={{ opacity: open ? 0 : 1, x: open ? 14 : 0, width: open ? 6 : 16 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />
      <motion.span
        className="absolute h-[2px] rounded-pill bg-current"
        animate={{ rotate: open ? -45 : 0, y: open ? 0 : 7, width: open ? 30 : 25 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute right-0 top-1 h-1.5 w-1.5 rounded-pill bg-[#ff4f1f]"
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1, x: open ? 6 : 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />
    </span>
  );
}

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useNavbarTheme(navRef);

  useGSAP(
    () => {
      const nav = navRef.current;
      const logoShell = nav?.querySelector<HTMLElement>("[data-header-logo]");
      if (!nav || !logoShell) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const duration = reducedMotion ? 0 : 0.38;
      const getFloatingGap = () => (window.innerWidth >= 1024 ? 16 : 12);
      const getOffset = () => {
        const top = Number.parseFloat(getComputedStyle(nav).top) || 0;
        return -Math.max(0, top - getFloatingGap());
      };
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
    },
    { scope: navRef },
  );

  useGSAP(
    () => {
      if (!menuOpen) return;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const closeOnOutsidePointerDown = (event: PointerEvent) => {
        const nav = navRef.current;
        const target = event.target;

        if (!nav || !(target instanceof Node)) return;
        if (!nav.contains(target)) setMenuOpen(false);
      };

      document.addEventListener("pointerdown", closeOnOutsidePointerDown, true);
      return () => {
        document.body.style.overflow = previousOverflow;
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
      className="pointer-events-none fixed inset-x-0 top-4 z-50 overflow-x-clip px-4 sm:top-5 sm:px-6 lg:px-8 xl:top-8"
      onKeyDown={(event) => {
        if (event.key === "Escape") closePanels();
      }}
    >
      <div
        data-intro-nav-parent
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-[auto_auto] items-start justify-between gap-2 sm:gap-4"
      >
        {/* Logo */}
        <div
          data-header-logo
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto flex h-12 w-[10.25rem] cursor-pointer items-center rounded-pill px-3 sm:h-16 sm:w-[13.25rem] sm:px-5 xl:h-[4.9rem] xl:w-[14.5rem] xl:px-6`}
        >
          <div data-intro-nav-content>
            <Logo variant="light" priority width={128} height={28} themeAware />
          </div>
        </div>

        {/* Navigation Menu */}
        <motion.div
          layout
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto relative flex h-[var(--nav-closed-height)] w-[var(--nav-menu-closed-width)] justify-self-end overflow-hidden rounded-[1.5rem] [--nav-closed-height:3rem] [--nav-menu-closed-width:10rem] [--nav-menu-open-width:min(32rem,calc(100vw-2rem))] sm:[--nav-menu-closed-width:28rem] sm:[--nav-menu-open-width:28rem] sm:rounded-[1.9rem] sm:[--nav-closed-height:4rem] lg:[--nav-menu-closed-width:30rem] lg:[--nav-menu-open-width:30rem] xl:[--nav-menu-closed-width:32rem] xl:[--nav-menu-open-width:32rem] xl:rounded-[2.35rem] xl:[--nav-closed-height:4.9rem]`}
          data-menu-open={menuOpen ? "true" : "false"}
          style={{ transformOrigin: "top right" }}
          animate={{
            width: menuOpen
              ? "var(--nav-menu-open-width)"
              : "var(--nav-menu-closed-width)",
            height: menuOpen
              ? "min(45rem, calc(100svh - 3rem))"
              : "var(--nav-closed-height)",
          }}
          initial={false}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full flex-col">
            <div
              data-intro-nav-content
              className="flex h-12 items-center gap-2 px-2 sm:h-16 sm:gap-3 sm:px-3 xl:h-[4.9rem] xl:px-4"
            >
              <span className="hidden sm:block">
                <MagneticFillButton
                  href="/restaurants"
                  variant="ghost"
                  dataNavChip
                  className="h-9 rounded-pill border-0 bg-white px-4 text-xs font-extrabold text-[#24180f] xl:h-12 xl:px-6 xl:text-sm"
                >
                  Find food
                  <MapPin data-nav-icon className="h-3.5 w-3.5" strokeWidth={2.3} aria-hidden="true" />
                </MagneticFillButton>
              </span>

              <MagneticFillButton
                href="/restaurants"
                variant="brand"
                dataNavAction
                className="h-9 rounded-pill border-0 bg-[#ff4f1f] px-4 text-xs font-extrabold sm:h-10 sm:px-5 xl:h-12 xl:px-8 xl:text-sm"
              >
                Order now
              </MagneticFillButton>

              <motion.button
                type="button"
                aria-label="Theme preview"
                data-nav-chip
                className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-pill bg-white text-[#24180f] sm:flex xl:h-12 xl:w-12"
              >
                <Sun data-nav-icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  setMenuOpen((value) => !value);
                }}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                data-nav-icon
                className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-pill text-white sm:h-11 sm:w-11 xl:h-12 xl:w-12"
              >
                <MenuGlyph open={menuOpen} />
              </motion.button>
            </div>

            <AnimatePresence>
              {menuOpen ? (
                <motion.nav
                  id="site-menu"
                  aria-label="Expanded menu"
                  initial={{
                    opacity: 0,
                    x: 88,
                    y: -10,
                    scaleX: 0.94,
                    clipPath: "inset(0 0 0 22% round 2.25rem)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    clipPath: "inset(0 0 0 0% round 2.25rem)",
                  }}
                  exit={{
                    opacity: 0,
                    x: 72,
                    y: -8,
                    scaleX: 0.96,
                    clipPath: "inset(0 0 0 24% round 2.25rem)",
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="origin-top-right px-7 pb-9 pt-6 text-[var(--nav-foreground)] sm:px-9 xl:pt-7"
                >
                  <ul className="grid w-full gap-3 sm:gap-4">
                    {menuLinks.map((link) => (
                      <li key={`${link.href}-${link.label}`} className="w-full">
                        <div className="flex w-full items-center gap-3 sm:gap-4">
                          <span
                            aria-hidden="true"
                            className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[1rem] sm:h-11 sm:w-11"
                            style={{
                              backgroundColor:
                                "color-mix(in srgb, var(--nav-foreground) 10%, transparent)",
                            }}
                          >
                            <Image
                              src={link.asset}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-contain p-1.5"
                            />
                          </span>

                          <LinkArrow
                            href={link.href}
                            onClick={closePanels}
                            variant="dark"
                            dataNavText
                            className="w-full !text-[var(--nav-foreground)] [--link-arrow-expanded-spacing:0.14em] [--link-arrow-min-width:100%] [--link-arrow-spacing:0em] border-0 pb-0 font-display text-2xl font-extrabold normal-case leading-none tracking-normal [border-bottom-width:0] sm:text-[2.05rem]"
                            textClassName="tracking-normal"
                          >
                            {link.label}
                          </LinkArrow>
                        </div>
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
