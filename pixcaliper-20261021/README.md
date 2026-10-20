English | [简体中文](README.zh-CN.md)

# PixCaliper · Pixel Caliper

Paste a screenshot and measure it: a magnifier loupe with live color picking,
two clicks to draw one caliper with distance / Δxy / angle, unlimited calipers
in a checklist, one-click text report and annotated-PNG export. Everything runs
locally in your browser — no upload, no account, no server.

## The problem

Front-end devs and designers constantly ask "how far apart are these two
elements?" while staring at a mockup or a live screenshot. Desktop pixel rulers
exist, but they are heavy, OS-bound and clunky for a quick one-off check.

## How to use

1. Paste with `Ctrl/⌘ + V` (after any screenshot), drag & drop an image, or pick
   a file — or click **示例截图** to load a demo screenshot.
2. Move the mouse: an 8× loupe shows the pixel grid and live hex color.
3. Click point A, then point B: one caliper drawn, with distance, Δx/Δy, angle
   and both endpoint colors. Hold `Shift` (or toggle **锁 45°**) to snap to 45°
   steps. `Esc` cancels a pending start point.
4. Repeat for more calipers; click a row to highlight it, ✕ to delete.
5. **复制报告** copies a text report; **导出标注图** downloads an annotated PNG.

## Technical notes

- Single `index.html`, zero dependencies, zero build, works from `file://`.
- Pure Canvas 2D: a pristine offscreen canvas keeps original pixels for color
  sampling and loupe zoom, while the visible canvas carries the overlay.
- Coordinates are normalized by `canvas.width / rect.width`, so clicks stay
  accurate at any CSS scale (responsive layout, mobile taps included).
- Image input via Clipboard API paste, drag & drop, and `<input type=file>`;
  object URLs are revoked after decode.
- Annotated export is rendered on an offscreen canvas and exported via
  `canvas.toBlob` + object URL.

## License

[MIT](LICENSE)
