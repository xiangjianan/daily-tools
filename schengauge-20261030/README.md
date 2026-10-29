English | [简体中文](README.zh-CN.md)

# SCHENGAUGE — Schengen 90/180 Rolling-Window Gauge

Paste in your Schengen trips (entry/exit dates) and watch the rolling 180-day window breathe: a live budget curve shows how many of your 90 days are in use on every single day, past trips get an automatic overstay audit, and the planner tells you instantly whether a future trip fits — and the exact maximum stay if it doesn't. Everything runs locally in your browser.

## The problem it solves

The Schengen 90/180 rule is famously counter-intuitive: it's not "90 days per half-year", it's *no more than 90 days present in any rolling 180-day period*. Most online calculators hide that rule behind an "enter dates → get number" form, so travelers can't build an intuition for how their budget recovers as old days slide out of the window.

## How to use

1. **Add trips** — pick entry/exit dates and hit ＋ (both days count). Or hit **载入示例 / Load sample** to see it working.
2. **Read the gauges** — the four stat cards show days used in the current window (as of today), days still available, the next date your budget regains a day, and any overstay warnings.
3. **Explore the timeline** — the top curve is your window usage for every day; the dashed amber line is the 90-day red line; the bottom strip shows your stays (solid = past, dashed = planned). Hover or tap any day for its exact count.
4. **Plan** — pick a future entry date and a stay length: the verdict appears instantly (✓ fits / ✗ breaks the rule), including the maximum stay from that date and the first later date that would fit.
5. **Copy** — one click exports a plain-text health report.

## Technical notes

- Single HTML file, zero dependencies, zero build, works offline from `file://`.
- All date math uses local-noon day serials (DST-safe). Windows are scanned day-by-day: `used(d)` counts stay days in `[d−179, d]`; the planner simulates day-by-day additions and stops at the first violation.
- Overstay audit scans *every* historical day (peaks can occur mid-trip, not just at trip end).
- Trips live only in page memory — nothing is stored or uploaded.

## License

MIT
