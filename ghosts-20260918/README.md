English | [简体中文](README.zh-CN.md)

# 👻 GHOSTS — invisible character scanner & exorcist

**Paste text. See every hidden Unicode ghost. Exorcise it in one click.**

🔗 **Use it now:** https://xiangjianan.github.io/daily-tools/ghosts-20260918//

## The problem it solves

Invisible Unicode characters are everywhere — and they cause real damage:

- **Broken tokens & code** — copy a string from a PDF, chat app, or slides, and a zero-width space (`U+200B`) or soft hyphen (`U+00AD`) silently rides along. The code looks identical, but it fails.
- **Trojan Source attacks** — bidi direction overrides (`U+202E` etc.) can make malicious code *look* harmless while executing differently. (CVE-2021-42574)
- **Homoglyph phishing** — `pаypal.com` with a Cyrillic `а` is not PayPal. Your eyes can't tell. GHOSTS can.
- **Weird typography** — NBSP, thin spaces, ideographic spaces breaking parsers, searches, and tokenizers.

The worst part: these characters are *invisible*. You can't fix what you can't see.

## How it works

1. **Paste** any text (or drop a file) — the **ghost map** renders every hidden character as a visible, colored chip inline with your text.
2. Hover any chip for its codepoint, name, category, and risk.
3. Read the **threat report**: counts per category (zero-width, bidi, odd spaces, control chars, confusables) and a verdict — `CLEAN`, `HAUNTED`, or `☠ DANGEROUS` (bidi attack pattern).
4. Hit **⚡ EXORCISE** — ghosts are deleted, spaces normalized, homoglyphs swapped back to ASCII. Copy or download the clean text.

Legit text stays untouched: accented letters, CJK, em dashes, and curly quotes are only soft-flagged with a `~` marker, never auto-removed.

**Haunted samples** are included as one-click buttons — try it with zero setup.

## Highlights

- 🔒 **100% local** — no upload, no backend, no telemetry. Paste passwords freely.
- ⚡ Instant, live scanning as you type (debounced).
- 🎯 Single purpose: *see the invisible, then remove it.*
- 📱 Works with mouse and touch, responsive layout.
- 📦 Single HTML file, zero dependencies, zero build step, works offline.

## Tech notes

Pure vanilla HTML/CSS/JS in one file. Detection covers:

| Category | Examples |
|---|---|
| Zero-width | `U+200B` `U+200C` `U+200D` `U+FEFF` `U+2060` |
| Bidi / Trojan Source | `U+202A–202E` `U+2066–2069` |
| Odd spaces | NBSP, en/em/thin/hair spaces, ideographic space |
| Control / format | C0 controls, DEL, soft hyphen, variation selectors, tag chars |
| Confusables | Cyrillic/Greek homoglyphs, fullwidth punctuation, smart quotes, unicode dashes/minus |

## License

MIT
