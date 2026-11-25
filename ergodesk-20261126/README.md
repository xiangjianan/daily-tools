# ERGODESK · Desk Ergonomics Ruler

English | [简体中文](README.zh-CN.md)

**ERGODESK** turns two numbers — your height and your actual desk height — into the golden setup values for a healthy workstation: seat height, desk height, monitor-center height, and viewing distance. A live side-view stick figure rescales in real time, and a compensation engine tells you exactly what to do when your desk doesn't match your body (raise the chair, add a footrest of X cm, shim the desk legs, or raise the monitor).

## The problem it solves

Most desks are a fixed 75 cm, but people are not. Online ergonomics calculators spit out isolated numbers with no sense of how to adapt a real room to a real body. ERGODESK closes that last gap: it quantifies the delta between the golden values and your actual desk, then converts it into concrete actions — how high to set the chair, whether your feet will dangle (and the exact footrest height needed), whether to shim or replace the desk, and how to compensate the monitor height afterwards.

## How to use

1. Set your height with the slider (130–210 cm).
2. Pick sitting or standing mode.
3. Enter your desk's actual height (default 75 cm, the most common).
4. Read the golden values, the color-coded delta verdict, and the step-by-step adjustment advice.
5. Hit **Copy setup card** to get a text summary for your notes, or **Print** for a paper version.

## Tech notes

- Single-file HTML5 + vanilla JS + CSS. No build step, no dependencies, works offline from a double-click.
- All math and SVG rendering run locally in the browser — no network requests, nothing uploaded.
- Core formulas: seat ≈ 0.25·H (popliteal approximation), desk ≈ 0.43·H seated / 0.615·H standing, eye ≈ 0.69·H seated / 0.936·H standing, screen center just below eye level, viewing distance ≈ 0.36·H clamped to 50–75 cm. These are anthropometric approximations for guidance, not medical advice.
- Compensation engine: delta = actual desk − golden desk → raise-chair/footrest advice above +2.5 cm, shimming advice below −4 cm, all-clear inside ±1.5 cm.
- 28 unit tests on the core engine + DOM smoke tests across H∈{130,170,210} × {sitting, standing}, all SVG elements verified in-bounds, zero console errors.

## License

MIT
