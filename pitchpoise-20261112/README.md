English | [简体中文](README.zh-CN.md)

# 🎼 PITCHPOISE — see your pitch, steady your note

**PITCHPOISE** is a browser tuner with a conscience for wobble: hum a note or
pluck a string, and a pendulum needle swings to the nearest semitone with a
cent-deviation readout, while a 4-second wobble trace draws your vibrato in
real time. Everything runs locally — your voice never leaves the device.

## What problem does it solve?

Most online tuners give you a number and a needle, but not *why* you sound
unsteady. PITCHPOISE visualizes pitch **stability**, not just pitch: singers
can literally see their vibrato wave, guitarists see a flat line when a string
is properly tuned, and the "steady-note challenge" turns boring tuning drills
into a 5-second game (hold within ±5 cents, earn badges).

## How to use

1. Open the page, click **🎤 Enable microphone** (Chrome/Edge/Safari, HTTPS or localhost).
2. Hum a steady note or play a string — the needle shows cents deviation from
   the nearest note; big letter = note name, green means within ±5 cents.
3. Watch the **wobble trace**: a wave = vibrato/unsteady air; a straight line
   in the green band = nailed it.
4. Play the **steady-note challenge**: hold any pitch inside the ±5¢ band —
   the timer counts your streak and badges unlock at 1.5s / 3s / 5s.
5. Calibrate **A4 = 435–450 Hz** to match a finicky piano; tap **🔊 Reference
   tone** to hear A4; **📋 Copy report** exports your note tape + best streak
   as text.

Works with voice, guitar, ukulele, violin, kazoos — anything 60–2000 Hz.
No account, no upload, no network calls after load. Fully client-side.

## Technical notes

- Pitch detection: time-domain autocorrelation (ACF2+ lineage) with parabolic
  peak interpolation for sub-sample precision; RMS floor + clarity gate reject
  silence and noise; valid range clamped to 60–2000 Hz.
- The DSP core (`core.js`) is DOM-free and unit-tested in Node: 46 assertions
  cover note math, detection accuracy across E2–C6, vibrato tracking, noise
  rejection and the custom-A4 calibration offset (`selftest.js`).
- End-to-end smoke test: headless Chromium with a fake audio capture device
  playing a synthetic 440 Hz WAV — the full pipeline (getUserMedia → ACF →
  gauge/wobble/tape/challenge UI) detected A4 @ 441 Hz with a 4.35 s steady
  streak, and the permission-denied path shows a friendly localized hint.
- Rendering: two HiDPI-aware canvases (gauge + trace), smoothed needle via
  EMA on cents; Pointer-free, so it's touch and mouse friendly.
- Zero dependencies, zero build, zero telemetry. 4 files: `index.html`,
  `style.css`, `core.js`, `app.js`.

## License

MIT
