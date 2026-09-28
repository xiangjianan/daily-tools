English | [简体中文](README.zh-CN.md)

# ♞ BISHOPART

**Paste an SSH fingerprint — watch the drunken bishop walk that draws OpenSSH's randomart.**

## What it does

Every SSH key fingerprint has a strange ASCII picture next to it — the "randomart" that `ssh-keygen -lv` prints. Almost nobody knows how it's drawn: OpenSSH feeds each byte of the digest to an imaginary *drunken bishop* that staggers diagonally across a 17×9 board, and the squares it visits pile up into the picture.

BISHOPART reproduces that algorithm **byte-for-byte** (verified against `ssh-keygen -lv` output) and makes it watchable:

- **See the art** — paste `SHA256:…`, `MD5:aa:bb:…`, bare hex, or a whole `id_*.pub` public-key line (hashed locally with WebCrypto)
- **Watch the walk** — play/pause/step through all 128 diagonal steps, with adjustable speed and heat shading for revisited squares
- **Stats** — steps, squares visited, revisits, busiest square
- **Export** — copy the exact ASCII art (same format as ssh-keygen) or download it as PNG

## Why

Same key ⇒ same walk ⇒ same picture. Randomart exists so you can recognize a server's key at a glance instead of diffing hex strings — but the mechanism has always been opaque. BISHOPART turns it into something you can *see*, and doubles as a teaching tool for one of OpenSSH's most delightful hidden features.

## How to use

1. Open the page (works offline, from a double-clicked `index.html`)
2. Paste a fingerprint — or hit a sample chip
3. Press **▶ Walk** and watch the bishop stagger from `S` to `E`

## Privacy & tech

- Single HTML file, zero dependencies, no build step, no CDN
- All parsing, hashing and drawing happen in your browser — **nothing ever leaves your machine**
- Works with mouse and touch, responsive down to phone widths

## License

MIT
