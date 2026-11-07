English | [简体中文](README.zh-CN.md)

# PixelVault — the pixel darkroom

**PixelVault** — hide a secret message inside the least-significant bit of an image's pixels, and read it back by dragging the picture in. A local-first LSB steganography darkroom: no accounts, no uploads, no dependencies.

**Try it**: <https://xiangjianan.github.io/daily-tools/pixelvault-20261108/>

## What problem does it solve?

You want to slip a short note to someone inside an innocent-looking photo — or you received a "PixelVault PNG" and want to know what it says. Classic online steganography sites make you upload your picture (and your secret) to somebody's server, which defeats the entire point of a secret. PixelVault does the whole darkroom dance in your browser tab: pixels never leave the page.

## How to use it

**Hide (🔒 藏信入图):**
1. Drop / click / paste (Ctrl+V) any image — or hit 🎲 for a generated dusk sample photo.
2. Type your message; the capacity meter shows how much fits (every pixel holds 3 bits, one per R/G/B channel).
3. Hit 藏入暗房 and download the resulting PNG. Visually it is identical — every channel changed by at most 1/255 of brightness.
4. Optional 🔬 "LSB magnifier": amplify every least-significant bit ×255 and watch snow-noise appear where your message lives.

**Reveal (🔍 取出密信):** drag the PNG back in. The `PVLT` magic number and length header are validated before decoding, so clean images get an honest "nothing here" instead of garbage. If only part of the magic survives, you're told the picture was probably screenshot, resized, or re-compressed.

## Technical notes

- Single self-contained `index.html`, zero build, zero CDN, works offline after first load.
- Encoding: `PVLT` magic (4 B) + big-endian u32 length (4 B) + UTF-8 payload, written bit-by-bit into the LSBs of R→G→B per pixel, starting at the top-left pixel. Alpha is never touched; images with transparency are composited onto white first so bit round-trips stay stable.
- Capacity = ⌊(pixels × 3 − 64) / 8⌋ bytes; a 640 × 400 image holds ~93.7 KB.
- Honest failure modes: `EMPTY` (magic valid, no message), `BAD_LENGTH`, `BAD_UTF8`, and a JPEG-specific hint (lossy compression rewrites every LSB — the message is dead). Stego only survives in untouched PNGs; share as "original image / file" in chat apps.
- Verified: 13/13 node round-trip assertions on the exact in-page codec (CJK/emoji, full-capacity boundary, overflow rejection, single-bit corruption, amplify), plus a full in-browser smoke test (embed → re-ingest as File → extract match, clean-image miss, JPEG warning, over-capacity lockout, magnifier render, 360 px zero-overflow).

## License

MIT — same as the daily-tools repo.
