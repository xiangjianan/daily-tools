English | [简体中文](README.zh-CN.md)

# TALKTIME · spoken-word stopwatch

Paste a voice-over / short-video script and instantly see **how long it takes to read aloud** — with a per-paragraph time strip, a target-duration verdict, concrete "delete paragraph N to fit" suggestions, and a simulated read-through at your chosen pace. Everything runs locally in the browser.

## The problem

Script writers guess. You finish writing, hit record, and discover you're 40 seconds over. Existing tools give you a bare word count; none tell you *which paragraph to cut* or *what the pace feels like*.

## How to use

1. Paste your script (blank lines separate paragraphs).
2. Read the total estimate (mm:ss) and the breakdown: CJK characters, Latin words, pause points.
3. Pick a pace (slow / normal / fast) and a target duration (or type your own).
4. Get a verdict: over / just right / room to spare — plus greedy cut suggestions ("delete P1 (≈0:18) → 0:47 ✓").
5. Click a bar in the strip to see one paragraph's solo duration; press ▶ to simulate the read-through with sentences highlighting in real time; copy a text summary for your notes.

## Estimation model (honest by design)

- Base rates at "normal" pace: **240 CJK chars/min**, **165 Latin words/min** (digits/URLs count as words).
- Pauses: +0.35 s per sentence terminator (`。！？…；.!;`), +0.25 s between paragraphs.
- It's an estimate, not a teleprompter — real pace varies by delivery. All constants are visible in the footer and the code.

## Tech

Single `index.html`, zero build, zero dependencies, no network calls. Hand-rolled tokenizer splits sentences with symmetric regex classes (terminator set and its complement are generated from one source). Works offline; mouse + touch friendly; dark theme.

## License

MIT (see repository root).
