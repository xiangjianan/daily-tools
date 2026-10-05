English | [简体中文](README.zh-CN.md)

# SUBSLIDE · Drag the whole subtitle track back into sync

One-file, zero-dependency SRT resync tool. Open it, drop a subtitle file, drag the entire subtitle track on a timeline like an audio clip in a DAW — and export a fixed `.srt`. Everything runs locally in your browser; no file ever leaves your machine.

**Live:** https://xiangjianan.github.io/daily-tools/subslide-20261006/

## The problem

Desynced subtitles are a daily nuisance: the fan-sub you downloaded runs 2 seconds late, or drifts progressively because it was timed for a different frame rate. Desktop editors (Aegisub, Subtitle Edit) are heavyweight for a 10-second fix, and most online "subtitle shifters" want you to **upload your file to their server** first.

## How to use

1. **Load** — choose a `.srt` file or paste its content (drag the whole track: the timeline at the top shows original cues in blue and adjusted cues in amber).
2. **Shift** — drag anywhere on the timeline (mouse or touch), or fine-tune with the ±30 s slider. Offset is applied live to every cue.
3. **Two-point sync (drift fix)** — if subtitles drift *progressively* (wrong frame rate), a plain shift is not enough. Find two cues, note when each *should* appear in the video, enter cue number + actual time. SUBSLIDE fits a linear map `t → k·t + b` across the whole file — fixing both offset and speed in one move.
4. **Export** — copy the fixed SRT to clipboard or download `fixed.srt`. The before/after table shows exactly which cues moved.

## Notes

- Pure front-end: single HTML file, no build step, no CDN, no network requests. Works offline via `file://`.
- Parser is forgiving: BOM, CRLF, missing index lines, `.` vs `,` millisecond separators, and reversed time ranges (salvaged with a warning) are all handled. Unrecognizable blocks are skipped and counted, never silently dropped.
- The two-point fit clamps extreme inputs (degenerate/duplicate reference points fall back to a plain shift).
- Timeline canvas is DPR-aware and pointer-events based, so it works with mouse, pen, and touch.

## License

MIT — see the repository root [LICENSE](../LICENSE).
