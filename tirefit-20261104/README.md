English | [简体中文](README.zh-CN.md)

# TireFit · Tire Swap Comparator

Compare your current tire and the candidate tire — see the diameter difference, the speedometer error, and the ride-height change as a scaled cross-section diagram plus a two-needle speedometer gauge.

## The problem

Swapping to a different tire size (e.g. `205/55 R16` → `225/45 R17`) changes the rolling diameter. Since the speedometer counts wheel revolutions and is calibrated to the factory tire, a taller tire makes the speedo under-read and the odometer under-count; a shorter one does the opposite. Most tire calculators answer with dry numbers only — you never *see* how big the difference is, or how far the needle drifts.

## What it does

- Parse both specs (formats like `205/55 R16`, `205/55R16`, `205/55 R16 91V` all accepted) and compute overall diameter, revs per km, and ground-clearance change.
- Side-by-side **same-scale cross-section** of both wheels with dimension lines, plus a Δ-diameter ruler between them.
- A **two-needle speedometer gauge**: cyan needle = indicated 100 km/h, amber dashed needle = actual speed on the new tires.
- A ±3% guideline verdict badge (the common rule of thumb for staying kind to wheel arches, ABS/ESP, and inspections), a 40–120 km/h error table, and a one-click copyable check-up report.
- Sample presets, an A⇄B swap button, and friendly inline errors for empty or malformed input.

## How to use

Open `index.html` in any browser — that's it. Type both specs, or tap a preset chip. Results update on every keystroke; hit **复制体检报告 / Copy report** to get a plain-text summary.

## Technical notes

Single-file HTML + vanilla JS + inline SVG. All math is local (diameter = rim × 25.4 + 2 × width × aspect) — no network requests, no analytics, nothing leaves the browser. Verified against hand-computed reference values (`205/55 R16` = 631.9 mm, `225/45 R17` = 634.3 mm, Δ +0.4%).

## Limitations

The ±3% figure is a rule of thumb, not a legal standard — regulations vary by region, and load index / speed rating / rim width compatibility are out of scope. Treat results as a sanity check, not a fitment guarantee.

## License

MIT (see repository root LICENSE).
