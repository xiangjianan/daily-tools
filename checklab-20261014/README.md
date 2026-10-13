# CheckLab · Checksum Lab

English | [简体中文](README.zh-CN.md)

Paste a number, watch it face the checksum. CheckLab auto-detects what kind of number you dropped in, visualizes the weighted-sum arithmetic behind its check digit, and gives a green/red verdict — then can mint you a fresh, valid test number of the same kind.

## What problem does it solve?

Check digits are everywhere — payment forms, IMEI locks, book identifiers, bank transfers, ID numbers — but the math hiding behind them is invisible. When a form rejects a number you usually have no idea whether the digit itself is wrong or the algorithm expects something else. CheckLab makes that arithmetic visible, one digit at a time, entirely in your browser.

## Supported algorithms

| Type | Algorithm |
|---|---|
| Bank cards (Visa, Mastercard, Amex, JCB, Discover, Diners, UnionPay…) | Luhn (ISO/IEC 7812-1) |
| IMEI | Luhn over 15 digits |
| EAN-8 / EAN-13 product codes | Mod-10 weighted 3,1 |
| ISBN-13 | Same as EAN-13 (978/979 prefixes) |
| ISBN-10 | Mod-11 weighted 10…2, X allowed |
| Chinese resident ID (18-digit) | GB 11643 weighted sum, mod-11 code table |
| IBAN | ISO 13616 rearrange + mod 97 = 1 |

Ambiguous lengths are handled honestly: a 13-digit number shows both an EAN-13 and a bank-card verdict; a 15-digit number shows card *and* IMEI. Each candidate gets its own verdict card.

## How to use

1. Paste one number per line (spaces, dashes, dots and underscores are ignored).
2. Every candidate renders as a card: type badge, green/red verdict, click to expand the per-digit weighted-sum breakdown.
3. Use the generator panel to mint a random *valid* test number of any supported type — handy for form testing.

Everything runs locally in your browser. No uploads, no network calls, no analytics.

## Technical notes

Single-file HTML5 + vanilla JS + CSS, zero build, zero dependencies, works offline from a double-click. The check-digit math lives in pure functions (verified against a 48-assertion harness plus a self-checking generator that runs every minted number through its own detector). Deep-dive UI is progressive disclosure: collapsed cards by default, expand for the digit-by-digit arithmetic.

## License

MIT
