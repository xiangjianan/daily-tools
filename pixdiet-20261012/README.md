# PIXDIET

English | [简体中文](README.zh-CN.md)

Drop in a photo, type a target file size, and PIXDIET finds the compression quality that squeezes your image just under it — then hands you a before/after "diet report". Everything happens inside your browser tab; the image is never uploaded anywhere.

**Online:** https://xiangjianan.github.io/daily-tools/pixdiet-20261012/

## The problem

Most image compressors make *you* do the search: drag a quality slider, hit export, check the size, miss, drag again. And the "helpful" web tools want you to upload your screenshots and photos to somebody's server first.

PIXDIET flips the workflow: instead of a quality, you state a **budget** ("under 100 KB for the blog", "under 200 KB for the chat app"). A bisection search over the encoder's quality parameter (up to 8 rounds, 5% granularity) finds the highest quality that still fits — in about a second, fully offline.

## Features

- **Target-size mode** — enter a number, pick KB/MB, optionally tap a quick chip (50K/100K/200K/500K/1M). The tool bisects quality and reports the final quality it landed on.
- **Honest failure** — if the target is physically unreachable (e.g. a noisy 4K photo at 5 KB), it says so, exports the minimum-quality result, and suggests shrinking the longest edge instead. If your target is larger than the source, it just re-encodes at high quality rather than pretending it "saved" anything.
- **Manual mode** — a plain quality slider with a live size readout for when you want full control.
- **Dimension + format controls** — cap the longest edge (1920/1280/800 px), choose WebP (best ratio, keeps transparency) or JPEG (maximum compatibility, white matte for alpha).
- **Diet report** — original → result sizes, a saved-percentage bar, output dimensions, and a one-click download named `<original>-diet.webp`.
- **Edge cases handled** — non-image files and corrupt bytes get a friendly toast; GIFs load their first frame (flagged with a chip); PNG→JPEG warns that transparency turns white; busy recomputes queue instead of dropping your last input.
- **100% local** — pure front-end, zero dependencies, zero network calls. Works offline from a double-clicked `index.html`.

## Usage

1. Open the page (works offline from a double-clicked `index.html`).
2. Drag an image in (or click to pick). Preview and metadata chips appear instantly.
3. Pick a mode: **target size** (default) or **manual quality**, optionally set max edge and format.
4. Read the report, hit **⬇ 保存减肥后的图** to save.

## Tech

Single-file HTML5 + vanilla JS (~480 lines). No build step, no CDN, no cookies, no analytics. Compression is `canvas.drawImage` + `canvas.toBlob(mime, quality)`; the target-size search is a bounded bisection (8 rounds, sequential to keep memory calm) over that quality parameter, with the highest passing quality kept. Downloads use `URL.createObjectURL`.

## License

MIT
