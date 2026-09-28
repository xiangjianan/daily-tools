English | [简体中文](README.zh-CN.md)

# DALTON.

**See your designs through colorblind eyes — drop an image, compare instantly, export. 100% local.**

![license](https://img.shields.io/badge/license-MIT-blue.svg)

**DALTON** is a single-file, zero-dependency web tool that simulates how people with color vision deficiency (CVD) see your images, charts, and UI mockups.

## The problem

Roughly **8% of men and 0.5% of women** have some form of color blindness — yet most dashboards, charts, and status indicators are still built around red/green pairings that become indistinguishable for them. Existing simulators are either bloated online services that want your image uploaded to a server, or heavyweight libraries. There was no fast, private, paste-and-see answer.

## How it works

1. **Drop / paste / pick** any image (PNG · JPG · WebP). Or hit **Try demo image** for a procedurally generated dashboard with classic bad color pairings.
2. Pick a vision type — **Deuteranopia, Protanopia, Tritanopia, Achromatopsia**, the three anomalous trichromacies (*-anomaly), or the Normal baseline — and slide the **severity** from 0% to 100%.
3. Compare side by side with the original, then **download** the simulated PNG.

## What makes it different

- **Severity is continuous**, not just on/off dichromacy — anomalous trichromacy (the most common form) is a *spectrum*, and this is one of the few single-file tools that lets you scrub it.
- **Paste from clipboard** works (`Ctrl/Cmd+V`) — screenshot a chart, paste, judge.
- **100% local**: every pixel is transformed in your browser with Viénot/Brettel-style dichromacy matrices applied in **linear RGB** (with proper sRGB gamma round-trip). No upload, no account, no telemetry, no network requests at all.
- One HTML file. Double-click to run. Works offline. Mouse + touch, responsive down to phone widths.

## Notes on accuracy

Dichromacy simulation follows the Viénot/Brettel approach widely used in accessibility research; anomalous-trichromacy levels are approximated by blending toward the corresponding dichromat response. Individual CVD varies — treat results as a design aid, not a medical simulation.

## Tech

- Plain HTML + CSS + vanilla JS, single file (~560 lines), zero build, zero CDN
- Canvas pixel processing capped at 1400 px on the long edge for instant response
- Inline SVG favicon; dark theme

## License

MIT
