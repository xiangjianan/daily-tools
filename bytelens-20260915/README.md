English | [简体中文](README.zh-CN.md)

# BYTELENS — X-ray your files, right in the browser

Drop any file onto the page and instantly see its **byte-level anatomy**: where the readable text lives, where the compressed noise is, which file formats hide inside. Every byte becomes a pixel; the file becomes a map.

**🔗 Try it: https://xiangjianan.github.io/daily-tools/bytelens-20260915//**

## The problem

File formats are black boxes. Is this "image" actually a renamed ZIP? Why is this 10 MB text file so big? Where does the compressed part of a PNG end and the metadata begin? Command-line hex dumps answer these questions, but they're hostile to most people — and online "file inspector" sites ask you to **upload your file to someone else's server**.

## What it does

- **Byte map** — 1 byte = 1 pixel, color-coded by class: zeros (dark), ASCII text (cyan), whitespace (steel blue), binary/high-entropy (colorful noise). Scroll through your file like a spectrogram.
- **Overview minimap** — the entire file in one strip; click anywhere to jump.
- **Entropy curve** — per-block Shannon entropy: flat = plain text or padding, spiky and hot = compressed or encrypted data.
- **Format signatures** — scans the header region for 17 magic numbers (PNG, JPEG, ZIP, PDF, GZIP, 7z, RAR, MP3, FLAC, OGG, ELF, EXE, SQLite, MP4, WEBP, GIF, BMP) and pins them on the map. Weak 2-byte signatures (BM, MZ, GZIP) are only trusted at offset 0 to avoid false positives.
- **Byte inspector** — hover or click any byte: offset, hex/dec/bin, character, class, nearby signatures.
- **Copy report** — one-click plain-text summary.

## Usage

1. Open the page (works from disk, `file://` — no server needed).
2. Drag & drop a file, tap to pick one, or paste from your file manager.
3. Explore: scroll the map, click the minimap to jump, hover bytes to inspect.

Big files: the first 4 MB are mapped. Everything else about the file stays untouched.

## Privacy & tech

- **100% local.** FileReader + Canvas in a single HTML file — zero dependencies, zero build, zero network calls. Your file never leaves the machine.
- Works offline, works on mobile (touch-friendly inspector), dark theme.
- No accounts, no tracking, no uploads.

## License

MIT
