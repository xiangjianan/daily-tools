English | [简体中文](README.zh-CN.md)

# JWT Checkup · Token Health Report Card

Paste any JWT and get an instant checkup report: plain-language claim translation, a visual token lifecycle timeline, and a security review checklist — all parsed locally in your browser.

## What problem does it solve?

JWTs are opaque `eyJhbGci...` strings. To answer basic questions — *is it expired? what's inside? does it have a valid structure? is `alg=none` hiding in there?* — developers usually paste tokens into random online decoders, sending credentials to someone else's server, or squint at `console.log` output.

JWT Checkup decodes the token **entirely in your browser** (zero network requests) and goes one step further than a plain decoder: it translates each claim into plain Chinese, draws the token's lifecycle (issued → not-before → now → expires) as a live timeline with a countdown, and runs a rule-based security review — flagging `alg=none`, empty signatures, missing `exp`, future `iat`, remote key pointers (`jku`/`x5u`), and accidentally-embedded sensitive values.

## How to use

1. Open `index.html` (double-click works — no build, no server needed).
2. Paste your JWT (a `Bearer` prefix is stripped automatically; decoding starts as you type).
3. Read the verdict badge, the timeline, the claim cards, and the security checklist.
4. Copy the decoded Header/Payload JSON with one click, or load one of three built-in sample tokens (valid / expired / `alg=none`) to see how the report reacts.

## Notes

- The tool **does not verify signatures** — signature verification requires the signing key. The report says so explicitly rather than pretending otherwise.
- Timestamps tolerate a common issuer mistake: claims in milliseconds (>1e12) are auto-detected and converted.
- Pure vanilla HTML/CSS/JS in a single file. No dependencies, no CDN, no telemetry, works offline.

## License

MIT
