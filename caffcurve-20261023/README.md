# CAFFCURVE ☕ — Caffeine Half-Life Curve

English | [简体中文](README.zh-CN.md)

Click a few drinks into a live decay curve of the caffeine currently in your body — and get an instant answer to the only question that matters tonight: **"can I still have one more cup?"**

## The problem

Caffeine tracking apps want you to log every sip, create an account, and trust their server with your habits. But the real question isn't "how much did I drink" — it's a *what-if decision*: if I drink a latte now, how much will still be in my blood at 23:00? Will tonight's sleep pay for it? Most calculators either dump a single number on you or hide the pharmacokinetics entirely. CAFFCURVE puts the whole curve on one screen and judges it for you.

## Features

- **Instant curve** — tap drink chips (espresso 65mg, latte 75mg, filter coffee 95mg, milk tea 100mg, green tea 45mg, cola 35mg, energy drink 80mg, or a custom dose) and the body-burden curve redraws live, with a **now** line, a **bedtime** line, and 50mg/100mg threshold guide lines.
- **Bedtime verdict** — a traffic-light call (green < 50mg ≈ cleared / amber 50–100mg / red > 100mg) with a plain-language reason, plus "≈ N espressos" for scale.
- **Last-call deadline** — computes the latest time you could drink a standard 100mg cup and still be under the 50mg line at bedtime, including a countdown for when your current load drops below it.
- **Metabolism slider** — half-life 3–8h with fast/standard/slow presets (4/5/7h). CYP1A2 genes, smoking and meds all shift it; the honest default is the 5h population mean.
- **Planned cups welcome** — a cup timed in the future simply doesn't contribute until its moment arrives, so "what if I drink one at 16:00" is a native question, not a hack.
- **Copy report** — one click exports a text summary (intake list, current load, bedtime verdict) for your notes or your doctor.
- **Edge cases handled** — empty state guidance, zero/negative custom doses rejected, midnight-rolling bedtimes computed against the next day, viewport-safe on phones.

## How to use

1. Open `index.html` in any browser — works from `file://`, fully offline.
2. Tap the drinks you've had (times default to now; each row's clock field is editable).
3. Set your bedtime and, if you know it, your metabolism speed.
4. Read the curve and the verdict; copy the report if you want to keep it.

## Technical notes

- Single-file HTML5 + vanilla JS + Canvas, zero dependencies, zero build, no network requests.
- Pharmacokinetics: first-order elimination, `remaining = dose × 0.5^(elapsedHours ÷ halfLife)`, summed independently per cup. Standard one-compartment model — good for a decision aid, not a medical device.
- Charts are hand-drawn on a DPR-aware canvas; the curve auto-advances every minute.
- All computation stays in your browser. Nothing is uploaded, ever.

## License

MIT — see [LICENSE](LICENSE).
