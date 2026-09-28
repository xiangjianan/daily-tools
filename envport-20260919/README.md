English | [简体中文](README.zh-CN.md)

# ENVPORT

Paste a `.env` file, instantly port it to **shell export**, **docker run**, **Dockerfile**, **JSON**, **YAML**, a **TypeScript interface**, or a tidied `.env` — plus a lint pass that catches duplicate keys, unquoted values, lowercase keys and more. 100% local, zero dependencies, one HTML file.

**Live:** https://xiangjianan.github.io/daily-tools/envport-20260919//

## The problem

Env files travel everywhere: local → CI → Docker → k8s → TypeScript configs. Every hop means hand-rewriting the same variables into a different syntax, and it's easy to ship a broken `.env` (duplicate key, unquoted value with spaces, a stray inline comment) without noticing until runtime.

ENVPORT does it in one paste: parse, port, lint — side by side, as you type.

## How to use

1. Open the page (works offline — just double-click `index.html`).
2. Paste your `.env` on the left.
3. Pick a format tab on the right; hit **copy**. Warnings show up under the output as you type.

The **sample** button loads a demo file so you can see it in two seconds.

## What the lint catches

- duplicate keys (and which line they override)
- unquoted values containing spaces (silent truncation in many parsers)
- empty values, lowercase keys, keys starting with a digit
- lines with no `=`, keys with spaces, missing keys
- unclosed quotes spanning lines (multi-line values are supported)

Type inference is built in: `PORT=8080` becomes `number` in JSON/TS, `DEBUG=false` becomes `boolean`.

## Privacy

Everything runs in your browser. No server, no upload, no tracking, no CDN. Your secrets never leave the tab.

## Tech

Single `index.html` (~400 lines), vanilla JS + CSS, zero build, zero dependencies. Works with mouse and touch, responsive down to phone widths.

## License

MIT
