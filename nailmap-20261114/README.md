English | [简体中文](README.zh-CN.md)

# NAILMAP · Picture-Hanging Nail Planner

One input, every nail position. NAILMAP turns "I bought 3 pictures and have one blank wall" into a precise, to-the-centimeter nail sheet — so you drill once, hang straight, and never patch a stray hole again.

## What problem does it solve?

Hanging a group of pictures is deceptively fiddly math: center the group on eye level (the 145 cm gallery standard), keep gaps even, then convert each frame's hook position into a nail height and a distance from the wall edge. Most people eyeball it, end up with a crooked row, and patch two extra holes. NAILMAP does the whole layout in one screen:

- **Wall elevation diagram** — an SVG side view of your wall with frames, a dashed 145 cm sightline, a 170 cm human figure as scale, and a crosshair marking every nail point (N1, N2, …).
- **Nail sheet table + copyable checklist** — for each frame: nail height above the floor, distance from the left wall edge, spacing from the previous frame, and frame offset. One click copies the whole construction list; a print button gives you a clean paper checklist.
- **Hook auto-fill** — the distance from the frame's top edge to its hanging hook defaults to ¼ of frame height (the taller the frame, the lower the hook) and can be overridden manually.
- **Layouts** — a single row or an auto-balanced grid (e.g. 5 frames → 3 + 2 with the last row centered); frames outside the wall width or hanging below the floor trigger explicit warnings instead of silently wrong numbers.

## How to use

1. Set frame count, frame width/height, gap, sightline height (default 145 cm), wall width, and hook offset — sliders or number fields.
2. Read the elevation diagram, then the nail sheet below it.
3. Hit "Copy nail sheet" (or print it), nail N1 first, check level, then nail the rest.

Everything is computed locally in your browser. No uploads, no accounts, no network requests. Single HTML file, zero dependencies — just open it.

## Technical notes

- Pure HTML + CSS + vanilla JS in a single file (≤600 lines). Layout engine is a small pure function (`computeLayout`) covering row and grid arrangements, clamping and warnings for out-of-range inputs.
- The nail-height model is **single-hook, no wire sag**: nail height = sightline − frame height ÷ 2 + hook offset. Wire hangings sag 1–3 cm below the nail once loaded; the UI and checklist say so honestly and suggest verifying with a phone bubble level.
- Copy uses the async Clipboard API with an `execCommand` fallback that checks its return value and surfaces a visible toast either way.
- Print stylesheet hides the controls/diagram and prints only the checklist on white.

## License

MIT (see repository root).
