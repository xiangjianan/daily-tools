English | [简体中文](README.zh-CN.md)

# ☀ SUNARC

**See the sun's arc, golden & blue hours, and a whole year of daylight — for any place and date. Drag the sun to scrub time.**

**Live:** https://xiangjianan.github.io/daily-tools/sunarc-20260920//

## The problem

Golden hour is the most-asked-about time of day among photographers, runners, gardeners and stargazers — yet most sun calculators bury it in tables of numbers. Where the sun actually *travels* stays invisible.

## How it works

1. Pick a city preset (or type any latitude/longitude) and a date.
2. The day's solar arc is drawn instantly: sunrise, sunset, solar noon, and shaded **golden hour** (sun between −4° and +6°) and **blue hour** (−6° to −4°) bands.
3. **Drag the sun** along the arc to scrub through the day and read its altitude at any moment.
4. Below, a **year-of-daylight ribbon** shows how day length marches across the months, with today marked.
5. Copy a light report or a share link — the URL carries your `?lat=&lon=&date=`.

Polar extremes are handled honestly: above the Arctic Circle you get explicit *midnight sun* / *polar night* banners instead of broken times.

## Tech notes

- Single-file HTML + vanilla JS + Canvas. No build, no CDN, no network calls — open `index.html` and it works offline.
- Solar positions use the standard NOAA approximation (declination + hour angle), sampled every 4 solar minutes; sunrise/sunset use the −0.833° refraction threshold.
- All times are **local solar time** (12:00 = the sun at its highest). This sidesteps the timezone/DST maze entirely and is how photographers think anyway.
- Geolocation (if you allow it) and all computation stay in your browser. Nothing is ever uploaded.
- Works with mouse and touch; responsive down to phone width.

## License

MIT
