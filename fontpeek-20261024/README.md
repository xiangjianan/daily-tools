English | [简体中文](README.zh-CN.md)

# FontPeek · Font Inventory Lens

**Every computer quietly ships with dozens of typefaces — nobody knows which ones are actually there. FontPeek counts them, shows them, and turns your picks into a `font-family` stack. 100% local.**

Live demo: <https://xiangjianan.github.io/daily-tools/fontpeek-20261024/>

## The problem

Picking fonts for a CSS project is guesswork: your machine has a private library of system and CJK fonts, but there is no built-in way to see what's installed. Designers keep a TextEdit window open "just to check"; developers hard-code `font-family` stacks for fonts they don't actually have.

## What it does

- **Instant inventory** — on load, FontPeek probes ~140 candidate font families (web-safe classics, macOS / Windows / Linux system fonts, developer favorites, and 30+ Chinese typefaces) using the canvas text-width comparison trick. Installed ones light up in a card grid, rendered *in themselves*.
- **Live specimen** — edit the sample text and drag the size slider; every card re-renders in real time, so you judge typefaces on *your* words, not "Lorem ipsum".
- **Filter & search** — category pills (sans / serif / mono / CJK / handwriting-display) plus a name search.
- **Click to compose a stack** — select any fonts, a bottom bar appears showing your `font-family:` CSS with a live preview; copy the CSS or just the name list.

## How to use

1. Open the page — detection runs immediately (typically < 100 ms).
2. Type your own sample text; adjust size.
3. Filter by category or search by name.
4. Click cards to add fonts to your stack; hit **Copy font-family CSS**.

## Technical notes

- Single-file HTML + vanilla JS + CSS. No build, no CDN, no network calls.
- Detection: measures the width of a mixed Latin/CJK probe string at 72px under `"<name>", <base>` vs. each of three bases (`monospace`, `serif`, `sans-serif`); a width delta > 1px on any base means the font resolved and is installed. Same-name variants may merge (a known limitation of width probing).
- Everything runs in your browser; nothing is uploaded, stored, or fingerprinted.

## License

MIT
