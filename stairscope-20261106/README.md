English | [简体中文](README.zh-CN.md)

# STAIRSCOPE · Stair Section Calculator

Input your floor-to-floor height and instantly get every viable riser/going plan — scored by the 400-year-old **Blondel comfort formula** (2R + G ≈ 630 mm) — plus a live-drawn stair section with a human scale figure, slope angle arc, and dimension callouts. One click exports a construction-ready report.

## What problem does it solve?

When planning a straight staircase (loft access, duplex, mezzanine, renovation), the math is fiddly: how many steps fit a 2.8 m rise? Which riser/going combination actually feels comfortable, not just *possible*? Spreadsheets and generic calculators give you numbers; STAIRSCOPE shows you **the stair itself**.

## How to use

1. Type your floor-to-floor height — `2.8` (meters) or `2800` (mm), both accepted.
2. Pick a plan card (number of steps). The ★ recommendation scores best on the Blondel check.
3. Fine-tune the going (G, 240–330 mm) with the slider — the section redraws live.
4. Read the verdict badges (riser / 2R+G / slope) and the stat cards: projection length, opening-length hint, tread count.
5. **Copy report** exports everything as text for your contractor or cutting list.

## The rules it checks

- **Blondel formula**: 2R + G ≈ 600–650 mm (target 630) — the classic stride-comfort check from François Blondel (17th c.), still the universal sanity test for stairs.
- Riser R: 150–180 mm comfortable, up to 190 mm acceptable.
- Going G: 240 mm minimum, 240–330 mm slider range.
- Slope: ≤ 32° easy, ≤ 38° acceptable.

Plans that can't land inside these bands honestly don't get invented — the tool says so instead of forcing a bad number.

## Tech notes

- Single-file HTML + vanilla JS + CSS, zero build, zero network calls, no CDN — everything computed locally in your browser, nothing uploaded.
- Section drawing is generated SVG (scalable, crisp on any DPI), with a 1.7 m human silhouette for scale.
- Tread count = risers − 1 (the upper floor slab is the last "tread"); projection = going × treads; opening hint adds a 900 mm landing, clearly labeled as reference-only.
- Works with mouse and touch, responsive down to phone widths, dark theme.

## License

MIT (see repository root).
