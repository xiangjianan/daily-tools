English | [简体中文](README.zh-CN.md)

# TimeBridge 🌉

One screen to schedule a meeting across time zones: every participant's day is drawn as a 24-hour ribbon, and the tool automatically finds the slots that work for everyone.

## The problem

Scheduling across time zones means mentally juggling "9 AM for me is 9 PM for them". Existing planners are form-driven converters: pick a time, submit, read a table. Nobody shows you *the whole day at a glance*, and nobody tells you which slot is actually best.

## How it works

- **Ribbon matrix** — one row per participant, 48 half-hour cells: green = their working hours (9:00–18:00), amber = edge hours (8–9 / 18–22), red = sleeping hours, diagonal hatch = their weekend.
- **Best slots TOP 3** — every possible meeting window is scored (all-green on a weekday for everyone beats fewer-red), the top 3 non-overlapping windows are surfaced as one-click chips.
- **Pick & copy** — clicking a slot highlights the columns and generates each person's local date/time with honest warnings (weekend / sleeping / edge). One button copies a ready-to-paste meeting notice.
- **Add cities** — 49 IANA zones built in; your own zone is always row zero. Up to 10 participants, prev/next day navigation, 30–120 min meeting lengths.

All timezone math goes through `Intl.DateTimeFormat` per 30-minute instant, so DST transitions are handled by the browser's own IANA database — no libraries, no network requests, nothing leaves your device. Works offline from a double-clicked file.

## Usage

Open `index.html` in any modern browser. Drag the day arrows, add cities, click a recommended slot, copy the notice. That's the whole manual.

## Tech notes

- Single HTML file, zero dependencies, zero build step, ~560 lines.
- `Intl.DateTimeFormat(...).formatToParts()` for wall-time lookups; `formatToParts` instances are cached per zone.
- Window scorer is a pure function (unit-simulated: offsets, verdict boundaries, weekend penalties, non-overlap invariant).
- Responsive down to 360 px; ribbons scroll horizontally on narrow screens.

## License

MIT
