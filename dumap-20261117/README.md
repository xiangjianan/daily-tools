English | [简体中文](README.zh-CN.md)

# DUMAP · Disk Space Treemap (#66)

Paste the text output of `du` and get an interactive squarified treemap of your disk usage instantly — plus a "top space hogs" ranking. Everything is parsed locally in your browser.

**Live demo:** https://xiangjianan.github.io/daily-tools/dumap-20261117/

## The problem it solves

"Where did my disk space go?" is a recurring question on servers, dev boxes and CI runners. The usual answers are desktop apps (WinDirStat, GrandPerspective) or TUIs (ncdu, gdu) that must be installed on the machine itself — not always possible or welcome on a production host. But every machine can already print text: `du -ab /path`.

DUMAP turns that plain text into a visual answer. Run `du` over SSH, copy the output, paste it here. No install, no upload, no agent.

## How to use

1. On your machine, run `du -ab /path 2>/dev/null` (byte-level, recommended) or `du -ah --max-depth=1 /path` (human-readable).
2. Copy the output and paste it into the text box (or click **Load sample** to try it out).
3. Read the treemap: rectangle area ∝ bytes. Click a folder region to zoom into it; use the breadcrumb to go back up.
4. Check the **Top 8 space hogs** list on the right, then hit **Copy Markdown report** or **Export SVG** to keep a snapshot.

Both formats are auto-detected; unrecognizable lines are counted and skipped instead of breaking the parse.

## Technical notes

- Single HTML file, zero dependencies, zero build. Works offline from `file://`.
- The squarified treemap algorithm (Bruls, Huizing & van Wijk) lays out rectangles so aspect ratios stay close to 1.
- A key correctness detail: `du` reports **inclusive** sizes for directories (a directory's number already contains its children). DUMAP builds a real tree and computes *self bytes = directory size − sum of direct children*, so area is never double-counted. When the paste is partial (e.g. from `--max-depth`), directories that lack their own line get their size derived from children.
- Deep trees are truncated honestly beyond 3500 tiles (a note appears in the stats line).
- Works with mouse and touch; layout is responsive down to small phones.
- Privacy: parsing, tree building and rendering all happen in the browser. Nothing is uploaded — and `du` output contains only sizes and paths anyway.

## License

MIT (repository-wide license of [xiangjianan/daily-tools](https://github.com/xiangjianan/daily-tools)).
