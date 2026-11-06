English | [简体中文](README.zh-CN.md)

# MRZLENS — Machine-Readable Zone Decoder

Paste the 2–3 lines of machine-readable code (MRZ) printed at the bottom of a passport or ID card, and get an instant, privacy-first decode: every field parsed, every check digit audited bit by bit, expiry health-checked. Everything runs locally in your browser — the document data never leaves your device.

## What problem does it solve?

OCR apps and random websites happily ask you to upload photos of your passport. When all you need is "what do these two lines actually say, and do they check out?", uploading identity documents to a third party is overkill — and risky. MRZLENS gives you the answer offline: field decode (name, document number, nationality, dates, sex, personal number), a **7-3-1 check-digit audit** showing each character × weight × product, an expiry health report (expired / <90 days / <180 days), and OCR-confusion hints (O↔0, I↔1, S↔5, B↔8, Z↔2) when a check fails.

## How to use

1. Open the page (works from `file://` too — no server, no network).
2. Paste the MRZ lines from your document (or photo) into the text box. Lowercase, spaces and separators are cleaned automatically.
3. Or click a sample: valid passport / near-expiry passport / tampered check digit / TD1 ID card / TD2 visa. Samples are generated at runtime with real check digits, so they always verify.
4. Read the verdict strip, then explore:
   - **Coverage map** — every MRZ character colored by which check it feeds; tap any character to highlight the audit rows it participates in, and tap an audit row to flash its check digit back on the map.
   - **Field cards** — decoded values with per-field check status and date inference.
   - **Audit table** — per check digit: character × weight (7/3/1) cells, weighted sum, `mod 10`, expected vs. actual.
5. Copy a Markdown report with one click.

Supported formats: **TD3** (passport, 2×44), **TD2** (visa, 2×36), **TD1** (ID/residence card, 3×30), including TD1 extended document numbers that overflow into the optional-data area.

## Technical notes

- Single HTML file, zero dependencies, zero build, works offline from `file://`.
- Check digit algorithm: character value (digits = face value, A=10…Z=35, `<`=0) × repeating weights 7/3/1, summed mod 10; the composite check covers ICAO 9303 field ranges with weights running continuously across the joined segments.
- Birth-date century is inferred (two-digit year ≤ current year → 20xx, else 19xx) — the standard heuristic, documented as such.
- Implementation verified against the ICAO 9303 ground-truth samples from the [cheminfo/mrz](https://github.com/cheminfo/mrz) test suite (57 assertions), plus full-page smoke tests (zero console errors).
- Honest limits: validates **internal consistency only** — it cannot detect forged documents, and century inference is ambiguous for people aged ~100.

## License

MIT
