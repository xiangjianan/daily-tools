# BPDOT · 血压落点仪

English | [简体中文](README.zh-CN.md)

**BPDOT** turns two numbers — systolic and diastolic pressure — into an instant position on a classic blood-pressure map. Type or slide, and a pulsing dot lands on the color-coded zone with crosshair guides, a category verdict, MAP and pulse pressure, and your own history trail left as faded dots on the chart.

## What problem it solves

Most blood-pressure tools spit out a table: a range, a label, a wall of text. Numbers stay abstract. BPDOT treats your reading as a *coordinate*: high pressure on the X axis, low pressure on the Y axis, so you literally see where today's reading sits between the 120/80 green line and the 140/90 red line — and where your last 30 readings have been drifting.

## How to use

1. Set systolic (top number) and diastolic (bottom number) with the sliders, steppers, or by typing.
2. Watch the dot land on the map; read the zone, MAP (mean arterial pressure) and pulse pressure.
3. Optionally add heart rate, hit **Pin this reading** to keep it locally, and hit **Copy summary** to share the result.
4. Swapped values (high < low) are auto-corrected with a notice; out-of-range input is clamped with hints.

## Features

- AHA 2017 zone coloring with the China guideline 140/90 diagnostic line drawn as a dashed reference
- Real-time canvas rendering, animated pulse dot, crosshair guides, gridlines
- Local-only history (last 30 readings) in `localStorage`, rendered as faded trend dots on the map
- One-click copy summary with clipboard fallback for older browsers
- Fully offline, zero dependencies, single HTML file — nothing ever leaves the browser

## Technical notes

- Single-page HTML5 + vanilla JS + CSS, no build step, no CDN, works from a double-click on the file
- Chart zones are pre-rendered once via column scanning into a cached offscreen canvas
- Responsive down to phone width; sliders are touch-friendly (`touch-action: none`)
- Not a medical device. Zone boundaries reference the AHA 2017 classification; always consult a doctor for diagnosis.

## License

MIT
