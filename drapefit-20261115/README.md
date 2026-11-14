# DRAPEFIT · Curtain Fabric Calculator 🪟

[English](README.md) | [简体中文](README.zh-CN.md)

One-page calculator that turns a window into an exact curtain shopping list: total fabric meters, per-width cutting sizes, grommet/hook counts, and a visual fabric-roll cutting diagram — all computed locally in your browser.

## What problem it solves

Buying curtains online is guesswork: sellers ask "how many meters of 150cm-wide fabric do you need?", and the answer depends on pleat fullness, panel split, header style, hems and seam joins. Getting it wrong means short curtains or metres of wasted fabric. DRAPEFIT does the sewing-room math for you and shows exactly where every cut lands on the roll.

## How to use

1. **Measure**: enter track width (cm) and finished drop (cm), or tap a preset (floor-length / sill / café).
2. **Style**: pick header type (grommet / four-prong hook / rod pocket), single vs. pair of panels, pleat fullness ratio (1.6–2.5×), fabric width (150 / 280 / custom), bottom hem, optional price per metre.
3. **Read the results**: total fabric in metres, per-width cut size, rod length, grommet count & spacing (or hook count), seam-join warnings, estimated cost.
4. **Copy the shopping list** and send it to your seamstress or the seller. The page is also print-friendly.

## Technical notes

- Single self-contained `index.html` — vanilla HTML/CSS/JS, zero dependencies, zero network requests, works offline.
- All SVG diagrams (window elevation with pleated panels + fabric roll cutting layout) are generated client-side; input fields and range sliders are two-way synced with live redraw.
- Math: finished panel width = rod length × fullness ÷ panels; widths per panel = ⌈panel width ÷ fabric width⌉; cut length = drop + header allowance + hem; grommets forced to odd counts at ~16cm spacing per common drapery practice.
- Nothing is uploaded — every calculation stays in your browser tab.

## License

MIT
