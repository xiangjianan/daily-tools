English | [简体中文](README.zh-CN.md)

# ShotFramer — Screenshot Mounting Studio

Drop a screenshot in, get a polished "ready-to-post" image out: browser / phone / rounded frame, curated gradient backdrop, tilt and shadow — like a picture frame, but for screenshots.

## What it solves

Raw screenshots look flat when shared on social media, in docs, or in blog posts. Framing tools like shots.so do this well but upload your image to a server. ShotFramer does the entire composition **locally in your browser** — your pixels never leave the machine.

## How to use

1. Drag & drop a screenshot onto the stage, paste with `Ctrl/Cmd+V`, click **选图** to pick a file, or load the built-in sample.
2. Pick a frame: **browser chrome**, **phone bezel**, or **plain rounded**.
3. Pick one of 8 backdrop styles (7 curated gradients or transparent).
4. Adjust tilt (−10°…10°), padding, and corner radius.
5. **Download PNG** (2× resolution) or **Copy** straight to the clipboard.

## Technical notes

- Single HTML file, zero dependencies, zero build, works offline from `file://`.
- All composition on one `<canvas>`: programmatic frame drawing (browser chrome with traffic lights + URL pill, phone bezel with punch-hole camera), drop shadow, rotation bounding-box math, and rounded-corner clipping.
- Sources are downscaled to a 1600px longest edge before composition to keep memory sane; export is always 2× device-pixel quality.
- Clipboard export uses the async Clipboard API with a graceful fallback toast.

## License

MIT
