# DataTune — Hear Your Data Sing

English | [简体中文](README.zh-CN.md)

**DataTune** is a single-file, zero-dependency web tool that turns any column of numbers into music. Paste your data, hit play, and *listen* to your server load, weight log, or stock closes — outliers jump out as bright high notes your ears can't miss.

## The problem

Scanning a long column of numbers for anomalies is slow, and trends hide in walls of digits. But human hearing is a superb anomaly detector: a pitch that breaks the melody is noticed instantly, with zero effort. Data sonification has been used in science for decades — yet almost no everyday tool lets you just *paste numbers and press play*.

## What it does

- **Paste anything** — CSV columns, logs, metrics dumps; numbers are auto-extracted from any text (commas, spaces, newlines, table rows all work).
- **Instant playback** — values are normalized and mapped onto a pentatonic scale via the Web Audio API. No upload, everything plays locally.
- **Outliers you can hear** — values beyond ±2σ (z-score) are transposed an octave up and colored amber in the piano-roll, so anomalies stand out both acoustically and visually.
- **Piano-roll visualization** — notes fall in real time, synced to the audio clock; past notes fade above the strike line.
- **4 scales** (major/minor pentatonic, Japanese in-sen, chromatic) × **3 timbres** (sine, triangle, chiptune square) × tempo (50–240 BPM) × transpose (±12 semitones).
- **One-click WAV export** — rendered offline via `OfflineAudioContext`, encoded to 16-bit PCM in pure JS, downloaded as a file.

## How to use

1. Open `index.html` in any modern browser (double-click works — no server, no network needed).
2. Paste numbers (or click **Load sample: server CPU load** — it contains one hidden spike).
3. Press **▶ Play** and listen for the amber note; tweak scale/tempo to taste, then **⬇ Export WAV** to save the melody.

## Technical notes

- One HTML file, vanilla JS, no build step, no CDN, works offline from `file://`.
- Hand-rolled WAV encoder (RIFF header + 16-bit PCM) and z-score outlier detection — no libraries.
- Audio scheduling uses sample-accurate `AudioContext` timestamps; the visualization reads the same clock, so visuals never drift from sound.
- Playback caps at 512 notes to keep long series responsive; the stat bar tells you when clipping happens.
- AudioContext is created lazily on first user gesture, so mobile autoplay policies are respected.

## License

MIT — see [LICENSE](LICENSE).
