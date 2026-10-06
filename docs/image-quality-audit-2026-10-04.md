# Image quality audit — 4 October 2026

The site now uses quality-90 image delivery and restored source detail wherever the original photograph is available. Forty-three existing photographs and character illustrations were rebuilt from their original source files; their subjects and framing are preserved. Assets were not enlarged to invent detail, and existing compressed WebP files were not used as the input to the new exports.

## Rendering

- `SiteImage` supplies an overridable quality of 90 to Next Image throughout the site. SVG marks and illustrations remain vectors.
- `FoodImage` serves quality-90 responsive variants directly, avoiding a second lossy encode. Its width options are now 320, 640, 960, 1200, 1600 and 2048 pixels. Each output stops at its native source dimensions when those are smaller than the requested width.
- The desktop category carousel now declares its actual 544px image width, allowing the browser to choose an appropriately detailed variant on high-density displays.
- Existing `fill`, responsive `sizes`, lazy loading, transparency and photographic crops are retained. Unoptimized decorative assets retain their native files. The rider image uses a separate high-resolution preparation script.

## Rebuilt source collections

| Collection | Images | Treatment |
| --- | ---: | --- |
| Pinterest food library | 24 | Original photos, existing intentional chicken crop, 144 responsive exports |
| Restaurant hero dishes | 6 | Full source frame, up to 2048px wide |
| Partner dishes | 6 | Full source frame, up to 2048px wide |
| Company character portraits | 7 | Full source frame, restored native resolution |

All exports use WebP quality 90 and a small output-sharpening pass (`sigma: 0.4`, `m1: 0.5`, `m2: 1`). This avoids hard edge halos. Original downloads are cached in the ignored `.codex-artifacts/image-originals` directory. Public provenance manifests record the original URLs and processing. The partner source manifest was restored from the earlier local research record.

Selected resolution improvements:

| Asset | Before | After |
| --- | --- | --- |
| Pinterest egusi soup | 1050 × 1400 | 2048 × 2731 |
| Peppered fish and noodles | 1050 × 1400 | 1440 × 1920 |
| Ofada, egg and plantain | 788 × 1400 | 1152 × 2048 |
| Abacha salad | 788 × 1400 | 1080 × 1920 |
| Partner grilled tilapia | 1200 × 900 | 2000 × 1500 |
| Partner rice and beans | 960 × 1200 | 1280 × 1600 |
| Restaurant ofada plate | 1200 × 978 | 1580 × 1288 |
| Company teal robot | 800 × 1046 | 1567 × 2048 |
| Company black ninja | 800 × 800 | 1200 × 1200 |

## Native-source limits

Some source images are intrinsically small: the puff-puff paper bowl is 405px wide, the glazed-chicken crop 520px, amala 554px, partner egusi 600px, and several food photos 720px. Better encoding improves compression and edge clarity but cannot recover detail absent from these originals. Replacing those subjects would require a different photo or an original supplied by its owner.

The existing white-ninja portrait remains at 800 × 1239 because its intentional crop bounds were not recorded. Its rendering quality improves through `SiteImage`; its crop has been preserved. The legacy phone images are only 433 × 577 and 379 × 658. The redesigned app feature display uses scalable UI artwork instead of stretching those screenshots.

Already large 1600–2200px legacy photos and native transparent utensil assets were retained. Recompressing or enlarging those would not add information. Unused draft cutouts and superseded bike exports remain local and are excluded from the published release. Favicons remain at their required icon dimensions. Grain, logos and other SVG artwork already scale without raster degradation.

## Inventory and checks

Run `node scripts/audit-image-quality.mjs` to refresh the machine-readable inventory in `.codex-artifacts/image-quality-audit.json`. A different output path can be supplied as the first argument. The audit reads TypeScript syntax, resolves local asset paths and template roots, validates that referenced files exist, and inspects every public raster with Sharp. Code references include retained components/content that may not currently be mounted; this is an asset inventory, not a network waterfall.

The checked-in `docs/image-quality-inventory.json` contains the full file-by-file dimensions, sizes and referencing source files from this pass.

The inventory was refreshed for publication on 6 October 2026 after excluding unused drafts. It contains 211 raster files (67 source/standalone files and 144 responsive variants), 31 SVGs and 58 code-referenced raster sources. All 144 required food variants are present, all raster files decode, and no referenced images are missing.

`pnpm exec tsc --noEmit` passed. Targeted ESLint checks passed with no errors; `CompanyTeamHero.tsx` retains its existing unused `ArrowDown` warning.

A browser smoke check at 1440px and device-pixel ratio 2 loaded the home, company, partners and restaurants routes with no image HTTP failures. The company and partner photos requested `q=90`; board photos requested the new responsive files. Sample food and character exports were also inspected visually for preserved framing and clean edges. This checks delivery and rendering, not a claim that small originals now contain high-resolution detail.

Regenerate the improved collections with `node scripts/prepare-site-photos.mjs`. Add `pinterest`, `restaurant-hero`, `partners` or `team` to rebuild only that collection. The existing menu and restaurant preparation scripts also use the updated quality settings so a later asset refresh does not reintroduce the old low-resolution exports.
