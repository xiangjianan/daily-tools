# SCALELENS · Scale Lens

English | [简体中文](README.zh-CN.md)

Pick a root note and the keyboard instantly lights up as any of 12 scales/modes or 8 chords. Tap keys to hear them, play the whole set with one button, and read the theory (whole/half-step formula, note members) right off the keys. Everything runs locally in your browser.

## What problem does it solve

Music theory is invisible: you read "Dorian = major with a flattened 3rd and 7th" but never *see* it. Existing online pianos are playing simulators; existing theory charts are static tables. SCALELENS is the missing lens between the two — it paints any scale or chord directly onto a two-octave keyboard so the shape becomes something you can see, hear, and poke.

## How to use

1. Choose **Scale/Mode** or **Chord**, pick a root (C–B), then pick a type (Major, Dorian, Blues, Major 7th, …).
2. The keyboard lights up: green keys are the members of the current set, labeled with note names.
3. Tap any key to audition it. Press **▶ Play set** to hear the whole scale ascending (chords play as a block).
4. Keyboard shortcuts: `a w s e d f t g y h u j k` play a chromatic octave from C4; `Space` plays/stops the whole set.
5. **Copy notes** puts e.g. `F Blues (scale): F Ab Bb B C Eb` on your clipboard.

## Technical notes

- Single-file HTML + vanilla JS + CSS, zero dependencies, zero network requests, works offline.
- Sound via Web Audio API (triangle oscillators with an exponential decay envelope) synthesized on the fly — no samples.
- Piano rendered with absolutely positioned DOM keys; pointer events make mouse and touch work identically.
- No accounts, no tracking, no data leaves the device.

## License

MIT
