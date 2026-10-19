English | [简体中文](README.zh-CN.md)

# Ignolens · .gitignore Verdict Lens

Paste a `.gitignore` file and a list of file paths, and every path is instantly judged **ignored** or **kept** — with an expandable rule-chain trace showing *why*: which rule matched at each directory level, where a negation flipped the verdict, and where the famous trap kicks in (a negated rule can never re-include a file whose parent directory is already excluded).

## What problem it solves

`.gitignore` runs one of the most misunderstood rule engines in daily development: **the last matching rule wins**, negation (`!`) only helps if no parent directory was excluded, `**` can match zero directories, patterns without a slash match at *any* level. When a file you meant to commit stays grey in `git status`, the usual workflow is trial-and-error with `git check-ignore -v` — which prints *the* winning rule but never the chain of reasoning. Existing tools either *generate* gitignore files (gitignore.io) or require CLI fluency. Ignolens makes the decision process visible, in one paste.

## How to use

1. Paste your `.gitignore` content in the left pane (or start from the built-in sample, loaded on open).
2. Paste file paths — one per line — in the right pane.
3. Each path gets a verdict badge (**忽略 / 保留**) plus a one-line reason. Click a row to expand the rule chain: every directory level walked, which rules hit, and a ⚠ marker where an excluded parent directory stops the descent.
4. The rule panel shows per-rule hit counts; click a rule to highlight every path it decides.
5. **Copy verdict report** exports the full judgment table as Markdown.

Verdict semantics match `git check-ignore` (last-match-wins, directory-exclusion shortcut, anchoring, `**` semantics, character classes).

## Technical notes

- Single self-contained `index.html`, zero build, zero dependencies, no network requests — all parsing and matching run locally in your browser.
- Hand-written pattern compiler: gitignore grammar (comments, negation, trailing-`/` directory-only, leading-`/` anchoring, implicit anchoring on internal `/`, `**` in head/middle/tail positions, `*`/`?` that never cross `/`, `[...]` classes with `!`/`^` negation, backslash escapes) → JS RegExp, plus a level-by-level prefix walk implementing git's "parent directory excluded ⇒ never descend" rule.
- The engine was oracle-tested against real `git check-ignore --no-index -v` output on a 21-path matrix (negation flips, parent-dir traps, anchoring, `**` variants), then re-verified headlessly in Chromium.
- Responsive two-pane layout; works with mouse and touch.

## License

MIT — see [LICENSE](LICENSE).
