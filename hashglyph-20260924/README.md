English | [简体中文](README.zh-CN.md)

# HASHGLYPH

**Every text has a face.** Paste anything — HASHGLYPH hashes it with SHA-256 and draws the fingerprint as a symmetric color glyph you can recognize at a glance.

**Try it:** https://xiangjianan.github.io/daily-tools/hashglyph-20260924//

## Why

Digested text is invisible. When you want to know whether two blobs — config snippets, license keys, long tokens, downloaded files' expected checksums — are identical, you either read them char by char or compare hex strings that all look alike. HASHGLYPH turns each SHA-256 digest into a symmetric "stamped seal": same bytes, same face; one character off, completely different face. Your eyes do the comparison.

It also doubles as a hands-on demo of the **avalanche effect**: flip a single bit in the last character and watch how roughly half of all 256 output bits flip — the core property that makes hash fingerprints trustworthy.

## How to use

1. Type or paste text in the left panel — the glyph and its full SHA-256 digest appear instantly as you type.
2. Paste a second text on the right — a badge tells you **IDENTICAL** or **DIFFERENT**, with both glyphs side by side.
3. Hit **Flip the last character ↯** to see the avalanche effect: bits-flipped counter and two unrelated faces.
4. Copy the digest, or save the glyph as a PNG (it makes a decent deterministic avatar for any string).

## Technical notes

- Single `index.html`, no build, no dependencies, no network — hashing runs in your browser via WebCrypto, with a pure-JS SHA-256 fallback so double-clicking the file works anywhere.
- The glyph packs the first 32 digest bits into a mirrored 4×8 cell grid (hence the symmetry), with hue/saturation/lightness derived from bytes 4–6 of the digest. 2^256 possible texts, practically no two faces alike.
- Nothing is uploaded, stored, or logged. Works offline.

## License

MIT
