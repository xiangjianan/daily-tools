English | [简体中文](README.zh-CN.md)

# OHMBAND · Resistor Color-Band Decoder

A color-band resistor is just scientific notation written in paint. OHMBAND makes the code readable from both directions: tap any band on the resistor to cycle its color and read the value instantly, or type a value like `4k7` / `2M2` and watch the correct bands light up. Everything runs in your browser.

## What problem it solves

Reading resistor color codes from memory is error-prone — is red 2 or the ×100 multiplier? Online calculators are either clunky multi-field forms or bury the band-to-value mapping. And going the other way (which bands do I need for 4.7 kΩ?) is almost never supported. OHMBAND treats the resistor itself as the interface: one click per band, one instant readout, both directions covered.

## How to use

1. **Bands → value** (default): click any band on the resistor (or the color chips below it) to cycle colors — digit bands cycle 0–9, the multiplier band cycles ×0.01–×10⁹, the tolerance band cycles ±0.05%–±10%. The value, tolerance and real-world min/max range update live.
2. **Value → bands**: switch modes and type a value in any common engineering notation: `4.7k`, `4k7`, `2M2`, `10R`, `0.47`, `100m` (R acts as the decimal point, m = milliohms). The bands light up, snapped to the nearest E24 (4-band) or E96 (5-band) standard value, with the snap deviation shown.
3. **Standard-value candidates**: five nearest standard values with deviation percentages appear as chips — click one to apply it.
4. Toggle **4-band / 5-band** modes, hit **随机来一颗** for a random resistor to decode, or **复制读值** to copy a full summary.

## Technical notes

- Single-file HTML + vanilla JS + CSS, zero dependencies, zero build, works offline from `file://`.
- Pure-function core: `bandsToValue`, `parseValue` (regex-based engineering notation), `snapSeries` (nearest E24/E96 mantissa), `valueToBands`, `candidatesNear`. All computation is local — no network, no storage.
- Round-trip verified: 158 standard values across both series encode → decode back to the exact same value.
- Responsive layout, touch-friendly ≥40 px tap targets, dark theme.

## License

MIT
