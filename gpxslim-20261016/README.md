English | [简体中文](README.zh-CN.md)

# gpxslim · GPX Track Slimmer

Drop a GPS track file (.gpx) and instantly understand it — then make it lighter.

## What it does

GPS devices and phone apps happily log a point every few seconds, so a single day hike can easily carry 5,000+ `<trkpt>` entries — a multi-megabyte file that map apps choke on and that quietly leaks where you live. **gpxslim** is a single-page workbench that:

- **Draws the track** on a dark canvas map (equirectangular projection scaled by mean latitude), with start/end markers and waypoint rings
- **Shows the vitals**: total distance (haversine), elevation gain/loss, duration, average speed, point count
- **Paints an elevation profile** you can scrub — hover or drag and a synced cursor rides the map with live distance/elevation readouts
- **Slims the track** with an iterative Douglas–Peucker simplifier: one slider, live "1,400 → 214 points (−85%)" counter and an estimated file-size delta
- **Exports** the simplified GPX (ele/time preserved), ready for weaker map apps or public sharing

## How to use

1. Open `index.html` (or the GitHub Pages URL), drop a `.gpx` file — or click **载入示例轨迹** for a synthetic mountain loop
2. Read the stat cards; scrub the elevation profile to inspect any spot on the route
3. Slide **轨迹瘦身** until the point count and the line shape both feel right
4. Click **导出瘦身 GPX** — the download keeps elevation and timestamps

Files with no `<ele>` degrade gracefully (profile shows a notice, gain/loss read "—"); files with no `<time>` just hide duration/speed. Invalid coordinates are skipped; multiple `<trkseg>` blocks are concatenated.

## Technical notes

- Single HTML file, zero dependencies, zero build, works offline from `file://`
- All parsing (DOMParser), geometry (haversine, iterative Douglas–Peucker on a projected plane) and rendering (Canvas 2D, DPR-aware) happen in your browser — **no byte of your track ever leaves the page**
- Pointer events power the scrub on both mouse and touch; the layout is responsive down to 390 px
- Epsilon scale is derived from the track's own maximum deviation, so the slider behaves consistently across tiny and huge tracks

## License

MIT — see the repository root.
