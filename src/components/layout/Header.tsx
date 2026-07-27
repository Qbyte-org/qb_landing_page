"use client";

import { useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ListOrderedIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useNavbarTheme } from "@/hooks/use-navbar-theme";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import LinkArrow from "../ui/LinkArrow";
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
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="flex h-12 items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 18 14"
        animate={{ width: open ? 0 : 22, opacity: open ? 0 : 1, marginRight: open ? 0 : 5 }}
        transition={{ duration: 0.4, ease }}
        className="h-[1.1rem] shrink-0"
      >
        <path d="M1 13V1H9V13M9 1H17V13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>

      <svg className="h-[1.1rem] w-[1.1rem] shrink-0 overflow-visible" viewBox="0 0 14 14">
        <motion.line x1="1" y1="1" x2="13" y2="1" stroke="var(--nav-icon, #f06400)" strokeWidth="2" strokeLinecap="square"
          animate={{ y2: open ? 13 : 1 }} transition={{ duration: 0.4, ease }} />
        <motion.line x1="1" y1="7" x2="13" y2="7" stroke="var(--nav-icon, #f06400)" strokeWidth="2" strokeLinecap="square"
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} transition={{ duration: 0.3, ease }} />
        <motion.line x1="1" y1="13" x2="13" y2="13" stroke="var(--nav-icon, #f06400)" strokeWidth="2" strokeLinecap="square"
          animate={{ y2: open ? 1 : 13 }} transition={{ duration: 0.4, ease }} />
      </svg>

      <motion.svg
        viewBox="0 0 14 14"
        animate={{ width: open ? 0 : 18, opacity: open ? 0 : 1, marginLeft: open ? 0 : 5 }}
        transition={{ duration: 0.4, ease }}
        className="h-[1.1rem] shrink-0"
      >
        <path d="M1 13V1H13V13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 14 14"
        animate={{ width: open ? 0 : 18, opacity: open ? 0 : 1, marginLeft: open ? 0 : 5 }}
        transition={{ duration: 0.4, ease }}
        className="h-[1.1rem] shrink-0"
      >
        <path d="M1 1V13H13V1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>
    </div>
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
          className={`${navPill} pointer-events-auto flex h-12 w-[11.5rem] cursor-pointer items-center justify-center rounded-pill px-3 sm:h-16 sm:w-[14rem] sm:px-5 xl:h-[4.9rem] xl:w-[13.25rem]`}
        >
          <div
            data-intro-nav-content
            className="grid h-full w-full place-items-center"
          >
            <Link
              href="/"
              aria-label="QuickBite home"
              className="flex h-full w-full items-center justify-center gap-2.5 sm:gap-3"
            >
              <Image
                src="/quickbite-mark.svg"
                alt="QuickBite"
                width={64}
                height={64}
                priority
                className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 xl:h-[2.8rem] xl:w-[2.8rem]"
              />
              <span className="font-display text-lg font-black leading-none tracking-[-0.05em] sm:text-xl xl:text-[1.3rem]">
                <span data-nav-text>Quick</span>
                <span data-nav-icon>Bite</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <motion.div
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto relative flex h-[var(--nav-closed-height)] w-[var(--nav-menu-closed-width)] justify-self-end overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] xl:rounded-[2.45rem] [--nav-closed-height:3rem] [--nav-menu-closed-width:10rem] [--nav-menu-open-width:min(32rem,calc(100vw-2rem))] sm:[--nav-menu-closed-width:28rem] sm:[--nav-menu-open-width:28rem] sm:[--nav-closed-height:4rem] lg:[--nav-menu-closed-width:30rem] lg:[--nav-menu-open-width:30rem] xl:[--nav-menu-closed-width:32rem] xl:[--nav-menu-open-width:32rem] xl:[--nav-closed-height:4.9rem]`}
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
              className="flex h-[var(--nav-closed-height)] w-full shrink-0 items-center gap-2 px-2.5 sm:gap-3 sm:px-3.5 xl:px-4"
            >
              <span className="hidden sm:block">
                <MagneticFillButton
                  href="/restaurants"
                  variant="ghost"
                  themeAware
                  dataNavChip
                  className="h-9 rounded-pill px-4 text-xs font-extrabold sm:h-10 sm:px-5 xl:h-12 xl:px-6 xl:text-base"
                >
                  Find food
                  <MapPin data-nav-icon className="h-3.5 w-3.5" strokeWidth={2.3} aria-hidden="true" />
                </MagneticFillButton>
              </span>

              <MagneticFillButton
                href="/restaurants"
                variant="brand"
                dataNavAction
                className="h-9 rounded-pill border-0 bg-[#F15F00] px-4 text-xs font-extrabold sm:h-10 sm:px-5 xl:h-12 xl:text-base"
              >
                Order now
                <ListOrderedIcon data-nav-icon className="h-4 w-4" strokeWidth={2.35} aria-hidden="true" />
              </MagneticFillButton>

              {/* <motion.button
                type="button"
                aria-label="Theme preview"
                data-nav-chip
                className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-pill bg-white text-[#24180f] sm:flex sm:h-10 sm:w-10 xl:h-12 xl:w-12"
              >
                <Sun data-nav-icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </motion.button> */}

              <motion.button
                type="button"
                onClick={() => {
                  setMenuOpen((value) => !value);
                }}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                data-nav-icon
                className="ml-auto flex h-9 min-w-[6.2rem] cursor-pointer items-center justify-center gap-2 rounded-[0.95rem] bg-transparent px-2.5 text-xs font-black uppercase tracking-[0.08em] text-[var(--nav-icon)] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#F15F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-10 sm:min-w-[6.7rem] xl:h-12 xl:min-w-[7.4rem]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="leading-none text-base">
                  {menuOpen ? "Close" : ""}
                </span>
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
                  className="px-7 pb-4 pt-4 text-[var(--nav-foreground)] sm:px-9 xl:pt-6"
                >
                  <ul className="grid w-full gap-3 sm:gap-4">
                    {menuLinks.map((link) => (
                      <li key={`${link.href}-${link.label}`} className="w-full">
                        <LinkArrow
                          href={link.href}
                          onClick={closePanels}
                          variant="dark"
                          dataNavText
                          imageSrc={link.asset}
                          className="w-full !text-[var(--nav-foreground)] [--link-arrow-expanded-spacing:0.14em] [--link-arrow-image-size:2rem] [--link-arrow-min-width:100%] [--link-arrow-spacing:0em] border-0 pb-0 font-display text-2xl font-extrabold normal-case leading-none tracking-normal [border-bottom-width:0] sm:text-[2.05rem] sm:[--link-arrow-image-size:2.35rem]"
                          textClassName="tracking-normal"
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
