"use client";

import { useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin } from "lucide-react";
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
    <motion.span
      className="relative grid h-9 w-9 place-items-center text-current"
      animate={{ scale: open ? 1.04 : 1 }}
      transition={{ duration: 0.48, ease }}
      aria-hidden="true"
    >
      <motion.span
        data-magnetic-accent
        className="absolute inset-0 rounded-full bg-[var(--nav-icon,#ff4f1f)]"
        animate={{
          scale: open ? 0.96 : 0.62,
          opacity: open ? 0.14 : 0,
        }}
        transition={{ duration: 0.45, ease }}
      />

      <svg
        className="relative h-10 w-10 overflow-visible"
        viewBox="0 0 42 42"
        fill="none"
      >
        <motion.path
          data-magnetic-accent
          d="M6.8 26.5C12.5 22.8 18.6 22.2 25.4 24.2"
          stroke="var(--nav-icon,#ff4f1f)"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeDasharray="1.8 4.8"
          animate={{
            opacity: open ? 0 : 0.72,
            pathLength: open ? 0 : 1,
            pathOffset: open ? 0 : [0, -0.22, 0],
          }}
          transition={
            open
              ? { duration: 0.28, ease }
              : { duration: 2.8, repeat: Infinity, ease }
          }
        />
        <motion.path
          d="M8.2 16.8H15.8"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
          animate={{
            x: open ? 7 : 0,
            opacity: open ? 0 : 1,
            pathLength: open ? 0 : 1,
          }}
          transition={{ duration: 0.34, ease }}
        />
        <motion.path
          d="M6.5 21H15"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
          animate={{
            x: open ? 8 : 0,
            opacity: open ? 0 : 0.92,
            pathLength: open ? 0 : 1,
          }}
          transition={{ duration: 0.34, ease }}
        />

        <motion.g
          animate={{
            x: open ? -1 : [0, 1.15, 0],
            y: open ? 0 : [0, -0.65, 0],
            scale: open ? 0.78 : 1,
            opacity: open ? 0.18 : 1,
          }}
          transition={
            open
              ? { duration: 0.28, ease }
              : { duration: 1.65, repeat: Infinity, ease }
          }
          style={{ transformOrigin: "25px 20px" }}
        >
          <path
            data-magnetic-accent
            d="M19.2 18.4H30.8C32 18.4 33 19.35 33 20.55V28.1C33 29.3 32 30.25 30.8 30.25H19.2C18 30.25 17 29.3 17 28.1V20.55C17 19.35 18 18.4 19.2 18.4Z"
            fill="var(--nav-icon,#ff4f1f)"
          />
          <path
            d="M21.2 18.4V17.35C21.2 15.45 22.75 14.05 25 14.05C27.25 14.05 28.8 15.45 28.8 17.35V18.4"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
          <path
            d="M22.15 23.1V26.9M24.7 23.1V26.9M27.25 23.1V26.9"
            stroke="white"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.path
          data-magnetic-accent
          d="M13.5 13.5L28.5 28.5"
          stroke="var(--nav-icon,#ff4f1f)"
          strokeWidth="2.45"
          strokeLinecap="round"
          animate={{
            opacity: open ? 1 : 0,
            pathLength: open ? 1 : 0,
          }}
          transition={{ duration: 0.42, ease }}
        />
        <motion.path
          d="M28.5 13.5L13.5 28.5"
          stroke="currentColor"
          strokeWidth="2.45"
          strokeLinecap="round"
          animate={{
            opacity: open ? 1 : 0,
            pathLength: open ? 1 : 0,
          }}
          transition={{ duration: 0.42, delay: open ? 0.04 : 0, ease }}
        />
      </svg>

      <motion.span
        data-magnetic-accent
        className="pointer-events-none absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--nav-icon,#ff4f1f)]"
        animate={{
          scale: open ? 0 : [1, 1.35, 1],
          opacity: open ? 0 : 1,
        }}
        transition={
          open
            ? { duration: 0.22, ease }
            : { duration: 1.6, repeat: Infinity, ease }
        }
      />
    </motion.span>
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
                  customFillClass="bg-[#F15F00]"
                  customHoverTextColor="#ffffff"
                  dataNavChip
                  className="h-9 rounded-pill border-0 bg-white px-4 text-xs font-extrabold text-[#24180f] sm:h-10 sm:px-5 xl:h-12 xl:px-6 xl:text-sm"
                >
                  Find food
                  <MapPin data-nav-icon className="h-3.5 w-3.5" strokeWidth={2.3} aria-hidden="true" />
                </MagneticFillButton>
              </span>

              <MagneticFillButton
                href="/restaurants"
                variant="brand"
                dataNavAction
                className="h-9 rounded-pill border-0 bg-[#F15F00] px-4 text-xs font-extrabold sm:h-10 sm:px-5 xl:h-12 xl:px-8 xl:text-sm"
              >
                Order now
              </MagneticFillButton>

              {/* <motion.button
                type="button"
                aria-label="Theme preview"
                data-nav-chip
                className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-pill bg-white text-[#24180f] sm:flex sm:h-10 sm:w-10 xl:h-12 xl:w-12"
              >
                <Sun data-nav-icon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </motion.button> */}

              <MagneticFillButton
                type="button"
                onClick={() => {
                  setMenuOpen((value) => !value);
                }}
                variant="ghost"
                customFillClass="bg-[#F15F00]"
                customHoverTextColor="#ffffff"
                ariaLabel={menuOpen ? "Close menu" : "Open menu"}
                dataNavChip
                className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-pill border-0 bg-white text-[#24180f] sm:h-10 sm:w-10 xl:h-12 xl:w-12"
              >
                <MenuGlyph open={menuOpen} />
              </MagneticFillButton>
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
                  className="px-7 pb-6 pt-4 text-[var(--nav-foreground)] sm:px-9 xl:pt-6"
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
