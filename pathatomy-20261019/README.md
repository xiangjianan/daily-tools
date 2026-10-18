English | [简体中文](README.zh-CN.md)

# Pathatomy · SVG Path Dissector & Replay

Paste an SVG path `d` string and watch it dissected: every command (M, L, C, S, Q, T, A, Z — absolute and relative) becomes a card you can inspect, and a stroke-replay slider redraws the path command by command, control points and all.

## What problem it solves

SVG path data is write-only for most humans: a wall of numbers like `C 30 20, 50 20, 60 90 S 90 160…` where the difference between `C`/`S` or `Q`/`T` (reflected control points) is invisible. Debugging "why does my curve kink here?" means guessing. Pathatomy makes every segment visible and replayable, so you can see exactly which command draws which part of the shape.

## How to use

1. Paste a `d` attribute string into the box (or click one of the five built-in samples).
2. The path renders on the grid canvas with start/end markers, anchors and control-point handles.
3. Click any command in the list to isolate it — the rest of the path dims, control points and their guide lines appear, and a plain-language explanation shows what that command does.
4. Drag the seek slider (or hit ▶ Replay) to animate the drawing stroke-by-stroke; the badge shows the current command and percentage.
5. **Copy absolute path** exports a normalized all-absolute `d` string (relative commands resolved, S/T kept as-is).

Handles common pitfalls: scientific notation, `H`/`V` shorthands, chained coordinates after `M` (implicit lineto), negative radii, stray characters — each gets a friendly, positional error message instead of a silent blank canvas.

## Technical notes

- Single self-contained `index.html`, zero build, zero dependencies, no network requests — everything parses and renders locally in your browser.
- Hand-written tokenizer + parser normalizes relative commands to absolute, computes `S`/`T` reflected control points, and samples cubic/quadratic béziers and SVG elliptical arcs (endpoint → center parameterization) for canvas rendering.
- Canvas is devicePixelRatio-aware and the view auto-fits the path bounding box; responsive layout works on touch screens.
- Verified with a Node logic suite (23 assertions: segment chaining, round-trip `absoluteD` re-parse, arc radius invariants, reflection math, error branches) plus a headless Playwright smoke test (zero console/page errors, DOM render assertions, mobile 390px overflow check).

## License

MIT — see [LICENSE](LICENSE).
