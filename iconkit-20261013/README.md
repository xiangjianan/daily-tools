# ICONKIT · Favicon Full-Set Foundry

English | [简体中文](README.zh-CN.md)

One-click favicon foundry that runs entirely in your browser: drop an image — or just type 1–2 characters and pick a background color — and instantly forge a complete website icon set: `favicon.ico` (16/32/48 packed into a hand-built ICO container), nine PNG sizes (16 → 512, including `apple-touch-icon.png`), a ZIP bundle, and a ready-to-paste HTML `<link>` snippet. Live previews show exactly how your icon looks in a browser tab, a bookmarks bar, and on a phone home screen.

## The problem it solves

Every favicon generator worth using (favicon.io, RealFaviconGenerator…) wants you to upload your artwork to somebody's server, walk through five steps, and trust a black box. And if you don't have artwork at all, you're stuck. ICONKIT flips both: nothing ever leaves your browser, and you can start from literally two keystrokes.

## How to use

1. **Pick your source** — *Image* tab: click or drag any PNG/JPG/SVG/WebP/GIF (center-cropped to square). *Text* tab: type up to 2 characters, choose a background color, adjust corner radius; text color auto-inverts for light/dark backgrounds.
2. **Watch it live** — the preview stage renders your icon inside a mock browser tab (light/dark), a bookmarks bar, and an iPhone home screen tile, updating on every change.
3. **Take the goods** — download `favicon.ico`, download the full ZIP (ico + 9 PNGs + `html-snippet.txt`), or copy the `<link>` snippet straight into your `<head>`.

No account, no upload, no network calls after load. Double-click `index.html` and it works offline.

## Technical notes

- Single-file HTML5 + vanilla JS + CSS, zero dependencies, zero build.
- The `.ico` container is assembled byte-by-byte in JS (ICONDIR + ICONDIRENTRY, PNG-in-ICO payloads) — verified magic numbers, entry offsets, and total length.
- The ZIP is also hand-rolled: STORE method with a table-driven CRC32, local headers + central directory + EOCD, validated by CRC round-trip.
- Source canvas is normalized to 512×512 with high-quality downsampling per target size; `apple-touch-icon.png` (180) is flattened onto white because iOS turns transparency black.
- Busy-state input queueing: re-renders triggered mid-render are deferred and re-run, so no keystroke is ever dropped.

## License

MIT
