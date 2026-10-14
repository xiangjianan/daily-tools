English | [简体中文](README.zh-CN.md)

# RampSmith · Palette Forge

Paste **one** brand color, instantly forge a full 11-step (50→950) color ramp in the perceptually uniform **OKLCH** space — with contrast badges and one-click export. 100% local, zero upload, zero dependencies.

**Live:** <https://xiangjianan.github.io/daily-tools/rampsmith-20261015/>

## The problem it solves

Hand-rolling a brand palette (like Tailwind's `blue-50 … blue-950`) is a dark art: naive linear interpolation in sRGB produces muddy mid-tones, washed-out ends, and steps that silently fall outside the sRGB gamut. Most generators fix this by uploading your color to a server.

## How it works

1. Drop any color into the input — `#hex`, `rgb()`, `hsl()`, `oklch()`, or the picker all work.
2. RampSmith anchors your hue, applies a hand-tuned OKLCH lightness curve (the perceptual secret behind pro palettes) and a chroma profile that peaks mid-ramp, then **binary-searches the gamut boundary** so every step stays displayable.
3. Each step shows WCAG contrast chips against white (`AA-W` / `AAA-W`) and black (`AA-B` / `AAA-B`); the step closest to your input gets a ★ **brand anchor** badge.
4. Fine-tune with two sliders (global chroma, lightness shift), preview real UI (button / badge / alert), then export as CSS variables, Tailwind v4 `@theme`, SCSS, or JSON.

## Usage notes

- Click any ramp row to copy its hex; click the big button to copy the whole export.
- Everything runs in your browser: the only "network request" is the page itself. No telemetry, no color ever leaves your machine.
- Works with mouse and touch, responsive down to 360 px.

## Technical notes

- Single-file HTML + vanilla JS + CSS. No build step, no CDN, no libraries.
- Color math: Björn Ottosson's OKLab (CC0). sRGB↔OKLab verified against published reference values (`#FF0000 → oklch(0.628 0.258 29.2)`, round-trip error 0 over 2000 random colors).
- Gamut safety: per-step binary search over chroma (22 iterations) against the sRGB boundary.
- Smoke-tested headlessly: 26/26 checks (parsing across 4 formats, monotonic lightness, gamut edges, clipboard, mobile overflow, zero console errors).

## License

MIT
