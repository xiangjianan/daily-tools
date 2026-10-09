# CURLYARD

Paste a `curl` command → read it as a structured request card → ship it as code in your language.

**Try it: https://xiangjianan.github.io/daily-tools/curlyard-20261010/**

English | [简体中文](README.zh-CN.md)

## The problem

Every developer lives this loop: you fish a `curl` command out of API docs or DevTools ("Copy as cURL"), and then you have to *translate* it — mentally parsing flags like `-d`, `--data-urlencode`, `-G`, unwrapping shell quoting, and re-typing the whole thing as a `fetch()` call, a `requests.request()`, or Go's `http.NewRequest`. It's tedious, error-prone, and every language does it differently. Worse, pasted commands often contain `Authorization` headers you don't want to upload to some random "curl converter" website.

## What it does

- **Paste-to-parse**: tokenizes real shell syntax — line continuations `\`, single/double quotes, `$'...'` ANSI-C escapes — and understands the flags people actually use: `-X`, `-H`, `-d`/`--data-raw`/`--data-urlencode`, `-F`, `-u` (→ Basic auth), `-A`, `-e`, `-b`, `--json`, `-G`, `-I`, `-L`, `-k`, and more.
- **Request card**: the command becomes a readable structured view — method badge, URL split into scheme/host/path/query table (each param decoded), headers list, pretty-printed JSON body.
- **Sensitive-header radar**: `Authorization`, `Cookie`, API-key-style headers (and credential-ish query params) get a visible ⚠ badge, so you notice before sharing a screenshot of it.
- **One-click translate**: emits idiomatic code for **fetch**, **axios**, **Python requests**, **Go net/http**, and **HTTPie**. Click the code (or the copy button) to copy.
- **Semantic correctness**: `--data-urlencode` values are URL-encoded before joining, `-G` moves the body into the query string, multiple `-d` parts join with `&`, `--json` sets both content headers.

## How to use

1. Open the page (works offline from a double-clicked local file).
2. Paste any curl command, or click a sample chip to load one.
3. Read the request card; switch language tabs; click the code to copy.

## Technical notes

- Single HTML file, zero dependencies, zero build, zero network — the entire tokenizer/parser/generators run in your browser. Nothing is ever uploaded.
- Shell tokenizer handles `\` continuations, three quoting modes (literal, double with escapes, `$'...'` ANSI-C with `\n`, `\uXXXX`, `\xXX`), and `--flag=value` forms.
- Code generation is template-based per language with JSON-safe string escaping.
- Works with mouse and touch; responsive down to small phones; dark theme.

## License

MIT — same as the daily-tools repository.
