"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MapPin, Sun } from "lucide-react";
import { navLinks } from "@/content/site";
import { useNavbarTheme } from "@/hooks/use-navbar-theme";
import { tactileMotion } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Logo from "../ui/Logo";
import MagneticFillButton from "../ui/MagneticFillButton";

const blackPill = "border border-transparent bg-black text-white";

const menuLinks = [
  { label: "Home", href: "/" },
  ...navLinks,
  { label: "Cities", href: "/#cities" },
  { label: "Get the app", href: "/#app" },
  { label: "Contact Us", href: "/company" },
];

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
      <motion.span
        className="absolute h-[2px] rounded-pill bg-current"
        animate={{ rotate: open ? 45 : 0, y: open ? 0 : -7, width: open ? 30 : 26 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute h-[2px] rounded-pill bg-current"
        animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0, width: open ? 8 : 18 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      <motion.span
        className="absolute h-[2px] rounded-pill bg-current"
        animate={{ rotate: open ? -45 : 0, y: open ? 0 : 7, width: open ? 30 : 26 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute right-0 top-1 h-1.5 w-1.5 rounded-pill bg-[#ff4f1f]"
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />
    </span>
  );
}

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useNavbarTheme(navRef);

  // Animate the nav in/out of view on scroll
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const getOffset = () => -(Number.parseFloat(getComputedStyle(nav).top) || 0);

      ScrollTrigger.create({
        start: 28,
        end: 999999,
        onEnter: () =>
          gsap.to(nav, {
            y: getOffset,
            duration: reducedMotion ? 0 : 0.38,
            ease: "power3.out",
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to(nav, {
            y: 0,
            duration: reducedMotion ? 0 : 0.38,
            ease: "power3.out",
            overwrite: "auto",
          }),
        onRefresh: (self) => {
          gsap.set(nav, { y: self.isActive ? getOffset() : 0 });
        },
      });
    },
    { scope: navRef },
  );

  // Manage body overflow when menu is open
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

  const closePanels = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-7 xl:top-8"
      onKeyDown={(event) => {
        if (event.key === "Escape") closePanels();
      }}
    >
      <AnimatePresence>
        {menuOpen ? (
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            onClick={closePanels}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-0 cursor-pointer bg-black/48"
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 mx-auto grid max-w-[103rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:gap-5">
        {/* Logo nav */}
        <div
          data-intro-nav-shell
          data-nav-surface
          className={`${blackPill} pointer-events-auto flex h-12 min-w-0 cursor-pointer items-center rounded-pill px-3 sm:h-16 sm:px-6 xl:h-[4.9rem] xl:px-9`}
        >
          <div data-intro-nav-content>
            <Logo variant="light" priority width={128} height={28} themeAware />
          </div>
        </div>

        {/* menu nav */}
        <motion.div
          data-intro-nav-shell
          data-nav-surface
          className={`${blackPill} pointer-events-auto relative flex h-[var(--nav-closed-height)] items-start overflow-hidden rounded-[1.5rem] [--nav-closed-height:3rem] sm:rounded-[1.9rem] sm:[--nav-closed-height:4rem] xl:rounded-[2.35rem] xl:[--nav-closed-height:4.9rem] ${
            menuOpen
              ? "w-[calc(100vw-2rem)] max-w-[34rem] sm:w-[34rem] xl:w-[35rem]"
              : "w-auto"
          }`}
          animate={{
            height: menuOpen
              ? "min(49rem, calc(100svh - 3rem))"
              : "var(--nav-closed-height)",
          }}
          initial={false}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full flex-col">
            <div data-intro-nav-content className="flex h-12 items-center gap-2 px-2 sm:h-16 sm:gap-3 sm:px-4 xl:h-[4.9rem]">
              <Link
                href="/restaurants"
                data-nav-chip
                className="hidden h-9 cursor-pointer items-center gap-2 rounded-pill border border-white/75 px-4 text-xs font-extrabold text-white transition-colors duration-300 hover:bg-white hover:text-black sm:flex xl:h-12 xl:px-6 xl:text-sm"
              >
                Find food
                <MapPin data-nav-icon className="h-3.5 w-3.5" strokeWidth={2.3} aria-hidden="true" />
              </Link>

              <MagneticFillButton
                href="/restaurants"
                variant="brand"
                dataNavAction
                className="h-9 cursor-pointer rounded-pill border-[#ff4f1f] bg-[#ff4f1f] px-4 text-xs font-extrabold sm:h-10 sm:px-5 xl:h-12 xl:px-8 xl:text-sm"
              >
                Order now
              </MagneticFillButton>

              <motion.button
                type="button"
                aria-label="Theme preview"
                data-nav-chip
                className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-pill bg-white/12 text-white ring-1 ring-white/10 sm:flex xl:h-12 xl:w-12"
                {...tactileMotion}
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
                {...tactileMotion}
              >
                <MenuGlyph open={menuOpen} />
              </motion.button>
            </div>

            <AnimatePresence>
              {menuOpen ? (
                <motion.nav
                  id="site-menu"
                  aria-label="Expanded menu"
                  initial={{ opacity: 0, x: 72, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 56, y: 8 }}
                  transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  className="px-8 pb-9 pt-6 sm:px-10 xl:pt-7"
                >
                  <ul className="grid gap-4 sm:gap-5">
                    {menuLinks.map((link) => (
                      <li key={`${link.href}-${link.label}`}>
                        <Link
                          href={link.href}
                          onClick={closePanels}
                          data-nav-text
                          className="group inline-flex cursor-pointer items-center gap-4 font-display text-2xl font-extrabold leading-none text-white transition-colors duration-300 hover:text-[#ff6b35] sm:text-[2.15rem]"
                        >
                          {link.label}
                          <ArrowRight
                            data-nav-icon
                            className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                        </Link>
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
