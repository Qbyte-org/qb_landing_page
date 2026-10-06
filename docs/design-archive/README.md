# Design references

These resources preserve earlier visual experiments. They are not imported by
the current pages.

## Food assets

The original output paths are retained so the preparation scripts can still
locate their inputs and outputs:

- `public/images/food/hero-cutouts/` — hand-traced food cutouts, prepared by
  `scripts/prepare-hero-food.mjs`.
- `public/images/food/cooked-tray-accents/` — individual portions taken from dish
  photographs, prepared by `scripts/prepare-cooked-tray-accents.mjs`.
- `public/images/food/standalone-accents/` — separate food photographs, prepared
  by `scripts/prepare-standalone-food.mjs`.
- `public/images/food/tray-accents/` — ingredient accents with source credits in
  the adjacent `sources.json`.

Run a preparation script from the repository root only when intentionally
regenerating that collection. It overwrites its generated images. Source credits
and processing notes remain beside the assets; the hero cutouts use photographs
from the Pinterest food library and its provenance manifest.
