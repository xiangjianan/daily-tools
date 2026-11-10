English | [简体中文](README.zh-CN.md)

# INKSIGN · 墨迹签名板 (Velocity-aware Vector Signature Pad)

A single-file signature pad that turns your handwriting into **true vector SVG** — with stroke width that breathes with your writing speed, like real ink.

## What it solves

Signature pads usually export flat bitmap screenshots: fixed-width lines, blurry when scaled, awkward to reuse in documents. INKSIGN reads the **velocity of your hand** while you write — slow strokes swell, fast strokes thin out — and emits each stroke as a filled vector outline, so the result scales infinitely and stays crisp in print, PDF, or web.

## How to use

1. Write on the paper with a mouse, finger, or stylus. No buttons needed — it draws as soon as you touch.
2. Tweak if you like: pick an ink (ink black / pen blue / vermilion / moon white), adjust the nib slider, undo a stroke, or switch paper (warm ivory / deep night).
3. Export: **SVG download** (vector), **PNG download** (2× transparent), or **copy SVG code** straight into your markup.
4. Not feeling creative? Hit "示例签名" (sample signature) to load a scripted flourish.

## Technical notes

- Zero dependencies, zero build, zero network calls — everything runs locally in your browser. Your signature never leaves the device (it's your signature; it shouldn't).
- Stroke model: pointer events sample `{x, y, t}`; velocity (px/ms) maps through an exponential curve to target width, smoothed with an EMA filter. Each stroke becomes a variable-width outline built from segment normals, rendered and exported as a single closed Bézier path with round caps.
- Works with mouse, touch, and pen (Pointer Events + `touch-action: none`), responsive down to phone widths.
- One HTML file, ~530 lines, double-click to open.

## License

MIT (repo root). Part of the [daily-tools](https://github.com/xiangjianan/daily-tools) daily creative tool series — issue #60, 2026-11-11.
