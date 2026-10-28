English | [简体中文](README.zh-CN.md)

# JSONDIFF · JSON Tree Diff

Paste two JSON documents and a red/green diff tree grows instantly: every added field lights up green, every removed one red, every changed value amber with its old → new shown inline. Each change carries a jq-style path you can copy with one click. All parsing and diffing happens in your browser — nothing ever leaves your machine.

## What problem it solves

Comparing two JSON payloads — an API response before/after a deploy, two versions of a config, a schema change — usually means piping them through `jq` and `diff`, or pasting them into an online diff site and trusting a third party with your data. JSONDIFF replaces both: structural comparison that understands nesting, arrays and type changes (not just line-level text), rendered as an annotated tree, entirely client-side. Sensitive payloads never leave the tab.

## How to use

1. Paste the old JSON into **A (old)** and the new one into **B (new)** — the tree and change count update as you type. You can also drag a `.json` file onto either pane.
2. Read the **diff tree**: green rows are additions, red strikethrough rows are deletions, amber rows are changes (shown as `old → new`, with a badge when the type itself changed, e.g. number → string).
3. Switch to the **change list** tab for a flat table of every change with its jq-style path (`$.users[1].roles[0]`) — click any path to copy it, or copy the whole table as Markdown.
4. **Swap** flips A/B to see the inverse diff; **Clear** resets. Arrays are compared index-by-index, and length changes get their own "array length N → M" entry.

## Technical notes

- Single-file HTML + vanilla JS + CSS, zero dependencies, zero build, works offline from `file://`.
- Pure-function core: `tryParse` (parse errors carry line/column hints when the engine reports a position), `typeOf`, `joinPath` (identifier keys use dot notation, everything else bracket notation), and `diff` — a single recursive walk that emits the change list; the tree renderer consumes the same list so both views always agree.
- Verified with 35 unit assertions covering additions, deletions, value changes, type changes, array length changes, key-order invariance, empty containers, null transitions and special-character keys.
- Very large structures are capped (2,500 tree nodes; 600 change rows) with an honest truncation notice — the change list always remains complete up to its cap.
- Responsive two-pane layout that stacks on mobile, dark theme, safe-area aware.

## License

MIT
