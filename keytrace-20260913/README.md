English | [简体中文](README.zh-CN.md)

# ⌨️ KEYTRACE

**Watch your password walk across the keyboard.** Paste any password or PIN and KEYTRACE draws its actual path on a glowing keyboard — instantly exposing lazy "keyboard walks" like `qwerty`, `1qaz2wsx` or `123456`.

🔗 **Try it:** https://xiangjianan.github.io/daily-tools/keytrace-20260913//

## The problem

Weak passwords are rarely random — they are *paths*. Fingers stroll across the keyboard: `qwerty`, `asdf`, `1qaz2wsx`. Every cracking dictionary tries these patterns first, but no strength meter actually *shows* you the walk. You get an abstract "weak" badge and no intuition why.

## What KEYTRACE does

- 🎯 **Live trace** — every keystroke draws a numbered, animated trail across an on-screen keyboard, in real time as you type or paste
- 🔥 **Heatmap** — heavily used keys glow amber → red
- 🧭 **Walk Score (0–100)** — a heuristic that blends adjacent-step ratio, longest straight run, repeats and a built-in list of classic patterns, with four verdict bands: *Keyboard Stroll → Casual Wanderer → Jumpy Hopper → Wild Leaper*
- 🙈 **Shoulder-surfing mode** — one click blurs the input while the trace stays visible
- ⌨️ **Tap to type** — the on-screen keyboard is a real input device (mouse + touch)
- 📋 **Copy report** — one click exports the verdict as text
- 🌐 **EN / 中文 UI toggle**

## Privacy

**100% local.** One HTML file, zero dependencies, zero network calls, no analytics, no storage of your input. Your password never leaves the browser tab — that is the whole point of the tool.

## Usage

1. Open the page (works offline, double-click `index.html` is fine)
2. Type, paste, or tap the on-screen keyboard
3. Read the verdict and the stats (adjacent steps, longest run, direction changes, travel distance…)
4. Copy the report if you need it

## Notes & limits

The score is a **heuristic for awareness, not a security audit**. It measures *keyboard geometry*, not entropy — a random-looking password can still be weak for other reasons (reuse, personal info). Off-keyboard characters (CJK, emoji…) are counted but not traced.

## Tech

Single-file `index.html` (~560 lines): vanilla HTML + CSS + JS, SVG trace overlay, no build step, no CDN, works from `file://`.

## License

MIT
