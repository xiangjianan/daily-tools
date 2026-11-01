# TIAOXIUCAL — Today: work or off?

English | [简体中文](README.zh-CN.md)

**TIAOXIUCAL** answers one question the moment you open it: *do I have to go to work today?* — with China's official holiday & make-up workday (调休) schedule baked in.

## What problem it solves

China's public holidays come with a twist nobody's calendar handles well: weekends get *reassigned* — a Saturday becomes a workday to pay for a longer holiday stretch. Every year people ask the same questions: "Is next Saturday a workday?", "How many working days until my deadline?", "When is the next actual day off?" TIAOXIUCAL answers all of them at a glance, with zero network calls.

## Features

- **Instant verdict** — open the page and it says 工作/休息 in big type, with the reason (statutory holiday, make-up workday, plain weekend…) and, if you're mid-holiday, which day of the stretch it is.
- **Next-holiday countdown** — days until the next break. Past the last published holiday of the year? It still counts down to the next *statutory* date (New Year's Day, May 1–2, Oct 1–3 — rest days by statute every year), honestly labeled "consolidated schedule pending".
- **Year map of 调休** — all 12 months as a mini-calendar heatmap: statutory days in solid red, bridged holiday days in soft red, reassigned *work* Saturdays in amber with a 班 badge, plain weekends in gray, your custom marks in green. Tap any day for the reason.
- **Range calculator** — pick two dates, get natural days / workdays / days off / weekends / make-up days, plus which holidays the range passes through. One-click copy of the summary.
- **Custom marks** — your company's own shifts, or holidays for years whose official schedule isn't published yet (stored in `localStorage`, highest priority).

## How to use

Open `index.html` in any browser (double-click works — no server, no build, no network). The current data covers the official 2026 schedule (State Council notice 国办发明电〔2025〕7号, published 2025-11-04). Lunar-tied holidays (Spring Festival, Qingming, Dragon Boat, Mid-Autumn) are *not* guessed for unpublished years; fixed-date statutory rest days are.

## Technical notes

Single HTML file, vanilla JS + CSS, zero dependencies, all computation local in your browser. Data: ~15 lines of dates from the official notice. `dayStatus()` classifies any date with a strict priority chain (custom mark > official holiday > statutory fallback > make-up workday > weekend > workday).

## License

MIT (repository root LICENSE).
