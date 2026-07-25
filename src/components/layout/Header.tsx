"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { navLinks } from "@/content/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-card backdrop-blur"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo priority />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-pill px-4 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-black/5 hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#app" variant="ghost" size="sm">
            Get the app
          </Button>
          <Button href="/restaurants" size="sm">
            Order now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-navy hover:bg-black/5 lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-card px-4 py-3 text-base font-semibold text-navy hover:bg-cream"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                <Button href="/restaurants" size="md" className="w-full">
                  Order now
                </Button>
                <Button
                  href="#app"
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Get the app
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
