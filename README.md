# QuickBite

QuickBite's public website, built with Next.js, TypeScript, and Tailwind CSS. This repository is an independent project initialized from the approved QuickBite landing-page template and is the baseline for the upcoming redesign.

## Tech stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion for interaction and reveal animations
- Lucide React for interface icons
- React Markdown for legal documents

## Project structure

```text
quickbite/
|-- content/
|   `-- legal/             # Markdown policies rendered as static routes
|-- public/                # Static brand assets
|-- src/
|   |-- app/               # App Router pages, metadata, and global styles
|   |-- components/
|   |   |-- layout/        # Site-wide shell, header, and footer
|   |   |-- sections/      # Page-level marketing sections
|   |   `-- ui/            # Reusable presentational primitives
|   `-- content/           # Typed navigation and marketing content
|-- next.config.ts
|-- postcss.config.mjs
`-- tsconfig.json
```

## Getting started

Use Node.js 20.9 or newer.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3002](http://localhost:3002).

## Waitlist

The `/waitlist` page and footer newsletter use the same EmailJS submission
service. Both submit directly and show a shared result dialog. Configure all
three environment variables locally in `.env.local` and in the deployment
environment before building:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

These are EmailJS's public client configuration values. Restart the development
server or rebuild the deployment after changing them; Next.js embeds
`NEXT_PUBLIC_` values at build time.

The EmailJS template receives these parameters:

| Parameter | Value |
| --- | --- |
| `email` | Trimmed, lowercase email address |
| `phone` | Optional phone number, or `Not provided` |
| `name` | Email address portion before `@` |
| `reply_to` | `support@quickbite.ng` |
| `from_name` | `QuickBite Team` |
| `title` | `Welcome to the QuickBite waitlist` |

The service uses the documented [EmailJS send endpoint](https://www.emailjs.com/docs/rest-api/send/).
It confirms a signup only after EmailJS accepts the request. Missing
configuration, rejected requests and network timeouts show an explanatory
dialog and keep the entered details available for retrying.

After acceptance, a browser cache stores the email and confirmation time to
prevent repeat submissions from that browser. It does not store the optional
phone number and is not a central subscriber database. Legacy
`quickbiteWaitlistEmails` entries are ignored because earlier versions could
save them without contacting EmailJS. Configure the EmailJS template/service
to deliver the required signup notification or confirmation; acceptance does
not verify that a message reached the recipient's inbox.

## Quality checks

```bash
pnpm check
pnpm test
pnpm build
```

`pnpm check` runs ESLint and the TypeScript compiler without emitting files.
`pnpm test` checks waitlist validation, transport outcomes, duplicate handling
and modal scroll-lock cleanup with mocked transport; it sends no real emails.
The production build also generates every marketing and legal route.
