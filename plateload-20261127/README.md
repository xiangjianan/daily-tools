# plateload — Barbell Plate Loader

English | [简体中文](README.zh-CN.md)

**plateload** tells you exactly which plates to load on each side of the bar for any target weight — and walks you through the whole loading sequence from the empty bar up.

## The problem

Every gym lifter does this mental math between sets: *"82.5 kg total… bar is 20, so 62.5 on the plates, 31.25 a side… that's 25 + 5 + 1.25."* Easy once, annoying forty times a session, and easy to get wrong when you're tired. Most plate calculators just dump a list; none show you the journey.

## How to use

1. Pick your unit (kg / lb) and bar weight (20/15/10 kg or 45/35 lb presets).
2. Type the target total weight — or tap a quick chip.
3. You instantly get:
   - a **visual barbell diagram** with competition-style colored plates drawn to scale on both sleeves;
   - a **loading roadmap**: step 0 is the empty bar, then each step shows which plate pair to add and the running total, so you can follow it rep-by-rep between warm-up sets;
   - per-side totals and plate counts, one-tap copyable as a text checklist.

If the plates can't hit the target exactly (e.g. 82.3 kg), plateload loads the nearest achievable weight and honestly tells you the gap instead of pretending.

## Tech notes

- Single self-contained HTML file. No build, no dependencies, no network — everything runs locally in your browser.
- Greedy largest-first plate assignment over standard commercial sets (25/20/15/10/5/2.5/1.25 kg, 45/35/25/10/5/2.5 lb), with graceful "nearest load + remainder" fallback.
- Responsive layout, touch-friendly, works offline from a double-click on `index.html`.
- Includes a built-in self-test suite: open the page with `#selftest` appended to the URL.

## License

MIT — see the repository root LICENSE.
