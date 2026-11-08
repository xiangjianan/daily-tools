English | [简体中文](README.zh-CN.md)

# PerUnit — Unit Price Normalizer ⚖️

Shelf labels never agree: `500ml`, `1.5L`, `250ml×6`, `30枚`, `140g*10卷`… which one is actually cheaper? **PerUnit** parses each line of `name price quantity+unit` and normalizes everything to a common basis — **per 100 g / per 100 ml / per meter / per piece** — then ranks them and crowns the winner.

## What problem does it solve?

Comparing unit prices in your head is error-prone, especially with multipacks (`250ml×12`), mixed unit systems (`斤`/`两` vs `kg`, `L` vs `ml`), or count-based goods (eggs, tissues). Spreadsheet does the job but is overkill. PerUnit is the zero-friction middle ground: type or paste a few lines, read the answer instantly.

## How to use

1. One line per item: `name price quantity+unit`, e.g. `怡宝 3.5 1.5L` or `纯牛奶 42 250ml*12`. The name is optional; the **first number on the line is the price**, the **last number+unit is the quantity**.
2. Supported units: `g/克/kg/kg/斤/两/磅/lb`, `ml/毫升/l/L/升`, `枚/片/张/包/卷/瓶/盒/袋…`, `m/米/cm/mm`. Multipacks: `250ml*12`, `140g*10卷`, `250g×2` (also `X`). Latin units are case-insensitive (`500ML` works).
3. Results are grouped by unit family (mass/volume/length/count), sorted cheapest-first, with a crown on the best and a "pays +X%" tag on the rest. A verdict line spells out the champion and the per-unit saving.
4. **Copy report** exports a plain-text ranking. All parsing and math run **entirely in your browser** — nothing is uploaded.

Notes (honest limitations): the first number is always treated as the price, so item names containing digits can confuse the parser — put the price first. European comma decimals (`12,5`) are not supported to avoid ambiguity with thousands separators.

## Technical notes

Single-file HTML + vanilla JS + CSS, zero build, zero dependencies, works offline from `file://`. Unit dictionary maps every unit to a base quantity (g/ml/cm/piece) in one place; quantity regex handles optional multipack multipliers. Parsing is pure-function and unit-tested (49 assertions).

## License

MIT (repository root LICENSE).
