English | [简体中文](README.zh-CN.md)

# MINDORBIT · Outline → Radial Mind Map

Paste an indented outline (or Markdown headings) and get a **clock-face radial mind map** instantly — the root sits at the center, branches fan out like orbits, each top-level branch gets its own hue. Click to collapse/expand, pan & zoom freely, then export a standalone SVG. 100% local, zero upload.

**Live demo**: <https://xiangjianan.github.io/daily-tools/mindorbit-20261025/>

## The problem

Text is the cheapest way to capture structure — meeting notes, launch plans, reading notes, packing lists — but a wall of indented bullets hides the shape of an idea. Classic mind-map tools render left-to-right trees, demand accounts, or bury a one-thought export behind menus and subscriptions. Sometimes you just want: *text in, a picture of the structure out, file saved, done.*

## How to use

1. Type or paste an outline in the left panel. Any mix works:
   - indentation (2 spaces / Tab) for depth,
   - Markdown heading hashes (`#`, `##`, `###`) — the hash count is the level,
   - list markers (`-`, `*`, `•`, `1.`) are stripped automatically.
   - The **first top-level line becomes the center** of the map.
2. The radial map redraws live as you type. Node/depth/leaf counts update in the header.
3. Interact:
   - **Click a node** to collapse or expand its branch (a `+N` badge shows the hidden count),
   - **Hover** a branch to dim the others and read one lineage at a time,
   - **Wheel / pinch** to zoom, **drag** to pan, `⌂` refits the whole orbit,
   - **＋ / －** buttons zoom stepwise (touch-friendly).
4. **Download SVG** saves a self-contained dark-canvas SVG (no external fonts, paste into docs/README/slides), or **Copy SVG** grabs the markup for your clipboard.
5. 🎲 **Sample** loads one of two built-in demo outlines; **Clear** wipes the canvas to a friendly hint.

Nothing ever leaves the browser: parsing, layout, rendering and export all happen locally — the page works fully offline once loaded.

## Tech notes

- Single `index.html`, no build step, no dependencies, no CDN, no network calls.
- Parser: normalizes tabs to 2 spaces, strips heading hashes and list markers, skips content-free symbol lines (`***`, `###`, `- - -`), then builds a tree with a stack.
- Layout: proportional clock sectors — each child's angular span is its share of leaf counts, so dense subtrees get wider arcs and labels never collide; ring gap auto-shrinks for deep maps.
- Edges are quadratic Béziers bowed along the local normal, colored by top-level branch hue (10-hue palette, dark-theme tuned).
- Interaction uses pointer-event delegation (hover-highlight via a `dim` class instead of re-rendering, so nothing flickers and listeners survive re-draws); one-finger pan and two-finger pinch are handled through a unified pointer map.
- Export re-serializes the viewport group into a fresh SVG with computed bounds and a dark background — a standalone vector file.
- Works with mouse and touch; responsive layout stacks the editor above the canvas on narrow screens.

## License

MIT — part of the [Daily Tools](https://github.com/xiangjianan/daily-tools) series.
