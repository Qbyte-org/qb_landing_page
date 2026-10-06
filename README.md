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

Open [http://localhost:3001](http://localhost:3001). Production preview (`pnpm build`
followed by `pnpm start`) runs on port 3002.

## Waitlist configuration

Set `NEXT_PUBLIC_API_BASE_URL` in your local `.env` file to the backend API base
URL, including its version prefix. The waitlist client appends `/waitlist`.
Keep the actual URL in environment configuration rather than application code
or checked-in documentation; `.env*` files are ignored by Git.

Configure the same variable in the deployment environment before building.
Next.js embeds public environment values in the client bundle, so restart the
development server or rebuild the deployment after changing this value. The
backend must allow the website's origin through CORS.

## Quality checks

```bash
pnpm check
pnpm test
pnpm build
```

## Editing content

Page copy, card data, image choices, navigation, form messages, and accessible
labels live in `src/content/` and are imported by their components. See the
[content guide](src/content/README.md) for the files belonging to each page.
Keep layout and interaction logic in components. Legal policy text stays in
`content/legal/`.

## Colors

Edit the named palette in `src/app/globals.css`. `--color-brand` is the primary
orange; its lighter and darker shades are derived automatically. Surface,
status, map, and illustration colors have their own named tokens in the same
block. Use theme utilities such as `bg-brand` and `text-paper`, or
`var(--color-brand)` in inline styles and SVG attributes.

`pnpm dev` watches the palette and synchronizes external SVGs, favicon PNGs,
the Apple icon, and manifest colors. `pnpm build` synchronizes them before
compiling. Run `pnpm theme:sync` to regenerate those files on their own; do not
edit generated SVG fallback colors or `src/generated/theme-colors.json`.
Asset colors support hex values, token aliases, and `color-mix(in srgb, ...)`.
Food photographs retain their original pixels.
