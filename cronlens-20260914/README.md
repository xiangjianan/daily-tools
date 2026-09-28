# CRONLENS

Paste a cron expression, instantly see what it means in plain English, which minutes and hours it hits, and exactly when it fires next — all computed locally in your browser.

**Zero dependencies · single file · works offline via `file://` · nothing ever leaves your device.**

[Live demo](https://xiangjianan.github.io/daily-tools/cronlens-20260914//) | [简体中文](README.zh-CN.md)

## Why

Cron expressions are write-only: easy to paste, hard to read. `0 */6 * * *` — is that every 6 hours from midnight, or from now? CRONLENS turns the abstract schedule into something visible:

- **Plain English** — "Runs at 00:00 every hour, every day, in March and September."
- **Match strips** — a 60-cell minute strip and 24-cell hour strip light up exactly where your expression hits.
- **Next 10 runs** — real timestamps in your local timezone, with relative countdowns ("in 2 h 13 m").
- **Instant feedback** — every keystroke re-parses; syntax errors point at the exact field.

## Features

- Full Vixie-cron 5-field syntax: `*`, lists, ranges (`1-5`), steps (`*/5`, `9-17/2`), month names (`jan`), weekday names (`fri`), and `7` as Sunday
- Correct day-of-month / day-of-week **OR** semantics when both are restricted (standard cron behavior)
- Human-readable descriptions with range compression (`Jan–Mar`, `Monday and Friday`)
- Friendly error messages per field (`day of week: 8 out of range 0-7`)
- One-click presets (hourly, weekdays 9:30, every 6 h, …) and "Copy summary" for pasting into docs
- Dark theme, mouse + touch friendly, inline SVG favicon

## Usage

Open `index.html` — that's it. Or host it anywhere static (GitHub Pages, `python3 -m http.server`).

## Notes

- Times are computed in your browser's local timezone (shown under the results).
- Deliberately no seconds field, no `@reboot` aliases — crontab line syntax only.
- Daylight-saving transitions: run times are wall-clock times; a 02:30 job simply skips or repeats per your locale's rules, exactly like real cron.

## License

MIT
