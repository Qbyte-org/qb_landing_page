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

Open [http://localhost:3000](http://localhost:3000).

## Waitlist

The standalone launch page is available at `/waitlist`. Signups are saved in
the visitor's browser by default. To also deliver signups through EmailJS,
configure these deployment environment variables:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Quality checks

```bash
pnpm check
pnpm build
```

`pnpm check` runs ESLint and the TypeScript compiler without emitting files. The production build also generates every marketing and legal route.
