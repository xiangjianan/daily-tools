English | [简体中文](README.zh-CN.md)

# WASHMARKS

**Turn the mystery hieroglyphs on your clothing label into a plain-language care card — red-line warnings, a "delicate meter", and a quiz mode to actually learn the symbols.**

**Play online**: <https://xiangjianan.github.io/daily-tools/washmarks-20261031/>

## The problem

Every garment tag carries five ISO 3758 care symbols — a washtub, a triangle, a square, an iron, a circle. Almost nobody can read them fluently. You stand in front of the washing machine with a shirt, squint at a crossed square-with-circle, and either guess wrong or ruin the fabric.

## How it works

1. **Tap the five slots** (wash / bleach / dry / iron / professional care) and pick the symbol that matches your label — 33 hand-drawn SVG symbols across five palettes.
2. **A care card writes itself**: one plain-language line per category (bilingual ZH/EN), every do-not highlighted in bold, all red lines gathered into one warning box.
3. **The delicate meter** (★☆☆☆☆–★★★★★) weighs your restrictions into a fun verdict — from "indestructible" to "treat it like a museum piece".
4. **Quiz mode**: a random symbol, four choices (same-category decoys included), streak scoring — learn the dialect in a minute.

Copy the card in Chinese or English (handy for the dry cleaner), or clear and decode the next garment.

## What it solves

- Decodes a real label in ~15 seconds, no photo upload, no account, no network call.
- Prevents the two classic disasters: tumbling a "do not tumble dry" garment and bleaching a "do not bleach" print.
- Doubles as a tiny trainer — after a few quiz rounds you read labels on your own.

## Technical notes

- Single `index.html`, zero dependencies, zero build, works offline from a double-click.
- All 33 symbols are inline SVG drawn with a handful of reusable primitives (tub, triangle, square, iron, circle, cross, bars, dots) — no images, no fonts.
- Everything runs in the browser: state is one 5-element array; nothing ever leaves the page.
- Vanilla ES5-flavored JS (~300 lines), responsive CSS, keyboard accessible (`Tab` + `Enter`), works with mouse and touch.

## License

MIT
