English | [简体中文](README.zh-CN.md)

# ✉️ HOPTRACE — email header X-ray

**Paste raw email headers, instantly see the delivery route as a hop timeline, SPF/DKIM/DMARC verdicts, and plain-English phishing red flags. 100% local — nothing ever leaves your browser.**

🔗 **Use it now**: https://xiangjianan.github.io/daily-tools/hoptrace-20260926//

## The problem

When an email looks fishy, the proof is in the headers — but raw headers are a wall of `Received:` noise, and the popular online analyzers ask you to paste exactly the data you shouldn't hand to a third party: **your internal hostnames, relay IPs and routing topology**.

## What HOPTRACE does

- **Hop timeline** — unfolds folded headers, parses the `Received:` chain and renders it newest → oldest: who touched the mail, via which protocol, with the **time spent in transit between every hop**.
- **Auth verdict** — SPF / DKIM / DMARC as pass/fail badges, rolled up into one plain-English verdict: `✓ NO RED FLAGS`, `⚠ SUSPICIOUS` or `☠ DANGEROUS`.
- **Red-flag detector** — Reply-To pointing at a different domain than From (classic phishing), DMARC/SPF failures, timestamps that run backwards or post-date the Date header, long relay stalls, private-IP leaks.
- **Markdown report** — one click copies a clean report for your IT ticket or incident notes.
- **Two built-in samples** — a clean newsletter route vs. a textbook phish, so you can see the difference in two clicks.

## How to use

1. Open the page.
2. In Gmail: open the mail → ⋮ → **Show original** → copy everything above the body. (Apple Mail: View → Message → All Headers. Outlook: File → Properties → Internet headers.)
3. Paste, hit **TRACE ⛓**, read the timeline and verdict.

## Privacy

Single HTML file, zero dependencies, zero network calls. Every byte is parsed by JavaScript in your tab — headers are exactly the data that leaks your mail infrastructure, so HOPTRACE never uploads them anywhere. Works offline once loaded.

## Tech notes

- Header unfolding (RFC 5322 continuation lines), `Received:` clause parsing, RFC 2822 date parsing with a manual fallback for non-standard formats.
- Private-IP detection covers RFC 1918, loopback, link-local and IPv6 ULA/link-local.
- Heuristics are deliberately conservative: newsletters legitimately use different Return-Path domains, so that's a note, not an alarm.

## License

MIT
