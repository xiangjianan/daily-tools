English | [简体中文](README.zh-CN.md)

# DOUGHMATH · Dough Ratio Scale

Type **how many dough balls × how heavy each**, and get the full recipe in grams instantly — hydration slider, instant-yeast or sourdough mode, and a build-backwards baking schedule from your chosen bake-out time.

**Live:** https://xiangjianan.github.io/daily-tools/doughmath-20261113/

## The problem it solves

Every bread formula on the internet is written for one fixed batch. Scaling it to your tray, your pan, or your appetite means redoing baker's percentages by hand — and sourdough makes it worse, because starter brings its own flour and water that must be subtracted from what you actually add. DOUGHMATH does the ledger for you: pick ball count and ball weight, and every ingredient recalculates live.

## How to use

1. Choose fermentation style: **instant yeast** or **sourdough** (starter % of flour + its own hydration).
2. Set **ball count** and **weight per ball** (e.g. 4 × 250 g pizza balls).
3. Drag the **hydration** slider — 58% bagel-firm to 80% high-hydration ciabatta — and salt %.
4. Pick your **bake-out time** and total bulk time; the schedule builds backwards from the oven (feed starter → mix & autolyse → folds → shape → retard → preheat → bake), crossing midnight gracefully.
5. Hit **copy** for a plain-text recipe + timeline note, ready to paste into your notes app.

## Details

- Baker's percentages throughout: flour = 100%, everything else relative to flour; the composition bar shows each ingredient's share of total dough weight.
- Sourdough starter is decomposed into its flour and water by its own hydration, so added-flour and added-water rows reflect what you *actually* weigh out — total is conserved (unit-tested).
- Boundary clamps everywhere: 1–24 balls, 30–600 g each, 50–90% hydration; invalid or empty input falls back to sane defaults.
- Single `index.html`, ~460 lines, vanilla JS, zero dependencies, zero network requests — everything stays on your device.

## License

MIT
