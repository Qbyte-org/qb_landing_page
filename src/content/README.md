# Site content

Edit copy, card data, image choices and accessible labels here. Components import
this content and retain their rendering, layout, interactions and animation logic.

- `company.ts`, `company-plans.ts`, `brand-pages.ts`: company, partners, riders and contact.
- `partners-page.ts`, `partner-dishes.ts`: partner page sections and Pinterest dish gallery.
- `riders-page.ts`: rider paths, delivery journey and local community sections.
- `home/`, `restaurants/`: section copy, dishes, categories and presentation data.
- `navigation.ts`, `footer.ts`, `ui.ts`: shared navigation, footer and interface copy.
- `loader.ts`, `loader-tiles.ts`, `cta.ts`, `cta-food.ts`: intro and CTA copy and photos.
- `waitlist.ts`, `waitlist-messages.ts`: forms, consent, results and fallback messages.
- `pages.ts`, `legal-ui.ts`: page metadata and legal interface content.
- `site.ts`, `legal.ts`: shared site data and legal document registration.

The full legal documents remain in `content/legal/` at the repository root.
Keep content modules free of client state and browser APIs so both server and
client components can import them. Rich copy may use structured text parts;
components choose the markup. CSS, SVG geometry and motion settings belong with
their components or existing configuration modules.
