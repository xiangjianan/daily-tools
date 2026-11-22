English | [简体中文](README.zh-CN.md)

# DIMWEIGHT — Volumetric Weight Forecaster (抛重预判台)

Know what you'll actually be **billed** for before you ship. Enter a box's length × width × height and actual weight; DIMWEIGHT instantly computes the volumetric (dimensional) weight, the billable weight (the larger of the two, rounded up to 1 kg), and — the twist — works **backwards**: given a billable-weight budget, it tells you the largest box you can afford, either as an optimal cube or scaled to your current proportions.

## What problem does it solve?

Courier companies bill by `max(actual weight, volumetric weight)`, where volumetric weight = L×W×H (cm) ÷ divisor. Most people discover "抛货" (air-filled parcels billed by volume) only when the courier hands them the receipt. DIMWEIGHT makes the rule transparent and interactive:

- **Instant single-parcel calc** — type dimensions, see volumetric / actual / billable weight update live, with a note telling you whether the parcel is volume-driven ("抛货") or weight-driven.
- **Divisor presets** — 6000 (mainland express), 8000 (economy land), 12000 (economy), 5000 (cross-border/air). Switch and everything recalculates.
- **Reverse mode** — set a billable-weight budget with a slider; get the largest cube (`∛(budget × divisor)`) or the max scale factor that keeps your current L:W:H ratio.
- **Multi-parcel manifest** — add parcels to a list, see per-parcel and total billable weight, copy a plain-text manifest in one tap (for group chats / sending to the courier).
- **Live isometric box visualization** — the box redraws in proportion as you type, tinted amber when it's a volume-driven parcel, blue when weight-driven.
- **Friendly units** — dimensions in cm or inch, weight in kg or 斤 (jin), converted locally.

## How to use

1. Open `index.html` in any browser (double-click; works offline).
2. Type length, width, height, and actual weight — results update as you type.
3. Pick the divisor preset matching your courier, or just keep 6000 as the common default.
4. Optional: tap "反推最大尺寸" (reverse mode) and drag the budget slider to see the biggest box your budget allows.
5. Optional: "加入拼单列表" accumulates parcels; "复制拼单清单" copies a shareable text summary.

## Technical notes

- Single self-contained `index.html` — vanilla HTML/CSS/JS, zero dependencies, zero network requests, no build step. All computation and rendering happen locally in the browser; nothing is uploaded.
- Isometric box rendered with hand-written inline SVG; cubic-root reverse math via `Math.cbrt`.
- Divisor presets are common reference values only — carriers differ and change; the tool labels them as such and lets you compare side by side.
- Billing convention: billable weight = max(actual, volumetric), rounded up to 1 kg (the mainland-express norm; some carriers round the continued-weight part to 0.5 kg — noted on the page).

## License

MIT
