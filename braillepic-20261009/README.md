English | [简体中文](README.zh-CN.md)

# BRAILLEPIC — turn any image into Unicode braille pixel art

Drop, paste (Ctrl+V) or pick an image and get it back as a wall of **Unicode braille characters**. Each braille glyph carries a 2×4 dot matrix, so you get 8× the resolution of classic ASCII art — and the result is plain text you can paste straight into a GitHub README, a code comment, or a chat window.

## What problem does it solve?

ASCII art converters burn one character per pixel, so any art that fits in a chat message looks like mush. Braille characters encode 8 pixels each (U+2800–U+28FF), letting you keep real detail in a fraction of the characters. BRAILLEPIC also fights the classic "gray mush" problem with **dithering** — Bayer ordered dithering or Floyd–Steinberg error diffusion — plus brightness/contrast/invert controls for dark-background images.

Typical uses: terminal/README decorations, monospace-art signatures, accessible text-only art, or just fooling around with your webcam screenshots.

## How to use

1. Open `index.html` (double-click — works from `file://`).
2. Drag an image in, click to pick one, or just press **Ctrl+V** to paste a screenshot.
3. Tweak width (30–180 chars), brightness, contrast, dithering, invert — the art re-renders live.
4. Hit **复制字符画** to copy, or **下载 .txt** (Ctrl+S) to save.

No sample image handy? The **载入示例** button draws a moonlit mountain scene programmatically.

Everything runs locally in your browser — no network calls, nothing uploaded.

## Technical notes

- Single HTML file, zero dependencies, zero build. Vanilla JS + CSS.
- Luminance via Rec. 709; braille dot bit layout follows the Unicode standard (dots 1–8 → U+2800 + bitmask).
- Bayer 4×4 ordered dithering and Floyd–Steinberg diffusion operate on the sub-pixel grid before character mapping; ASCII mode maps a 10-step ramp ` .:-=+*#%@` per cell.
- Images are downscaled on a canvas at 2 px per character column (braille) — a 480 px source renders ~240 chars wide instantly.
- Clipboard uses the async API with an `execCommand` fallback for `file://`.

## License

MIT
