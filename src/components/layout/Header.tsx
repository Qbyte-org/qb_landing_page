"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, MapPin, Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";
import { useNavbarTheme } from "@/hooks/use-navbar-theme";
import { tactileMotion } from "@/lib/animation";
import { useGSAP } from "@/lib/gsap";
import Logo from "../ui/Logo";

const surface =
  "border border-border bg-white shadow-[0_10px_30px_-16px_rgba(26,26,46,0.22)]";

function PrimaryNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      data-nav-text
      className="group relative flex h-11 items-center overflow-hidden px-3 text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <span className="transition-transform duration-[250ms] ease-out group-hover:-translate-y-0.5">
        {label}
      </span>
      <span
        data-nav-underline
        aria-hidden="true"
        className="absolute bottom-2 left-1/2 h-0.5 w-5 -translate-x-1/2 scale-x-0 rounded-pill bg-brand-dark transition-transform duration-[250ms] ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  useNavbarTheme(navRef);

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
    setCountryOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5"
      onKeyDown={(event) => {
        if (event.key === "Escape") closePanels();
      }}
    >
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-2">
        <div className="pointer-events-auto flex items-start gap-2">
          <div
            data-intro-nav="logo"
            data-nav-surface
            className={`${surface} flex h-14 items-center rounded-pill px-4 sm:h-16 sm:px-5`}
          >
            <Logo themeAware priority />
          </div>

          <div
            data-intro-nav="country"
            className="relative hidden min-[420px]:block"
          >
            <motion.button
              type="button"
              data-nav-surface
              data-nav-text
              aria-expanded={countryOpen}
              aria-haspopup="listbox"
              aria-label="Select delivery country"
              onClick={() => {
                setCountryOpen((value) => !value);
                setMenuOpen(false);
              }}
              className={`${surface} flex h-14 items-center gap-2 rounded-pill px-4 text-sm font-bold text-navy sm:h-16`}
              {...tactileMotion}
            >
              <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              NG
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`}
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.button>

            <AnimatePresence>
              {countryOpen ? (
                <motion.div
                  data-nav-surface
                  role="listbox"
                  aria-label="Delivery countries"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`${surface} absolute left-0 top-[calc(100%+0.5rem)] w-64 rounded-2xl p-2`}
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected="true"
                    data-nav-text
                    onClick={() => setCountryOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-brand-50 text-sm font-extrabold text-brand-dark">
                      NG
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold">Nigeria</span>
                      <span data-nav-muted className="block text-xs text-muted">
                        Delivering in Ile-Ife
                      </span>
                    </span>
                    <Check className="h-4 w-4 text-success" aria-hidden="true" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <nav
          data-intro-nav="links"
          data-nav-surface
          aria-label="Primary"
          className={`${surface} pointer-events-auto hidden h-16 items-center rounded-pill px-2 lg:flex`}
        >
          {navLinks.map((link) => (
            <PrimaryNavLink key={link.href} {...link} />
          ))}
        </nav>

        <motion.div
          data-intro-nav="action"
          className="pointer-events-auto hidden lg:block"
          {...tactileMotion}
        >
          <Link
            href="/restaurants"
            data-nav-action
            className="group flex h-16 items-center gap-2 rounded-pill border border-brand-dark bg-brand-dark px-6 text-sm font-bold text-white shadow-[0_10px_30px_-16px_rgba(226,95,0,0.52)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Order now
            <span className="transition-transform duration-[250ms] group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>

        <motion.button
          type="button"
          data-intro-nav="menu"
          data-nav-surface
          data-nav-text
          onClick={() => {
            setMenuOpen((value) => !value);
            setCountryOpen(false);
          }}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`${surface} pointer-events-auto flex h-14 w-14 items-center justify-center rounded-pill text-navy sm:h-16 sm:w-16 lg:hidden`}
          {...tactileMotion}
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            data-nav-surface
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`${surface} pointer-events-auto mx-auto mt-2 max-w-7xl rounded-[1.75rem] p-3 lg:hidden`}
          >
            <nav aria-label="Mobile primary" className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-nav-text
                  onClick={closePanels}
                  className="group flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="transition-transform duration-[250ms] group-hover:-translate-y-0.5">
                    {link.label}
                  </span>
                  <span data-nav-muted className="text-muted" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </nav>
            <Link
              href="/restaurants"
              data-nav-action
              onClick={closePanels}
              className="mt-2 flex h-14 items-center justify-center rounded-pill border border-brand-dark bg-brand-dark px-6 text-base font-bold text-white"
            >
              Order now
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
