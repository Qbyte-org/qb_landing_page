import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
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
      className="relative overflow-hidden bg-[#2a211d] text-[#fffaf5]"
    >
      <Container className="relative pb-28 pt-10 sm:pt-14 lg:pb-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,4fr)_minmax(0,7fr)_4.5rem] lg:gap-10">
          <FooterNewsletter />

          <nav aria-label="Footer navigation" className="py-2 lg:px-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-8">
              {navigation.map((column) => (
                <div key={column.title} className="min-w-0">
                  <h3 className="text-xs font-bold text-[#f06400]">
                    {column.title}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-block text-sm font-semibold leading-snug text-[#fffaf5]/75 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-[#fffaf5] focus-visible:text-[#fffaf5] sm:text-base"
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

          <div
            aria-hidden="true"
            className="relative hidden min-h-[21rem] border-l border-dashed border-[#f06400]/55 lg:block before:absolute before:inset-y-3 before:left-5 before:w-8 before:bg-[repeating-linear-gradient(to_bottom,rgba(255,250,245,.78)_0,rgba(255,250,245,.78)_3px,transparent_3px,transparent_9px)] before:[mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] after:absolute after:inset-y-10 after:left-8 after:w-3 after:bg-[repeating-linear-gradient(to_bottom,#f06400_0,#f06400_5px,transparent_5px,transparent_14px)] after:[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          />
        </div>

        <div className="mt-12 border-t border-[#fffaf5]/12 pt-7 sm:mt-14">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Logo variant="light" width={150} height={33} />
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#f0d7c2]/75">
                Fast, fresh meals from trusted local kitchens, delivered across
                Ile-Ife and built to go further.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
              <Link
                href="/#cities"
                className="inline-flex w-fit items-center gap-2 rounded-pill border border-[#fffaf5]/15 px-4 py-2 text-sm font-semibold text-[#fffaf5]/80 transition-colors hover:border-[#f06400]/70 hover:text-white"
              >
                <MapPin
                  className="h-4 w-4 text-[#f06400]"
                  aria-hidden="true"
                />
                Ile-Ife, Osun State
              </Link>
              <a
                href="mailto:hello@quickbite.ng"
                className="inline-flex w-fit items-center gap-2 rounded-pill border border-[#fffaf5]/15 px-4 py-2 text-sm font-semibold text-[#fffaf5]/80 transition-colors hover:border-[#f06400]/70 hover:text-white"
              >
                <Mail
                  className="h-4 w-4 text-[#f06400]"
                  aria-hidden="true"
                />
                hello@quickbite.ng
              </a>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-[#fffaf5]/10 pt-6 text-sm text-[#fffaf5]/55 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 QuickBite. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[#fffaf5] focus-visible:text-[#fffaf5]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
