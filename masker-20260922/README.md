English | [简体中文](README.zh-CN.md)

# 🛡 MASKER — paste-log privacy scrubber

**Paste logs, JSON or CSV → get a format-preserving sanitized twin, instantly.** Emails, IPs, UUIDs, bearer tokens, phones and card numbers are swapped for deterministic lookalike fakes. 100% in your browser — nothing ever leaves your machine.

**Try it:** https://xiangjianan.github.io/daily-tools/masker-20260922//

## The problem

You just hit a weird bug and want to paste the log into a GitHub issue — or straight into an LLM chat. But the log is full of real emails, internal IPs, API keys and session UUIDs. Scrubbing them by hand is tedious, so people skip it and leak.

## How it works

1. **Paste anything** — the masked twin appears live on the right, with every replacement highlighted.
2. **Chips show what was found** — emails, IPv4, UUIDs, bearer tokens, hex/base64 tokens, phones, cards — each with a count, each toggleable.
3. **Same seed → same output.** Replacements are seeded, so `user@x.com` becomes the same fake everywhere it appears and across every re-render. Cross-references in your log stay coherent. Hit 🎲 reroll for a fresh identity set.
4. **Copy or download** the sanitized text, and check the collapsible mapping table (original → fake) locally before sharing.

## What makes it trustworthy

- **Format-preserving**: fake emails look like emails, fake UUIDs are real v4 UUIDs, fake cards pass the Luhn checksum, fake tokens keep their exact length. Structure-aware highlighting shows every hit inline.
- **Deliberately conservative**: phones require a `+` country code, card numbers must pass Luhn (so order IDs and timestamps are untouched), long tokens must actually look like hex or base64. A clean result is stated plainly: *"No recognizable sensitive patterns found."*
- **Zero everything**: no upload, no account, no analytics, no build step. One HTML file — download it and it works offline forever.

## Scope & honesty

Regex-based detection is a helper, not an auditor. Free-text names and usernames are out of scope (too easy to false-positive); always skim the result before posting. A phone without `+86`/`+1` style country code won't be caught.

## Tech

Single-file HTML + vanilla JS + CSS, zero dependencies, zero network calls. Deterministic PRNG (xmur3 + mulberry32) keyed by `seed + original value`. Detection runs as one prioritized regex pass (email → UUID → bearer → card → IPv4 → phone → hex → base64).

## License

MIT
