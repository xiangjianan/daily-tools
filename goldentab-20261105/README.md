English | [简体中文](README.zh-CN.md)

# 🌅 GOLDENTAB — the Light Timetable

One page that answers "when is the light good today?" Pick a place (geolocation, city chip, or raw lat/lon) and a date, and get the whole day's light as a **train timetable**: golden hour, blue hour, daylight, nautical & astronomical twilight — each with start, end and duration, plus a 24-hour sky band painted from the sun's real altitude.

## What problem it solves

Photographers, runners and golden-hour chasers keep asking "what time is golden hour today?" — and the good answers are heavy desktop apps (The Photographer's Ephemeris) or ad-laden sites. GOLDENTAB gives the answer instantly, in a metaphor everyone already knows: a timetable. Each light phase is a "train" with a departure and arrival time.

## How to use

1. **Place**: tap 📍 to use your GPS, tap a city chip (11 Chinese cities from Sanya to Mohe), or type latitude/longitude (−90~90 / −180~180).
2. **Date**: defaults to today; pick any date, "回到今天" snaps back.
3. Read the **status card** (current phase, sun altitude, azimuth, countdown to the next sunrise/sunset — live, updates every minute), the **stat row** (sunrise / sunset / day length / solar noon), the **sky band** (00:00→24:00 colored by sun altitude, sunrise/sunset dashed lines, a red "now" line), and the **timetable** of all light phases.
4. **📋 Copy report** puts a plain-text summary (place, sun times, all phases) on your clipboard.

Conventions: golden hour = sun altitude −4°…+6°, blue hour = −6°…−4°, sunrise/sunset include atmospheric refraction (−0.833°). Polar day/night are handled: missing events show as "—", and the summary says 极昼/极夜 (polar day/night).

## Technical notes

- Single `index.html`, zero dependencies, zero build, works offline — double-click to open.
- Solar position from the NOAA low-precision algorithm (simplified Meeus): ecliptic longitude → right ascension/declination → hour angle via GMST. Day is sampled every 2 minutes; threshold crossings are linearly interpolated.
- Verified against the sunrise-sunset.org API to the minute: Beijing 2026-11-05 sunrise 06:47 / sunset 17:08 / solar noon 11:58 / day length 10 h 21 m; Sanya and Mohe (summer solstice 17 h 02 m) all match. Polar night at 78°N correctly yields no sunrise.
- All computation is local in your browser — no network calls, nothing uploaded. Times are shown in your device's timezone.
- Works with mouse and touch, responsive down to ~340 px.

## License

MIT — part of the [daily-tools](https://github.com/xiangjianan/daily-tools) collection.
