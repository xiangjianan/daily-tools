# RMBWORDS · Invoice Amount in Chinese Capital Words

English | [简体中文](README.zh-CN.md)

RMBWORDS is a two-way converter between Arabic-numeral RMB amounts and their standard financial
Chinese capital form (财务大写) — the formal wording banks require on invoices, cheques and
reimbursement slips — plus a compliance check-up for hand-written capital amounts.

## What problem it solves

Filling the capital-amount line on an invoice is a zero-tolerance task: one missing 「零」
(e.g. writing 壹佰万柒仟 instead of 壹佰万零柒仟... or the reverse) and the bank bounces the
slip. Meanwhile the zero-insertion rules (merge inner zeros, pad between digit groups, suffix
整) are folk knowledge nobody keeps in their head. RMBWORDS turns that rulebook into an instant
answer and — the part existing converters don't do — reads your hand-written capital back,
re-derives its canonical form, and tells you whether your wording is bank-safe.

## How to use

1. **Amount → capital**: type `1409.50` or `￥1,070,000.53` into the first box. The standard
   capital form appears instantly with a digit-ruler visualization showing every 4-digit group
   (万/亿 boundaries), which zeros were collapsed, and where the inter-group 「零」 came from.
2. **Capital → number + check-up**: paste a hand-written capital amount into the second box.
   You get the parsed number plus a "round-trip audit": the tool re-converts the parsed value
   to canonical capital and compares it with your wording, character by character. Identical →
   green badge; different → amber badge with the corrected form and a diagnosis (missing zero,
   extra character, misplaced unit).
3. Chips under each box load representative samples (PBOC document examples included).
4. Copy buttons put the result on the clipboard; invalid input gets a plain-language error
   (max 2 decimals, 16-digit integer cap, unknown characters flagged at their position).

## Technical notes

- Single-file HTML + vanilla JS, zero dependencies, zero network requests — everything runs
  locally in the browser.
- Canonical output follows the common banking/accounting reading of the PBOC
  "correctly fill in bills and settlement vouchers" rules: inner zeros merge into one 零
  (3007 → 叁仟零柒), inter-group zero padding (100010000 → 壹亿零壹万), all-zero groups drop
  their unit, 整 only after 元 with no 角/分, and a 零 before 分 when the 角 digit is 0
  (16409.02 → 壹万陆仟肆佰零玖元零贰分). Where two forms are officially acceptable, the
  shorter one is emitted.
- The parser accepts common informal variants (圆 for 元, missing 整, bare 伍角/伍分) and
  pinpoints the first unreadable or out-of-place character instead of failing silently.
- Amounts: max two decimals, integer part up to 16 digits. The tool does not verify that a
  capital amount matches its small-numeral counterpart on your paper form — that check is
  yours.

## License

MIT (see repository root LICENSE).
