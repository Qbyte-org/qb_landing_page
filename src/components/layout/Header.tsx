"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { MapPin, Sun } from "lucide-react";
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
  "--magnetic-bg": "#ffffff",
  "--magnetic-border": "#ffffff",
  "--magnetic-text": "#24180f",
  "--magnetic-fill": "#f15f00",
  "--magnetic-hover-text": "#ffffff",
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
  const menuShellRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const menuAnimationReadyRef = useRef(false);
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
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    },
    { dependencies: [menuOpen], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const shell = menuShellRef.current;
      const panel = menuPanelRef.current;
      if (!shell || !panel) return;

      const rows = gsap.utils.toArray<HTMLElement>(
        panel.querySelectorAll("[data-menu-row]"),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const getClosedHeight = () =>
        Number.parseFloat(
          getComputedStyle(shell).getPropertyValue("--nav-closed-height"),
        ) || 64;

      menuTimelineRef.current?.kill();
      gsap.killTweensOf([shell, panel, ...rows]);

      if (!menuAnimationReadyRef.current) {
        menuAnimationReadyRef.current = true;
        gsap.set(shell, {
          height: "var(--nav-closed-height)",
          width: "var(--nav-menu-closed-width)",
          overflow: "hidden",
          willChange: "height,width",
        });
        gsap.set(panel, {
          autoAlpha: 0,
          display: "none",
          pointerEvents: "none",
          maxHeight: 0,
          overflow: "hidden",
          y: -14,
          clipPath: "inset(0 0 100% 0 round 0 0 1.9rem 1.9rem)",
        });
        gsap.set(rows, { autoAlpha: 0, y: -16 });
        if (!menuOpen) return;
      }

      if (menuOpen) {
        const closedHeight = getClosedHeight();

        gsap.set(panel, {
          display: "block",
          pointerEvents: "auto",
          visibility: "hidden",
          maxHeight: "none",
          overflow: "hidden",
          y: -14,
          clipPath: "inset(0 0 100% 0 round 0 0 1.9rem 1.9rem)",
        });

        const panelHeight = panel.scrollHeight;
        const drawerBreathingRoom = 18;
        const openHeight = closedHeight + panelHeight + drawerBreathingRoom;

        gsap.set(panel, {
          autoAlpha: 1,
          maxHeight: panelHeight,
          overflow: "hidden",
          visibility: "visible",
        });
        gsap.set(rows, { autoAlpha: 0, y: -18 });

        menuTimelineRef.current = gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .to(shell, {
            height: openHeight,
            width: "var(--nav-menu-open-width)",
            duration: reducedMotion ? 0 : 0.72,
            ease: "expo.inOut",
          })
          .to(
            panel,
            {
              y: 0,
              clipPath: "inset(0 0 0% 0 round 0 0 1.9rem 1.9rem)",
              duration: reducedMotion ? 0 : 0.66,
              ease: "expo.inOut",
            },
            0.02,
          )
          .to(
            rows,
            {
              autoAlpha: 1,
              y: 0,
              duration: reducedMotion ? 0 : 0.46,
              ease: "power3.out",
              stagger: 0.045,
            },
            0.26,
          );

        return;
      }

      menuTimelineRef.current = gsap
        .timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            gsap.set(panel, {
              display: "none",
              maxHeight: 0,
              overflow: "hidden",
              autoAlpha: 0,
              y: -14,
              clipPath: "inset(0 0 100% 0 round 0 0 1.9rem 1.9rem)",
              pointerEvents: "none",
            });
            gsap.set(shell, {
              height: "var(--nav-closed-height)",
              width: "var(--nav-menu-closed-width)",
            });
          },
        })
        .to(rows, {
          autoAlpha: 0,
          y: -22,
          duration: reducedMotion ? 0 : 0.28,
          ease: "power2.inOut",
          stagger: { each: 0.018, from: "start" },
        })
        .to(
          panel,
          {
            y: -18,
            clipPath: "inset(0 0 100% 0 round 0 0 1.9rem 1.9rem)",
            duration: reducedMotion ? 0 : 0.5,
            ease: "expo.inOut",
          },
          0.02,
        )
        .to(
          shell,
          {
            height: "var(--nav-closed-height)",
            width: "var(--nav-menu-closed-width)",
            duration: reducedMotion ? 0 : 0.62,
            ease: "expo.inOut",
          },
          0,
        );
    },
    { scope: navRef, dependencies: [menuOpen], revertOnUpdate: false },
  );

  const closePanels = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      style={navThemeDefaults}
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] overflow-x-clip px-4 sm:top-5 sm:px-6 lg:px-8 xl:top-8"
      onKeyDown={(event) => {
        if (event.key === "Escape") closePanels();
      }}
    >
      <div
        data-intro-nav-parent
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-start gap-2 sm:gap-4"
      >
        {/* Logo */}
        <div
          data-header-logo
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto flex h-12 w-[11.5rem] cursor-pointer items-center justify-center rounded-pill px-3 sm:h-16 sm:w-[14rem] sm:px-5 xl:h-[4.9rem] xl:w-[15.25rem] xl:px-6`}
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
                className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 xl:h-[3.35rem] xl:w-[3.35rem]"
              />
              <span className="font-display text-lg font-black leading-none tracking-[-0.05em] sm:text-xl xl:text-[1.35rem]">
                <span data-nav-text>Quick</span>
                <span data-nav-icon>Bite</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <div
          ref={menuShellRef}
          data-intro-nav-shell
          data-nav-surface
          className={`${navPill} pointer-events-auto relative flex h-[var(--nav-closed-height)] w-[var(--nav-menu-closed-width)] justify-self-end overflow-hidden rounded-[1.5rem] [--nav-closed-height:3rem] [--nav-menu-closed-width:10rem] [--nav-menu-open-width:min(32rem,calc(100vw-2rem))] sm:[--nav-menu-closed-width:28rem] sm:[--nav-menu-open-width:28rem] sm:rounded-[1.9rem] sm:[--nav-closed-height:4rem] lg:[--nav-menu-closed-width:30rem] lg:[--nav-menu-open-width:30rem] xl:[--nav-menu-closed-width:32rem] xl:[--nav-menu-open-width:32rem] xl:rounded-[2.35rem] xl:[--nav-closed-height:4.9rem]`}
          data-menu-open={menuOpen ? "true" : "false"}
          style={{ transformOrigin: "top right" }}
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
                  themeAware
                  dataNavChip
                  className="h-9 rounded-pill border-0 px-4 text-xs font-extrabold xl:h-12 xl:px-6 xl:text-sm"
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
                onPointerDown={(event) => {
                  if (event.button !== 0) return;
                  setMenuOpen((value) => !value);
                }}
                onClick={(event) => {
                  if (event.detail === 0) {
                    setMenuOpen((value) => !value);
                  }
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

            <nav
              ref={menuPanelRef}
              id="site-menu"
              aria-label="Expanded menu"
              aria-hidden={!menuOpen}
              className="invisible pointer-events-none origin-top px-6 pb-8 pt-4 text-[var(--nav-foreground)] sm:px-8 sm:pb-9 sm:pt-5"
            >
              <ul className="grid w-full gap-2.5 py-2 sm:gap-3 sm:py-3">
                {menuLinks.map((link) => (
                  <li
                    data-menu-row
                    key={`${link.href}-${link.label}`}
                    className="w-full"
                  >
                    <LinkArrow
                      href={link.href}
                      onClick={closePanels}
                      variant="dark"
                      dataNavText
                      imageSrc={link.asset}
                      className="min-h-8 w-full !text-[var(--nav-foreground)] [--link-arrow-expanded-spacing:0.12em] [--link-arrow-image-size:1.55rem] [--link-arrow-min-width:100%] [--link-arrow-spacing:0em] border-0 pb-0 font-display text-[1.45rem] font-black uppercase leading-none tracking-normal [border-bottom-width:0] sm:min-h-9 sm:text-[1.75rem] sm:[--link-arrow-image-size:1.9rem] xl:text-[1.9rem] xl:[--link-arrow-image-size:2rem]"
                      textClassName="tracking-normal"
                    >
                      {link.label}
                    </LinkArrow>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
