import { MapPin } from "lucide-react";
import FooterNewsletter from "./FooterNewsletter";
import LinkArrow from "../ui/LinkArrow";

const navigation = [
  {
    title: "Menu",
    links: [
      { label: "Restaurants", href: "/restaurants" },
      { label: "About us", href: "/company" },
      { label: "Get the app", href: "/#app" },
      { label: "How it works", href: "/#how" },
      { label: "Restaurant partners", href: "/partners" },
      { label: "Become a rider", href: "/riders" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Join the waitlist", href: "/waitlist" },
      { label: "FAQs", href: "/#faq" },
      { label: "Contact us", href: "mailto:support@quickbite.ng" },
    ],
  },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Refunds", href: "/legal/refunds" },
  { label: "Delete account", href: "/delete-account" },
] as const;

// One static SVG path keeps the receipt detail inexpensive to render.
const barcodeBars = [7, 2, 5, 1, 3, 8, 2, 1, 4, 2, 6, 1, 3, 2, 7, 1, 5, 3, 1, 2];
const barcodePath = Array.from({ length: 3 }, (_, repeat) =>
  barcodeBars.map((height, index) =>
    `M0 ${repeat * 140 + index * 7}h72v${height}H0z`,
  ).join(" "),
).join(" ");

export default function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#1c120f] text-paper"
    >
      <div className="mx-auto grid w-[92%] max-w-[1840px] gap-10 pb-28 pt-10 sm:gap-12 sm:pt-12 lg:grid-cols-[minmax(0,3.2fr)_minmax(0,5.3fr)_minmax(0,1.6fr)] lg:gap-[4vw] lg:pb-12">
        <FooterNewsletter />

        <div className="flex min-w-0 flex-col">
          <nav aria-label="Footer navigation" className="grid gap-7 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:gap-8 lg:pb-10 2xl:pb-14">
            {navigation.map((column) => (
              <div key={column.title} className="min-w-0">
                <h2 className="text-sm font-medium uppercase text-peach/75 sm:text-base 2xl:text-xl">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col items-start gap-1">
                  {column.links.map((link) => (
                    <li key={link.label} className="w-full min-w-0">
                      <LinkArrow
                        href={link.href}
                        variant="dark"
                        prefetch={false}
                        className="min-h-10 w-full min-w-0! gap-2! border-paper/15! text-sm! font-semibold uppercase leading-snug text-paper! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.02em] sm:min-h-9 sm:text-lg! lg:min-h-8 lg:text-[clamp(.8rem,1.05vw,1.25rem)]!"
                      >
                        {link.label}
                      </LinkArrow>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-1 items-center gap-x-4 gap-y-5 border-t border-paper/15 pt-7 sm:grid-cols-[minmax(0,1fr)_auto] lg:mt-auto lg:pt-8">
            <p className="order-2 text-base sm:order-1 sm:text-lg 2xl:text-2xl">
              &copy; 2026 QuickBite
            </p>

            <LinkArrow
              href="/#cities"
              appearance="plain"
              prefetch={false}
              className="order-1 min-h-10 w-fit justify-center gap-2 rounded-pill border border-paper/20 px-3 py-2 text-sm text-paper hover:bg-paper/10 sm:order-2 sm:justify-self-end 2xl:text-base"
            >
              <MapPin className="size-4" aria-hidden="true" />
              All locations
            </LinkArrow>

            <nav aria-label="Legal" className="order-3 sm:col-span-2">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <LinkArrow
                      href={link.href}
                      prefetch={false}
                      variant="dark"
                      className="min-h-9 min-w-0! gap-2! border-paper/15! text-sm! font-normal! normal-case! text-paper! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.04em] 2xl:text-base!"
                    >
                      {link.label}
                    </LinkArrow>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div aria-hidden="true" className="relative hidden items-stretch justify-center lg:flex">
          <div className="absolute -bottom-9 -top-9 left-0 w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,231,215,0.45)_0px,rgba(255,231,215,0.45)_12px,transparent_12px,transparent_20px)]">
            <span className="absolute -left-3 -top-3 size-6 bg-peach/35 [clip-path:polygon(0_0,100%_0,50%_50%)]" />
            <span className="absolute -bottom-3 -left-3 size-6 bg-peach/35 [clip-path:polygon(50%_50%,100%_100%,0_100%)]" />
          </div>
          <svg
            viewBox="0 0 72 420"
            preserveAspectRatio="none"
            className="ml-[15%] h-full min-h-[26rem] w-[36%] max-w-20 text-paper/70"
          >
            <path d={barcodePath} fill="currentColor" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
