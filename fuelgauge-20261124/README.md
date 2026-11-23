English | [简体中文](README.zh-CN.md)

# ⛽ fuelgauge — Fuel Log Anatomy

Paste your fuel-up records, and instantly see your **true per-tank fuel consumption**, cost per kilometer, and anomaly interpretation. 100% local — your data never leaves the browser.

**Live demo:** https://xiangjianan.github.io/daily-tools/fuelgauge-20261124/

## The problem it solves

Most people track fuel costs in a notes app or nowhere at all. Fuel consumption is surprisingly hard to compute correctly: only the span between two consecutive **full-tank** fuel-ups yields a trustworthy "miles per gallon"-style number, and partial top-ups in between must be folded into that span. fuelgauge does this bookkeeping for you — the same full-tank segmentation method used by fuel-tracking apps — plus it turns the numbers into a chart and plain-language hints.

## How to use

1. Paste one fuel-up per line, in any order (records are sorted by odometer automatically). Example:

   ```
   2026-08-03 12050 km 42.5 L ¥352 full
   2026-08-24 12621 km 42.5 L ¥353 full
   2026-09-12 13180 km 40.0 L ¥332
   ```

2. Add `full` (or 满/加满) at the end of each line where you brimmed the tank. That's the only concept you need.
3. Results render as you type: average L/100km, cost per km, a tank-consumption ruler along the odometer axis, a per-tank table, and red-flagged anomaly tanks with plain-language causes.
4. Copy a text summary or export a CSV — all generated locally.

**Format tolerance:** dates are optional (`YYYY-MM-DD`, `YYYY/MM/DD`, `MM-DD`); units can be written as `km`, `公里`, `L`, `升`, `¥`, `元`, `yuan` or omitted entirely (numbers are then inferred positionally); separators can be spaces, tabs or anything else. Unparseable lines are skipped with a friendly warning, never a crash.

## How it works

- **Segmentation:** only full-tank → full-tank spans count as real tanks. Liters consumed = all fuel added *within* the span (the fill at the start supports the *previous* tank). Non-full stops contribute money/days only.
- **Anomaly rule:** a tank deviating more than ±18% from your mean is flagged with candidate causes (tire pressure, A/C season, city traffic, driving style). One odd tank is noise; two consecutive same-direction deviations are a signal.
- **Tech:** single HTML file, vanilla JS, zero dependencies, zero build. SVG chart hand-rendered. Works offline from a double-click on `index.html`. Nothing is uploaded — there is no server component at all.

## License

MIT (see repository root LICENSE).
