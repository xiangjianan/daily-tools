# 📖 BookletPress · Booklet Imposition Calculator

English | [简体中文](README.zh-CN.md)

Print a fold-and-staple booklet and the page order looks scrambled? BookletPress turns a single number — your booklet's total page count — into a complete imposition plan: which pages to print on the front and back of every sheet, plus ready-to-paste print sequences for both auto-duplex and manual-duplex printers.

## What it solves

When you fold a stack of A4 sheets in half and staple them into a booklet, page 1 must share a sheet with the *last* page, page 2 with the second-to-last, and so on — otherwise pages come out of order after folding. Every page pair on a sheet must sum to `total + 1`. Doing this by hand for a 40-page zine is error-prone; BookletPress does it instantly and shows you exactly what every sheet should look like.

## How to use

1. Type the total page count (cover and back cover included). Non-multiples of 4 are padded with blank pages automatically.
2. Or drag a PDF onto the drop zone — the page count is read locally, the file never leaves your browser.
3. Copy the sequence you need:
   - **Auto duplex**: paste the full sequence into your printer's page-range box, choose *short-edge flip* (landscape sheets).
   - **Manual duplex**: print all fronts first (`8,1,6,3` …), re-feed the stack, print all backs (`2,7,4,5` …). Test with 2 sheets first — re-feed orientation varies by printer.
4. Follow the per-sheet diagrams: each one shows front/back layout with the fold line marked. The first sheet is the outermost wrap.

## Technical notes

- Single-file HTML + vanilla JS, zero dependencies, zero build, works offline from `file://`.
- All computation is local: the PDF page-count probe is a pure byte scan (`/Type /Page` object counting with a `/Count` fallback for compressed object streams), best-effort with an honest failure message.
- The imposition engine is a small pure function (`buildPlan`): pages padded to a multiple of 4, sheet *i* carries `front = [M−2(i−1), 2i−1]`, `back = [2i, M−2(i−1)−1]`; every pair sums to `M+1` and the whole plan is a bijection over `1..M`.

## License

MIT
