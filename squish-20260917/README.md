English | [简体中文](README.zh-CN.md)

# SQUISH 🔩

**Paste text, find out how much air it has.** SQUISH runs a live gzip pass and a Shannon-entropy analysis on whatever you paste, then tells you — with a verdict badge — how redundant your writing really is.

## The problem

You can't eyeball redundancy. Is your system prompt bloated? Is that README full of boilerplate? Will your text burn LLM tokens for no reason? Compression ratio is the most honest measure of repetition there is — and nobody has time to open a terminal and run `gzip` by hand.

## How to use

1. Paste any text into the box (or hit **Load sample**).
2. That's it. You instantly get:
   - a **verdict badge** — 🧱 BRICK (nearly incompressible) → ☁️ FLUFFY → 🎈 BALLOON (mostly repeated filler), plus 🍞 CRUMB for texts too small to judge
   - a **size X-ray**: original vs gzipped vs the theoretical entropy floor, so you can see how close gzip gets to the physical limit
   - **stats**: word count, vocabulary richness, average word length, a rough LLM token estimate
   - a **repetition radar**: words and phrases that show up 3+ times
3. Hit **Copy report** for a plain-text summary.

## Why it's honest

- The gzip number is real compression via the browser's native `CompressionStream` API — not a guess or a heuristic.
- The **entropy floor** is the order-0 Shannon entropy limit. The gap between gzip and the floor is structure that gzip's simple window can't reach — a genuinely interesting number for the curious.

## Privacy

100% local. There is no server, no upload, no analytics. Your text never leaves the browser tab — which matters, since the most interesting thing to squish is usually something private: prompts, drafts, emails.

## Technical notes

- Single HTML file, zero dependencies, zero build step, works offline from `file://`.
- Gzip via `CompressionStream` (Chrome/Edge 80+, Firefox 113+, Safari 16.4+); on older browsers the tool degrades gracefully to stats-only mode.
- Mouse and touch friendly, responsive layout, dark theme.

## License

MIT
