# MAKEWAVES

English | [简体中文](README.zh-CN.md)

Paste a Makefile, instantly see its **execution waves** — an interactive diagram of the order in which `make` actually runs your targets, and which ones run in parallel under `make -j`.

**Online:** https://xiangjianan.github.io/daily-tools/makewaves-20261011/

## The problem

Makefiles are executable *plans* disguised as plain text. Reading one tells you what depends on what, but not:

- how many rounds `make -j` needs before your final target is done,
- which targets will actually run in parallel,
- whether a dependency cycle is silently lurking,
- why `make` picked a particular target as the default.

MAKEWAVES turns that opaque plan into a visible one: every horizontal lane is one wave — all targets in a lane have their dependencies satisfied simultaneously, so `make -j` runs them concurrently.

## Features

- **Wave diagram** — targets laid out in topological lanes; leaf targets (pure file rules) at `WAVE 0`, the default goal lands on the last lane. Lane count = critical path length; the widest lane = peak parallelism of `make -j`.
- **Closure highlighting** — click any target to highlight everything it (transitively) needs; everything irrelevant dims out. The detail panel shows direct deps, reverse deps ("needed by"), and the resolved recipe.
- **Cycle detection** — cyclic targets render in a red `CYCLE` lane (make refuses to execute them) plus a warning listing the members.
- **Honest parsing** — supports `\` line continuations, comments, variables (`=`, `:=`, `?=`, `+=`) with recursive `$(VAR)` expansion, multi-target rules, inline `;command`, `.PHONY` badges, and pattern rules (flagged, kept out of the graph). Unparseable lines are reported, never silently dropped.
- **One-click Markdown plan** — copy the whole wave schedule as a Markdown checklist for your PR description or docs.
- **100% local** — pure front-end, zero dependencies, zero network calls. Your Makefile never leaves the browser. Drop a `.mk` file onto the input or paste it.

## Usage

1. Open the page (works offline from a double-clicked `index.html`).
2. Paste your Makefile or click **载入示例** (load sample).
3. Read the waves; click a target to inspect its closure; click **复制执行计划** to export.
4. Try **载入带环反例** (load cyclic counter-example) to see cycle flagging.

## Supported Makefile subset

Variables, rules, phony targets, pattern rules, comments, line continuations, multi-target rules, inline recipes. Not supported (and explicitly reported or ignored rather than mis-parsed): `include`, `export`/`unexport`, automatic-variable expansion beyond `$@` passthrough, `$(shell …)`, archive members, `::` double-colon semantics (parsed as a plain rule).

## Tech

Single-file HTML5 + vanilla JS + SVG. No build step, no CDN, no cookies, no analytics. The parser, wave computation (DFS with cycle marking), closure and reverse-dependency index all run locally in ~200 lines of dependency-free JavaScript.

## License

MIT
