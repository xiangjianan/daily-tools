English | [简体中文](README.zh-CN.md)

# semruler · The Version Ruler

Paste an npm semver range, see it painted as a ruler — then drop versions on it and watch them pass or fail.

## What it does

`^1.2.0 || >=3.0.0 <3.2.0` is easy to write and surprisingly hard to read. Everyone has shipped a broken dependency bump because a caret turned out to mean something else, or because `1.3.0-beta.1` quietly failed to match a range that "obviously" covers 1.3.0. **semruler** turns the abstract interval into a picture you can point at:

- **Paints the range** on a horizontal version ruler: green bands are matched regions, each `||` alternative gets its own band with live `≥ / <` endpoint labels
- **Explains prereleases visually**: the hatched sliver left of a band marks the npm rule everyone trips on — a prerelease only enters through a comparator with the *same* major.minor.patch tuple (or when *includePrerelease* is toggled)
- **Drops versions on the ruler**: paste one version per line; each becomes a dot on the ruler plus a verdict row — ✓ with the matching alternative spelled out (`命中第 2 组：≥3.0.0 且 <3.2.0`), ✗ with a plain-language reason ("恰好卡在排他上界 <3.2.0")
- **Teaches the three siblings**: a mini-ruler trio shows `1.2.3` (frozen), `~1.2.3` (patches only) and `^1.2.3` (minor allowed) side by side
- **Copies a Markdown report** — range, alternatives, verdict table — ready for a PR comment or issue

## How to use

1. Open `index.html` (or the GitHub Pages URL) — a sample range and a handful of versions are preloaded
2. Type or paste any range (`^ ~ >= < <= =`, x-ranges like `1.2.x`, hyphen ranges `2.1.0 - 2.4.0`, `||` alternatives, `*`)
3. Paste candidate versions, one per line, and read the ruler + verdict list
4. Toggle **含预发布** to emulate `includePrerelease`, and hit **复制判定报告 Markdown** to share the verdict

Unsupported inputs degrade honestly: an unparseable range shows a friendly error instead of a wrong picture; an invalid version gets its own "看不懂" row instead of silently vanishing.

## Technical notes

- Single HTML file, zero dependencies, zero build, works offline from `file://`
- Range parsing and matching implement npm's semver semantics by hand: comparator desugaring (`^0.2.3` → `<0.3.0`, `<=1.2` → `<1.3.0`, x-ranges, hyphen ranges), prerelease identifier comparison (numeric < alphanumeric, field-count tie-break), and the prerelease gate — all as pure functions, unit-simulated in Node before shipping
- The ruler is generated SVG; band positions are computed in linear tuple space (major·10⁶ + minor·10³ + patch), so endpoints and version dots are exact, not eyeballed
- One documented simplification: `>1.2.3` treats the first matching release as `1.2.4` (prerelease-first subtleties of npm's `>` are out of scope for a reading aid)
- Nothing leaves the page — no network calls, no storage

## License

MIT — see the repository root.
