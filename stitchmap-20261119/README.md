English | [简体中文](README.zh-CN.md)

# STITCHMAP · Photo → Cross-Stitch Pattern

Turn any photo into a cross-stitch chart you can actually sew: every cell is matched to a **real DMC embroidery-floss color** (456-color palette), rendered as a color / symbol / combined grid, with a ready-to-shop **thread shopping list**.

## What problem does it solve?

"Can I turn my cat photo into a cross-stitch pattern?" — existing answers are apps, accounts, uploads, or watermarked exports. STITCHMAP does it in one screen, fully in your browser: the image never leaves your machine, and you get floss codes instead of "close enough" colors.

## How to use

1. Drop / pick / paste (Ctrl+V) an image, or hit **Try the demo**.
2. Tune: grid width (30–180 stitches), max colors (6–48), fabric count (11/14/16/18 ct).
3. Switch view: **color blocks** for the big picture, **symbols** for counting grids, **both** for working.
4. Copy the DMC shopping list, or download the chart as PNG.

Finished size and skein estimates update live with the fabric count (formula shown in-page; estimates assume 2 strands folded from an 8 m skein, ±30% real-world).

## How it works

- Downsample to the stitch grid with box averaging (alpha-aware), then map every cell to its nearest DMC color in **CIELAB** space.
- Keep the top-N most frequent flosses, remap the rest to the kept palette (guarantees the shopping list matches the chart, cell for cell).
- Pure front-end: single HTML file, zero dependencies, zero uploads, works offline via `file://`.

## Notes

- DMC hex values come from a community color table (nathantspencer/DMC-ColorCodes); they are the common community approximations, not official spectrophotometer readings.
- Transparent pixels are skipped (counted in neither stitch totals nor the shopping list).

## License

MIT (see repo root LICENSE).
