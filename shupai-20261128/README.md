# SHUPAI 竖排排版台

English | [简体中文](README.zh-CN.md)

**SHUPAI** is a one-screen vertical CJK typesetter: paste horizontal Chinese text and it instantly lays out as right-to-left, top-to-bottom vertical columns — the classical book / invitation / calligraphy format — with vermillion reading-pause dots, three paper stocks (Xuan white, silk yellow, ink black), optional border rules, adjustable font size / column gap / sheet height, and a one-click high-resolution PNG export redrawn character-by-character on canvas.

## What problem it solves

Vertical typesetting (`writing-mode: vertical-rl`) is native to CSS but virtually no consumer tool wraps it: you'd need to hand-write HTML, and there's no clean export path. SHUPAI turns it into paste → see → download, entirely in the browser. Use cases: calligraphy and copied-sutra drafts, wedding/festival invitations, classical poem cards, vertical banners, social-media image posts.

## How to use

1. Paste text into the left textarea (blank lines create paragraph breaks).
2. Tune font size, column gap, sheet height; pick punctuation style (keep / vermillion dots `︒` / classical no-punctuation), paper color, and border rules.
3. **Download PNG** renders the layout on a 2× canvas (not a screenshot) right-to-left, column by column; **Copy text** puts a monospace column-by-column plain-text rendition on the clipboard.

Edge cases handled: empty input keeps a friendly placeholder and blocks export with a toast; punctuation is moved off column heads (kinsoku / 避头尾 — a leading comma gets pulled back to the previous column); multi-paragraph text gets a blank column between paragraphs; ASCII letters/digits stay upright per character with an explicit hint.

## Technical notes

- Single `index.html`, vanilla JS + CSS, zero dependencies, zero network requests — all processing is local (privacy-first).
- Preview uses real CSS `vertical-rl`; the PNG export re-implements the same column-splitting data in canvas so what you see is what you download.
- Column model: `buildCols(text, perCol)` → array of paragraph column arrays, with head-punctuation pull-back, used by preview, export, and clipboard output alike.
- `#selftest` in the console runs 8 core assertions (column splitting, kinsoku, paragraph separation, character conservation, punctuation maps).

## License

MIT
