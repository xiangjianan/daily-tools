# ExifRay — Photo Privacy X-Ray

English | [简体中文](README.zh-CN.md)

**ExifRay** is a single-file, zero-dependency web tool that shows what your photos secretly tell about you — and gives you a clean copy in one click.

## The problem

Every photo can carry metadata: exact GPS coordinates, your phone model, device serial numbers, a timestamp precise to the second, even editing software history. Share a photo "as-is" and you may be handing out your home address. Existing EXIF viewers stop at *displaying* tags — they don't tell you what actually matters, and they don't fix anything.

## What it does

- **Drag, paste, or pick** a JPEG/PNG — everything is parsed **locally in your browser**. No upload, ever.
- **Privacy verdict (0–100 leak index)** with color-coded severity: GPS location, device serials, owner info, precise timestamps, editing software, embedded thumbnails, XMP/Photoshop segments, PNG text chunks.
- **Human-readable leak cards** — each finding explains *why* it matters, not just what it is.
- **Full metadata table** — EXIF IFD0 / shooting parameters / GPS groups (both little- and big-endian TIFF), PNG tEXt/iTXt/zTXt/eXIf/tIME chunks.
- **One-click clean export** — re-encodes through a canvas (pixels only, quality 92% for JPEG, lossless for PNG), then **re-scans the result and shows the proof: 0 metadata fields**.

## How to use

1. Open `index.html` in any modern browser (double-click works — no server needed).
2. Drop a photo, paste a screenshot, or click **Load a leaky sample photo** to try a built-in demo image.
3. Read the verdict, then click **Generate & re-check clean version** and download it.

## Technical notes

- One HTML file, vanilla JS, no build step, no CDN, works offline from `file://`.
- Hand-written JPEG segment walker, TIFF/IFD parser (II + MM byte orders), and PNG chunk walker — no libraries.
- Sample photo is generated offline (PIL) and embedded as base64, so the demo works fully offline.
- Parsed fields are cross-checked against an independent Python/PIL implementation in the test suite.

## License

MIT — see [LICENSE](LICENSE).
