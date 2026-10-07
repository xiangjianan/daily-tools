English | [简体中文](README.zh-CN.md)

# UUIDSCOPE — the UUID anatomy lens

Paste a batch of UUIDs and instantly see what each one *is*: version, variant, and — the fun part — the timestamp hidden inside v1 / v6 / v7 IDs, plotted on a timeline with out-of-order and duplicate detection.

## What problem does it solve?

UUIDs look opaque, but most of them carry structure:

- **v7** (the modern default, built into PostgreSQL 18) starts with 48 bits of Unix milliseconds — the ID *is* a timestamp.
- **v1 / v6** encode a 60-bit Gregorian timestamp, and v1 often leaks the **MAC address of the generating machine**.
- **v2** carries a POSIX UID/GID and domain.

If you sort rows by a v7/v6 ID you are silently sorting by creation time — unless some IDs are out of order, which UUIDSCOPE flags right in the timeline. It also tells you when a v1 ID is leaking a real MAC address. Great for debugging seeded data, tracing when a row was created, or checking whether an API is really handing you fresh v7s.

## How to use

1. Open `index.html` (double-click — it works from `file://`).
2. Paste one or many UUIDs (newline, comma or space separated). Analysis is instant.
3. Read the stats chips, the embedded-time timeline, and the per-ID breakdown.
4. Click **复制报告** to get a full Markdown text report on your clipboard.
5. Buttons generate fresh v4 / v7 IDs straight into the input box.

Everything runs locally in your browser — no network calls, nothing uploaded.

## Technical notes

- Single HTML file, zero dependencies, zero build. Vanilla JS + CSS.
- v1/v6 60-bit timestamps parsed with BigInt (safe beyond 2^53); v7 header read as Unix ms.
- RFC 9562 version/variant bit classification, nil/max special values, DCE v2 field extraction.
- Out-of-order detection compares input order against embedded time order for time-bearing IDs.
- Responsive down to ~360px; works with touch.

## Honesty statement

This tool inspects structure only. It cannot recover the name of a v3/v5 ID (hashes are one-way), and it does not verify that a UUID was actually issued by the system claiming it.

## License

MIT — same as the rest of [daily-tools](https://github.com/xiangjianan/daily-tools).
