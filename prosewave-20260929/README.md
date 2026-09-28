# ProseWave · 文案心电图

English | [简体中文](README.zh-CN.md)

Paste your text, see your prose rhythm as an ECG waveform — every sentence becomes a bar, and a good article breathes while a bad one draws a flat line.

## What problem does it solve?

Gary Provost famously wrote: *"This sentence has five words. Here are five words again. This is not interesting."* Monotonous sentence length puts readers to sleep, yet writers can't *see* their own rhythm while writing. ProseWave turns sentence-length variety into an instant waveform plus a plain-language diagnosis:

- **Rhythm waveform** — each bar is one sentence, height is its length; hover or tap any bar to read the sentence itself.
- **Verdict card** — good rhythm / flat rhythm / monotonous run (N sentences of near-equal length in a row, the Provost alarm) / runaway mega-sentence (>120 units).
- **Stats** — sentence count, mean/max/min length, coefficient of variation (CV > 0.35 means real ebb and flow), longest equal-length streak.
- **Findings** — bloated sentences worth splitting, short-sentence bursts, and where they live.
- **Markdown report** — one click to copy a full diagnostic for your notes or PR review.

Both Chinese and English (and mixed) text work: CJK characters count one unit each, Latin words count one each.

## How to use

1. Open `index.html` in any browser (double-click works — no server needed).
2. Paste your draft, or try one of the three sample chips (good rhythm / monotone / Chinese novel).
3. Hover the bars, read the verdict, copy the Markdown report.

## Technical notes

- Single-file HTML + vanilla JS + CSS. Zero dependencies, zero build, zero network calls.
- Sentence splitting is regex-based with full awareness of CJK terminators (。！？…；) and Latin ones (`.!?;`).
- All processing happens locally in your browser — your text never leaves the page. Privacy-first by design.
- Logic is covered by a 29-assertion Node test (`test_logic.mjs`) and a 16-check Playwright smoke suite (`smoke.py`).

## License

MIT
