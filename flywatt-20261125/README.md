English | [简体中文](README.zh-CN.md)

# FLYWATT · Power Bank Flight Check

A 30-second pre-security check for your power bank. Type the capacity (mAh) and nominal voltage, or paste the label text straight off the device — it instantly converts to rated energy (Wh), shows where you land on a 100/160 Wh three-color gauge, and applies the full carry-on rule set: the ≤100Wh / 100–160Wh / >160Wh tiers, the piece-count guideline, the CCC-mark requirement in force since 2025-06-28, and the swollen/damaged/recalled ban. As a bonus it estimates how many recharges the pack holds for your phone, tablet, handheld, or earbuds case.

## What problem does it solve

Airport rules for lithium batteries are genuinely confusing: Wh is printed nowhere obvious, the 100/160 thresholds are easy to misremember, and since June 2025 a missing or blurry CCC mark alone gets a power bank confiscated at Chinese airports. Official calculators don't exist and search results are stuffed with SEO fluff. FLYWATT turns the whole check into one input and one verdict card, entirely in your browser.

## How to use

1. Paste label text like `20000mAh 3.85V` or `74Wh` into the quick-entry box (or type capacity and voltage manually).
2. Pick the piece count and toggle the CCC-mark and physical-condition switches.
3. Read the verdict badge, the color-coded gauge, and the per-rule checklist; tap a device chip to see estimated recharge counts.
4. Copy the "security self-declaration card" and show it at check-in if asked.

## Technical notes

- Single-file HTML + vanilla JS + CSS. No build, no CDN, no network calls — all math runs locally in the browser, nothing is uploaded.
- Tolerant label parser: recognizes `mAh / 毫安`, `V / 伏 / volt`, and direct `Wh / 瓦时` notations; when the label omits voltage it falls back to the common 3.7V with an explicit notice.
- Wh = mAh × V ÷ 1000; recharge estimate uses a 85% conversion-efficiency assumption.
- The gauge is hand-drawn inline SVG; rules and thresholds follow CAAC guidance, with an explicit "final call belongs to the gate" disclaimer.

## License

MIT (see repository root LICENSE).
