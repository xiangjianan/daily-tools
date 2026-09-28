English | [简体中文](README.zh-CN.md)

# 🔍 LSLENS

**Paste `ls -l` output — get an instant visual permission matrix and a security lint. 100% in your browser.**

**Live:** https://xiangjianan.github.io/daily-tools/lslens-20260923//

## The problem

Every developer reads `ls -l` output daily, and almost nobody actually *decodes* it. Which of these is dangerous? `rwsr-xr-x`? `drwxrwxrwx`? `rw-r-----` on an `id_rsa`? The permission string is a dense 9-bit puzzle that most people eyeball instead of read — and risky files (world-writable scripts, setuid binaries, readable private keys) hide in plain sight in every directory listing.

## What it does

Paste the output of `ls -l`, `ls -la`, or `ls -lah` (Linux or macOS), and LSLENS instantly:

- **X-rays every file** into a color-coded chip matrix — cyan `r`, amber `w`, magenta `x`, purple `s`, orange `t` — so the shape of each permission is visible at a glance
- **Runs a security lint** and flags:
  - 🚩 world-writable files and directories
  - 🚩 setuid binaries (running with owner privileges)
  - 🚩 private keys / secrets (`.pem`, `.key`, `id_rsa`, `.env`…) readable by group or others
  - ⚠️ setgid, capital-`S`/`T` mistakes (special bit without execute)
  - sticky-bit world-writable dirs (the `/tmp` pattern) are noted, not alarmed — that's an accepted pattern
- **Explains each row in plain English** — click any row for "owner: read, write · group: read · others: no access" plus the octal mode and a copy-pastable `chmod` fix for every finding
- **Counts what it couldn't parse** — malformed lines are reported as skipped, never silently guessed

A **chmod builder** at the bottom lets you click bits (including setuid/setgid/sticky) and get the octal, the `ls -l` string, and both numeric and symbolic `chmod` commands — handy in the other direction too.

## How to use

1. Open [the page](https://xiangjianan.github.io/daily-tools/lslens-20260923//)
2. Run `ls -l` (or `ls -la` / `ls -lah`) in your terminal, copy the output, paste it in
3. Read the chips, click flagged rows for details and fixes, hit **Copy report** for a Markdown table

A sample listing with realistic risk cases (setuid script, world-writable file, readable `id_rsa`…) is one click away via **Load sample**.

## Tech notes

- Single HTML file, zero dependencies, zero build, zero network calls — every byte is parsed locally in your browser, nothing is uploaded anywhere
- Works offline: save the file, double-click, done
- Handles Linux and macOS `ls` variants: `-h` humanized sizes, symlink `->` targets, dates in both `Sep 23 10:12` and `Sep 23 2024` forms
- Works with mouse and touch, responsive down to phone widths

## License

MIT
