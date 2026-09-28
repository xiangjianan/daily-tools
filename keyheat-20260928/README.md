English | [简体中文](README.zh-CN.md)

# KEYHEAT

**Paste text — watch your keyboard catch fire.**

KEYHEAT maps every character you paste onto a physical QWERTY keyboard and renders a live keystroke heatmap, plus the stats typists never see: total keystrokes, hand balance, per-finger load, and how far your fingers would travel while typing it (measured in real key units, 1u = 19.05 mm).

## The problem

Text looks abstract — you can't tell that your 40-line config file is a left-pinky workout, or that typing a typical README moves your fingers ~50 meters. KEYHEAT makes the invisible ergonomics of everyday typing visible and fun.

## How to use

1. Open the page, paste anything: code, an essay, your group chat.
2. The keyboard heats up instantly — log-scaled color from cold gray to burning red.
3. Read the vitals: keystrokes, finger travel, hand balance (thumbs excluded), per-finger bars.
4. **Copy stats** exports a Markdown report; **Save PNG** downloads the heatmap card.

Uppercase and shifted symbols count an extra Shift press (and the pinky trip to get there). Enter and Tab are real keystrokes. CJK/emoji land in an honest "off-layout" counter instead of being silently dropped.

## Technical notes

- Single HTML file, zero dependencies, zero build, works offline from a double-click.
- All computation is local — your text never leaves the browser. No analytics, no uploads, no accounts.
- Travel model: Euclidean distance between consecutive key centers in typed order, with Shift visited as a real key. It's a touch-typing model, not a recording.
- Heatmap uses a log scale so rare keys stay visible on long texts.

## Use cases

- Compare layouts/snippets: which variant is kinder to your pinkies?
- A playful way to show off "my README travels 84 meters".
- Teaching tool for touch typing and ergonomics.

## License

MIT
