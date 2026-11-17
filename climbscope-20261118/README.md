English | [简体中文](README.zh-CN.md)

# ⛰️ CLIMBSCOPE — GPX Climb Profile Analyzer

A single-file browser tool that turns any GPX track into a **slope-colored elevation profile** with Tour-de-France-style **climb categorization** — instantly, locally, with zero uploads.

**Live demo:** https://xiangjianan.github.io/daily-tools/climbscope-20261118/

## The Problem

Cyclists, hikers and runners export GPX files all the time, but the raw XML tells you nothing. "How hard is this route really?" usually means installing a desktop app, uploading your route to a random website, or squinting at Strava's tiny profile.

## What It Does

- **Drop a `.gpx` file** → instant elevation profile rendered on canvas
- **Slope-color painting**: every segment of the profile is painted green → yellow → orange → red by its gradient
- **Automatic climb detection** with merging (short dips < 400 m / < 15 m drop don't split a climb)
- **Tour de France categorization** (Cat 4 → Cat 1 → HC) using a weighted score of elevation gain × steepness
- **Scrub anywhere**: hover / touch the chart to read distance, altitude and gradient at any point; click a climb card to isolate it on the chart
- **One-click PNG export** of the profile
- Built-in **demo track** so you can try it with no file at hand

## How To Use

1. Open the page (works offline, from disk, on mobile)
2. Drag in a `.gpx` (Garmin / Strava / Keep / 两步路 exports all work), or click "load demo track"
3. Read the stats strip (distance, gain/loss, elevation range, hardest climb), scrub the profile, click climb cards
4. Export the profile as PNG if you want to share it

## Technical Notes

- Pure HTML + vanilla JS + canvas, **no dependencies, no CDN, no network calls**
- GPX parsed in-browser with `DOMParser`; haversine distance accumulation; median-filter smoothing (window 5) to kill GPS elevation spikes
- Climb detection: continuous ascent segments with gradient ≥ 3% and gain ≥ 60 m, merged across short breaks
- Handles missing `<ele>` values via linear interpolation between known points; friendly errors for non-GPX files and tracks without elevation
- Responsive layout, mouse + touch, dark theme

## License

MIT — part of the [daily-tools](https://github.com/xiangjianan/daily-tools) daily tool series.
