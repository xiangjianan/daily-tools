English | [简体中文](README.zh-CN.md)

# MOJIFIX 🔧

Paste garbled text (mojibake), instantly see which encoding misread it and restore the original — with folklore detections for `锟斤拷` / `烫烫烫`. Single-file, zero dependencies, 100% local.

**Live: <https://xiangjianan.github.io/daily-tools/mojifix-20260925//>**

## The problem

Every developer who has touched CJK text has met mojibake: UTF-8 bytes that were decoded as GBK or Windows-1252 somewhere along the pipeline, turning `测试现场` into `娴嬭瘯鐜板満` or `æµ‹è¯•çŽ°åœº`. The original data is often still recoverable — but figuring out *which* misdecoding happened (sometimes two layers deep) and reversing it by hand is tedious trial-and-error across online tools that want you to upload your data.

## How it works

- Paste garbled text — diagnosis runs as you type
- MOJIFIX reverse-maps the text back through GBK, Windows-1252 and Latin-1 (including **double-mangled** chains, e.g. GBK→CP1252→UTF-8), decodes each candidate as UTF-8 and ranks results with a readability scorer (GB2312 frequency tiers, control/replacement-character penalties, script plausibility)
- One click to **copy** or download the restored text; a ranked list of all candidate decodings is one toggle away
- Folklore detectors call out `锟斤拷` (UTF-8 replacement chars re-read as GBK — truly unrecoverable), `烫烫烫` (MSVC 0xCC stack fill) and `屯屯屯` (0xCD heap fill)
- Friendly verdicts when the damage is unrecoverable (data destroyed *before* the mojibake you see)

## Privacy & tech

- **Everything runs in your browser.** No upload, no analytics, no network calls — safe for proprietary logs and snippets
- Single `index.html` + one generated data file (`gbk-rev.js`, a GBK character→codepoint reverse table built from the `gb18030` codec, since WHATWG "gbk" TextDecoder == the gb18030 two-byte area)
- Zero build, zero CDN, works offline from `file://`; mouse + touch friendly, responsive down to small phones

## Usage

Open <https://xiangjianan.github.io/daily-tools/mojifix-20260925//>, paste your garbled text (or tap a classic sample chip), copy the result. That's it.

## Limitations

- Restores **UTF-8 that was misread** by GBK / Windows-1252 / Latin-1 (one or two layers). Other damage types (e.g. bytes already flattened to `?` or U+FFFD) are detected and honestly reported as unrecoverable
- Big5 / Shift-JIS misread chains are not covered (GBK table alone is ~250 KB; keeping the tool lean)

## License

MIT
