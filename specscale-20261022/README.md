# SPECSCALE ⚖️ — CSS Selector Specificity Scale

English | [简体中文](README.zh-CN.md)

Paste CSS selectors and see exactly **why one rule beats another**: a three-lane weight scale (IDs / Classes / Types), a plain-language breakdown of every fragment, and a head-to-head duel verdict. Everything runs locally in your browser.

## The problem

"Why isn't my style applying?" is one of the most-asked CSS questions. Existing specificity calculators spit out a single number and stop. The tricky modern rules — `:where()` counts zero, `:is()` / `:not()` / `:has()` take their most specific argument *instead of* the default `(0,1,0)`, ties fall back to source order — are invisible. SPECSCALE makes the arithmetic visible and then judges the duel for you.

## Features

- **Instant weighing** — type selectors, get the `(A, B, C)` tuple plus three lane bars (ID / Class / Type) and a per-token chip explanation (which fragment contributed what, including inside `:is()` / `:where()` / `:has()`).
- **Duel mode** — pick any two weighed selectors; SPECSCALE declares the winner, names the winning lane, and reminds you that ties go to source order.
- **Sheet scan** — paste a whole CSS snippet and it extracts the selectors, weighs them, and ranks them from heaviest to lightest.
- **Copy report** — one click exports a text report of every weighed selector and the duel verdict.
- **Invalid input handled** — dangling/stacked combinators, unclosed brackets/parens, empty `:is()` and unknown fragments all produce a friendly, positioned error instead of a silent wrong number.

## How to use

1. Open `index.html` in any browser (works from `file://`, no server needed).
2. Type or paste selectors — one per line — or paste a whole CSS rule block and press “从这段 CSS 提取” (extract from this CSS).
3. Read the lanes, compare, pick two for the duel, copy the report.

## Technical notes

- Single-file HTML + vanilla JS + CSS. Zero dependencies, zero network calls, zero build step.
- Hand-written selector tokenizer: compound splitting across combinators, balanced-paren scanning for functional pseudo-classes, recursive specificity of `:is()` / `:not()` / `:has()` / `:where()` arguments (including relative selectors like `:has(> img)`).
- Specificity semantics follow CSS Selectors Level 4. Verified against the spec's own example table (40 automated assertions).
- Not a CSS parser: it reads selector grammar only, so a rule's declarations are ignored, and exotic syntax (namespaces, escaped edge cases) may be rejected honestly rather than mis-scored.

## License

MIT
