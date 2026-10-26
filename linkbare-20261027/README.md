English | [简体中文](README.zh-CN.md)

# LINKBARE · Link Bare-url Dissector

Paste a link — or a whole share message — and get an instant anatomy of the URL: every query parameter is named, decoded and categorized (click-attribution IDs, UTM/analytics, social share noise), with a chip you can tap to keep or drop it. Rebuilds a byte-exact clean link and copies it in one click. Everything happens in your browser.

## What problem it solves

Links shared through apps, newsletters and social networks are typically bloated with trackers: `utm_*`, `gclid`, `fbclid`, `si`, `ref_src`… They bloat URLs (and QR codes), leak where you saw a post, and make links look untrustworthy. Existing cleaners are clipboard-watching extensions or desktop apps — LINKBARE is a zero-install web page that also shows you *what* it removes, instead of silently rewriting your links.

## How to use

1. Paste a URL — or the entire share text; the first link in the text is extracted automatically. A bare domain (`example.com/x`) gets `https://` prepended.
2. Inspect the anatomy: scheme, host, path and every parameter as a chip, color-coded by category, with decoded values on display.
3. Tap chips to keep or drop individual parameters; "keep all" and "restore defaults" for bulk moves.
4. Copy the clean link, or copy it as a Markdown link.

Default policy: click-attribution IDs (red) and UTM/analytics parameters (orange) are removed; social share noise (yellow) is also removed by default but easy to restore; any unknown parameter is always kept — the tool never touches what it cannot name, so links keep working.

## Technical notes

- Single-file HTML + vanilla JS + CSS, zero dependencies, zero build, works offline from `file://`.
- URLs are dissected by hand (regex on the raw string), not via `new URL()`, so **encoding is preserved byte-exact** — only removed segments disappear.
- The tracker vocabulary is a conservative curated list (exact keys + `utm_`/`mtm_`/`pk_` prefixes); ambiguous keys like `from`/`source`/`ref` are deliberately *not* in the list to avoid breaking functional links.
- Malformed percent-escapes are displayed raw instead of throwing; duplicate keys and empty values survive the round trip.
- No network requests. Your links and clipboard never leave the page.

## License

MIT — part of the [daily-tools](https://github.com/xiangjianan/daily-tools) collection.
