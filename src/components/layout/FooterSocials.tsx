import MagneticFillButton from "../ui/MagneticFillButton";

// Set these to the official profiles when they are available. An unset profile
// stays visibly unavailable instead of sending visitors to a placeholder URL.
const socialLinks = [
  { label: "TikTok", href: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK, icon: "tiktok" },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN, icon: "linkedin" },
  { label: "X", href: process.env.NEXT_PUBLIC_SOCIAL_X, icon: "x" },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE, icon: "youtube" },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM, icon: "instagram" },
] as const;

function SocialIcon({ name }: { name: typeof socialLinks[number]["icon"] }) {
  const className = "size-4";
  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M3 9h4v12H3V9Zm2-7a2.3 2.3 0 1 0 0 4.6A2.3 2.3 0 0 0 5 2Zm5 7h4v1.6c.6-1.1 1.8-2 3.4-2 3.6 0 3.6 3 3.6 5.5V21h-4v-6.1c0-1.4 0-2.8-1.5-2.8S14 13.5 14 15v6h-4V9Z" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path fillRule="evenodd" d="M21.6 6.3C21 4.6 18 4.5 12 4.5s-9 .1-9.6 1.8C2 7.8 2 10 2 12s0 4.2.4 5.7c.6 1.7 3.6 1.8 9.6 1.8s9-.1 9.6-1.8C22 16.2 22 14 22 12s0-4.2-.4-5.7ZM10 8.5l6 3.5-6 3.5v-7Z" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={name === "x"
        ? "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L2 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L7.5 3.9H5.7L17.8 20Z"
        : "M16 2h-4v13.5a2.5 2.5 0 1 1-2-2.45V9a6.5 6.5 0 1 0 6 6.5V8.3A9 9 0 0 0 21 10V6a5 5 0 0 1-5-4Z"}
      />
    </svg>
  );
}

export default function FooterSocials() {
  return (
    <ul aria-label="QuickBite social profiles" className="flex flex-wrap gap-2 sm:gap-3">
      {socialLinks.map(({ label, href, icon }) => (
        <li key={label}>
          {href ? (
            <MagneticFillButton
              href={href}
              external
              ariaLabel={`QuickBite on ${label} (opens in a new tab)`}
              variant="dark"
              customFillClass="bg-brand"
              customHoverTextColor="#ffffff"
              className="size-10 rounded-full border! border-paper/20! bg-transparent! text-paper! motion-safe:hover:-translate-y-0.5"
            >
              <SocialIcon name={icon} />
            </MagneticFillButton>
          ) : (
            <span
              role="img"
              aria-label={`${label} profile unavailable`}
              title={`${label} profile unavailable`}
              className="flex size-10 items-center justify-center rounded-full border border-paper/15 text-peach/60"
            >
              <SocialIcon name={icon} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
