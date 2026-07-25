import Link from "next/link";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/company" },
      { label: "How it works", href: "/#how" },
      { label: "Cities", href: "/#cities" },
      { label: "Careers", href: "/company" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Become a partner", href: "/partners" },
      { label: "Restaurants", href: "/restaurants" },
      { label: "Partner support", href: "/partners" },
    ],
  },
  {
    title: "Riders",
    links: [
      { label: "Ride with us", href: "/riders" },
      { label: "Dispatch partners", href: "/riders" },
      { label: "Rider support", href: "/riders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Cookie policy", href: "/legal/cookies" },
      { label: "Refund policy", href: "/legal/refunds" },
      { label: "Contact", href: "/company" },
    ],
  },
];

const socials: { label: string; href: string; path: string }[] = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21H2.6l7-8L2.5 3h6.1l4.3 5.6Zm-1 16h1.7L7.6 4.8H5.8Z",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M16.5 3c.3 2 1.5 3.6 3.5 3.9v2.7c-1.3.1-2.5-.2-3.6-.8v5.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 1 0 2 2.7V3Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Fast. Fresh. Delivered. QuickBite connects you with the best food
              from restaurants and home kitchens across Ile-Ife — and soon, all
              of Nigeria.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-brand"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition-colors hover:text-brand-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© 2026 QuickBite. Ile-Ife, Osun State, Nigeria. All rights reserved.</p>
          <p>Built in Ile-Ife for Nigeria — payments powered by Paystack.</p>
        </div>
      </Container>
    </footer>
  );
}
