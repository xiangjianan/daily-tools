English | [简体中文](README.zh-CN.md)

# CARDFIT · Share-Card Fitting Mirror

Paste your page's HTML (whole page or just the `<head>`) and instantly see how that link will dress up when shared to **Google Search, X/Twitter, Slack, Telegram and WeChat** — five live mock cards, a weighted 10-item audit checklist, and a one-click fixed `<head>` snippet. Everything is parsed locally in your browser; nothing is uploaded.

Online: <https://xiangjianan.github.io/daily-tools/cardfit-20261026/>

## The problem

Open Graph tags are invisible until you press "share" — and by then the bare URL, the cropped image or the missing thumbnail has already gone out to your audience. Existing preview tools (e.g. metatags.io) fetch your URL from their servers, which fails for staging sites, local dev pages and anything behind auth, and sends your unpublished URLs to a third party.

CardFit flips the model: you paste the HTML, it parses locally, zero network requests.

## How to use

1. Paste your page's HTML into the editor (full page or just the `<head>` — both work). The five fitting-mirror cards update on every keystroke.
2. Optional: drag an image in (or click the drop zone). It becomes the `og:image` stand-in so you can see how X (1.91:1) vs WeChat (1:1) crop it — the file never leaves your browser.
3. Read the audit checklist: missing/overlong tags, relative `og:image` paths and other share-killers are flagged in plain language with a weighted readiness score.
4. Click **Generate fixed `<head>` snippet** — CardFit drafts only the tags you're missing, with placeholders where you must fill in. Copy, paste into your page.

Two built-in samples are one click away: "a decent blog post" (full marks) and "a broken one" (typical mistakes: overlong title, relative image path, no description).

## What it checks

- `<title>` presence, `og:title` fallback, ~60-char Google truncation
- `description` / `og:description`, ~155-char truncation
- `og:image` presence + absolute-URL check (relative paths are invisible to external crawlers)
- `og:url`, `og:site_name`, `twitter:card` (large-summary needs explicit declaration)
- Missing tags degrade each platform card differently — the mock cards show exactly what degrades

## Tech notes

- Single self-contained HTML file, no build, no dependencies, no network calls
- Parsing via `DOMParser`; mock cards are pure HTML/CSS recreations of each platform's share UI
- Images handled via `FileReader` data URLs, kept in memory only
- Works with mouse and touch, responsive down to phone widths

## License

MIT (same as the daily-tools repo)
