English | [简体中文](README.zh-CN.md)

# 📽️ FLASHREAD — Speed-Reading Projector

Paste a long article, and it plays back one chunk at a time like a film projector — your eyes stay pinned to a fixed red focus point instead of scanning line after line.

## What problem does it solve?

Normal reading wastes a surprising share of time on eye movement: saccades, line returns, and re-reading (regressions) can eat a third of your reading time. RSVP (Rapid Serial Visual Presentation) flips the model — instead of moving your eyes across text, the text moves past your eyes. Each chunk flashes at the same screen position with its **Optimal Recognition Point (ORP)** highlighted in red, so your gaze never has to jump.

## How to use

1. Paste your article (Chinese or English, mixed is fine), or load the sample text.
2. Hit **🎬 Start** — words flash center-screen with the focus character pinned in red.
3. Tune on the fly:
   - **Speed slider** — 120–900 characters·words/min
   - **Chunk size** — 1–4 characters per flash (Chinese chunks; English runs word-by-word)
   - **Click the screen / `Space`** to pause-resume; `←` `→` step a chunk; `R` restarts
4. Scrub the film-strip progress bar to jump anywhere; remaining time updates live.
5. When it ends you get a wrap-up card: total chunks, wall-clock time, average rate.

## Details that matter

- **Punctuation-aware pacing** — commas hold ~1.5×, sentence ends ~2.2×, so the playback breathes like natural speech instead of droning flatly.
- **True fixed-width ORP alignment** — a 40/20/40 grid keeps the red character on the same vertical line no matter how long the chunk is.
- **Bilingual tokenizer** — English splits on whitespace with trailing punctuation peeled off into pause tokens; Chinese strips punctuation first, then slices the remaining run into fixed-size chunks (no dictionary needed).
- **Honest edge cases** — empty or whitespace-only input gets a friendly nudge; `42.5%` stays one token; quotes and dashes become short pause tokens rather than glue.

## Technical notes

- Single `index.html`, vanilla HTML/CSS/JS, zero dependencies, zero build step — double-click to run.
- All parsing and playback happen in your browser via `requestAnimationFrame` timing; nothing is uploaded anywhere.
- Works with mouse and touch; responsive down to phone widths; dark cinema theme.

## License

MIT — part of the [daily-tools](https://github.com/xiangjianan/daily-tools) one-tool-a-day series.
