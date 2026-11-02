English | [简体中文](README.zh-CN.md)

# LoanLens · 房贷放大镜

A zero-dependency, browser-only mortgage what-if tool: compare 等额本息 (fixed annuity) vs 等额本金 (fixed principal) repayment plans side by side, visualize the balance curves and the month where principal finally overtakes interest, and instantly preview how a lump-sum prepayment changes your total interest and payoff date.

## What problem does it solve?

Mortgage calculators tell you the monthly payment. They rarely show you *why* the two repayment methods differ by tens of thousands in interest, or *exactly when* your money starts going to principal instead of the bank. LoanLens makes those abstract numbers visible:

- **Side-by-side cards** — monthly payment, total interest, total repaid for both standard Chinese repayment methods.
- **Balance curve chart** — two decaying curves with ▲ markers on the crossover month (the first month where principal > interest in a single payment).
- **Payment composition strip** — 120 stacked bars showing interest (amber) shrinking and principal (teal) growing over the loan life.
- **Prepayment what-if** — enter "at month N I pay X extra", choose shorten-term or reduce-payment, and see interest saved, months saved, and the per-10k-yuan savings rate instantly.

## How to use

1. Open `index.html` in any browser (double-click works — no server, no network needed).
2. Adjust loan amount (万元), annual rate, and term with the inputs or sliders.
3. Scroll to the prepayment section to test "what if I repay early at month N".
4. Click **📋 复制测算摘要** to copy a plain-text summary.

## Technical notes

- Single self-contained HTML file, ~600 lines, vanilla JS + CSS, zero CDN/build/backend.
- All amortization math runs locally in your browser — nothing is uploaded anywhere.
- Standard formulas: annuity `P·i/(1−(1+i)^−n)`; linear principal `P/n + balance·i`. Prepayment re-amortizes the remaining balance with the standard solver for both shorten-term (solve minimal n′ for same payment) and reduce-payment (same remaining term) modes.
- Pure functions (`schedAnnuity`, `schedLinear`, `crossoverMonth`, `prepay`) are DOM-free and unit-testable.

## License

MIT (see repo root LICENSE).
