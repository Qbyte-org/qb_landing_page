import Link from "next/link";
import { MapPin } from "lucide-react";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import FooterNewsletter from "./FooterNewsletter";

const navigation = [
  {
    title: "Discover",
    links: [
      { label: "Browse restaurants", href: "/restaurants" },
      { label: "How it works", href: "/#how" },
      { label: "Delivery areas", href: "/#cities" },
      { label: "Get the app", href: "/#app" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Restaurant partners", href: "/partners" },
      { label: "Delivery riders", href: "/riders" },
      { label: "About QuickBite", href: "/company" },
      { label: "Join the waitlist", href: "/waitlist" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/#faq" },
      { label: "Contact support", href: "mailto:support@quickbite.ng" },
      { label: "Delete account", href: "/delete-account" },
      { label: "Refund policy", href: "/legal/refunds" },
    ],
  },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
] as const;

export default function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#2a211d] text-white"
    >
      <Container className="relative pb-10 pt-10 sm:pt-14 lg:pb-12 lg:pt-20">
        
        {/* Top Section: Newsletter, Navigation, and Decorative Right Edge */}
        <div className="grid gap-12 lg:grid-cols-[minmax(22rem,3.5fr)_minmax(0,6fr)_auto] lg:gap-16 xl:gap-24">
          
          <FooterNewsletter />

          <nav aria-label="Footer navigation" className="py-2 lg:py-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:gap-x-8">
              {navigation.map((column) => (
                <div key={column.title} className="min-w-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                    {column.title}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-block text-sm font-bold text-white transition-transform duration-200 hover:translate-x-1 hover:text-[#f06400] focus-visible:text-[#f06400] sm:text-base"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Right Edge Decorative Element (Receipt/Barcode) */}
          <div className="hidden lg:flex relative items-stretch pl-12 border-l-2 border-dashed border-white/10">
            {/* Top and Bottom semi-circle cutouts to mimic a receipt tear */}
            <div className="absolute -top-3 -left-2.5 w-5 h-5 rounded-full bg-[#2a211d]" />
            <div className="absolute -bottom-3 -left-2.5 w-5 h-5 rounded-full bg-[#2a211d]" />
            
            <div className="flex flex-col justify-center w-12 gap-[3px] opacity-40 py-8">
              {/* Abstract Barcode generated with divs */}
              {[4, 2, 8, 2, 6, 12, 2, 4, 1, 8, 4, 2, 1, 10, 4, 6, 2, 8, 2, 1].map((h, i) => (
                <div key={i} className="w-full bg-white" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 sm:mt-20 border-t border-white/10 pt-8">
          
          <div className="mb-8">
            <Logo variant="light" width={140} height={31} />
          </div>

          <div className="flex flex-col gap-6">
            {/* Row 1: Copyright and Legal */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-sm font-medium text-white/50">
              <p>&copy; 2026 QuickBite. All rights reserved.</p>
              <nav aria-label="Legal">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Row 2: Socials and Locations */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-6 text-white/50">
                {/* Minimalist monochrome social icons */}
                <a href="#" className="transition-colors hover:text-white" aria-label="TikTok">
                  <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.35-1.91 1.56-4.37 2.36-6.81 2.15-2.82-.23-5.5-1.74-7.22-4.01-1.72-2.28-2.45-5.18-2.06-7.98.41-2.9 2.06-5.5 4.49-7.14 2.22-1.5 5.01-2.17 7.64-1.84v4.02c-1.35-.38-2.85-.35-4.14.2-1.25.54-2.29 1.6-2.73 2.9-.44 1.3-.3 2.76.38 3.96.67 1.2 1.83 2.13 3.19 2.45 1.4.34 2.92.17 4.17-.5 1.05-.55 1.84-1.57 2.17-2.73.34-1.22.25-2.52.25-3.79V0h3.94Z"/></svg>
                </a>
                <a href="#" className="transition-colors hover:text-white" aria-label="LinkedIn">
                  <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="transition-colors hover:text-white" aria-label="X">
                  <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/></svg>
                </a>
                <a href="#" className="transition-colors hover:text-white" aria-label="Instagram">
                  <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
              
              <Link
                href="/#cities"
                className="inline-flex items-center gap-2 rounded-pill border border-white/15 px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#f06400] hover:text-[#f06400]"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                All Locations
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
