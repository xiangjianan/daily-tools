# Rxplain · Regex Translator

English | [简体中文](README.zh-CN.md)

Paste a regular expression, watch it split into color-coded blocks translated into plain language — then type a test string and see exactly who matches what, live.

## What problem does it solve?

Regex is write-once-read-never. Sites like regex101 explain expressions in English sidebar lists and regex-vis draws railroad diagrams, but neither speaks Chinese, and both make you jump between the pattern and its explanation. Rxplain treats **the regex itself as the visual object**: every token becomes a colored chip (escapes blue, character classes violet, groups boxed in amber, quantifiers red), and each chip gets a one-line plain-Chinese translation — "one letter/digit/underscore", "repeat 2 to 5 times, as few as possible", "capture group 'user': stores what matched here for later".

- **Segmented visualization** — nested groups render as labeled boxes, quantifiers attach to the node they repeat, alternation shows as an "or" divider.
- **Plain-language checklist** — a numbered, indented walkthrough of the whole pattern, copyable as text.
- **Live match highlighting** — type or paste a test string; every match is highlighted inline, with a capture-group table showing `$1`, `$2`… values (named groups shown by name).
- **Flags** — g / i / m / s / u toggles, applied to both explanation and matching.
- **Cookbook chips** — 8 everyday patterns (email, CN phone, URL, date, hex color, IPv4, repeated words, tag pairs) load with sample text in one click.
- **Friendly errors** — unbalanced parens, unclosed classes and dangling escapes get a plain-Chinese message instead of a stack trace.

## How to use

1. Open `index.html` in any browser (double-click works — no server needed).
2. Paste a regex, or click a cookbook chip; read the chips and the checklist.
3. Type a test string to see live highlights and capture values; copy the explanation when you're done.

## Technical notes

- Single-file HTML + vanilla JS + CSS. Zero dependencies, zero build, zero network calls.
- A hand-written recursive-descent parser tokenizes the pattern into a tree (literals, escapes, classes, anchors, groups/assertions, quantifiers, alternation); a reconstruction invariant ("tree re-assembles character-for-character into the source") is covered by a 36-assertion Node test (`test_logic.mjs`), plus a Playwright smoke suite (`smoke.py`).
- Matching reuses the browser's own `RegExp` engine — the tool explains, it never re-implements.
- All processing happens locally in your browser — your patterns and test data never leave the page. Privacy-first by design.
